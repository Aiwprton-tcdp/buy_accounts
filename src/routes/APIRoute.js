import express from 'express'
import APIController from '../controllers/APIController.js'

const APIRoute = express.Router()

APIRoute.get('/balance', APIController.getUserBalance)
APIRoute.get('/list', APIController.getAccountsList)
APIRoute.get('/reserve', APIController.reserveAccount)
APIRoute.get('/check', APIController.checkAccount)

export default APIRoute