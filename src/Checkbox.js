export function Checkbox({ status, onAddStatus, onDeleteStatus, statusArr }) {
  return (
    <div>
      <input
        type="checkbox"
        onChange={(e) => {
          if (e.target.checked) onAddStatus(status);
          if (!e.target.checked) onDeleteStatus(status);
        }}
        checked={statusArr.includes(status)}
      />
      <label>{status}</label>
    </div>
  );
}
