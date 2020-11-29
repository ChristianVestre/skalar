export const availabilityService = (availabilities,time, bookingDuration) =>{
    let open = false
    availabilities.map( (a) => {
        if(a.start < time && a.end > time){
            return open = true
        } 
    }
    )


    return open
}