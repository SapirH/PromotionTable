import { ObjectId } from 'mongodb';

export interface Promotion {
    _id: ObjectId;
    name: string;
    type: string;
    start_date: string;
    end_date: string;
    user_group: string;
}
