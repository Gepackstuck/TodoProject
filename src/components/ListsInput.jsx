import classes from "./Todo.module.css";

export default function ListsInput({
  setListUserInput,
  listUserInput,
  addList
}) {
  return (
    <div className={classes.listInput}>
      <input
        type="text"
        onChange={(e) => setListUserInput(e.target.value)}
        placeholder="Добавить новый список"
        value={listUserInput}
        onKeyPress={(e) => e.key === "Enter" && addList()}
      ></input>
      <button onClick={() => addList()}>Добавить</button>
    </div>
  );
}
