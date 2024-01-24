import Column from "../components/Column";
import "../scss/columnContainer.scss";

const ColumnContainer = () => {
  const columns = [];
  for (let i = 0; i < 4; i++) {
    columns.push(<Column key={i} />);
  }
  return <div className="column-container">{columns}</div>;
};

export default ColumnContainer;
