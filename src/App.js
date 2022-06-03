import { Context } from "./context/Context";
import Home from "./view/Home";
import './App.css';

function App() {

  return (
    <>
      <Context>
        <Home />
      </Context>
    </>
  );
}

export default App;
