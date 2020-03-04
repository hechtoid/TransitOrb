#!/bin/sh
cd /home/www/transitYourself/

npm run build &&
cp build/index.html build/404.html &&
git add . &&
git commit -m 'predeploy' &&
git push &&
npx gh-pages -d build &&

exit
