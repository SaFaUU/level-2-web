const fs = require('fs');

// reading text asynchronously

fs.readFile('./texts/read.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})

fs.writeFile('./texts/write.txt', 'Hello my name is Safa from asynchronus function', (err) => {
    if (err) {
        console.log(err);
    }
})