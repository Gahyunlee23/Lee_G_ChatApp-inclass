// imports always go first - if we're importing anything

const socket = io();

function setUserId(packet) {
    debugger;
    console.log(packet);
} 

function runDisconnectMesaage(packet) {
    debugger;
    console.log(packet);
}

// sone event handling -? these event are coming from the server
socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnected', runDisconnectMesaage);