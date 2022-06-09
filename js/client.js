const socket = io('http://localhost:8000');

//get DOM variables in the respective JS variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messagecontainer = document.querySelector(".container");

//function that will append event info to he container
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message ;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
}

//if the form gets submited send server the message 
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you:${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '' ;
})

//Ask new user name and let the server know
const name = prompt("enter ur name to join ");
socket.emit('new-user-joined',name);

//if the the new  user joins , reviece their namethe event from the server
socket.on('user-joined',name =>{
    append(`${name} : joined the chat`,'right')
})

//if server sends message recieve it
socket.on('receive',data =>{
    append(`${data.name}: ${data.message}`,'left')
})

//if the user leaves the chat , append the info to the container 
socket.on('left',name =>{
    append(`${name} : Left the chat`,'left')
})

