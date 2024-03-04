"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _colors = require("../theme/colors");
const styles = exports.styles = {
  headerContainer: {
    width: '100%',
    height: 50,
    backgroundColor: _colors.colors.headerColor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRadius: 15
  },
  headerLabel: {
    color: _colors.colors.primaryWhite,
    fontSize: 20,
    fontWeight: '500px',
    marginLeft: '10px'
  },
  dayContainer: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dayLabel: {
    color: _colors.colors.blackOne,
    fontSize: 32,
    fontWeight: '500px'
  },
  datecontainer: {
    width: '100%',
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dropdownContainerCenter: {
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdownContainerRight: {
    width: '30%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdown: {
    height: '12px',
    width: '20px',
    marginLeft: '10px'
  },
  days: isToday => ({
    width: '50px',
    height: '50px',
    // minHeght: '75px',
    borderRadius: '35',
    alignItems: 'center',
    justifyContent: 'center',
    ...(isToday && {
      borderColor: '#5DCCD3',
      backgroundColor: '#5DCCD3',
      color: "#ffff"
    })
  }),
  daysSpan: {
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  dotStyle: {
    position: 'absolute',
    zIndex: 1,
    top: '-15px',
    left: 0,
    right: 0,
    color: 'red',
    fontSize: '24px',
    fontWeight: 'bold'
  }
};