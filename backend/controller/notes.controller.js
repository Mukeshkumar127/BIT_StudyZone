import Notes from "../model/notes.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getNotes = async(req, res) => {
    try {
        const {semester,branch}=req.params;
        const foundNotes = await Notes.find({semester,branch});
        if(!foundNotes){
            res.status(500).json({message:"Notes is not avaliable"});
        }
        res.status(200).json({foundNotes});
    } 
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

// const addNotes = async (req, res) => {
//     try {
//       const { name, semester, branch } = req.body;
//       const notesLocalPath = req.files?.notes?.[0]?.path;
  
//       if (!notesLocalPath) {
//         return res.status(400).json({ message: "No file uploaded." });
//       }
  
//       const notesStorage = await uploadOnCloudinary(notesLocalPath);
  
//       if (!notesStorage) {
//         return res.status(500).json({ message: "Failed to upload notes to Cloudinary." });
//       }
  
//       const createdNote = await Notes.create({
//         name,
//         storage: notesStorage.url,
//         semester,
//         branch,
//         owner: req.user?._id,
//       });
      
//       const notes = await Notes.findById(createdNote._id);
  
//       res.status(201).json({ message: "Uploaded successfully", notes });
//     } 
//     catch (error) {
//       console.log("Error:", error.message);
//       res.status(500).json({ message: "Controller failed", error: error.message });
//     }
//   };


const addNotes = async (req, res) => {
  try {
    const { name, semester, branch } = req.body;
    const file = req.files?.notes?.[0];

    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const notesStorage = await uploadOnCloudinary(file.buffer);

    const createdNote = await Notes.create({
      name,
      storage: notesStorage.secure_url,
      semester,
      branch,
      owner: req.user?._id,
    });

    res.status(201).json({
      message: "Uploaded successfully",
      notes: createdNote,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};


export {
    addNotes,
    getNotes,
}