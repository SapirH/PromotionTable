export interface IOperationBuilder<T> {
    getAll: (collectionName: string) => Promise<T[]>;
    getItemsByRange: (collectionName: string, rangeStart: number, rangeAmount: number) => Promise<T[]>;
    deleteById: (collectionName: string, id: string) => Promise<T[]>;
    insertOne: (collectionName: string, obj: Object) => Promise<T[]>;
    insertMany: (collectionName: string, objArray: Object[]) => Promise<T[]>;
    updateOne: (collectionName: string, id: string, obj: Object) => Promise<T[]>;
}