import moment from 'moment';

const deadline = (date) => {
  const deadlineDate = date.slice(0, 10);
  return moment(deadlineDate).endOf('day').fromNow();
};

export default deadline;
