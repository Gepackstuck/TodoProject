import classes from "./Comp.module.css";
import React, { useState } from "react";

function Comp() {
  const [userInput, setUserInput] = useState("");
  const [todoUserInput, settodoUserInput] = useState("");
  const [list, setList] = useState([]);
  const [items, setItems] = useState([]);
  const [currList, setCurrList] = useState(null);

  const addList = () => {
    let ListData = {
      index: Date.now(),
      name: userInput,
      tasks: []
    };
    setUserInput("");
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
    let NewItemData = {
      id: Date.now(),
      name: todoUserInput
    }
    settodoUserInput("");
    setItems([...items, NewItemData])
    setList([...list.find((elem) => elem.index === currList).tasks.push(NewItemData)])
  }

  return (
    <div className={classes.body}>
      <div className={classes.class}>
        <div>
          <ul>
            {list.map((item) => (
              <li key={item.index} className={classes.list}>
                <span onClick={() => selectedList(item.index)}>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Добавить новый список"
            value={userInput}
            onKeyPress={(e) => e.key === "Enter" && addList()}
          ></input>
          <button onClick={() => addList()}>Сохранить</button>
        </div>
      </div>

      <div className={classes.items}>
        {!list.length ? (
          <div></div>
        ) : (
          <div>
            <input
              type="text"
              onChange={(e) => settodoUserInput(e.target.value)}
              placeholder="Добавить новый пункт"
              value={todoUserInput}
              onKeyPress={(e) => e.key === "Enter" && addItem()}
            />
            <button onClick={() => addItem()}>Сохранить</button>
            <div>
            {/* <ul>
            {items.tasks.map((item) => (
              (item.index === currList) && (
                <li className={classes.list} key={Date.now()}>
                <span>{item.name}</span>
              </li>
              )
              ))}
          </ul> */}


          {/* <ul>
          {items.map((item) => 
            (item.index === currList) && (
               <li key={Date.now()}>
                <span>{item.tasks.name}</span>
               </li>
            ) 
          )}
          </ul> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comp;
