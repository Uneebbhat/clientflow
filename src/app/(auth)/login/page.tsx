import React from "react";
import MotivationalQuotes from "@/components/MotivationalQuotes";
import LoginForm from "@/components/Login/LoginForm";

const page = () => {
  return (
    <>
      <section className="flex flex-col md:flex-row p-[20px]">
        <MotivationalQuotes />
        <LoginForm />
      </section>
    </>
  );
};

export default page;
