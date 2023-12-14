const express = require('express')
const Cars = require('../Models/Reservations')
const ControllerReservations= require('../Controllers/ControllerReservations')

const carsRouter = express.Router()

carsRouter.post('/addReservation',ControllerReservations.addReservation)

carsRouter.get('/getReservations',ControllerReservations.getAllReservation)


carsRouter.get('/getById/:id',ControllerReservations.getReservation)

carsRouter.put('/updateReservation/:id',ControllerReservations.updateReservation)

carsRouter.delete('/deleteReservation/:id',ControllerReservations.deleteReservation)

carsRouter.get('/getMyReservation/:id',ControllerReservations.getMyReservation)

carsRouter.post('/getSearchReservation',ControllerReservations.getSearchReservation)








module.exports = carsRouter