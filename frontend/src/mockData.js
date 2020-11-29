export default {
    tasks:{
        "task-1": {id:'task-1', content: 'Take out the garbage'},
        "task-2": {id:'task-2', content: 'Watch my favorite show'},
        "task-3": {id:'task-3', content: 'Cook dinner'},
    },
    columns:{
        'column-1':{
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1','task-2','task-3']
        }
    },
    columnOrder:['column-1']



}