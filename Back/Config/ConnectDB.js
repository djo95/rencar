const mongoose = require('mongoose')


const ConnectDB = async ()=>{
    try {
        await mongoose.connect('mongodb://db:27017/firstProject')
        console.log("DB is connected")
    } catch (error) {
        console.log(error)
        
    }

}


module.exports = ConnectDB