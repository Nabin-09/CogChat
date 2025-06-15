const { log } = require('console');
const express = require('express')
const path = require('path');
const { CLIENT_RENEG_WINDOW } = require('tls');
const app = express();


const PORT = process.env.PORT || 4000

const server = app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`)
})

const io = require('socket.io')(server)


app.use(express.static(path.join(__dirname,'public')))

let socketsConnected = new Set();

io.on('connect' , onConnected)
function onConnected(socket){
    console.log(socket.id)
    socketsConnected.add(socket.id)

    io.emit('clients-total' , socketsConnected.size)

    socket.on('disconnect' , ()=>{
        console.log(`Socket Disconnected : ${socket.id}`);
        socketsConnected.delete(socket.id);
        io.emit('clients-total' , socketsConnected.size)
    })
}