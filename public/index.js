const socket = io()
window.addEventListener("load",function(){
    const message = document.getElementById("message")
    const send = document.getElementById("send")
    const disconnect = document.getElementById("disconnect")
    const connect = document.getElementById("connect")
    const recibido = document.getElementById("recibido")
    const users = document.getElementById("users")
    const clear = document.getElementById("clear")

    //buttons
    clear.addEventListener("click", ()=>{
        recibido.innerText = ""
    })
    send.addEventListener("click", ()=>{
        socket.emit("message",message.value)
        message.value=""
        let writing = false
        socket.emit("writing",writing)
    })
    disconnect.addEventListener("click",()=>{
        socket.close()
        users.innerHTML = "<p>no connection</p>"
    })
    connect.addEventListener("click",()=>{
        socket.open()
    })

    //sms field
    let writing = false
    message.addEventListener("keyup",(e)=>{
        if(writing){
            if(!message.value){
                writing = false
                socket.emit("writing",writing)
            }
        }else{
            if(message.value){
                writing = true
                socket.emit("writing",writing)
            }
        }
    })

    socket.on("message",(data)=>{
        recibido.innerText += data+"\n"
    })

    socket.on("users",(data)=>{
        users.innerHTML = ""
        for (let i of data.users){
            if(i.writing){
                users.innerHTML += "<li>"+i.user+"<span>  --escribiendo--  </span>"+"</li>" 
            } else {
                users.innerHTML += "<li>"+i.user+"</li>" 
            }
        }
    })
})