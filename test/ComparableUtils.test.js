//import { describe, test, expect } from "@jest/globals";
import { ComparableUtils, NumberUtils } from '../src';

describe('ComparableUtilsTest', () => {
  test('betweenTest', () => {
    const cb = ComparableUtils.between(1, 2, (a, b) => a - b);
    expect(cb(1)).toBeTruthy();
    expect(cb(2)).toBeTruthy();
    expect(cb(1.5)).toBeTruthy();
    expect(cb(0)).toBeFalsy();

    const cb2 = ComparableUtils.between(3, 1, (a, b) => a - b);
    expect(cb2(3)).toBeTruthy();
    expect(cb2(2)).toBeTruthy();
    expect(cb2(1)).toBeTruthy();
    expect(cb2(0)).toBeFalsy();
  });

  test('betweenExclusiveTest', () => {
    const cb = ComparableUtils.betweenExclusive(1, 2, (a, b) => a - b);
    expect(cb(1)).toBeFalsy();
    expect(cb(2)).toBeFalsy();
    expect(cb(1.5)).toBeTruthy();
    expect(cb(0)).toBeFalsy();

    const cb2 = ComparableUtils.betweenExclusive(3, 1, (a, b) => a - b);
    expect(cb2(3)).toBeFalsy();
    expect(cb2(2)).toBeTruthy();
    expect(cb2(1)).toBeFalsy();
    expect(cb2(0)).toBeFalsy();
  });

  test('eqTest', () => {
    const cb = ComparableUtils.eq(1, (a, b) => a - b);
    expect(cb(1)).toBeTruthy();
    expect(cb(2)).toBeFalsy();
    expect(cb(0)).toBeFalsy();
  });

  test('geTest', () => {
    const cb = ComparableUtils.ge(1, (a, b) => a - b);
    expect(cb(2)).toBeTruthy();
    expect(cb(1)).toBeTruthy();
    expect(cb(0)).toBeFalsy();
  });

  test('gtTest', () => {
    const cb = ComparableUtils.gt(1, (a, b) => a - b);
    expect(cb(2)).toBeTruthy();
    expect(cb(1)).toBeFalsy();
    expect(cb(0)).toBeFalsy();
  });

  test('leTest', () => {
    const cb = ComparableUtils.le(3, (a, b) => a - b);
    expect(cb(3)).toBeTruthy();
    expect(cb(2)).toBeTruthy();
    expect(cb(4)).toBeFalsy();
  });

  test('ltTest', () => {
    const cb = ComparableUtils.lt(3, (a, b) => a - b);
    expect(cb(2)).toBeTruthy();
    expect(cb(3)).toBeFalsy();
    expect(cb(4)).toBeFalsy();
  });
});
