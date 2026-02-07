import { useState } from "react";
import { Form } from "./Form";
import { Logo } from "./Logo";
import { Tracker } from "./Tracker";

export const initialMonsters = [
  {
    name: "Bandit",
    init: "15",
    hp: "35",
    id: 1,
  },
  {
    name: "Pirate",
    init: "12",
    hp: "76",
    id: 2,
  },
  {
    name: "Dragon",
    init: "21",
    hp: "166",
    id: 3,
  },
];

export default function App() {
  const [monsters, setMonsters] = useState(initialMonsters);

  function handleAddMonster(monster) {
    setMonsters(() => [...monsters, monster]);
  }

  function handleDeleteMonster(id) {
    setMonsters((monsters) => monsters.filter((monster) => monster.id !== id));
  }

  return (
    <div>
      <Logo />
      <Form onAddMonster={handleAddMonster} />
      <Tracker monsters={monsters} onDeleteMonster={handleDeleteMonster} />
    </div>
  );
}
