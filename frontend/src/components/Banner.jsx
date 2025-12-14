import React from "react";
import banner from "../assets/Banner.png";
function Banner() {
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Hello, BITIANS{" "} <br />
              <span className="text-pink-500 text-xl">You will get all notes here!!!</span>
            </h1>
            <p className="text-sm md:text-xl">
            Your one-stop destination for high-quality study notes across all subjects and classes. Whether you're preparing for exams, brushing up on concepts, or just looking for quick revisions — we've got you covered.
            </p>
           
          </div>
          <button className="btn mt-6 mx-3 p-6 pl-2 pr-2 btn-secondary text-black"><a href="/course">Get Started</a></button>
          <button className="btn mt-6 p-6 pl-2 pr-2 btn-secondary text-black"><a href="/addNotes">Add Materials</a></button>
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Banner;