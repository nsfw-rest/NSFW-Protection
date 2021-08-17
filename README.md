# NSFW-Protection
NSFW Protection is a Discord bot powered by nsfw.rest

# NOTE! STILL IN DEVELOPMENT
The README.md has been written before I started working on the bot and there's a chance it will just not work intill this message is gone.

## What does the bot do?
It's a bot that's capable of scanning images (and in the future also videos) for NSFW material, mainly adult imagery.

## How do I invite it?
You can easily invite it through [this](https://nsfw.rest/soon-to-be-added) invite link. It's hosted and managed by `abcdan`. It **does** require some permissions such as manage chat and channels so it can make a logging channel. 
## How to set up?
1. Make a Discord bot in the Discord Developer Portal and get a bot token
2. Copy `.env.example` to `.env`
3. Copy the token into the file
4. Run `docker-compose up --build (-d)`. Add the `-d` without the () if you want to deploy & detatch it in the background.

## What's nsfw.rest?
It's a REST-api for content scanning. It doesn't store any files and it's free to use.
## What's the license?
It's released under Apache 2.0.
