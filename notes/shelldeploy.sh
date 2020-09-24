#!/bin/sh
cd /home/www/transitYourself/

rm /home/www/transitYourself/src/App.css
rm  /home/www/transitYourself/src/components/*

ln /home/www/LocalNode/frontend/src/App.css /home/www/transitYourself/src/App.css &&

ln /home/www/LocalNode/frontend/src/components/transit/transit.js /home/www/transitYourself/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/transitstop.js  /home/www/transitYourself/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/anyStop.js  /home/www/transitYourself/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/anyStopWildCard.js  /home/www/transitYourself/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/bus.js  /home/www/transitYourself/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/aa.js  /home/www/transitYourself/src/components/ &&

git add . &&
git commit -m 'predeploy' &&
npm run build &&
git push &&
npx gh-pages -d build &&
exit
