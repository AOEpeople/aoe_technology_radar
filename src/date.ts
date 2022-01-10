import moment from "moment";

const isoDateToMoment = (isoDate: moment.MomentInput) =>
  moment(isoDate, "YYYY-MM-DD");

export const formatRelease = (isoDate: moment.MomentInput, format: string = "MMMM YYYY") =>
  isoDateToMoment(isoDate).format(format);
