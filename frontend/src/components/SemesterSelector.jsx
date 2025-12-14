import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ChooseBranch from "./ChooseBranch";

const SemesterSelector = () => {
  const [selectedBranch, setSelectedBranch] = useState(
    localStorage.getItem("selectedBranch") || ""
  );
  const [selectedSemester, setSelectedSemester] = useState(0);

  const handleSemesterClick = (sem) => {
    setSelectedSemester(sem);
    localStorage.setItem("selectedSemester", sem);
    console.log("Selected Branch:", selectedBranch);
    console.log("Selected Semester:", sem);
  };

  const isDark = localStorage.getItem("theme") === "dark";

  return (
    <div
      className={`min-h-screen p-4 ${
        isDark ? "bg-slate-900 text-white" : "bg-pink-50 text-black"
      }`}
    >
      <div className="max-w-xl mx-auto space-y-6">
        <ChooseBranch onSelect={setSelectedBranch} />

        <div className="grid grid-cols-2 gap-4 mt-6">
          {[...Array(8)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handleSemesterClick(`Semester ${i + 1}`)}
              className={`px-3 py-1 rounded transition font-medium ${
                `Semester ${i + 1}` === selectedSemester
                  ? "bg-amber-500 text-black"
                  : "bg-pink-200 text-black hover:bg-pink-400"
              }`}
            >
              Semester {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-4">
        <div className="flex items-center justify-center w-full m">
          {selectedBranch && selectedSemester ? (
            <Link to="/getmaterials">
              <button className="py-2 px-3 m-2 bg-slate-300 rounded-md text-xl text-black">
                Get Materials
              </button>
            </Link>
          ) : (
            <p className="text-red-500 text-sm">Please select branch and semester</p>
          )}
        </div>

        <div className="flex items-center justify-center w-full mb-4">
          <Link
            to={"/addnotes"}
            className="bg-slate-300 text-xl text-black rounded-md py-2 px-3"
          >
            Add Materials
          </Link>
        </div>
      </div>

      <Link to="/">
        <button className="fixed bottom-6 right-6 z-50 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
          Back
        </button>
      </Link>
    </div>
  );
};

export default SemesterSelector;
