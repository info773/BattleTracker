import { useState } from "react";

export function Monster({
  monster,
  onDeleteMonster,
  onChangeMonster,
  onCalcHp,
}) {
  const [calcVal, setCalcVal] = useState("0");
  const [selected, setSelected] = useState("monster");

  const isDead = monster.hp <= 0;
  return (
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
          onChange={(e) => onChangeMonster(monster.id, "name", e.target.value)}
          style={isDead ? { backgroundColor: "grey" } : null}
        />
        <input
          type="text"
          value={monster.init}
          onChange={(e) => onChangeMonster(monster.id, "init", e.target.value)}
          style={isDead ? { backgroundColor: "grey" } : null}
        />
        {!monster.isPlayer ? (
          <input
            type="text"
            value={monster.hp}
            onChange={(e) => onChangeMonster(monster.id, "hp", e.target.value)}
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
    </div>
  );
}
