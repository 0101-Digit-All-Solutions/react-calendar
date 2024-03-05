
# Customizable-React-Calendar-Library
A library of React Task Calendar. Pass a task array to display them on your calendar.

## Installation
Run the following command:
`npm install @0101-labs/react-calendar`

# Usages


` <Calendar 
  taskArray={taskArray}
  onSelectDate={(selectedDate) => console.log(selectedDate)}
  />`
  

# Properties
  
  | Prop        | Type           | default  | Required | Note  |
| ------------|:--------------:| :-------:|:--------:|:-----:|
| taskArray   | Array | NA | Optional | The Array of tasks to display on calendar
| onSelectDate| Function | NA | Optional | Called when a date is selected