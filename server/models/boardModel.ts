import mongoose from "mongoose";
import { InferSchemaType } from "mongoose";

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: { type: String, required: true, unique: true },
  backlog: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  inProgress: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  inReview: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  completed: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  boardOwner: { type: String, required: true },
});

type Board = InferSchemaType<typeof boardSchema>;

export default mongoose.model<Board>("Board", boardSchema);
