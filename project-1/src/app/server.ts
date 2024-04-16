import app from "./app"
const port = 5000

let server;
async function bootStrap() {
    server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

bootStrap()