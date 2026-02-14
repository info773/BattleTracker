import { useState } from "react";
import { Form } from "./Form";
import { Logo } from "./Logo";
import { Tracker } from "./Tracker";

export const initialMonsters = [
  {
    name: "bandit",
    init: "15",
    hp: "35",
    isPlayer: false,
    id: 1,
    notes: "note-bandit",
    statuses: [],
  },
  {
    name: "water-elemental",
    init: "12",
    hp: "76",
    isPlayer: false,
    id: 2,
    notes: "note-water elemental",
    statuses: [],
  },
  {
    name: "adult-bronze-dragon",
    init: "21",
    hp: "166",
    isPlayer: false,
    id: 3,
    notes: "note-dragon",
    statuses: [],
  },
];

export default function App() {
  const [monsters, setMonsters] = useState(initialMonsters);

  function handleChangeMonster(id, prop, content) {
    // setItems(items.map(a => (a.id === 2 ? {...a, data: "c"} : a)))
    setMonsters((monsters) =>
      monsters.map((monster) =>
        monster.id === id ? { ...monster, [prop]: content } : monster,
      ),
    );
  }

  function handleAddMonster(monster) {
    setMonsters(() => [...monsters, monster]);
  }

  function handleDeleteMonster(id) {
    setMonsters((monsters) => monsters.filter((monster) => monster.id !== id));
  }

  function handleCalcHp(id, val) {
    setMonsters((monsters) =>
      monsters.map((monster) =>
        monster.id === id
          ? { ...monster, hp: Number(monster.hp) + Number(val) }
          : monster,
      ),
    );
  }

  return (
    <div>
      <Logo />
      <Form onAddMonster={handleAddMonster} />
      <Tracker
        monsters={monsters}
        onDeleteMonster={handleDeleteMonster}
        onChangeMonster={handleChangeMonster}
        onCalcHp={handleCalcHp}
      />
    </div>
  );
}
