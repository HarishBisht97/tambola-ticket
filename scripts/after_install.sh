#!/bin/bash
mkdir /home/ubuntu/aws-codedeploy
cd /home/ubuntu/aws-codedeploy
npm install
npx prisma db pull
npx prisma generate