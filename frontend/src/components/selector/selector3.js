import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import initialData from '../../mockData'
import { useState } from 'react';
import { timeService } from '../../services/timeService'
import { availabilityService } from '../../services/availabilityService'
import {generateEntriesService} from '../../services/generateEntriesService'

export const Selector = () => {
    const bookingTime = new Date('2020-11-25T16:00:00.000Z')
    const hours = ["8.00", "8.30", "9.00", "9.30", "10.00", "10.30", "11.00", "11.30", "12.00", "12.30", "13.00", "13.30", "14.00", "14.30", "15.00", "15.30", "16.00", "16.30", "17.00", "17.30", "18.00"]
    const availabilities = [{
        start: new Date('2020-11-25T08:00:00.000Z'),
        end: new Date('2020-11-25T09:00:00.000Z')
    }, {
        start: new Date('2020-11-25T13:00:00.000Z'),
        end: new Date('2020-11-25T16:00:00.000Z')
    }
    ]
    const data = generateEntriesService(bookingTime, availabilities)
    const [state, setState] = useState(data)
    //console.log(state)
    const onDragEnd = (result) => {
        // dropped outside the list
        console.log(result)
        const { destination, source, draggableId } = result;
        console.log(source)
        if (!destination) {
            console.log("no-change");
            return;
        }/*
        const newOrder = Array.from(state.order)
        newOrder.splice(source.index, 1);
        newOrder.splice(destination.index, 0, draggableId);
        const recalc = timeService(destination.index, availabilities)
        setState(state => ({
            ...state,
            order: newOrder,
            times: recalc.times,
            types: recalc.types,
            availabilities: recalc.availabilities
        }))
*/
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
                    {state.order.map((block, index) => (
                        <Droppable droppableId="droppable" key={index} type={state.data[block[0]].open}>
                            {(provided) => (
                                <div className="h-auto"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {block.map((id, index) => (
                                    state.data[id].type == "booking" ?
                                        <Draggable key={id} draggableId={id} index={index} type={state.data[block[0]].open}>
                                            {(provided) => (
                                                <div className="container h-px-270 bg-blue-200"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {state.data[id].time.getHours() + '.' + state.data[id].time.getMinutes()}
                                                </div>
                                            )}
                                        </Draggable>
                                    : 
                                    state.data[id].open ?
                                    <Draggable key={id} draggableId={id} index={index}  type={state.data[block[0]].open}>
                                        {(provided) => (
                                            <div className="container h-px-15 bg-gray-200"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                {state.data[id].time.getHours() + '.' + state.data[id].time.getMinutes()}
                                            </div>
                                        )}
                                    </Draggable>
                                    :
                                    <Draggable key={id} draggableId={id} index={index} isDragDisabled={true} type={state.data[block[0]].open}>
                                        {(provided) => (
                                            <div className="container h-px-15 bg-red-200"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                {state.data[id].time.getHours() + '.' + state.data[id].time.getMinutes()}
                                            </div>
                                        )}
                                    </Draggable>
                                    ))}
                                        {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>
        </div >
    )
}
