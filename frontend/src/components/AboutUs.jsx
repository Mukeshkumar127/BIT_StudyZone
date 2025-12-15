import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function About() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 ${
        isDark
          ? "bg-slate-900 text-white"
          : "bg-linear-to-br from-blue-100 to-pink-100 text-slate-800"
      }`}
    >
      <div
        className={`max-w-3xl text-center p-8 rounded-2xl shadow-xl ${
          isDark ? "bg-slate-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-4xl font-bold mb-4 ${
            isDark ? "text-pink-400" : "text-pink-600"
          }`}
        >
          About BIT StudyZone
        </h1>
        <p className="text-lg leading-relaxed">
          <strong>BIT StudyZone</strong> is a platform created to support students
          of BIT Sindri by offering a centralized space for college updates,
          resources (like classnotes, PYQ, study materials), and peer-to-peer
          support.
        </p>

        <div className="mt-6 border-t pt-4">
          <p className="text-md font-medium">📧 Contact us:</p>
          <a
            href="mailto:krmukesh180u@gmail.com"
            className={`underline ${
              isDark
                ? "text-blue-300 hover:text-blue-500"
                : "text-blue-600 hover:text-blue-800"
            }`}
          >
            krmukesh180u@gmail.com
          </a>
        </div>
      </div>
      <Link to="/">
        <button className="fixed bottom-6 right-6 z-50 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
          Back
        </button>
      </Link>
    </div>
  );
}

export default About;
