export default {
    port: 3001,
    mockAmount: 10000,
    pageAmount: 20,
    mongoConfig: {
        connectionString: 'mongodb+srv://admin:admin@cluster0.og4pc.mongodb.net/moonActive?retryWrites=true&w=majority',
        dbName: 'moonActive'
    },
    collections: {
        promotions: {
            name: 'promotions'
        }
    }
};