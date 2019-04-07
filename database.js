const mysql = require('mysql');
const user = require('./private').user;
const password = require('./private').password;

class Database {
    constructor(){
        this.connection = mysql.createConnection({
            host:"localhost",
            user:user,
            password:password
        });
    }
    query(sql, args){
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (error, result) => {
                    if (error) { return reject(error); }

                    resolve(result);
                });
        });
    }
    async AddChannel(channelID){
        let sql = "SELECT COUNT(*) as count FROM CSGONewsBot.channels WHERE channelID = ?";
        let args = [channelID];

        let result = await this.query(sql, args);

        if (result[0].count === 0) {
            sql = "INSERT INTO CSGONewsBot.channels (channelID) VALUES (?)";
            await this.query(sql, args);
            return "Channel successfully added!";
        } else { return "Channel already added!" }
    }
    async RemoveChannel(channelID) {
        let sql = "DELETE FROM CSGONewsBot.channels WHERE channelID = ?";
        let args = [channelID];

        await this.query(sql, args);
        return "Channel successfully removed.";
    }
    async GetChannels(){
        let sql = "SELECT (channelID) FROM CSGONewsBot.channels";
        let result = await this.query(sql, []), output = [];

        Object.keys(result).forEach((key) => {
            let row = result[key];
            output.push(row.channelID);
        });

        return output;
    }
    async NewsArticleExists(title){
        let sql = "SELECT COUNT(*) as count FROM CSGONewsBot.newsitems WHERE title = ?";
        let args = [title];

        let result = await this.query(sql, args);
        return result[0].count > 0;
    }
    async AddNewsArticle(title){
        let sql = "INSERT INTO CSGONewsBot.newsitems(title) VALUES (?)";
        let args = [title];

        return await this.query(sql, args);
    }
}

module.exports.Database = Database;