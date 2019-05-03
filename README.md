# What is NewsBot?

NewsBot is a Discord bot which crawls various game's websites, such as the
[CS:GO updates](https://blog.counter-strike.net/index.php/category/updates/) 
-page or [OSRS homepage](https://oldschool.runescape.com/) and checks for new news articles every 30 minutes.

Whenever there is a new article, it will send the article as a Discord message to all Discord channels 
that are subscribed to that game's news schedule.

**Purpose**: The purpose of this Discord bot is to automate sending updates about various games to Discord servers. 
This makes it easy to keep track of game updates without leaving the comfort of your Discord server.

## List of supported games

**Left: Game name | Right: command**
* *CS:GO*
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
| *csgo*
* *Oldschool Runescape* &nbsp;&nbsp;&nbsp;| *osrs*
* *Dota2*
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
| *dota2*


## How to use the bot
* Invite this bot to your Discord server with 
[this link](https://discordapp.com/api/oauth2/authorize?client_id=562687174697549856&permissions=522304&scope=bot).

* All commands start with `!nb`. To get a list of supported commands, run `!nb help`.

Useful commands:
  * Add the desired game to the news schedule by running the command `!nb addgame <game>`.<br>
  Updates will be sent to the channel this command was run on.

  * If you want to remove a game from the news schedule, run the command `!nb removegame <game>`. <br>
  The current channel will be removed from the news schedule.

  * Get the latest news article instantly by running the command `!nb news <game>` on the desired Discord 
text channel.

## Want to build your own version of this bot?
**Here's how.**

* Clone this repository to the target directory and install Node.js.
  * Here's an installation guide for [Linux(fedora)](https://tecadmin.net/install-latest-nodejs-on-fedora/) | [Windows](https://www.guru99.com/download-install-node-js.html).
  
* Enter the bot's target directory on command line or terminal.
  * Enter the '`program`' -directory. With Node.js installed, run this command to install depencencies:
  
    ```
    npm install --save mysql discord.js node-cron request request-promise cheerio
    ```
  

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


* **You should now be able to run the bot** using
    ```
    node program/index.js
    ```
    or
    ```
    node index.js
    ```


* Stop the bot and add the line `message.reply(message.author.id);` anywhere inside this function in `index.js`:
    ```
    client.on("message", () => { 
    
     });
    ```

    * Start the bot again, invite it to a Discord server and type anything in any channel. The bot will spew out numbers. Take the first number the bot responds with. That's your AdminID. Copy it, and in `private.js`, replace "AdminID placeholder" with the AdminID you just got.
    * Remove the line you added to `index.js` and restart the bot.


## Want to contribute to this repository?
Any contributions are welcome! Currently, these are the main issues with this repo:
* Inconsistency across files and functions
* Lack of supported games

### Have a suggestion or question?
We're open to suggestions and questions! Please send your message to 
[admin@cachemaps.net](mailto:admin@cachemaps.net?subject=CSGONewsBot).

### Contributors
Currently, the only contributor of this repository is Zecuel. You can contact him 
[by email](mailto:admin@cachemaps.net?subject=CSGONewsBot).

### Licence 
This repository is licenced under the MIT license. 
Anyone is allowed to modify, share or use this repository, even commercially.
