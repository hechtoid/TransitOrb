#!/bin/bash
cd /home/www/transitYourself/

npm run build &&
cp build/index.html build/404.html &&
git add . &&
git commit -m 'predeploy' &&
npx gh-pages -d build &&
git push &&

exit
