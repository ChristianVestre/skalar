import {availabilityService} from '../services/availabilityService'

export const generateEntriesService = () => {
    const bookingDuration = 90
    const bookingTime = new Date('2020-11-25T13:00:00.000Z')
    let time = new Date('2020-11-25T08:00:00.000Z')
    const endTime = new Date('2020-11-25T19:00:00.000Z')
    const availabilities = [{
            start: new Date('2020-11-25T08:00:00.000Z'),
            end:new Date('2020-11-25T09:00:00.000Z')
        },{
            start: new Date('2020-11-25T11:00:00.000Z'),
            end: new Date('2020-11-25T16:00:00.000Z')
        }
    ]
    const blocks = [[]]
    const timeList = []
    const types = []
    const map = {}
    let lastOpen = availabilityService(availabilities,time,bookingDuration)
    let i = 0;
    let id;
    let type;
    let open = availabilityService(availabilities,time,bookingDuration)
    while (time < endTime) {
        open = availabilityService(availabilities,time,bookingDuration)
        id = time.getTime().toString()
        time.getTime() == bookingTime.getTime() ? time = new Date(time.getTime() + (((90 * 60 * 1000)))) : time = new Date(time.getTime() + ((5 * 60 * 1000)))
        time.getTime() == bookingTime.getTime() ? type = "booking" : type = "time"

        if(time.getTime() == bookingTime.getTime()) console.log(time) 
        timeList.push(time)
        types.push(type)

        if(open != lastOpen){
            blocks.push([])
            i++
        }
        map[id] = {time:time,open:open,type:type}
        blocks[i].push(id)
        lastOpen = open
    }


    return { times: timeList, order: blocks, types: types, data:map}

}

