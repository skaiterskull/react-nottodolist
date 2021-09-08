import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import "./App.css";
import { UserForm } from "./components/user-form/UserForm";
import { MainContent } from "./components/main-content/MainContent";

function App() {
  const { isLoggined } = useSelector((state) => state.user);

  return <Container>{isLoggined ? <MainContent /> : <UserForm />}</Container>;
}
export default App;
