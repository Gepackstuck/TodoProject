import React from "react";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";
import { HiOutlineSaveAs } from "react-icons/hi";
import classes from "./Comp.module.css";

function Todo() {
  const [list, setList] = useState([]);
  const [listUserInput, setListUserInput] = useState("");
  const [currList, setCurrList] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [toggle, setToggle] = useState(true);
  const [IsEditItem, setIsEditItem] = useState(null);
  const [doneList, setDoneList] = useState([]);

  const addList = () => {
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

    if (userInput && !toggle) {
      //   const newList = [...list];
      //   const currentListId = list.findIndex((elem) => elem.index === currList);
      //   newList[currentListId].tasks.find((elem) => {
      //     if (elem.id === IsEditItem) {
      //       return { ...elem, name: userInput };
      //     }
      //     setList(newList);
      //   });

      //   // setTodoList(
      //   //   todoList.map((elem) => {
      //   //     if (elem.index === IsEditItem) {
      //   //       return { ...elem, name: userInput };
      //   //     }
      //   //     return elem;
      //   //   })
      //   // );

      //   setToggle(true);
      //   setUserInput("");
      //   setIsEditItem(null);
      // }
      // else
      // {
      const NewItemData = {
        id: Date.now(),
        name: userInput
      };
      setUserInput("");
      setList([
        list.find((elem) => elem.index === currList).tasks.push(NewItemData)
      ]);
      setList([...list]);
      // }
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
    // INPUT items ----------------------------------------
    <div className={classes.body}>
      <div className={classes.class}>
        <div>
          <ul>
            {list.map((item) => (
              <li
                key={item.index}
                className={classes.list}
                onClick={() => selectedList(item.index)}
              >
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setListUserInput(e.target.value)}
            placeholder="Добавить новый список"
            value={listUserInput}
            onKeyPress={(e) => e.key === "Enter" && addList()}
          ></input>
          <button onClick={() => addList()}>Сохранить</button>
        </div>
      </div>

      <div className={classes.inputField}>
        <input
          placeholder="Ввод"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          onKeyPress={(e) => e.key === "Enter" && addItem()}
        ></input>
        {toggle ? (
          <button onClick={addItem} intent="primary">
            <IoMdDoneAll />
          </button>
        ) : (
          <button onClick={addItem} intent="primary">
            <AiOutlineEdit />
          </button>
        )}
      </div>

      {/* // TODOS Items ---------------------------------------- */}

      {!list.find((elem) => elem.index === currList).tasks.length ? (
        <h1
          style={{
            textAlign: "center"
          }}
        >
          Пусто!
        </h1>
      ) : (
        <div>
          <h1
            style={{
              textAlign: "center"
            }}
          >
            Текущие задачи
          </h1>
          <ul className="items-list">
            {list
              .find((elem) => elem.index === currList)
              .tasks.map((item) => (
                <li className={classes.li} key={item.id}>
                  <button
                    onClick={() => doneItem(item.id)}
                    className={classes.donebtn}
                  >
                    <HiOutlineSaveAs />
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

      {/* // DONE TODOS items ---------------------------------------- */}
      {!doneList.length ? (
        <div />
      ) : (
        <div>
          <ul>
            <h1
              style={{
                textAlign: "center"
              }}
            >
              Выполненные задачи
            </h1>
            {doneList.map((item) => (
              <li key={item.id}>
                <span
                  style={{
                    margin: "0 30px"
                  }}
                >
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Todo;
