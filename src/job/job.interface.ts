import { Document } from 'mongoose';

export interface Job extends Document {
    readonly _id: string;
    readonly code: string;
    readonly result: string;
    readonly status: string;
}
