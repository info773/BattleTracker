import { Monster } from "./Monster";

export function Tracker({ monsters, onDeleteMonster }) {
  return (
    <div>
      {monsters.map((monster) => (
        <Monster
          monster={monster}
          onDeleteMonster={onDeleteMonster}
          key={monster.id}
        />
      ))}
    </div>
  );
}
