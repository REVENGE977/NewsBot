# About CSGONewsBot
CSGONewsBot is a Discord bot which crawls the [CS:GO updates](https://blog.counter-strike.net/index.php/category/updates/) -page and checks for new update articles every 2 hours.

Whenever there is a new update article, it will send the article as a Discord message to all Discord channels that are subscribed to the bot's news schedule.

## How to use the bot
* Add this bot to your Discord server with [this link](https://discordapp.com/api/oauth2/authorize?client_id=562687174697549856&permissions=522304&scope=bot).

* Add the desired Discord text channel to the news schedule by writing the command `!addchannel`.

* If you want to remove a Discord text channel from the news schedule, write the command `!removechannel`.

* You can get the latest update article instantly by writing the command `!getupdate` on the desider Discord text channel.

## Want to build your own version of this bot?
Feel free to! This repository is completely free to use for anyone, even commercially. Simply copy this repository and hack away.
You will, however, need to set up your own database and `private.js` file with your own credentials and other private variables.

### Have a suggestion?
I'm open to suggestions! Please send your idea to [admin@cachemaps.net](mailto:admin@cachemaps.net?subject=CSGONewsBot%20suggestion).
