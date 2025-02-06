//import { describe, test, expect } from "@jest/globals";
import { BooleanUtils } from '../src';

describe('BooleanUtilsTest', () => {
  test('andTest', () => {
    expect(BooleanUtils.and(true, true, true)).toBeTruthy();
    expect(BooleanUtils.and(true, false, false)).toBeFalsy();
    expect(BooleanUtils.and(false, false, true)).toBeFalsy();
    expect(BooleanUtils.and(false, false, false)).toBeFalsy();
    expect(BooleanUtils.and(''.length === 0, 1 >= 0)).toBeTruthy();
    expect(BooleanUtils.and(''.length === 0, 1 <= 0)).toBeFalsy();
    expect(BooleanUtils.and([].length === 0)).toBeTruthy();
  });

  test('compareTest', () => {
    expect(BooleanUtils.compare([].length === 0, 1 === 1)).toBe(0);
    expect(BooleanUtils.compare([].length === 1, 1 === 1)).toBe(-1);
    expect(BooleanUtils.compare([].length === 0, 1 <= 0)).toBe(1);
  });

  test('notTest', () => {
    expect(BooleanUtils.not([].length === 0)).toBeFalsy();
    expect(BooleanUtils.not([].length === 1)).toBeTruthy();
    expect(BooleanUtils.not(null)).toBeNull();
  });

  test('orTest', () => {
    expect(BooleanUtils.or(true, true, true)).toBeTruthy();
    expect(BooleanUtils.or(true, false, false)).toBeTruthy();
    expect(BooleanUtils.or(false, false, true)).toBeTruthy();
    expect(BooleanUtils.or(false, false, false)).toBeFalsy();
    expect(BooleanUtils.or(''.length === 0, 1 >= 0)).toBeTruthy();
    expect(BooleanUtils.or(''.length === 1, 1 <= 0)).toBeFalsy();
    expect(BooleanUtils.or([].length === 0)).toBeTruthy();
  });

  test('toBooleanTest', () => {
    expect(BooleanUtils.toBoolean(1)).toBeTruthy();
    expect(BooleanUtils.toBoolean(0)).toBeFalsy();
    expect(BooleanUtils.toBoolean(1, 1, 0)).toBeTruthy();
    expect(BooleanUtils.toBoolean(0, 1, 0)).toBeFalsy();
    expect(BooleanUtils.toBoolean('yes')).toBeTruthy();
    expect(BooleanUtils.toBoolean('no')).toBeFalsy();
    expect(BooleanUtils.toBoolean('yes', 'yes', 'no')).toBeTruthy();
    expect(BooleanUtils.toBoolean('no', 'yes', 'no')).toBeFalsy();
    expect(BooleanUtils.toBoolean(null, null, 'no')).toBeTruthy();
    expect(BooleanUtils.toBoolean(null, 'yes', null)).toBeFalsy();
  });

  test('toIntegerTest', () => {
    expect(BooleanUtils.toInteger(false)).toStrictEqual(0);
    expect(BooleanUtils.toInteger(true, 2, -2)).toStrictEqual(2);
    expect(BooleanUtils.toInteger(null)).toBeNaN();
    expect(BooleanUtils.toInteger(null, 1, 0, 0)).toStrictEqual(0);
  });

  test('toStringTest', () => {
    expect(BooleanUtils.toString(true, 'true', 'false', null)).toStrictEqual(
      'true',
    );
    expect(BooleanUtils.toString(false, 'true', 'false', null)).toStrictEqual(
      'false',
    );
  });
});
