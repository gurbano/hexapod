sudo rmmod xpad
sudo xboxdrv --silent

cd ~/hexapod/PT/src/Server
sudo python HexaServer.py

cd ~/hexapod/JS
nodemon src/HexaServer.ts
