//import { describe, test, expect } from "@jest/globals";
import { DateFormatUtils } from '../src';

describe('DateFormatUtilsTest', () => {
  test('formatTest', () => {
    expect(DateFormatUtils.format(new Date())).toBe('2022-09-27');
    expect(DateFormatUtils.format(new Date().getTime())).toBe('2022-09-27');
    expect(DateFormatUtils.format(new Date().getTime(), 'yyyy_MM_dd')).toBe(
      '2022_09_27',
    );
  });
});
