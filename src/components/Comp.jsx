import React from "react";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";
import classes from "./Comp.module.css";

function Todo() {
  const [list, setList] = useState([{ index: 1, name: "Главное", tasks: [] }]);
  const [listUserInput, setListUserInput] = useState("");
  const [currList, setCurrList] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [toggle, setToggle] = useState(true);
  const [IsEditItem, setIsEditItem] = useState(null);
  const [doneList, setDoneList] = useState([]);

  const addList = () => {
    if (!listUserInput) return;
    const ListData = {
      index: Date.now(),
      name: listUserInput,
      tasks: []
    };
    setListUserInput("");
    setList([...list, ListData]);
    setCurrList(ListData.index);
  };

  const selectedList = (id) => {
    list.find((elem) => {
      return elem.index === id;
    });
    setCurrList(id);
  };

  const addItem = () => {
    if (!userInput) return;
    if (currList === null) {
      const NewItemData = {
        id: Date.now(),
        name: userInput
      };
      setUserInput("");
      setList([list[0].tasks.push(NewItemData)]);
      setList([...list]);
    } else if (userInput && !toggle) {
      const newList = [...list];
      const currentListId = newList.findIndex(
        (elem) => elem.index === currList
      );
      newList[currentListId].tasks.map((el) => {
        if (el.id === IsEditItem) {
          el.name = userInput;
        }
        return newList;
      });
      setToggle(true);
      setUserInput("");
      setIsEditItem(null);
    } else {
      const NewItemData = {
        id: Date.now(),
        name: userInput
      };
      setUserInput("");
      setList([
        list.find((elem) => elem.index === currList).tasks.push(NewItemData)
      ]);
      setList([...list]);
    }
  };

  const editItem = (id) => {
    const newList = [...list];
    const currentListId = list.findIndex((elem) => elem.index === currList);
    const newEditItem = newList[currentListId].tasks.find(
      (elem) => elem.id === id
    );
    setToggle(false);
    setUserInput(newEditItem.name);
    setIsEditItem(id);
  };

  const doneItem = (id) => {
    const newList = [...list];
    const currentListId = newList.findIndex((elem) => elem.index === currList);
    if (currentListId > -1) {
      const updatedTasks = newList[currentListId].tasks.filter(
        (item) => item.id !== id
      );
      const doneElement = newList[currentListId].tasks.find(
        (elem) => elem.id === id
      );
      newList[currentListId].tasks = updatedTasks;
      setDoneList([...doneList, doneElement]);
    }
    setList(newList);
  };

  const delItem = (id) => {
    const newList = [...list];
    const currentListId = newList.findIndex((elem) => elem.index === currList);
    if (currentListId > -1) {
      const updatedTasks = newList[currentListId].tasks.filter(
        (item) => item.id !== id
      );
      newList[currentListId].tasks = updatedTasks;
    }
    setList(newList);
  };

  const delAll = () => {
    let que = window.confirm("Точно удалить все?");
    if (que) {
      const newList = [...list];
      const currentListId = newList.findIndex(
        (elem) => elem.index === currList
      );
      newList[currentListId].tasks = [];
      setList(newList);
    }
  };

  return (
    <div className={classes.frame}>
      <div className={classes.class}>
        <div>
          <h2 style={{ margin: 0 }}>Списки</h2>
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
      </div>
      <div className={classes.body}>
        <h2
          style={{
            textAlign: "center",
            margin: 0
          }}
        >
          Текущие задачи
        </h2>
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

        {/* // TODOS Items ---------------------------------------- */}
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
              <button onClick={() => delAll()} className={classes.delall}>
                Удалить все
              </button>
            </div>
          )}
        </div>

        {/* // DONE TODOS items ---------------------------------------- */}
      </div>

      {!doneList.length ? (
        <div className={classes.doneElements}>
          <h2
            style={{
              margin: 0
            }}
          >
            Выполненные задачи
          </h2>
          <hr />
          <h3
            style={{
              textAlign: "center"
            }}
          >
            Пусто!
          </h3>
        </div>
      ) : (
        <div className={classes.doneElements}>
          <h2
            style={{
              margin: 0
            }}
          >
            Выполненные задачи
          </h2>
          <hr />
          <ul>
            {doneList.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Todo;
