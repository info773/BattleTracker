import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { MonsterAPI } from "./MonsterAPI";

const statusEffects = [
  "Blinded",
  "Charmed",
  "Deafened",
  "Exhaustion",
  "Frightened",
  "Grappled",
  "Incapacitated",
  "Invisible",
  "Paralyzed",
  "Petrified",
  "Poisoned",
  "Prone",
  "Restrained",
  "Stunned",
  "Unconscious",
];

export function Monster({
  monster,
  onDeleteMonster,
  onChangeMonster,
  onCalcHp,
}) {
  const [calcVal, setCalcVal] = useState("0");
  const [notesActive, setNotesActive] = useState(false);

  const isDead = monster.hp <= 0;

  const transformedName = monster.name.toLowerCase().split(" ").join("-");

  function handleAddStatus(status) {
    const next = monster.statuses.includes(status)
      ? monster.statuses
      : [...monster.statuses, status];

    onChangeMonster(monster.id, "statuses", next);
  }

  function handleDeleteStatus(status) {
    const next = monster.statuses.filter((s) => s !== status);
    onChangeMonster(monster.id, "statuses", next);
  }

  return (
    <div>
      <div className="first-row">
        <div className="monster">
          <button
            className="btn-delete"
            onClick={() => onDeleteMonster(monster.id)}
          >
            ❌
          </button>
          <div className={!monster.isPlayer ? "monster-input" : "player-input"}>
            <input
              type="text"
              value={monster.name}
              onChange={(e) =>
                onChangeMonster(monster.id, "name", e.target.value)
              }
              style={isDead ? { backgroundColor: "grey" } : null}
            />
            <input
              type="text"
              value={monster.init}
              onChange={(e) =>
                onChangeMonster(monster.id, "init", e.target.value)
              }
              style={isDead ? { backgroundColor: "grey" } : null}
            />
            {!monster.isPlayer ? (
              <input
                type="text"
                value={monster.hp}
                onChange={(e) =>
                  onChangeMonster(monster.id, "hp", e.target.value)
                }
                style={isDead ? { backgroundColor: "grey" } : null}
              />
            ) : null}
          </div>

          {/* Calc */}

          {!monster.isPlayer ? (
            <div className="monster-calc">
              <button
                onClick={() => {
                  onCalcHp(monster.id, -calcVal);
                  setCalcVal("0");
                }}
              >
                -
              </button>
              <input
                type="text"
                value={calcVal}
                onChange={(e) => setCalcVal(e.target.value)}
                className="input-calc"
              />
              <button
                onClick={() => {
                  onCalcHp(monster.id, calcVal);
                  setCalcVal("0");
                }}
              >
                +
              </button>
            </div>
          ) : null}

          {/* Collapse Button */}

          <button onClick={() => setNotesActive((notesActive) => !notesActive)}>
            {notesActive ? "⬆" : monster.notes.length === 0 ? "..." : "!!!"}
          </button>
        </div>

        {/* Status */}

        {!monster.statuses.length ? null : (
          <div className="status-row">
            <span className="status-list">{monster.statuses.join(" - ")}</span>
            <button
              className="btn-reset-status"
              onClick={() => onChangeMonster(monster.id, "statuses", [])}
            >
              clear
            </button>
          </div>
        )}
      </div>

      {/* Notes */}

      {notesActive ? (
        <>
          {!monster.isPlayer && <MonsterAPI monsterName={transformedName} />}
          <div className="more-info">
            <textarea
              className="notes"
              name=""
              id=""
              value={monster.notes}
              onChange={(e) =>
                onChangeMonster(monster.id, "notes", e.target.value)
              }
            />
            <div className="checkboxes">
              {statusEffects.map((stat) => (
                <Checkbox
                  status={stat}
                  onAddStatus={handleAddStatus}
                  onDeleteStatus={handleDeleteStatus}
                  statuses={monster.statuses}
                  key={stat}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
