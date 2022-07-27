import "../styles/status.scss";
import Request from "./Request";

export default function Status(props) {
  const { status, requests, addRequest, deleteRequest, addEmptyRequest, moveRequest } = props;

  let requestList, requestsForStatus;

  function handleAddEmpty() {
    addEmptyRequest(status);
  }

  if (requests) {
    requestsForStatus = requests.filter((request) => {
      return request.status === status;
    });
  }

  if (requestsForStatus) {
    requestList = requestsForStatus.map((request) => {
      return (
        <Request
          addRequest={(request) => addRequest(request)}
          deleteRequest={(id) => deleteRequest(id)}
          moveRequest={(id, status) => moveRequest(id, status)}
          key={request.id}
          request={request}
        />
      );
    });
  }

  return (
    <div className="status">
      <h3>{status}</h3>
      {requestList}
      <button onClick={handleAddEmpty} className="button addRequest">
        +
      </button>
    </div>
  );
}
