const EventEmitter = require('events')

const myEmitter = new EventEmitter()
// listener

myEmitter.on('birthday', () => {
    console.log("Happy Birthday to You");
})

myEmitter.on('birthday', (gift) => {
    console.log(`Happy Birthday to You Again ${gift}`);
})

myEmitter.emit('birthday', 'cake')
