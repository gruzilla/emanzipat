# building

Although the code is held in ECMAScript® 2015 (6th edition) https://www.ecma-international.org/ecma-262/6.0/ some users still use browsers that only support ES5. Thus this project uses webpack and babel to transpile ES6 code to ES5.

## bootstrap

    nvm install
    nvm use
    npm install
    npm run build

## dev + serve

### shell 1

With the following command changes in the source code trigger a run of the transpiler and webpack:

    nvm use
    npm run dev

### shell 2

With the following command a local http server is started on (default) port 8000 for running emanzip.at locally:

    nvm use
    npm run serve

now you can open http://localhost:8000

# deployment

    nvm use
    npm run build
    git add public
    git commit -m "new version"
    git tag "new version"
    git push --tags

# delivery

    ssh abendstille.at
    cd applications/emanzip.at
    make update