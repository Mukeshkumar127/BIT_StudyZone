import React, { useState, useEffect } from 'react';
import serverUrl from '../../config';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme];
};

const AddMaterials = () => {
  const [loading, setLoading] = useState(false);
  const [semester, setSemester] = useState(1);
  const [branch, setBranch] = useState('EE');
  const [name,setName]=useState("");
  const [notes, setNotes] = useState(null);
  const theme = localStorage.getItem('theme') || 'light';

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!notes) return alert("Please upload a file");
  
    const formData = new FormData();
    formData.append('semester', semester);
    formData.append('name', name);
    formData.append('branch', branch);
    formData.append('notes', notes);
  
    setLoading(true);
  
    try {
      const response = await fetch(`${serverUrl}/notes/addnotes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        alert('Notes added successfully');
        setLoading(false);
      } else {
        alert('Error uploading notes');
        console.error(await response.text());
      }
    } catch (error) {
      console.error('Upload Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-black' : 'bg-pink-100 text-black'
      }`}
    >
      <div className="max-w-xl mx-auto shadow-lg p-6 rounded-lg bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">Upload Study Material</h1>

        <div >
              <input
              type="text"
              placeholder="Enter notes name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 p-2 border rounded text-black bg-white"
            />

        </div>

        {/* Semester Selection */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Semester</label>
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="semester"
                  value={index + 1}
                  checked={semester === index + 1}
                  onChange={() => setSemester(index + 1)}
                />
                <span>{index + 1}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Branch Selection */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Branch</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['EE', 'ECE', 'CIVIL', 'CSE', 'IT', 'MECH', 'PROD', 'METAL',"CHEM"].map((branchOption) => (
              <label key={branchOption} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="branch"
                  value={branchOption}
                  checked={branch === branchOption}
                  onChange={() => setBranch(branchOption)}
                />
                <span>{branchOption}</span>
              </label>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Upload File</label>
          <input
            type="file"
            onChange={(e) => setNotes(e.target.files[0])}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold transition-colors ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? <Spinner /> : 'Upload Material'}
          </button>
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

export default AddMaterials;