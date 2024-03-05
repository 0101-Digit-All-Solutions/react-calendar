
# React Task Calendar
A library of React Task Calendar. It allows to map your task array with the calendar and displays which dates have tasks.

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
| taskArray   | Array | Empty Array | Optional | The Array of tasks to display on calendar
| onSelectDate| Function | NA | Required | Called when a date is selected
| style   | Style Object | Default Style | Optional | Pass style object if you want to modify the style of root class
| headerLabelText| String | Month Date, Year | Optional | Pass your own header label when required
| headerLabelStyle   | Style Object | NA | Optional | Control your header label style
| headerContainerStyle| Style Object | NA | Optional | Control your header container style
| dropdownStyle| Style Object | NA | Optional | Control the style of month and year dropdown
| dotStyle| StyleObject | NA | Optional | Control your dot style on the calendar


# Screenshot

![ScreenShot](https://github.com/0101-Digit-All-Solutions/react-calendar/blob/a204d717a3c4e5061e9ebcf9d32e6ff5ddc24bcf/src/screenshots/image.png)