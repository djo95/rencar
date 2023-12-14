const Reservations = require('../Models/Reservations')

exports.getAllReservation = async (req,res)=>{
    try {
        const cars = await Reservations.find()
        res.status(200).send(cars)

    } catch (error) {
        res.status(500).send('could not get reservation')
    }
}
 
exports.getReservation = async (req,res)=>{
    try {
        const car = await Reservations.findById(req.params.id)
        res.status(200).send(car)


    } catch (error) {
        res.status(500).send('could not get reservation')
    }
}

exports.addReservation=(req,res)=>{
    try {
        console.log(req.body)
        const newCars = new Reservations(req.body)
        


        newCars.save()

         res.status(200).send({Msg:'Cars added',newCars})   
        
    } catch (error) {
        res.status(500).send('could not add reservation')
    }
}

exports.updateReservation=async (req,res)=>{
    try {
        
        const car = await Reservations.findByIdAndUpdate(req.params.id,{$set : req.body},{new: true})
        res.status(200).send(car)


    } catch (error) {
        res.status(500).send('could not get reservation')
    }
}

exports.deleteReservation=async (req,res)=>{
    try {
        const {id} = req.params

        await Reservations.findByIdAndDelete(id)

        res.status(200).send({Msg : 'reservation deleted'})
    } catch (error) {
        res.status(500).send('Could not delete reservation')
    }
}

exports.getMyReservation=async (req,res)=>{
    try {
        const {id} = req.params
        console.log(id)
    
        const AllReservations= await Reservations.find({owner : id})
        console.log(AllReservations)

        res.status(200).send({ AllReservations })
    } catch (error) {
        
        res.status(500).send({ msg: 'Can not get my reservations' })

}}

exports.getSearchReservation=async (req,res)=>{
    try {
        const {marque,modele} = req.body
        console.log(marque)
    
        const AllReservations = await Reservations.find({$or: [{marque : marque},{model:modele}]})
        console.log(AllReservations)

        res.status(200).send(AllReservations)
    } catch (error) {
        
        res.status(500).send({ msg: 'Can not get my reservations' })

    }
}