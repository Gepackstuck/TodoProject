import classes from "./Todo.module.css";
export default function TasksItems({
  list,
  doneItem,
  IoMdDoneAll,
  editItem,
  AiOutlineEdit,
  delItem,
  FiDelete,
  currList
}) {
  return (
    <div>
      {list.length === 1 ? (
        <ul className="items-list">
          {list[0].tasks.map((item) => (
            <li className={classes.li} key={item.id}>
              <button
                onClick={() => doneItem(item.id)}
                className={classes.donebtn}
              >
                <IoMdDoneAll />
              </button>
              <span>{item.name}</span>
              <button
                onClick={() => editItem(item.id)}
                className={classes.editbtn}
              >
                <AiOutlineEdit />
              </button>
              <button
                onDoubleClick={() => delItem(item.id)}
                className={classes.delbtn}
                title="DoubleTap to delete"
              >
                <FiDelete />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <ul className="items-list">
            {list
              .find((elem) => elem.index === currList)
              .tasks.map((item) => (
                <li className={classes.li} key={item.id}>
                  <button
                    onClick={() => doneItem(item.id)}
                    className={classes.donebtn}
                  >
                    <IoMdDoneAll />
                  </button>
                  <span>{item.name}</span>
                  <button
                    onClick={() => editItem(item.id)}
                    className={classes.editbtn}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    onDoubleClick={() => delItem(item.id)}
                    className={classes.delbtn}
                    title="DoubleTap to delete"
                  >
                    <FiDelete />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
