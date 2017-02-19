import moment from 'moment';

const deadline = (date) => {
  const newDate = date.slice(0, 10);
  console.log(newDate)
  return moment(newDate).endOf('day').fromNow();
};

export default deadline;
