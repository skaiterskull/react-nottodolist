import React from "react";
import { Button } from "react-bootstrap";
import { logOut } from "../../components/user-form/userAction";
import { useDispatch } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();
  const userName = window.localStorage.getItem("userName");

  const handleOnLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className="bg-primary d-flex justify-content-end p-3 text-light">
      <h3 className="welcomeText">Welcome {userName}</h3>
      <Button variant="warning" onClick={handleOnLogout}>
        Logout
      </Button>
    </div>
  );
};
