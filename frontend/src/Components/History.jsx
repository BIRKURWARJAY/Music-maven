export default function History() {
  const { history } = useContext(HistoryContext);
  return (
    <div>
      <h1>History</h1>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
