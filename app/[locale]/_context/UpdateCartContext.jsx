"use client";
import React, { createContext, useState } from "react";
export const UpdateCartContext = createContext();

export const UpdateCartProvider = ({ children }) => {
  const [updateCart, setUpdateCart] = useState();

  return (
    <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
      {children}
    </UpdateCartContext.Provider>
  );
};
