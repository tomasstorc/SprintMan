import "./App.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  checkRefresh,
  parseToken,
  refreshToken,
} from "./redux/apiFetch/LoginSlice";
function App() {
  const { refresh } = useSelector((state) => state.login);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(parseToken());
    dispatch(checkRefresh());
    refresh && dispatch(refreshToken());
  }, [dispatch, refresh]);
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
