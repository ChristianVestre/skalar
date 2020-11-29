const mockData = require('./mockdata.json')

const timeslotService = (date) => {
    const availabilities = mockDataTransformer(mockData)
    const booking = mockData['bookings'][0]['booking']
    const availableSlots = findTimeslots(availabilities, booking)
    return availableSlots
}

//function to check what timeslots fit with the constraints of the current booking, return all info needed for frontend
const findTimeslots = (availabilities, booking) => {
    let data = []
    for (id in availabilities['Wed_Nov_25_2020']) {
        availabilities['Wed_Nov_25_2020'][id]['timeslots'].map((t) => {
            t.map((s) => {
                if (booking.durationInMinutes + 1 <= s.length) {
                    data.push({
                        [id]: {
                            "name": availabilities['Wed_Nov_25_2020'][id].name,
                            "id": id,
                            "startTimeslot": s.start,
                            "endTimeslot": s.end,
                            "length": s.length
                        }
                    })
                }
            })
        })
    }
    return data
}

const mockDataTransformer = (mockData) => {
    let data = {}
    let start
    let end
    const replacer = new RegExp(" ", 'g')
    mockData['photographers']
        .map(p => p['availabilities']
            .map(a => {
                startAvailability = new Date(a.starts)
                endAvailability = new Date(a.ends)
                date = startAvailability.toDateString().replace(replacer, "_")
                //check if date and id exists in data structure, if not create entry
                if (!(date in data)) {
                    data = {
                        ...data,
                        [date]: {
                            [p.id]: {
                                "name": p.name,
                                "startAvailability": [],
                                "endAvailability": [],
                                "timeslots": []
                            }
                        }
                    }
                }
                //check if date exists but id does not, if so create entry for id
                if ((date in data) && !(p.id in data[date])) {
                    data = {
                        ...data,
                        [date]: {
                            ...data[date],
                            [p.id]: {
                                "name": p.name,
                                "startAvailability": [],
                                "endAvailability": [],
                                "timeslots": []
                            }
                        }
                    }
                }
                //populate availability data
                data[date][p.id]['timeslots'].push(
                    populateTimeslots(startAvailability, endAvailability, p.bookings, data[date][p.id])
                )
                data[date][p.id]['startAvailability'].push(startAvailability)
                data[date][p.id]['endAvailability'].push(endAvailability)
            }
            )
        )
        console.log(data)
    return data
}

//function to split up and create open time slots around availability constraints and current bookings
const populateTimeslots = (start, end, bookings) => {
    let timeslots = []
    let bookingStarts
    let bookingEnds
    bookings.map((b) => {
        bookingStarts = new Date(b.starts)
        bookingEnds = new Date(b.ends)
        //todo rethink combinations to make code more robust
        if (bookingStarts > start && bookingStarts < end) {
            timeslots.push(
                {
                    "start": start,
                    "end": bookingStarts,
                    "length": (((new Date(bookingStarts - start)).getHours() - 1) * 60) + (new Date(bookingStarts - start)).getMinutes()
                }
            )
        }
        if (bookingEnds < end) {
            timeslots.push(
                {
                    "start": bookingEnds,
                    "end": end,
                    "length": (((new Date(end - bookingEnds)).getHours() - 1) * 60) + (new Date(end - bookingEnds)).getMinutes()
                }
            )
        }
        if ((!(bookingStarts > start && bookingStarts < end) && (!(bookingEnds < end)))) {
            timeslots.push(
                {
                    "start": start,
                    "end": end,
                    "length": (((new Date(end - start)).getHours() - 1) * 60) + (new Date(end - start)).getMinutes()
                }
            )
        }
    }
    )
    return timeslots
}

module.exports = {timeslotService, mockDataTransformer , populateTimeslots}