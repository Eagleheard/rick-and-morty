import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate, useParams } from "react-router-dom";

import { fetchUserInfo, updateUserInfo } from "api/fetchUserInfo";
import { useToast } from "hooks";
import { ToastOptions } from "types/enumerators";
import { useAuth } from "hooks/useAuth";

import "./styles.scss";
import { Button } from "components";

interface IProfile {
  name: string;
  email: string;
  description: string;
}

export const Profile = () => {
  const [profile, setProfile] = useState<IProfile>();
  const [userDescription, setUserDescription] = useState(profile?.description);
  const [isEditMode, setIsEditMode] = useState(false);
  const { userEmail } = useParams<string>();
  const { openToast } = useToast();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const { data } = await fetchUserInfo(userEmail);
      setProfile(data);
      setUserDescription(data.description);
    } catch ({ message }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  const updateUser = async () => {
    try {
      const { data } = await updateUserInfo(userDescription, userEmail);
      setProfile(data);
      setUserDescription(data.description);
      setIsEditMode(false);
      openToast("Updated successfully", ToastOptions.success);
    } catch ({ message }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
    setUser(null);
  };
  useEffect(() => {
    user ? getProfile() : navigate("/");
  }, []);

  return (
    <div className="profile__container">
      <div className="profile">
        <h1 className="profile__label">Profile</h1>
        <p className="profile__name">Name: {profile?.name}</p>
        <p className="profile__email">Email: {profile?.email}</p>
        {!isEditMode ? (
          <div className="profile__edit">
            <p className="profile__descrition">
              {profile?.description
                ? `Description: ${profile?.description}`
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
    </div>
  );
};
