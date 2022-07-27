import "../styles/request.scss";
import { useState } from "react";

export default function Request(props) {
  const { addRequest, deleteRequest, moveRequest, request } = props;
  const [urgencyLevel, setUrgencyLevel] = useState(request.urgency);
  const [collapsed, setCollapsed] = useState(request.isCollapsed);
  const [formAction, setFormAction] = useState("");

  function setUrgency(event) {
    setUrgencyLevel(event.target.attributes.urgency.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formAction === "save") {
      if (collapsed) {
        setCollapsed(false);
      } else {
        let newRequest = {
          id: request.id,
          title: event.target.elements.title.value,
          description: event.target.elements.description.value,
          urgency: urgencyLevel,
          status: request.status,
          isCollapsed: true,
        };

        addRequest(newRequest);
        setCollapsed(true);
      }
    }

    if (formAction === "delete") {
      deleteRequest(request.id);
    }
  }

  function handleMoveLeft() {
    let newStatus = "";

    if (request.status === "In Progress") {
      newStatus = "Backlog";
    } else if (request.status === "Done") {
      newStatus = "In Progress";
    }

    if (newStatus !== "") {
      moveRequest(request.id, newStatus);
    }
  }

  function handleMoveRight() {
    let newStatus = "";

    if (request.status === "Backlog") {
      newStatus = "In Progress";
    } else if (request.status === "In Progress") {
      newStatus = "Done";
    }

    if (newStatus !== "") {
      moveRequest(request.id, newStatus);
    }
  }

  return (
    <div className={`request ${collapsed ? "collapsedRequest" : ""}`}>
      <button onClick={handleMoveLeft} className="button moveRequest">
        &#171;
      </button>
      <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
        <input
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          disabled={collapsed}
          defaultValue={request.title}
        />
        <textarea
          rows="2"
          className="description input"
          name="description"
          placeholder="Enter Description"
          defaultValue={request.description}
        />
        <div className="urgencyLabels">
          <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
            <input
              urgency="low"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            BOSS
          </label>
          <label
            className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}
          >
            <input
              urgency="medium"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            Manager
          </label>
          <label
            className={`high ${urgencyLevel === "high" ? "selected" : ""}`}
          >
            <input
              urgency="high"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            RH
          </label>
        </div>
        <button
          onClick={() => {
            setFormAction("save");
          }}
          className="button"
        >
          {collapsed ? "Edit" : "Save"}
        </button>
        {collapsed && (
          <button
            onClick={() => {
              setFormAction("delete");
            }}
            className="button delete"
          >
            X
          </button>
        )}
      </form>
      <button onClick={handleMoveRight} className="button moveRequest">
        &#187;
      </button>
    </div>
  );
}
