import classes from "./Todo.module.css";
export default function Lists({ list, currList, selectedList }) {
  return (
    <div>
      <h3 style={{ margin: 0, textAlign: "center" }}>Списки</h3>
      <hr />
      <ul>
        {list.map((item) => (
          <li
            className={
              item.index === currList ? classes.activeList : classes.list
            }
            key={item.index}
            onClick={() => selectedList(item.index)}
          >
            <span>{item.name}</span>
            <span>({item.tasks.length})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
