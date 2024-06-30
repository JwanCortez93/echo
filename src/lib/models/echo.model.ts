import mongoose from "mongoose";

const echoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String },
  chidlren: [{ type: mongoose.Schema.Types.ObjectId, ref: "Echo" }],
});

const Echo = mongoose.models.Echo || mongoose.model("Echo", echoSchema);

export default Echo;
