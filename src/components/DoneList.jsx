export default function DoneList({ doneList }) {
  return (
    <div>
      {!doneList.length ? (
        <div>
          <h3
            style={{
              margin: 0,
              textAlign: "center"
            }}
          >
            Выполненные задачи
          </h3>
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
        <div>
          <h3
            style={{
              textAlign: "center",
              margin: 0
            }}
          >
            Выполненные задачи
          </h3>
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
