import { useState } from "react";

export function Form({ onAddMonster }) {
  const [nameMonster, setNameMonster] = useState("");
  const [initMonster, setInitMonster] = useState("");
  const [hpMonster, setHpMonster] = useState("");

  const [namePlayer, setNamePlayer] = useState("");
  const [initPlayer, setInitPlayer] = useState("");

  function handleSubmitMonster(e) {
    e.preventDefault();

    if (!nameMonster.trim() || !initMonster.trim() || !hpMonster.trim())
      return alert("Every input must be filled!");

    if (!Number.isFinite(Number(initMonster)))
      return alert("Initative must be a number!");

    if (!Number.isFinite(Number(hpMonster)))
      return alert("Hitpoints must be a number!");

    const id = crypto.randomUUID();
    const newMonster = {
      name: nameMonster,
      init: Number(initMonster),
      hp: Number(hpMonster),
      isPlayer: false,
      id: id,
    };

    onAddMonster(newMonster);
    setNameMonster("");
    setInitMonster("");
    setHpMonster("");
  }

  function handleSubmitPlayer(e) {
    e.preventDefault();

    if (!namePlayer.trim() || !initPlayer.trim())
      return alert("Every input must be filled!");

    if (!Number.isFinite(Number(initMonster)))
      return alert("Initative must be a number!");

    const id = crypto.randomUUID();
    const newPlayer = {
      name: namePlayer,
      init: Number(initPlayer),
      hp: 1,
      isPlayer: true,
      id: id,
    };

    onAddMonster(newPlayer);
    setNamePlayer("");
    setInitPlayer("");
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmitMonster} className="form-monster">
        <input
          type="text"
          placeholder="monster name"
          value={nameMonster}
          onChange={(e) => setNameMonster(e.target.value)}
          className="input-name"
        />
        <input
          type="text"
          placeholder="monster initiative"
          value={initMonster}
          onChange={(e) => setInitMonster(e.target.value)}
          className="input-init"
        />
        <input
          type="text"
          placeholder="monster hitpoints"
          value={hpMonster}
          onChange={(e) => setHpMonster(e.target.value)}
          className="input-hp"
        />
        <button>Add</button>
      </form>
      <form onSubmit={handleSubmitPlayer} className="form-player">
        <input
          type="text"
          placeholder="player name"
          value={namePlayer}
          onChange={(e) => setNamePlayer(e.target.value)}
          className="input-name"
        />
        <input
          type="text"
          placeholder="player initiative"
          value={initPlayer}
          onChange={(e) => setInitPlayer(e.target.value)}
          className="input-init"
        />

        <button>Add</button>
      </form>
    </div>
  );
}
