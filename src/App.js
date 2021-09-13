import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import "./App.css";
import { UserForm } from "./components/user-form/UserForm";
import { MainContent } from "./components/main-content/MainContent";
import { Header } from "./components/header/Header";
import { useDispatch } from "react-redux";
import { loginUserSuccess } from "./components/user-form/userSlice";

function App() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoggedIn && window.localStorage.getItem("userName")) {
      dispatch(loginUserSuccess());
    }
  }, []);

  return (
    <div className="wrapper text-center">
      {isLoggedIn ? <Header></Header> : ""}
      <Container>{isLoggedIn ? <MainContent /> : <UserForm />}</Container>
    </div>
  );
}
export default App;
