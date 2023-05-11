class DBManager {
    /**
     * Sets the MongoDB client instance for the DBManager class.
     * @static
     * @param {MongoClient} client - The MongoDB client instance to set.
     */
    static setClient(client) {
        DBManager.client = client;
    }

    /**
     * Retrieves the MongoDB client instance currently set in the DBManager class.
     *
     * @static
     * @returns {MongoClient} - The current MongoDB client instance.
     */
    static getClient() {
        return DBManager.client;
    }

    /**
     * Retrieves and logs the list of all databases
     * @static
     * @async
     * @function
     * @returns {Promise<void>}
     */
    static async listAllDatabases() {
        try {
            const dbList = await DBManager.client.db().admin().listDatabases();
            console.log("Databases:");
            console.log(dbList);
        } catch (error) {
            throw new Error(`Error retrieving databases: ${error}`);
        }
    }

    /**
     * Retrieves and logs the list of all collections from specified database
     * @static
     * @async
     * @function
     * @param {string} databaseName - Name of the database from which collections should be retrieved
     * @returns {Promise<void>}
     */
    static async listAllCollections(databaseName) {
        try {
            const collectionsList = await DBManager.client.db(databaseName).listCollections().toArray();
            console.log(`Collections of ${databaseName}:`);
            console.log(collectionsList);
        } catch (error) {
            throw new Error(`Error retrieving collections: ${error}`);
        }
    }


    /**
     * Drop a collection in the specified database.
     * @static
     * @async
     * @function
     * @param {string} dbName - The name of the database
     * @param {string} collectionName - The name of the collection to be dropped.
     * @returns {Promise<void>}
     */
    static async dropCollection(dbName, collectionName) {
        try {
            await DBManager.client.db(dbName).collection(collectionName).drop();
        } catch (error) {
            throw new Error(`Error dropping collection '${collectionName}': ${error}`);
        }
    }

    /**
     * Insert a document into the specified collection in the given database.
     * @static
     * @async
     * @function
     * @param {string} dbName - The name of the database
     * @param {string} collectionName - The name of the collection.
     * @param {Object} newDocument - The new document to be inserted.
     * @returns {Promise<void>}
     */
    static async insertDocument(dbName, collectionName, newDocument) {
        try {
            const result = await DBManager.client.db(dbName).collection(collectionName).insertOne(newDocument);
            console.log(`Insert one document result: `, result);
        } catch (error) {
            throw new Error(`Error inserting document in collection '${collectionName}': ${error}`);
        }
    }

    /**
     * Insert multiple documents into the specified collection in the given database.
     * @static
     * @async
     * @function
     * @param {string} dbName - The name of the database
     * @param {string} collectionName - The name of the collection.
     * @param {Array} newDocument - The list of new documents to be inserted.
     * @returns {Promise<void>}
     */
    static async insertManyDocuments(dbName, collectionName, newDocumentsList) {
        try {
            const result = await DBManager.client.db(dbName).collection(collectionName).insertMany(newDocumentsList);
            console.log(`Insert many documents result: `, result);
        } catch (error) {
            throw new Error(`Error inserting many document in collection '${collectionName}': ${error}`);
        }
    }

    /**
     * Retrieve multiple documents from the specified collection in the given database, based on the provided filter, skip, and limit options.
     *
     * @async
     * @static
     * @function
     * @param {string} dbName - The name of the database.
     * @param {string} collectionName - The name of the collection.
     * @param {Object} filter - The filter to be applied on the documents.
     * @param {number} skip - The number of documents to skip.
     * @param {number} limit - The maximum number of documents to return.
     * @returns {Array} - The array of retrieved documents.
     */
    static async getManyDocuments(dbName, collectionName, filter = {}, skip = 0, limit = 20) {
        try {
            const cursor = await DBManager.client.db(dbName).collection(collectionName).find(filter).skip(skip).limit(limit);
            return await cursor.toArray();
        } catch (error) {
            throw new Error(`Error getting documents from collection '${collectionName}': ${error}`);
        }
    }

    /**
     * Retrieve a document from the specified collection in the given database, based on the provided filter.
     *
     * @async
     * @static
     * @function
     * @param {string} dbName - The name of the database.
     * @param {string} collectionName - The name of the collection.
     * @param {Object} filter - The filter to be applied on the document.
     * @returns {Object|null} - The retrieved document or null if not found.
     */
    static async getDocument(dbName, collectionName, filter) {
        try {
            return await DBManager.client.db(dbName).collection(collectionName).findOne(filter);
        } catch (error) {
            throw new Error(`Error getting document from collection '${collectionName}': ${error}`);
        }
    }

    /**
     * Update a document in the specified collection of the given database, based on the provided filter and new document.
     *
     * @async
     * @static
     * @function
     * @param {string} dbName - The name of the database.
     * @param {string} collectionName - The name of the collection.
     * @param {Object} filter - The filter to be applied on the document to be updated.
     * @param {Object} newDocument - The new document to replace the existing document.
     * @returns {void}
     */
    static async updateDocument(dbName, collectionName, filter, newDocument) {
        try {
            const result = await DBManager.client.db(dbName).collection(collectionName).updateOne(filter, {$set: newDocument});
            console.log(`Updated: `, result);
        } catch (error) {
            throw new Error(`Error getting updating document in collection '${collectionName}': ${error}`);
        }
    }

    /**
     *
     * @param dbName
     * @param collectionName
     * @param filter
     * @returns {Promise<number>}
     */
    static async getCountOfDocuments(dbName, collectionName, filter) {
        try {
            return await DBManager.client.db(dbName).collection(collectionName).countDocuments();
        } catch (error) {
            throw new Error(`Error getting count of documents in collection '${collectionName}': ${error}`);
        }
    }
}

module.exports = DBManager;