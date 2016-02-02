#! /bin/sh

echo 'Clean environment ...'
sudo docker rm -f godemo_fe

echo 'Build docker image to godemo_server:latest ...'
sudo docker build -t godemo_fe:latest .

echo 'Run godemo_server ...'
sudo docker run -itd --name=godemo_fe -p 80:80 godemo_fe
