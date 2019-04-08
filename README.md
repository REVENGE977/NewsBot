# About CSGONewsBot

CSGONewsBot is a Discord bot which crawls the [CS:GO updates](https://blog.counter-strike.net/index.php/category/updates/) -page and checks for new update articles every 2 hours.

Whenever there is a new update article, it will send the article as a Discord message to all Discord channels that are subscribed to the bot's news schedule.

**Purpose**: The purpose of this Discord bot is to automate sending updates about CS:GO to Discord servers. This makes it easy to keep track of game updates.

## How to use the bot
* Add this bot to your Discord server with [this link](https://discordapp.com/api/oauth2/authorize?client_id=562687174697549856&permissions=522304&scope=bot).

* Add the desired Discord text channel to the news schedule by writing the command `!addchannel`.

* If you want to remove a Discord text channel from the news schedule, write the command `!removechannel`.

* You can get the latest update article instantly by writing the command `!getupdate` on the desider Discord text channel.

## Want to build your own version of this bot?
Copy this repository to the target directory and enter it.

To be able to run this bot, you will have to install a few dependencies using NPM. If your machine does not use NPM, install it following [these instructions](https://www.npmjs.com/get-npm).

While in the repository directory, run these commands:
```
npm install --save nodejs
npm install --save request request-promise cheerio puppeteer
```
You should now be able to run the bot using
```
node index.js
```

Now that you have the code itself running, you need to create a new Discord bot. I'd recommend following [this](https://discordpy.readthedocs.io/en/rewrite/discord.html) guide by Discord.py.

You need create a database to store the news articles and Discord channels in. You will also need to store your bot- and database credentials in a file called `private.js`.

The tables should look like this:

```
newsitems(title varchar(50) NOT NULL)
channels(channelID varchar(50) NOT NULL)
```

Your `private.js` should look like this:

```
const host = "yourhost";
const user = "youruser";
const password = "yourpassword";

const BotPass = "Bot password acquired earlier in Discord.Py guide";

let AdminID = "Find your ID by adding 'message.reply(message.author.id);' somewhere in the index.js";

module.exports = {
    host: host,
    user: user,
    password: password,
    BotPass: BotPass,
    AdminID: AdminID
};
```


### Have a suggestion or questions?
I'm open to suggestions and questions! Please send your message to [admin@cachemaps.net](mailto:admin@cachemaps.net?subject=CSGONewsBot%20suggestion).
