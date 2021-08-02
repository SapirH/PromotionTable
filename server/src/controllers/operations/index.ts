import { ObjectId } from 'mongodb';
import doOperation from '../../mongo/dbOpeation';
import { IOperationBuilder } from './types';

const getAll = (collectionName: string) => 
    doOperation(collectionName, collection => collection.find({}).toArray(), 
                `Fail to get all the objects from ${collectionName}`);
const getItemsByRange = (collectionName: string, rangeStart: number, rangeAmount: number) => 
    doOperation(collectionName, collection => collection.find({}).skip(rangeStart).limit(rangeAmount).toArray(), 
                `Fail to get all the objects from ${collectionName}`);

const insertOne = (collectionName: string, obj: Object) => 
    doOperation(collectionName, collection => collection.insertOne(obj), 
    `Fail to the create the object ${obj} in ${collectionName}`);

const insertMany = (collectionName: string, objArray: Object[]) => 
    doOperation(collectionName, collection => collection.insertMany(objArray), 
    `Fail to create the objects ${objArray} in ${collectionName}`);

const updateOne = (collectionName: string, id: string, obj: Object) =>
    doOperation(collectionName, collection => collection.findOneAndUpdate(
        { '_id': new ObjectId(id) },
        { $set: obj }
    ), `Fail to update ${id}- ${collectionName} to ${obj}`);

const deleteById = (collectionName: string, id: string) => 
    doOperation(collectionName, collection => collection.deleteOne({ '_id': new ObjectId(id) }), 
            `Fail to delete the object ${id} from ${collectionName}`);
            
export default <T>(): IOperationBuilder<T> => ({
    getAll,
    deleteById,
    insertOne,
    updateOne,
    insertMany,
    getItemsByRange,
})
