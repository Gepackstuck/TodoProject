import React from "react";
import { useState } from "react";

import { AiOutlineEdit } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";

import DoneList from "./DoneList";
import Lists from "./Lists";
import ListsInput from "./ListsInput";
import TasksInput from "./TasksInput";
import TasksItems from "./TasksItems";

import classes from "./Todo.module.css";

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
      <div className={classes.lists}>
        <Lists list={list} currList={currList} selectedList={selectedList} />
        <ListsInput
          setListUserInput={setListUserInput}
          listUserInput={listUserInput}
          addList={addList}
        />
      </div>
      <div className={classes.tasks}>
        <TasksInput
          setUserInput={setUserInput}
          userInput={userInput}
          addItem={addItem}
          toggle={toggle}
          IoMdDoneAll={IoMdDoneAll}
          AiOutlineEdit={AiOutlineEdit}
          delAll={delAll}
        />
        <TasksItems
          list={list}
          doneItem={doneItem}
          IoMdDoneAll={IoMdDoneAll}
          editItem={editItem}
          AiOutlineEdit={AiOutlineEdit}
          delItem={delItem}
          FiDelete={FiDelete}
          currList={currList}
        />
      </div>
      <div className={classes.doneElements}>
        <DoneList doneList={doneList} />
      </div>
    </div>
  );
}

export default Todo;
