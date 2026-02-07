import { useState } from "react";

export function Form({ onAddMonster }) {
  const [name, setName] = useState("");
  const [init, setInit] = useState("");
  const [hp, setHp] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !init.trim() || !hp.trim())
      return alert("Every input must be filled!");

    if (!Number.isFinite(Number(init)))
      return alert("Initative must be a number!");

    if (!Number.isFinite(Number(hp)))
      return alert("Hitpoints must be a number!");

    const id = crypto.randomUUID();
    const newMonster = {
      name: name,
      init: Number(init),
      hp: Number(hp),
      id: id,
    };

    onAddMonster(newMonster);
    setName("");
    setInit("");
    setHp("");
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="initiative"
          value={init}
          onChange={(e) => setInit(e.target.value)}
        />
        <input
          type="text"
          placeholder="hitpoints"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
