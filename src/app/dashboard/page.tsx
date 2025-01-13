"use client";
import useUserStore from "@/store/useUserStore";
import React from "react";

const page = () => {
  const { user } = useUserStore();
  return (
    <>
      <h1>Welcome, {user.name}</h1>
    </>
  );
};

export default page;
