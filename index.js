const app = require('./app')
const mongoose = require('mongoose')
const InitializerDB = require('./helpers/initializerDB')

const port = process.env.port || 5000

async function start(){
    try{
        await mongoose.connect("mongodb://localhost:27017/MovieDB", {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
        app.listen(port, async ()=>{
            await InitializerDB.initialize();
            console.log(`Server run on port ${port}`);
        })
    }catch(ex){
        console.log(ex)
    }
}

start()