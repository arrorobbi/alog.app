const date = (data) =>{
  const date = new Date(data);
  const dateWithoutTime = date.toDateString();
  return dateWithoutTime
}

const day = (data) => {
  return data.toLocaleString('en-us', {  month: 'long' })
}

const convertDate = (data) => {
	// Get the individual components of the date (year, month, day)
	const year = data.getFullYear();
	const month = String(data.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(data.getDate()).padStart(2, '0');

	// Construct the date string in the format YYYY-MM-DD
	return`${year}-${month}-${day}`;
}

const week = (data) =>{
  const date = new Date(data);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  const result = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  return result
}

module.exports = {date,week,day,convertDate}