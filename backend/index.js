//const timeSlotService = require('timeslotservice.js')
const express = require('express')
const app = express()
const port = 3000
const {timeslotService} = require('./timeslotservice.js')


app.get('/', (req, res) => {
    //console.log(req.query)
    availableTimeslots = timeslotService(req.query.date)
    console.log(availableTimeslots)
    res.send(availableTimeslots)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})