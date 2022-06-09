//Node server which will handle socket io connection
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const users = {};

io.on('connection',socket =>{
    //agar koi join krta h to baki ko btane ke liye ki koi join kia h 
    socket.on('new-user-joined',name =>{
        
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name);
    });
    //if someone sends the message broadcst it to other peaple
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    //if someone leaves the chat let others know 
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})
