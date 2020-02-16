#!/bin/sh

rm  /home/www/react511/src/components/*

ln /home/www/LocalNode/frontend/src/components/transit/transit.js /home/www/react511/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/transitstop.js  /home/www/react511/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/union.js  /home/www/react511/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/vanNess.js  /home/www/react511/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/stockton.js   /home/www/react511/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/sansome.js  /home/www/react511/src/components/ &&
ln /home/www/LocalNode/frontend/src/components/transit/broadway.js  /home/www/react511/src/components/ &&

git add . &&
git commit -m 'predeploy' &&
npx gh-pages -d build
exit
