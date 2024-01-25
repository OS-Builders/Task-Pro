import Column from "../components/Column";
import "../scss/columnContainer.scss";

const ColumnContainer = () => {
  const columns = [];
  const columnNames = ["Backlog", "In Progress", "In Review", "Completed"];
  for (let i = 0; i < 4; i++) {
    columns.push(
      <Column key={i} name={columnNames[i]} create={i === 0 ? true : false} />
    );
  }
  return <div className="column-container">{columns}</div>;
};

export default ColumnContainer;
