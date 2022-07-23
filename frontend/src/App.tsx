import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" />
      <label htmlFor="secret">Secret</label>
      <input id="secret" type="text" />
      <button>Add</button>
    </div>
  );
}

export default App;
