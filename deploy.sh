#!/bin/sh
git add . &&
git commit -m 'predeploy' &&
npm run build &&
git push
npx gh-pages -d build &&
exit
