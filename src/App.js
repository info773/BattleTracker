import { Form } from "./Form";
import { Logo } from "./Logo";
import { Tracker } from "./Tracker";
import { useLocalStorageState } from "./useLocalStorageState";

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
    name: "Player01",
    init: "4",
    hp: "1",
    isPlayer: true,
    id: 3,
    notes: "note-water elemental",
    statuses: [],
  },
  {
    name: "adult-bronze-dragon",
    init: "21",
    hp: "166",
    isPlayer: false,
    id: 4,
    notes: "note-dragon",
    statuses: [],
  },
];

export default function App() {
  // const [monsters, setMonsters] = useState(initialMonsters);
  const [monsters, setMonsters] = useLocalStorageState(
    initialMonsters,
    "monsters",
  );

  function handleExport() {
    const data = JSON.stringify(monsters, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "monsters.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!Array.isArray(parsed)) {
          alert("Invalid JSON: expected an array");
          return;
        }
        setMonsters(parsed);
      } catch (err) {
        alert("Invalid JSON file");
      } finally {
        e.target.value = "";
      }
    };
    reader.readAsText(file);
  }

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

  function handleClearStorage(type) {
    localStorage.removeItem("monsters");
    setMonsters(type); // or [] if you want empty
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddMonster={handleAddMonster} />
      <Tracker
        monsters={monsters}
        onDeleteMonster={handleDeleteMonster}
        onChangeMonster={handleChangeMonster}
        onCalcHp={handleCalcHp}
      />
      <div className="io-actions io-actions--fixed">
        <button className="action-btn" onClick={handleExport}>
          Export
        </button>
        <label className="file-input action-btn">
          <span>Import JSON</span>
          <input
            type="file"
            accept="application/json"
            onChange={handleImport}
          />
        </label>
        <div className="io-actions__right">
          <button className="action-btn" onClick={() => handleClearStorage([])}>
            clear
          </button>
          <button
            className="action-btn"
            onClick={() => handleClearStorage(initialMonsters)}
          >
            default
          </button>
        </div>
      </div>
    </div>
  );
}
