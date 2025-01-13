import React from "react";
import MotivationalQuotes from "@/components/MotivationalQuotes";
import SignupForm from "@/components/Signup/SignupForm";

const page = () => {
  return (
    <>
      <section className="flex flex-col md:flex-row p-[20px]">
        <SignupForm />
        <MotivationalQuotes />
      </section>
    </>
  );
};

export default page;
