# About NewsBot

NewsBot is a Discord bot which crawls various game websites, such as the
[CS:GO updates](https://blog.counter-strike.net/index.php/category/updates/) 
-page for CS:GO and checks for new update articles every 2 hours.

Whenever there is a new update article, it will send the article as a Discord message to all Discord channels 
that are subscribed to that game's news schedule.

**Purpose**: The purpose of this Discord bot is to automate sending updates about CS:GO to Discord servers. 
This makes it easy to keep track of game updates.

## List of supported games
**Left: Game name | Right: command**
* CS:GO | csgo

## How to use the bot
* Add this bot to your Discord server with 
[this link](https://discordapp.com/api/oauth2/authorize?client_id=562687174697549856&permissions=522304&scope=bot).

* Add the desired Discord text channel and game to the news schedule by writing the command `!addchannel <game>`.

* If you want to remove a game from the news schedule, write the command `!removechannel <game>`.

* Get the latest update article instantly by writing the command `!getupdate <game>` on the desired Discord 
text channel.

## Want to build your own version of this bot?
Copy this repository to the target directory and enter it.

To be able to run this bot, you will have to install a few dependencies. 
First, you will have to install Node.js. After installing Node.js, you should also have NPM installed.

Enter the `program` -directory and run these commands:

```
npm install --save discord.js
npm install --save request request-promise cheerio
npm install --save node-cron
npm install mysql
```

or alternatively:
```
npm install --save discord.js node-cron request request-promise cheerio mysql
```

You should now be able to run the bot using
```
node program/index.js
```

Now that the code itself works, you need to create a new Discord bot. I'd recommend following 
[this](https://discordpy.readthedocs.io/en/rewrite/discord.html) guide by Discord.py.

Next, create a database to store the news articles and Discord channels in. 
You will also need to store your bot- and database credentials in a file called `private.js`.

The tables should look like this:

```
newsitems(game varchar(200) NOT NULL, title varchar(200) NOT NULL)
channels(game varchar(200) NOT NULL, channelID varchar(25) NOT NULL)
```

Your `private.js` should look like this:

```
const host = "yourhost";
const user = "youruser";
const password = "yourpassword";

const BotPass = "Bot password acquired earlier in Discord.Py guide";

const AdminID = "Find your ID by adding 'message.reply(message.author.id);' somewhere in the index.js";

module.exports = {
    host: host,
    user: user,
    password: password,
    BotPass: BotPass,
    AdminID: AdminID
};
```

### Want to contribute to this repository?
Any contributions are welcome! Currently, these are the main issues with this repo:
* No proper error handling in places
* Non-OOP sections of the codebase
* Inconsistency across files and functions

### Have a suggestion or question?
We're open to suggestions and questions! Please send your message to 
[admin@cachemaps.net](mailto:admin@cachemaps.net?subject=CSGONewsBot).

### Contributors
Currently, the only contributor of this repository is Zecuel. You can contact him 
[by email](mailto:admin@cachemaps.net?subject=CSGONewsBot).

### Licence 
This repository is licenced under the MIT license. 
Anyone is allowed to modify, share or use this repository, even commercially.
