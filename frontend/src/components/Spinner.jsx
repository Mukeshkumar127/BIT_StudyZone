import React from "react";

const Spinner = () => {
  return (
    <div className="p-2 flex justify-center items-center mt-2">
      <div className="w-6 h-6 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;