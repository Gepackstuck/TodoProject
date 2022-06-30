import classes from "./Todo.module.css";
export default function TasksInput({
  setUserInput,
  userInput,
  addItem,
  toggle,
  IoMdDoneAll,
  AiOutlineEdit,
  delAll
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <h3
          style={{
            margin: 0,
            paddingRight: 70
          }}
        >
          Текущие задачи
        </h3>
        <button onClick={() => delAll()} className={classes.delall}>
          Удалить все
        </button>
      </div>
      <hr />
      <div className={classes.inputField}>
        <input
          placeholder="Ввод"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          onKeyPress={(e) => e.key === "Enter" && addItem()}
        ></input>
        {toggle ? (
          <button onClick={addItem}>
            <IoMdDoneAll />
          </button>
        ) : (
          <button onClick={addItem}>
            <AiOutlineEdit />
          </button>
        )}
      </div>
    </div>
  );
}
