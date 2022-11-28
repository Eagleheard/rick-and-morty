import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Portal } from "components";
import { Button } from "../Button";
import { SignIn, SignUp } from "components/Authorization";
import { useAuth } from "hooks/useAuth";
import { authorization } from "api/authorization";
import { useToast } from "hooks";
import { ToastOptions } from "types/enumerators";
import { ToastComponent } from "components/Toast";

import "./styles.scss";

export const Header = () => {
  const [isSignInVisible, setIsSignInVisible] = useState<boolean>(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState<boolean>(false);
  const { user, setUser } = useAuth();
  const { openToast } = useToast();

  const handleSwitch = () => {
    if (isSignInVisible) {
      setIsSignInVisible(false);
      setIsSignUpVisible(true);
      return;
    }
    if (isSignUpVisible) {
      setIsSignInVisible(true);
      setIsSignUpVisible(false);
      return;
    }
  };
  const checkUser = async () => {
    try {
      if (sessionStorage.getItem("token")) {
        const { data } = await authorization();
        setUser(data);
      }
    } catch ({ message }) {
      if (message !== "Request failed with status code 401") {
        openToast(String(message), ToastOptions.error);
      }
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <header className="header">
      {!user ? (
        <Button
          text="Login"
          onClick={() => setIsSignInVisible(true)}
          style="button"
        />
      ) : (
        <NavLink to={`/profile/${user.email}`} className="header__profile">
          {" "}
          <Button text="Profile" onClick={() => 1} style="header" />
        </NavLink>
      )}
      {isSignInVisible && !user && (
        <Portal
          Component={() => <SignIn handleSwitch={handleSwitch} />}
          isOpen={isSignInVisible}
          text="Sign In"
          handleClose={() => setIsSignInVisible(false)}
        />
      )}
      {isSignUpVisible && (
        <Portal
          Component={() => <SignUp handleSwitch={handleSwitch} />}
          isOpen={isSignUpVisible}
          text="Sign Up"
          handleClose={() => setIsSignUpVisible(false)}
        />
      )}
      <ToastComponent />
    </header>
  );
};
