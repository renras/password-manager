import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:8000/secrets/");
        console.log(response.data);
      } catch (error) {
        console.error();
      }
    })();
  }, []);

  return (
    <div className="mt-5">
      <form className="mx-auto d-flex flex-column shadow-sm mw-sm p-5">
        <h1>Create a Secret</h1>
        <label htmlFor="key" className="form-label mt-3">
          Key
        </label>
        <input id="key" type="text" className="form-control form-control-lg" />
        <label htmlFor="value" className="form-label mt-3">
          Value
        </label>
        <input
          id="value"
          type="text"
          className="form-control form-control-lg"
        />
        <button className="btn btn-primary mt-5 btn-lg">Submit</button>
      </form>
    </div>
  );
}

export default App;
