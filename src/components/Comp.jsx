// import classes from "./gallery.module.css"
import React, { useState } from "react";

function Comp() {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);
  const [newList, setNewList] = useState(true);

  const addList = () => {
    let ListData = { index: Date.now(), name: userInput };
    setUserInput("");
    setList([...list, ListData]);
    setNewList(true);
  };
  return (
    <div>
      <div>
        <ul>
          {list.map((item) => (
            <li key={item.index}>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {!newList ? (
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
        ) : (
          <div>
            <button
              onClick={() => {
                setNewList(false);
              }}
            >
              Добавить новый Список
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comp;
