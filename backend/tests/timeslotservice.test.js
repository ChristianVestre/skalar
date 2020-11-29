const { timeslotService } = require('./../timeslotservice')
const { mockDataTransformer } = require('./../timeslotservice')
const { populateTimeslots } = require('./../timeslotservice')

test('populate timeslots', () => {
    expect(populateTimeslots(
        //start
        new Date("2020-11-25T08:00:00.000Z"),
        //end
        new Date("2020-11-25T16:00:00.000Z"),
        //booking
        [{
            "id": "1",
            "starts": "2020-11-25T08:30:00.000Z",
            "ends": "2020-11-25T09:30:00.000Z"
        }]
    )).toStrictEqual(
        [
            {
                "start": new Date("2020-11-25T08:00:00.000Z"),
                "end": new Date("2020-11-25T08:30:00.000Z"),
                "length": 30
            },
            {
                "start": new Date("2020-11-25T09:30:00.000Z"),
                "end": new Date("2020-11-25T16:00:00.000Z"),
                "length": 390
            }

        ]
    );
});

test('timeslotService', () => {
    expect(timeslotService(('25/11/20')))
    .toStrictEqual([
        {
            "1":{
                "name":"Otto Crawford",
                "id":"1",
                "startTimeslot":new Date("2020-11-25T09:30:00.000Z"),
                "endTimeslot":new Date("2020-11-25T16:00:00.000Z"),
                "length":390
            }
        }
    ,   
        {
            "2":{
                "name":"Jens Mills",
                "id":"2",
                "startTimeslot":new Date("2020-11-25T13:00:00.000Z"),
                "endTimeslot":new Date("2020-11-25T15:00:00.000Z"),
                "length":120
            }
        }
    ]
    )

})


test('transform mock data', () => {
    expect(mockDataTransformer(
        {
            "photographers": [
                {
                    "id": "1",
                    "name": "Otto Crawford",
                    "availabilities": [
                        {
                            "starts": "2020-11-25T08:00:00.000Z",
                            "ends": "2020-11-25T16:00:00.000Z"
                        }
                    ],
                    "bookings": [
                        {
                            "id": "1",
                            "starts": "2020-11-25T08:30:00.000Z",
                            "ends": "2020-11-25T09:30:00.000Z"
                        }
                    ]
                },
                {
                    "id": "2",
                    "name": "Jens Mills",
                    "availabilities": [
                        {
                            "starts": "2020-11-25T08:00:00.000Z",
                            "ends": "2020-11-25T09:00:00.000Z"
                        },
                        {
                            "starts": "2020-11-25T13:00:00.000Z",
                            "ends": "2020-11-25T16:00:00.000Z"
                        }
                    ],
                    "bookings": [
                        {
                            "id": "2",
                            "starts": "2020-11-25T15:00:00.000Z",
                            "ends": "2020-11-25T16:00:00.000Z"
                        }
                    ]
                }
            ]
        },
    )).toStrictEqual(
        {
            Wed_Nov_25_2020: {
                '1': {
                    name: 'Otto Crawford',
                    startAvailability: [new Date('2020-11-25T08:00:00.000Z')],
                    endAvailability: [new Date('2020-11-25T16:00:00.000Z')],
                    timeslots: 
                        [[{
                            "start": new Date("2020-11-25T08:00:00.000Z"),
                            "end": new Date("2020-11-25T08:30:00.000Z"),
                            "length": 30
                        },
                        {
                            "start": new Date("2020-11-25T09:30:00.000Z"),
                            "end": new Date("2020-11-25T16:00:00.000Z"),
                            "length": 390
                        }]]
                },
                '2': {
                    name: 'Jens Mills',
                    startAvailability: [new Date('2020-11-25T08:00:00.000Z'),new Date('2020-11-25T13:00:00.000Z')],
                    endAvailability: [new Date('2020-11-25T09:00:00.000Z'),new Date('2020-11-25T16:00:00.000Z')],
                    timeslots: [[
                        {
                            "start": new Date("2020-11-25T08:00:00.000Z"),
                            "end": new Date("2020-11-25T09:00:00.000Z"),
                            "length": 60
                        }],
                        [{
                            "start": new Date("2020-11-25T13:00:00.000Z"),
                            "end": new Date("2020-11-25T15:00:00.000Z"),
                            "length": 120
                        }
                    ]]
                }
            }
        }
    );
});