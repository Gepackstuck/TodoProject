import classes from "./Todo.module.css";
export default function TasksInput({
  setUserInput,
  userInput,
  addItem,
  toggle,
  IoMdDoneAll,
  AiOutlineEdit
}) {
  return (
    <div>
      <h3
        style={{
          textAlign: "center",
          margin: 0
        }}
      >
        Текущие задачи
      </h3>
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
