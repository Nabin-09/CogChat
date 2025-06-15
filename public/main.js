const socket = io()

socket.on('clients-total' , (data)=>{
    console.log(data)
})