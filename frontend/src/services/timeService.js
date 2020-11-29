import { availabilityService } from "./availabilityService"

//export const TimeService = (bookingIndex) => {
export const timeService = (bookingIndex, availabilities,bookingDuration) => {
    console.log(bookingIndex)
    let time = new Date('2020-11-25T07:00:00.000Z')
    const endTime =  new Date('2020-11-25T18:00:00.000Z')

    const indexList = [0]
    const times =[]
    const types =[]
    let type;
    let availabilityList =[]
    let available;
    let id;
    let i = 0
    while (time < endTime) {
        //time = new Date(time.getTime() + ((5 * 60 *1000)))
        i == bookingIndex ? type = "booking" : type = "time" 
        if(i == bookingIndex) console.log(type)
        time = new Date(time.getTime() + ((5 * 60 *1000)))
        available =  availabilityService(availabilities,time,bookingDuration)
        indexList.push(i)
        times.push(time)
        types.push(type)
        availabilityList.push(available)
        i++
        if(i == bookingIndex + 1) time = new Date(time.getTime() + (((85 * 60 *1000)))) 

    }
    return {index:indexList, times:times, types:types, availabilities:availabilityList}
}
//12 * 5 is one hour
//90 min == 18*5

