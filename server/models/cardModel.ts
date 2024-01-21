import mongoose from 'mongoose';
import { InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  notes: { type: String },
  tags: [{ type: String }],
});

type Card = InferSchemaType<typeof cardSchema>;

export default mongoose.model<Card>('Card', cardSchema);
