export function Checkbox({ status, onAddStatus, onDeleteStatus, statuses }) {
  return (
    <div>
      <input
        type="checkbox"
        onChange={(e) => {
          if (e.target.checked) onAddStatus(status);
          if (!e.target.checked) onDeleteStatus(status);
        }}
        checked={statuses.includes(status)}
      />
      <label>{status}</label>
    </div>
  );
}
