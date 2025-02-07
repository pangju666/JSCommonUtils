import { DateFormatUtils, DateUtils } from 'pangju-utils';

describe('DateUtilsTest', () => {
  test('isDateTest', () => {
    expect(DateUtils.isDate(new Date())).toBeTruthy();
  });

  test('isSameDayTest', () => {
    expect(
      DateUtils.isSameDay(new Date(2021, 10, 22, 10, 22, 10), new Date(2021, 10, 22, 11, 10, 15)),
    ).toBeTruthy();
  });

  test('isSameInstantTest', () => {
    expect(DateUtils.isSameInstant(Date.now(), Date.now())).toBeTruthy();
    expect(
      DateUtils.isSameInstant(
        new Date(2021, 10, 22, 11, 10, 15),
        new Date(2021, 10, 22, 11, 10, 15),
      ),
    ).toBeTruthy();
  });

  test('parseDateTest', () => {
    expect(DateUtils.parseDate('2022-9-27', DateFormatUtils.DATE_FORMAT)).toStrictEqual(
      new Date(2022, 8, 27),
    );
  });

  test('toDateTest', () => {
    expect(DateUtils.toDate(new Date().getTime())).toStrictEqual(new Date());
    expect(DateUtils.toDate(new Date().getTime().toString(10))).toStrictEqual(new Date());
  });

  test('addYearsTest', () => {
    expect(DateUtils.addYears(new Date(), 1).getFullYear()).toEqual(2023);
  });

  test('addQuartersTest', () => {
    expect(DateUtils.addQuarters(new Date(), 1).getMonth()).toEqual(11);
  });

  test('addMonthsTest', () => {
    expect(DateUtils.addMonths(new Date(), 1).getMonth()).toEqual(9);
  });

  test('addWeeksTest', () => {
    expect(DateUtils.addWeeks(new Date(), 1).getDate()).toEqual(4);
  });

  test('addBusinessDaysTest', () => {
    expect(DateUtils.addBusinessDays(new Date(), 2).getDate()).toEqual(29);
  });

  test('addDaysTest', () => {
    expect(DateUtils.addDays(new Date(), 1).getDate()).toEqual(28);
  });

  test('addHoursTest', () => {
    expect(DateUtils.addHours(new Date(), 1).getHours()).toEqual(16);
  });

  test('addMinutesTest', () => {
    expect(DateUtils.addMinutes(new Date(2022, 10, 22, 10, 11), 1).getMinutes()).toEqual(12);
  });

  test('addSecondsTest', () => {
    expect(DateUtils.addSeconds(new Date(2022, 9, 27, 15, 14, 10), 1).getSeconds()).toEqual(11);
  });

  test('addMillisecondsTest', () => {
    expect(
      DateUtils.addMilliseconds(new Date(2022, 9, 27, 15, 14, 10, 100), 1).getMilliseconds(),
    ).toEqual(101);
  });

  test('setYearTest', () => {
    expect(DateUtils.setYear(new Date(), 2000).getFullYear()).toEqual(2000);
  });

  test('setQuarterTest', () => {
    expect(DateUtils.setQuarter(new Date(), 2).getMonth()).toEqual(5);
  });

  test('setMonthTest', () => {
    expect(DateUtils.setMonth(new Date(), 10).getMonth()).toEqual(9);
  });

  test('setDateTest', () => {
    expect(DateUtils.setDate(new Date(), 2).getDate()).toEqual(2);
  });

  test('setHoursTest', () => {
    expect(DateUtils.setHours(new Date(), 1).getHours()).toEqual(1);
  });

  test('setMinutesTest', () => {
    expect(DateUtils.setMinutes(new Date(), 1).getMinutes()).toEqual(1);
  });

  test('setSecondsTest', () => {
    expect(DateUtils.setSeconds(new Date(), 1).getSeconds()).toEqual(1);
  });

  test('setMillisecondsTest', () => {
    expect(DateUtils.setMilliseconds(new Date(), 1).getMilliseconds()).toEqual(1);
  });
});
