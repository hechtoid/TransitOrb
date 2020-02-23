#!/bin/sh
cd /home/www/transitYourself/

rm /home/www/transitYourself/src/App.css
rm  /home/www/transitYourself/src/components/*

ln /home/www/LocalNode/frontend/src/App.css /home/www/transitYourself/src/App.css &&

#ln /home/www/LocalNode/frontend/src/components/transit/transit.js /home/www/transitYourself/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/transitstop.js  /home/www/transitYourself/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/union.js  /home/www/transitYourself/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/vanNess.js  /home/www/transitYourself/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/stockton.js   /home/www/transitYourself/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/sansome.js  /home/www/transitYourself/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/broadway.js  /home/www/transitYourself/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/anyStop.js  /home/www/transitYourself/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/aa.js  /home/www/transitYourself/src/components/ &&

git add . &&
git commit -m 'predeploy' &&
npm run build &&
git push
npx gh-pages -d build &&
exit
