#!/bin/bash
cd /home/www/transitYourself/

git add . &&
git commit -m 'predeploy' &&
npm run build &&
cp build/index.html build/404.html &&
git push &&
npx gh-pages -d build &&

exit
