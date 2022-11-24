const server = require("./app")
const socketIo = require("socket.io")
const io = socketIo(server)
let users=[]

io.on("connection", (socket)=>{
    socket.nickname = "stranger"
    socket.on("nickname",(nick)=>{
        socket.nickname = nick || "stranger"
    })
    socket.join("room_1")
    socket.to("room_1").emit("message", socket.nickname +" connected")

    socket.on("writing", (data)=>{
        users = users.map(user=>{
            if(user.user == socket.id){
                user.writing = data
            }
            return user
        })
        io.emit("users",{users:users})
    })

    socket.on("message",(data)=>{
        let mensaje = socket.id + " : " + data
        io.to("room_1").emit("message",mensaje)
    })

    socket.on("disconnect",()=>{
        
        io.in(`room_1`).fetchSockets().then(data=>{
            users = data.map(user=>{
                return {user:user.id, writing:false}
            })
            io.emit("users",{users:users})
            io.to("room_1").emit("message",socket.id+" disconnect")
        })
    })

    io.in(`room_1`).fetchSockets().then(data=>{
        users = data.map(user=>{
            return {user:user.nickname, writing:false}
        })
        io.emit("users",{users:users})
    })
    console.log(socket.nickname);
})