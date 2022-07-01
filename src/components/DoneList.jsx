export default function DoneList({ doneList }) {
  return (
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
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
