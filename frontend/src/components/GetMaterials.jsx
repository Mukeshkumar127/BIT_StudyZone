import React, { useEffect, useState } from "react";
import serverUrl from "../../config"; // backend base URL
import { Link } from "react-router-dom";

const MaterialsList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const semester =
    parseInt(localStorage.getItem("selectedSemester")?.split(" ")[1]) || 1;
  const branch = localStorage.getItem("selectedBranch") || "CSE";

  const theme = localStorage.getItem("theme");

  const getDownloadableUrl = (url) => {
    return url.replace("/upload/", "/upload/fl_attachment/");
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(`${serverUrl}/notes/${semester}/${branch}`);
        const data = await res.json();
        setNotes(data.foundNotes || []);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [semester, branch]);

  if (loading) {
    return (
      <div className="text-center py-10 text-xl font-semibold">Loading...</div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme == "dark" ? "bg-gray-900" : "bg-white"
      } p-6`}
    >
      <h1
        className={`text-3xl font-bold mb-6 text-center ${
          theme == "dark" ? "text-white" : "text-black"
        }`}
      >
        Available Study Materials
      </h1>

      {notes.length === 0 ? (
        <p className="text-center text-gray-600">
          No notes found for Semester {semester} ({branch})
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-600">
                {note.name}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Semester: {note.semester} | Branch: {note.branch}
              </p>
              <div className="flex justify-between mt-auto space-x-2">
                <a
                  href={note.storage}
                  download
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-center"
                >
                  click here
                </a>

                {console.log(note.storage)}
              </div>
              <p className="text-red-400 text-sm mt-2">
                If not getting download , Long press and open in NEW TAB
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaterialsList;
