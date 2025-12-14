import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
    {
      name: String,
      semester:String,
      branch:String,
      storage: String,
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  );
const Notes = mongoose.model("Notes", notesSchema);

export default Notes;