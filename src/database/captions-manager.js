const DBManager = require('./db-manager');
const config = require('../config');

class CaptionsManager {

    validateCaption(caption) {
        // TODO: add more complex validation
        const {key, description, en} = caption;
        if (!key || !en) return false;
        return true;
    }

    static async addCaption(caption) {
        try {
            await DBManager.insertDocument(config.DB_NAME, config.CAPTIONS_COLLECTION, caption);
        } catch (e) {
            return {resultCode: 1, message: e};
        }
        return {resultCode: 0};
    }

    static async getCaption(captionKey) {
        if(!captionKey?.length) {
            return {resultCode: -1, caption: null, message: 'b.app'};
        }
        let caption;
        try {
            caption = await DBManager.getDocument(config.DB_NAME, config.CAPTIONS_COLLECTION, {key: captionKey});
        } catch (e) {
            return {resultCode: -1, caption: null, message: e};
        }
        return {resultCode: 0, caption};
    }
}

module.exports = CaptionsManager;