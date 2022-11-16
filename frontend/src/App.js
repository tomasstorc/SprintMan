import "./App.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import { useDispatch } from "react-redux";
import { parseToken } from "./redux/apiFetch/LoginSlice";
function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(parseToken());
  });
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
