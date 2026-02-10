// https://www.dnd5eapi.co/api/2014/monsters/bandit

import { useEffect, useState } from "react";

export function MonsterAPI({ monsterName }) {
  const [monster, setMonster] = useState({});
  const [error, setError] = useState(null);

  const attributes = [
    ["strength", "STR"],
    ["dexterity", "DEX"],
    ["constitution", "CON"],
    ["intelligence", "INT"],
    ["wisdom", "WIS"],
    ["charisma", "CHA"],
  ];

  function getModifier(points) {
    const num = Math.floor((points - 10) / 2);
    return num >= 0 ? `+ ${num}` : `-${num}`;
  }

  function show(value) {
    return value ?? "—";
  }

  function render(label, value) {
    return value ? (
      <p>
        {label}: {value}
      </p>
    ) : null;
  }

  useEffect(
    function () {
      let isMounted = true;
      async function fetchMonster(monster) {
        try {
          const res = await fetch(
            `https://www.dnd5eapi.co/api/2014/monsters/${monster}`,
          );

          if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
          }

          const data = await res.json();

          if (isMounted) setMonster(data);
        } catch (error) {
          if (isMounted) setError(error.message);
        }
      }

      fetchMonster(monsterName);
      return () => {
        isMounted = false;
      };
    },
    [monsterName],
  );

  if (error) return <p>Error: {error}</p>;
  if (!monster.name) return <p>Loading...</p>;

  return (
    <div className="statblock">
      <h1>{monster.name}</h1>
      <div className="monster-details">
        <p>CR: {monster.challenge_rating}</p>
        <p>
          {monster.size} {monster.type} ({monster.subtype}), {monster.alignment}
        </p>
      </div>
      <div>
        <h4>
          AC: {show(monster.armor_class?.[0]?.value)} (
          {show(monster.armor_class?.[0]?.armor?.[0]?.name)})
        </h4>
        <h4>
          HP: {monster.hit_points} ({monster.hit_points_roll})
        </h4>
        <h4>
          Speed: {show(monster.speed?.walk)}, fly {show(monster.speed?.fly)},{" "}
          swim {show(monster.speed?.swim)}{" "}
        </h4>
        <div className="attributes">
          {attributes.map((attribute) => (
            <span key={attribute[0]}>
              {attribute[1]} {monster[attribute[0]]} (
              {getModifier(monster[attribute[0]])})
            </span>
          ))}
        </div>
        <div className="proficiencies">
          {(monster.proficiencies ?? []).map((prof) => {
            return (
              <p key={prof.proficiency.name}>
                {prof.proficiency.name}: +{prof.value}
              </p>
            );
          })}
          <p>Proficiency Bonus: +{monster.proficiency_bonus}</p>
        </div>
        {(monster.damage_vulnerabilities ?? []).map((vul) => {
          return <p key={vul}>Damage Vulnerabilities: {vul}</p>;
        })}
        {(monster.damage_resistances ?? []).map((res) => {
          return <p key={res}>Damage Resistances: {res}</p>;
        })}
        {(monster.damage_immunities ?? []).map((im) => {
          return <p key={im}>Damage Immunities: {im}</p>;
        })}
        <p>Passive Perception: {show(monster.senses?.passive_perception)}</p>
        {render("Blindsight", monster.senses?.blindsight)}
        {render("Darkvision", monster.senses?.darkvision)}
        {(monster.special_abilities?.length ?? 0) > 0 && (
          <>
            <h2>Traits</h2>
            <div className="traits">
              {monster.special_abilities.map((trait) => (
                <p key={trait.name}>
                  <strong>{trait.name}</strong>. {trait.desc}
                </p>
              ))}
            </div>
          </>
        )}

        <h2>Actions</h2>
        <div className="actions">
          {(monster.actions ?? []).map((action) => {
            return (
              <p key={action.name}>
                <strong>{action.name}</strong>. {action.desc}
              </p>
            );
          })}
        </div>
        {(monster.reactions?.length ?? 0) > 0 && (
          <>
            <h2>Reactions</h2>
            <div className="traits">
              {monster.reactions.map((reaction) => (
                <p key={reaction.name}>
                  <strong>{reaction.name}</strong>. {reaction.desc}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
