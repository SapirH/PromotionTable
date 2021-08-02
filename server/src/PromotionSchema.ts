
import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import config from './config';
import { Promotion } from './types/promotion';

const PromotionSchema: Schema = new Schema({
    _id: { type: ObjectId, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    user_group: { type: String, required: true },
});

export default mongoose.model<Promotion>(config.collections.promotions.name, PromotionSchema);