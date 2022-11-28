import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "components";
import { Loader } from "components/Loader";
import { fetchUserInfo, updateUserInfo } from "api/fetchUserInfo";
import { useToast } from "hooks";
import { ToastOptions } from "types/enumerators";
import { useAuth } from "hooks/useAuth";

import "./styles.scss";

export const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { userEmail } = useParams<string>();
  const { openToast } = useToast();
  const { user, setUser } = useAuth();
  const [userDescription, setUserDescription] = useState("");
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      if (!user && sessionStorage.getItem("token")) {
        const { data } = await fetchUserInfo(userEmail);
        setUser(data);
        setUserDescription(data.description);
      }
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(message, ToastOptions.error);
    }
  };

  const updateUser = async () => {
    try {
      const { data } = await updateUserInfo(userDescription, userEmail);
      setUser(data);
      setUserDescription(data.description);
      setIsEditMode(false);
      openToast("Updated successfully", ToastOptions.success);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(message, ToastOptions.error);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="profile__container">
      {user ? (
        <div className="profile">
          <h1 className="profile__label">Profile</h1>
          <p className="profile__name">Name: {user.name}</p>
          <p className="profile__email">Email: {user.email}</p>
          {!isEditMode ? (
            <div className="profile__edit">
              <p className="profile__descrition">
                {user.description
                  ? `Description: ${user.description}`
                  : "You does not have description yet"}
              </p>
              <ModeEditIcon
                className="profile__icon"
                onClick={() => setIsEditMode(true)}
              />
            </div>
          ) : (
            <div className="profile__edit">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Your bio"
                style={{ width: 200 }}
                value={userDescription}
                className="profile__description--edit"
                onChange={(e) => setUserDescription(e.target.value)}
              />
              <CheckIcon className="profile__icon" onClick={updateUser} />
              <CloseIcon
                className="profile__icon"
                onClick={() => setIsEditMode(false)}
              />
            </div>
          )}
          <Button text="Logout" onClick={logout} style="logout" />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
