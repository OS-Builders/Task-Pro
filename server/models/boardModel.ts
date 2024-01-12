import mongoose from "mongoose";
import { InferSchemaType } from "mongoose";

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: { type: String, required: true, unique: true },
  backlog: [{ type: Schema.Types.ObjectId, ref: "card" }],
  inProgress: [{ type: Schema.Types.ObjectId, ref: "card" }],
  inReview: [{ type: Schema.Types.ObjectId, ref: "card" }],
  completed: [{ type: Schema.Types.ObjectId, ref: "card" }],
  //   boardOwner: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
});

type Board = InferSchemaType<typeof boardSchema>;

export default mongoose.model<Board>("Board", boardSchema);
