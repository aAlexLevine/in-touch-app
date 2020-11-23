# in-touch-app

Stay in touch with anyone, anywhere. The In Touch App is a multi peer video conferencing application. The simple-peer library built on top of native WebRTC handles the video connections, every user maintains a one to one channel with every other user inside of a room. Socket.io provides instant messaging within the room as well as serves as a signaling service to initiate the WebRTC hand-shake.

## Run Project Locally

*  Install dependencies.  
  > `$ cd in-touch-app`
  > `$ npm install`

*  Run webpack and start the server.  
  > `$ npm run react-dev`
  > `$ npm run server-dev`

  The application is now proxied via webpack-dev-server on port 8080. Navigate to`localhost:8080` in your browser.

### Stack

* Client
  * ReactJS
  * shards-react UI
  * simple-peer
* Server
  * Express
  * SocketIO



