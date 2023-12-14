const express = require('express')
const Cars = require('../Models/Cars')
const ControllerCars= require('../Controllers/ControllerCars')

const carsRouter = express.Router()

carsRouter.post('/addCars',ControllerCars.addCar)

carsRouter.get('/getAll',ControllerCars.getAllCar)


carsRouter.get('/getById/:id',ControllerCars.getCars)

carsRouter.put('/updateCar/:id',ControllerCars.updateCar)

carsRouter.delete('/deleteCar/:id',ControllerCars.deleteCar)

carsRouter.get('/getMyCars/:id',ControllerCars.getCars)

carsRouter.post('/getSearchCars',ControllerCars.getSearchCars)








module.exports = carsRouter