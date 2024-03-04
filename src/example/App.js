// import CalendarDays from "../lib/CalendarDays"

import { Calendar } from "../lib/Calendar"

const taskArray = [
    {
        task_id: 1,
        task_title: 'New Task',
        task_description: 'nnnnn',
        status: 'active',
        due_date: '2024-03-11T18:30:00Z',
    },
    {
        task_id: 2,
        task_title: 'New Task',
        task_description: 'nnnnn',
        status: 'active',
        due_date: '2024-03-04',
    },
    {
        task_id: 3,
        task_title: 'New Task',
        task_description: 'nnnnn',
        status: 'active',
        due_date: '2024-03-19',
    },
    {
        task_id: 4,
        task_title: 'New Task',
        task_description: 'nnnnn',
        status: 'active',
        due_date: '2024-03-16',
    },
    {
        task_id: 5,
        task_title: 'New Task',
        task_description: 'nnnnn',
        status: 'active',
        due_date: '2024-03-13',
    },
    {
        task_id: 6,
        task_title: 'New Task',
        task_description: 'nnnnn',
        status: 'active',
        due_date: '2024-04-06',
    },
    {
        task_id: 7,
        task_title: 'New Task',
        task_description: 'nnnnn',
        status: 'active',
        due_date: '2024-05-09',
    },
  ]
  

export const App = () => {
    return (
        <div style={{width: window.innerWidth * 0.3}}>
           <Calendar taskArray={taskArray} onSelectDate={(selectedDate) => console.log('selected Date is:', selectedDate)}/>
        </div>
    )
}