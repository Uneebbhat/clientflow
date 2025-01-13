"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Quote {
  quote: string;
  author: string;
}

const MotivationalQuotes = () => {
  const url = "https://api.api-ninjas.com/v1/quotes";
  const [motivationalQuote, setMotivationalQuote] = useState<Quote | null>(
    null
  );

  useEffect(() => {
    const fetchMotivationalQuotes = async () => {
      try {
        const { data } = await axios.get(url, {
          headers: {
            "X-Api-Key": "UfPRNlI000jKIl8Ha5RoLw==4leosU1ML0b0KBqa",
          },
        });
        setMotivationalQuote(data[0]);
        console.log(data[0]);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };
    fetchMotivationalQuotes();
  }, []);

  return (
    <>
      <div className="hidden md:flex bg-gradient-to-b from-black-900 to-black-500 text-white w-full md:w-1/2 p-[20px] md:p-[40px] min-h-[100vh] rounded-[20px] flex-col justify-between">
        <div className="logo mb-4">
          <Image src="/logo.svg" alt="ClientFlow" width={200} height={200} />
        </div>

        <div className="mt-4 mb-4">
          <h1 className="text-h5 md:text-h3 lg:text-h1 font-bold leading-tight md:leading-snug">
            Let’s Build Something Extraordinary Together!
          </h1>
          <p className="text-base md:text-h5 lg:text-h5 mt-2">
            Your success story begins with smarter collaboration.
          </p>
        </div>

        <div className="bg-gradient-to-b from-black-500 to-black-900 p-[20px] md:p-[40px] rounded-[20px]">
          {motivationalQuote ? (
            <q className="text-sm md:text-h6 lg:text-h6 leading-relaxed">
              {motivationalQuote.quote} —<cite>{motivationalQuote.author}</cite>
            </q>
          ) : (
            <p className="text-sm text-gray-400">
              Loading motivational quote...
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MotivationalQuotes;
