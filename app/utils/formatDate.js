export const formatDate = date => {
  const datum = new Date();
  const year = datum.getFullYear();
  const month = datum.getMonth();
  const day = datum.getDay();

  return year + '-' + month + '-' + day;
};
export const monthArray = [
  'Jan',

  'Feb',

  'Mar',

  'Apr',

  'May',

  'Jun',

  'Jul',

  'Aug',

  'Sep',

  'Oct',

  'Nov',

  'Dec',
];
export const DateArray = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
// TODO: accept all date formatt
export const formatedDate = (dateInput, format) => {
  // default DD/MM/YYYY
  if (dateInput) {
    const date = moment(dateInput).toDate();
    const day = leadingZeros(date.getDate(), 2);
    const month = leadingZeros(date.getMonth() + 1, 2);
    const year = leadingZeros(date.getFullYear(), 4);
    let foramtedDate = `${day}/${month}/${year}`;
    if (format === 'YYYY-MM-DD') {
      foramtedDate = `${year}-${month}-${day}`;
    }
    if (format === 'MMM DD, HH:MM') {
      const hour = leadingZeros(date.getHours(), 2);
      const minute = leadingZeros(date.getMinutes(), 2);
      foramtedDate = `${monthArray[date.getMonth()]} ${day}, ${hour}:${minute}`;
    }
    if (format === 'MM:DD:YYYY') {
      foramtedDate = `${monthArray[date.getMonth()]} ${day}, ${year}`;
    }
    return foramtedDate;
  } else if (dateInput === '') {
    return '';
  } else {
    return '-/-/-';
  }
};
export const hoursFomat = time => {
  var dt = new Date(time);
  var hours = dt.getHours(); // gives the value in 24 hours format
  var AmOrPm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  var minutes = dt.getMinutes();
  var finalTime = hours + ':' + minutes + ' ' + AmOrPm;
  return finalTime;
};
export const tConvert = time => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
};
