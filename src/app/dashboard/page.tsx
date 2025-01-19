"use client";
import { DEFAULT_IMG } from "@/config/constants";
import useUserStore from "@/store/useUserStore";
import Image from "next/image";
import React from "react";

const page = () => {
  const { user, logout } = useUserStore();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <section className="p-[40px] bg-slate-400">
        <h1>Welcome, {user.name}</h1>
      </section>
    </>
  );
};

export default page;
