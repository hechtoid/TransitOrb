#!/bin/sh
git add . &&
git commit -m 'predeploy' &&
npm run build &&
#???automate 404.html from index.html???
git push
npx gh-pages -d build &&

exit
