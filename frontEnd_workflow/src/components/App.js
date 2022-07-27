import { useState, useEffect } from "react";
import "../styles/App.scss";
import StatusLine from "./Status";

function App() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequestsFromLocalStorage();
  }, []);

  function addEmptyRequest(status) {
    const lastRequest = requests[requests.length - 1];

    let newRequestId = 1;

    if (lastRequest !== undefined) {
      newRequestId = lastRequest.id + 1;
    }

    setRequests((requests) => [
      ...requests,
      {
        id: newRequestId,
        title: "",
        description: "",
        urgency: "",
        status: status,
      },
    ]);
  }

  function addRequest(requestToAdd) {
    let filteredRequests = requests.filter((request) => {
      return request.id !== requestToAdd.id;
    });

    let newRequestList = [...filteredRequests, requestToAdd];

    setRequests(newRequestList);

    saveRequestsToLocalStorage(newRequestList);
  }

  function deleteRequest(requestId) {
    let filteredRequests = requests.filter((request) => {
      return request.id !== requestId;
    });

    setRequests(filteredRequests);

    saveRequestsToLocalStorage(filteredRequests);
  }

  function moveRequest(id, newStatus) {
    let request = requests.filter((request) => {
      return request.id === id;
    })[0];

    let filteredRequests = requests.filter((request) => {
      return request.id !== id;
    });

    request.status = newStatus;

    let newRequestList = [...filteredRequests, request];

    setRequests(newRequestList);

    saveRequestsToLocalStorage(newRequestList);
  }

  function saveRequestsToLocalStorage(requests) {
    localStorage.setItem("requests", JSON.stringify(requests));
  }

  function loadRequestsFromLocalStorage() {
    let loadedRequests = localStorage.getItem("requests");

    let requests = JSON.parse(loadedRequests);

    if (requests) {
      setRequests(requests);
    }
  }

  return (
    <div className="App">
      <h1>Axia Workflow Management</h1>
      <main>
        <section>
          <StatusLine
            requests={requests}
            addEmptyRequest={addEmptyRequest}
            addRequest={addRequest}
            deleteRequest={deleteRequest}
            moveRequest={moveRequest}
            status="Loading..."
          />
          <StatusLine
            requests={requests}
            addEmptyRequest={addEmptyRequest}
            addRequest={addRequest}
            deleteRequest={deleteRequest}
            moveRequest={moveRequest}
            status="In Progress"
          />
          <StatusLine
            requests={requests}
            addEmptyRequest={addEmptyRequest}
            addRequest={addRequest}
            deleteRequest={deleteRequest}
            moveRequest={moveRequest}
            status="Done"
          />
        </section>
      </main>
    </div>
  );
}

export default App;
