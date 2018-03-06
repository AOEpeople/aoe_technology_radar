import moment from 'moment';

const isoDateToMoment = isoDate => moment(isoDate, 'YYYY-MM-DD');

export const formatRelease = isoDate =>
  isoDateToMoment(isoDate).format('MMMM YYYY');
