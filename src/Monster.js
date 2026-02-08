import { useState } from "react";

export function Monster({
  monster,
  onDeleteMonster,
  onChangeMonster,
  onCalcHp,
}) {
  const [calcVal, setCalcVal] = useState("");

  const isDead = monster.hp <= 0;
  return (
    <div className="monster">
      <button onClick={() => onDeleteMonster(monster.id)}>❌</button>
      <div className="monster-input">
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
        <input
          type="text"
          value={monster.hp}
          onChange={(e) => onChangeMonster(monster.id, "hp", e.target.value)}
          style={isDead ? { backgroundColor: "grey" } : null}
        />
      </div>
      <div className="monster-calc">
        <button
          onClick={() => {
            onCalcHp(monster.id, -calcVal);
            setCalcVal("");
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
            setCalcVal("");
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
