const mongoose = require ('mongoose')

const carsSchema = mongoose.Schema( {
        
    dateDebut : String,
    dateFin:String,
    owner:{type:mongoose.Types.ObjectId,
    ref:'User'},
    car:{type:mongoose.Types.ObjectId,
        ref:'Car'},
    created_at:String,
    cin:{
        recto:{type:String},
        verso:{type:String}
    },
    passport:{type:String}

    
})

module.exports = mongoose.model('reservations',carsSchema)