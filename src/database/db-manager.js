class DBManager {
    static setClient(client) {
        DBManager.client = client;
    }

    static getClient(){
        return DBManager.client;
    }

    static async listAllDatabases() {
        const dbList = await DBManager.client.db().admin().listDatabases();
        console.log("Databases:");
        console.log(dbList);
    }

    static async listAllCollections(databaseName) {
        const dbList = await DBManager.client.db(databaseName).listCollections().toArray();
        console.log(`Collections of ${databaseName}:`);
        console.log(dbList);
    }
}

module.exports = DBManager;