import mongoose from 'mongoose';
import { InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }],
});

type User = InferSchemaType<typeof userSchema>;

export default mongoose.model<User>('User', userSchema);
