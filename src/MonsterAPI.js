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

  const profs = monster.proficiencies ?? [];

  const grouped = profs.reduce((acc, prof) => {
    const [group, label] = prof.proficiency.name.split(": ");
    (acc[group] ??= []).push({ label, value: prof.value });
    return acc;
  }, {});

  const formatGroup = (group, label) =>
    grouped[group]?.length
      ? `${label} ${grouped[group]
          .map((p) => `${p.label} +${p.value}`)
          .join(", ")}`
      : null;

  function renderLine(label, items, getText = (item) => item) {
    return items?.length ? (
      <p>
        {label}: {items.map(getText).join(", ")}
      </p>
    ) : null;
  }

  function getModifier(points) {
    const num = Math.floor((points - 10) / 2);
    return num >= 0 ? `+ ${num}` : `${num}`;
  }

  function show(value) {
    return value ?? "—";
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
      {/* NAME */}
      <h1>{monster.name}</h1>

      {/* Overview */}
      <div className="monster-overview">
        <p>CR: {monster.challenge_rating}</p>
        <p>
          {monster.size} {monster.type}{" "}
          {monster.subtype ? `(${monster.subtype})` : null}, {monster.alignment}
        </p>
      </div>

      {/* Details */}
      <div className="monster-details">
        {/* AC */}
        <h4>
          AC: {show(monster.armor_class?.[0]?.value)} (
          {show(
            monster.armor_class?.[0]?.armor?.[0]?.name ??
              monster.armor_class?.[0].type,
          )}
          )
        </h4>
        {/* HP */}
        <h4>
          HP: {monster.hit_points} ({monster.hit_points_roll})
        </h4>
        {/* Speed */}
        <h4>
          Speed: {monster.speed.walk ? `${monster.speed.walk}` : "0"}
          {monster.speed.fly ? `, fly ${monster.speed.fly}` : null}
          {monster.speed.swim ? `, swim ${monster.speed.swim}` : null}
        </h4>

        {/* Attributes */}

        <div className="attributes">
          {attributes.map((attribute) => (
            <span key={attribute[0]}>
              {attribute[1]} {monster[attribute[0]]} (
              {getModifier(monster[attribute[0]])})
            </span>
          ))}
        </div>

        {/* Proficiencies */}

        <div className="proficiencies">
          {["Saving Throw", "Skill"].map((group) => {
            const label =
              group === "Saving Throw" ? "Saving Throws: " : "Skills: ";
            const text = formatGroup(group, label);
            return text ? <p key={group}>{text}</p> : null;
          })}

          <p>Proficiency Bonus: +{monster.proficiency_bonus}</p>
          <br />
        </div>

        {/* Immunities & Resistances */}

        <div className="immunities-resistances">
          {renderLine("Damage Vulnerabilities", monster.damage_vulnerabilities)}
          {renderLine("Damage Resistances", monster.damage_resistances)}
          {renderLine("Damage Immunities", monster.damage_immunities)}
          {renderLine(
            "Condition Immunities",
            monster.condition_immunities,
            (im) => im.name,
          )}
          <br />
        </div>

        <div className="Senses">
          <p>
            Senses:{" "}
            {monster.senses.passive_perception
              ? `Passive Perception ${monster.senses.passive_perception}`
              : null}
            {monster.senses.blindsight
              ? `, Blindsight ${monster.senses.blindsight}`
              : null}
            {monster.senses.darkvision
              ? `, Darkvision ${monster.senses.darkvision}`
              : null}
            <br />
          </p>
        </div>
        <br />
        {monster.languages ? <p>Languages: {monster.languages}</p> : null}

        {/* Traits */}

        {(monster.special_abilities?.length ?? 0) > 0 && (
          <>
            <h2>Traits</h2>
            <div className="traits">
              {monster.special_abilities.map((trait) => (
                <>
                  <p key={trait.name}>
                    <strong>{trait.name}</strong>. {trait.desc}
                  </p>
                  <br />
                </>
              ))}
            </div>
          </>
        )}

        {/* Actions */}

        <h2>Actions</h2>
        <div className="actions">
          {(monster.actions ?? []).map((action) => {
            return (
              <>
                <p key={action.name}>
                  <strong>{action.name}</strong>. {action.desc}
                </p>
                <br />
              </>
            );
          })}
        </div>
        <div className="legendary-actions">
          {(monster.legendary_actions ?? []).map((action) => {
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
