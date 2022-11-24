import React, { useEffect, useState } from "react";

import { Portal } from "components";
import { Button } from "../Button";
import { SignIn, SignUp } from "components/Authorization";
import { useAuth } from "hooks/useAuth";
import { authorization } from "api/authorization";
import { useToast } from "hooks";

import "./styles.scss";
import { ToastOptions } from "types/enumerators";

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
      const { data } = await authorization();
      setUser(data);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      if (message !== "Need authorization") {
        openToast(String(message), ToastOptions.error);
      }
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  console.log(user);
  return (
    <header className="header">
      <Button
        text={user ? "Profile" : "Login"}
        onClick={() => setIsSignInVisible(true)}
        style="button"
      />
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
    </header>
  );
};
