import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [notification, setNotification] = useState({});
  const [chatInfo, setChatInfo] = useState(
    JSON.parse(localStorage.getItem("chatInfo")) || null
  );
  const [selectUser, setSelectUser] = useState(
    JSON.parse(localStorage.getItem("selectUser")) || null
  );
  const [isChatCleared, setIsChatCleared] = useState(false);

  const removeUser = () => {
    localStorage.removeItem("selectUser");
    setSelectUser(null);
  };

  if (chatInfo) {
    localStorage.setItem("chatInfo", JSON.stringify(chatInfo));
  }

  if (selectUser) {
    localStorage.setItem("selectUser", JSON.stringify(selectUser));
  }

  return (
    <UserContext.Provider
      value={{
        selectUser,
        setSelectUser,
        chatInfo,
        setChatInfo,
        removeUser,
        isChatCleared,
        setIsChatCleared,
        notification,
        setNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
