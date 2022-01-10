import moment from "moment";
import { formatRelease } from "./date";

describe("formatRelease", () => {
  it("should format a date object using default output format", () => {
    expect(formatRelease(moment('2022-01-05'))).toEqual('January 2022')
  });
  it("should format a date object using a custom output format", () => {
    expect(formatRelease(moment('2022-01-05'), 'DD.MM.YYYY')).toEqual('05.01.2022')
  });
});
