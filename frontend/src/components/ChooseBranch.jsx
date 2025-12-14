import React, { useState, useEffect } from "react";

const branches = ["CSE", "ECE", "IT", "EE", "MECH","CIVIL",'PROD',"METAL","CHEM"];

const ChooseBranch = ({ onSelect }) => {
  const [selectedBranch, setSelectedBranch] = useState(
    localStorage.getItem("selectedBranch") || ""
  );

  useEffect(() => {
    if (selectedBranch) {
      onSelect(selectedBranch);
    }
  }, [selectedBranch]);

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
    localStorage.setItem("selectedBranch", branch);
    onSelect(branch);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Choose your Branch:</h3>
      <div className="flex flex-wrap gap-2">
        {branches.map((branch) => (
          <button
            key={branch}
            onClick={() => handleBranchClick(branch)}
            className={`px-3 py-1 rounded transition font-medium ${
              selectedBranch === branch
                ? "bg-amber-500 text-black"
                : "bg-pink-200 text-black hover:bg-pink-400"
            }`}
          >
            {branch}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChooseBranch;