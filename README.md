# File Reader

This program is designed to read Debian/Ubunutu source control files that provide details of installed software packages and their dependencies. Control files should be located in /var/lib/dpkg/status. Uploaded files are expected to follow strict formatting guidelines outlined below. Browse file system to upload and parse a source control file or use the provided template by clicking 'Use Mock Data'.

Live demo is available [here](https://file-reader-reaktor.herokuapp.com/).

[Control file syntax](https://www.debian.org/doc/debian-policy/ch-controlfields.html#syntax-of-control-files)

[Mock Data](https://gist.github.com/lauripiispanen/29735158335170c27297422a22b48caa)

## Run Project Locally

  cd into project folder and install dependencies
  
  > `cd file-reader-reaktor`

  > `npm install`

  tell webpack to build a bundle

  > `npm run build`

  tell express to serve it up

  > `npm start`

navigate to `localhost:3000` in your browser

## For Development Only

  Enable hot-reloading

  > `npm run react-dev`

  dev-server running at `localhost:8080`


