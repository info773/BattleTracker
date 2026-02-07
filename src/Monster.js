export function Monster({ monster, onDeleteMonster }) {
  return (
    <div className="monster">
      <p>
        Monster: {monster.name} / Init: {monster.init} / HP: {monster.hp}
      </p>
      <button onClick={() => onDeleteMonster(monster.id)}>❌</button>
    </div>
  );
}
