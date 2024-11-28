# Docker

```
docker run -d \
  --name mongadj \ 
  -e TOKEN='your_discord_bot_token' \ 
  -e PREFIX='!' \
  --restart unless-stopped \
  lorthe/discord-mongadj  
```

# Build and push docker image
```
chmod +x deploy.sh  
./deploy.sh  
```


# manual install

```
sudo apt install ffmpeg
#sudo snap install yt-dlp
npm install ytdl-core  
pip install -U yt-dlp  
```


