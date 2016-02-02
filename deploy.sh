#! /bin/sh

echo 'Install npm ...'
sudo apt-get install -y npm

echo 'Install packages ...'
npm install -g grunt-cli bower
npm install
bower install --allow-root

echo 'Building ...'
grunt distribute

echo 'Prepare web contents ...'
sudo rm -rf /var/www/godemo
sudo cp -r ./temp /var/www/godemo
sudo rm -rf /etc/nginx/sites-enabled/default
sudo ln -s $(pwd)/nginx.conf /etc/nginx/sites-enabled/default
sudo service nginx restart
