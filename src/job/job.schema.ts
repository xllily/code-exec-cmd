import { Schema } from 'mongoose';

export const JobSchema = new Schema({
    _id: { type: String, required: true },
    code: { type: String, required: true },
    result: { type: String },
    status: { type: String, required: true },
});
