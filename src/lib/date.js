const date = (data) =>{
  const date = new Date(data);
  const dateWithoutTime = date.toDateString();
  return dateWithoutTime
}

const day = (data) => {
  return data.toLocaleString('en-us', {  month: 'long' })
}

const week = (data) =>{
  const date = new Date(data);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  const result = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  return result
}

module.exports = {date,week,day}