#!/bin/bash
# Install node.js and forever
rm -rf /home/ubuntu/aws-codedeploy
sudo apt-get update
sudo apt-get install nodejs-legacy -y
sudo apt-get install npm  -y
sudo npm install pm2 -g
