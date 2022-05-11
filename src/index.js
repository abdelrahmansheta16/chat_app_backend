const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const {generateMessage,generateLocationMessage} = require('./utils/messages')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const {addUser,removeUser,getUser,getUserInRoom}= require('./utils/users')
const { isFloat32Array } = require('util/types')

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    socket.on('join',({username,room})=>{
        const {error,user} = addUser({
            id:socket.id,...options
        })
        if(error){
           return callback(error)
        }
        socket.join(user.room)
            //send only to user with connection
    socket.emit('message',generateMessage('Welcome'))
    //send to everyone but the user with connection
    socket.broadcast.to(user.room).emit('message',generateMessage(`${user.username} has joined`))
    // io.to.emit sends to everyone in the room, socket.broadcast.to.emit sends to everyone but the user

    io.to(user.room).emit('roomData',{
        room:user.room,
        users:getUserInRoom(user.room)
    })

    callback()
    })
    socket.on('sendMessage',(msg,callback) =>{
        const user = getUser(socket.id)
        //send to everyone
        io.to(user.room).emit('message',generateMessage(user.username,msg))
        callback('Delivered')
    }) 


    socket.on('sendLocation',(msg,callback) =>{
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage',generateLocationMessage(user.username,`https://google.com/maps/@${msg.latitude},${msg.longtitude}`))
        callback('Location Shared!')
    })
    socket.on('disconnect',()=>{
       const user = removeUser(socket.id)

       if(user){
        io.to(user.room).emit('message',generateMessage(`${user.username} has left`))
        io.to(user.room).emit('roomData',{
            room:user.room,
            users:getUserInRoom(user.room)
        })
       }

    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})