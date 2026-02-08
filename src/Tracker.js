import { useState } from "react";
import { Monster } from "./Monster";

export function Tracker({
  monsters,
  onDeleteMonster,
  onChangeMonster,
  onCalcHp,
}) {
  const [sortFilter, setSortFiler] = useState("desc");

  let sortedMonsters = monsters.sort((a, b) => b.init - a.init);

  if (sortFilter === "asc") {
    sortedMonsters = monsters.sort((a, b) => a.init - b.init);
  }

  if (sortFilter === "name-az") {
    sortedMonsters = monsters.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortFilter === "name-za") {
    sortedMonsters = monsters.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div
      className="tracker-main"
      onChange={(e) => setSortFiler(e.target.value)}
    >
      <select value={sortFilter} className="sort-filter">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
        <option value="name-az">By name (A-Z)</option>
        <option value="name-za">By name (Z-A)</option>
      </select>
      <div className="tracker-monster">
        {sortedMonsters.map((monster) => (
          <Monster
            monster={monster}
            onDeleteMonster={onDeleteMonster}
            key={monster.id}
            onChangeMonster={onChangeMonster}
            onCalcHp={onCalcHp}
          />
        ))}
      </div>
    </div>
  );
}
