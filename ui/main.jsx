import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const App = () => {
  return (
    <div>
      <h1>Welcome to React with Docker!</h1>
      <p>
        This is a simple React application running inside a Docker container.
      </p>
      <button onClick={() => alert("You clicked the button!")}>
        Click Me!
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
