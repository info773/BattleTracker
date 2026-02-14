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
  const [statusArr, setStatusArr] = useState([]);

  const isDead = monster.hp <= 0;

  const transformedName = monster.name.toLowerCase().split(" ").join("-");

  function handleAddStatus(status) {
    setStatusArr((statusArr) => [...statusArr, status]);
  }

  function handleDeleteStatus(status) {
    setStatusArr((statusArr) =>
      statusArr.filter((element) => element !== status),
    );
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
          <button onClick={() => setNotesActive((notesActive) => !notesActive)}>
            {notesActive ? "⬆" : monster.notes.length === 0 ? "..." : "!!!"}
          </button>
        </div>
        {!statusArr.length ? null : (
          <div className="status-row">
            <span className="status-list">{statusArr.join(" - ")}</span>
            <button
              className="btn-reset-status"
              onClick={() => setStatusArr([])}
            >
              clear
            </button>
          </div>
        )}
      </div>
      {notesActive ? (
        <>
          <MonsterAPI monsterName={transformedName} />
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
                  statusArr={statusArr}
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
