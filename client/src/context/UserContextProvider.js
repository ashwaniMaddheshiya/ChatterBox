import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [chatInfo, setChatInfo] = useState(
    JSON.parse(localStorage.getItem("chatInfo")) || null
  );
  const [selectUser, setSelectUser] = useState(
    JSON.parse(localStorage.getItem("selectUser")) || null
  );

  if (chatInfo) {
    localStorage.setItem("chatInfo", JSON.stringify(chatInfo));
  }

  if (selectUser) {
    localStorage.setItem("selectUser", JSON.stringify(selectUser));
  }

  return (
    <UserContext.Provider
      value={{ selectUser, setSelectUser, chatInfo, setChatInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
