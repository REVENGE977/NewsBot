# What is NewsBot?

NewsBot is a Discord bot which crawls various game's websites, such as the
[CS:GO updates](https://blog.counter-strike.net/index.php/category/updates/) 
-page for CS:GO and checks for new update articles every 2 hours.

Whenever there is a new update article, it will send the article as a Discord message to all Discord channels 
that are subscribed to that game's news schedule.

**Purpose**: The purpose of this Discord bot is to automate sending updates about various games to Discord servers. 
This makes it easy to keep track of game updates without leaving the comfort of your Discord server.

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
**Here's how.**

* Clone this repository to the target directory and install Node.js.
  * Here's an installation guide for [Linux(fedora)](https://tecadmin.net/install-latest-nodejs-on-fedora/) | [Windows](https://www.guru99.com/download-install-node-js.html).

* Install MySQL on your machine. Guide for [Linux(fedora)](https://tecadmin.net/install-mysql-8-on-fedora/) | 
[Windows](https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html).

* Create a MySQL database to store the news articles and Discord channels in. 

* Create the database:
    ```
    CREATE DATABASE NewsBot;
    ```

* Create the tables:
    ```
    CREATE TABLE NewsBot.newsitems(game varchar(200) NOT NULL, title varchar(200) NOT NULL);
    CREATE TABLE NewsBot.channels(game varchar(200) NOT NULL, channelID varchar(25) NOT NULL);
    ```

* Create a new Discord bot using [this guide](https://discordpy.readthedocs.io/en/rewrite/discord.html) by Discord.py.

* Create a new file in the `program` -folder called `private.js`. Here, you will store your MySQL details, your bot's password and your AdminID.

  * The file should look like this:
  
    ```
    const host = "yourMySQLhost";
    const user = "yourMySQLuser";
    const password = "yourMySQLpassword";

    const BotPass = "Bot password acquired earlier in Discord.Py guide";

    const AdminID = "AdminID placeholder";

    module.exports = {
        host: host,
        user: user,
        password: password,
        BotPass: BotPass,
        AdminID: AdminID
    };
    ```


* Using the command line or terminal, navigate to the target directory.



**You should now be able to run the bot** using
```
node program/index.js
```



* Stop the bot and add the line `message.reply(message.author.id);` anywhere in Index.js after the line
    ```
    client.on("message", () => { 
    ```

    * Start the bot again and invite it to a Discord server and type anything in any channel. The bot will spew out numbers. Take the first number the bot responds with. That's your AdminID. Copy it, and in `private.js`, replace "AdminID placeholder" with the AdminID you just got.



**The bot should now be fully functional.**


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
