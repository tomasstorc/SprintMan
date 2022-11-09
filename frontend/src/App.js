import "./App.css";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
function App() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
