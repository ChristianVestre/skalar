import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import initialData from '../../mockData'
import { useState } from 'react';
import {timeService} from '../../services/timeService'
import {availabilityService} from '../../services/availabilityService'

export const Selector = () => {
    const bookingTime = new Date('2020-11-25T12:00:00.000Z')
    const bookingDuration = 90;
    const hours = ["8.00","8.30","9.00","9.30","10.00","10.30","11.00","11.30","12.00","12.30","13.00","13.30","14.00","14.30","15.00","15.30","16.00","16.30","17.00","17.30","18.00"]
    const availabilities = [{
            start: new Date('2020-11-25T08:00:00.000Z'),
            end:new Date('2020-11-25T09:00:00.000Z')
        },{
            start: new Date('2020-11-25T13:00:00.000Z'),
            end: new Date('2020-11-25T16:00:00.000Z')
        }
    ]
    const data = generateData(bookingTime,availabilities)

    const [state, setState] = useState(data)
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if(state.availabilities[destination.index] == false) return

        const newOrder = Array.from(state.order)
        newOrder.splice(source.index, 1);
        newOrder.splice(destination.index, 0, draggableId);
        const recalc = timeService(destination.index,availabilities,bookingDuration)
        setState(state => ({ 
            ...state,
            order: newOrder,
            times:recalc.times,
            types:recalc.types,
            availabilities:recalc.availabilities
        }))
    }

    return (
        <div className="container flex justify-between border-2 border-black">
            <div className=" flex-column">
                {hours.map((h) => (
                    <div className="h-24" key={h}>
                        {h}
                    </div>
                ))
                }
            </div>
            <div className="container w-4/5 ">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {state.order.map((id, index) => (
                                    state.types[index] == "booking" ?
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <div className="container h-px-270 bg-blue-200"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {state.times[index].getHours() + '.' + state.times[index].getMinutes()}
                                                </div>
                                            )}
                                        </Draggable>
                                        : state.availabilities[index] == true ? 
                                        <Draggable key={id} draggableId={id} index={index} isDragDisabled={true} >
                                            {(provided) => (
                                                <div className="container h-px-15 bg-gray-200"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    {state.times[index].getHours() + '.' + state.times[index].getMinutes()}
                                                </div>
                                            )}
                                        </Draggable>
                                        :
                                        <Draggable key={id} draggableId={id} index={index} isDragDisabled={true}>
                                        {(provided) => (
                                            <div className="container h-px-15 bg-red-200"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                {state.times[index].getHours() + '.' + state.times[index].getMinutes()}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}

const generateData = (bookingTime,availabilities) => {
    let time = new Date('2020-11-25T08:00:00.000Z')
    const endTime =  new Date('2020-11-25T19:00:00.000Z')

    const timeList = []
    const types = []
    const availabilityList = []
    const ids = []
    let availability
    let i = 0
    let type
    let id;
    const bookingDuration = 90;
    while (time < endTime) {
        id = time.getTime().toString()
        time.getTime() == bookingTime.getTime() ? time = new Date(time.getTime() + (((90 * 60 *1000)))) : time = new Date(time.getTime() + ((5 * 60 *1000)))
        time.getTime() == bookingTime.getTime()  ? type = "booking" : type = "time"
        availability = availabilityService(availabilities,time,bookingDuration)

        i++
        timeList.push(time)
        types.push(type)
        ids.push(id)
        availabilityList.push(availability)

    }
    return { times:timeList, order: ids, types:types ,availabilities:availabilityList }


}


