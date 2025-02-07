import { ObjectUtils } from 'pangju-utils';

describe('ObjectUtilsTest', () => {
  test('isNotNullTest', () => {
    expect(ObjectUtils.isNotNull(undefined)).toBeFalsy();
    expect(ObjectUtils.isNotNull(null)).toBeFalsy();
    expect(ObjectUtils.isNotNull('demo')).toBeTruthy();
    expect(ObjectUtils.isNotNull(1)).toBeTruthy();
    expect(ObjectUtils.isNotNull(true)).toBeTruthy();
    expect(ObjectUtils.isNotNull(false)).toBeTruthy();
    expect(ObjectUtils.isNotNull({ name: 'admin' })).toBeTruthy();
  });

  test('isNullTest', () => {
    expect(ObjectUtils.isNull(undefined)).toBeTruthy();
    expect(ObjectUtils.isNull(null)).toBeTruthy();
    expect(ObjectUtils.isNull('demo')).toBeFalsy();
    expect(ObjectUtils.isNull(1)).toBeFalsy();
    expect(ObjectUtils.isNull(true)).toBeFalsy();
    expect(ObjectUtils.isNull(false)).toBeFalsy();
    expect(ObjectUtils.isNull({ name: 'admin' })).toBeFalsy();
  });

  test('allNotNullTest', () => {
    expect(ObjectUtils.allNotNull()).toBeTruthy();
    expect(ObjectUtils.allNotNull(undefined, null)).toBeFalsy();
    expect(ObjectUtils.allNotNull(undefined, 1, '', true)).toBeFalsy();
    expect(ObjectUtils.allNotNull(null, 1, '', true, {})).toBeFalsy();
    expect(ObjectUtils.allNotNull(1, '', true, {})).toBeTruthy();
  });

  test('allNullTest', () => {
    expect(ObjectUtils.allNotNull()).toBeTruthy();
    expect(ObjectUtils.allNull(undefined, null)).toBeTruthy();
    expect(ObjectUtils.allNull(undefined, undefined)).toBeTruthy();
    expect(ObjectUtils.allNull(null)).toBeTruthy();
    expect(ObjectUtils.allNull(1, '', {})).toBeFalsy();
    expect(ObjectUtils.allNull(1, null, {})).toBeFalsy();
  });

  test('anyNotNullTest', () => {
    expect(ObjectUtils.anyNotNull(undefined, null, undefined)).toBeFalsy();
    expect(ObjectUtils.anyNotNull(null, null, null)).toBeFalsy();
    expect(ObjectUtils.anyNotNull(null, null, 1)).toBeTruthy();
    expect(ObjectUtils.anyNotNull(1, null, false)).toBeTruthy();
  });

  test('anyNullTest', () => {
    expect(ObjectUtils.anyNull(1, null, undefined)).toBeTruthy();
    expect(ObjectUtils.anyNull(1, null, null)).toBeTruthy();
    expect(ObjectUtils.anyNull(1, true, {})).toBeFalsy();
    expect(ObjectUtils.anyNull(1, '', false)).toBeFalsy();
  });

  test('copyTest', () => {
    const source1 = { a: 1, b: 'test2' };
    const target1 = { c: 1, d: false };
    ObjectUtils.copy(source1, target1);
    expect(target1).toEqual({ a: 1, b: 'test2', c: 1, d: false });

    const source2 = { a: 1, b: 'test2' };
    const target2 = {};
    ObjectUtils.copy(source2, target2);
    expect(target2).toEqual(source2);

    const source3 = { a: 1, b: 'test2' };
    const target3 = { a: 2, b: 'test1' };
    ObjectUtils.copy(source3, target3);
    expect(target3).toEqual(source3);

    const source4 = { a: 1, b: 'test2' };
    const target4 = null;
    ObjectUtils.copy(source4, target4);
    expect(target4).toBeNull();

    const source5 = null;
    const target5 = { a: 2, b: 'test1' };
    ObjectUtils.copy(source5, target5);
    expect(target5).toEqual({ a: 2, b: 'test1' });
  });

  test('cloneTest', () => {
    const source1 = null;
    expect(ObjectUtils.clone(source1)).toBeNull();

    const source2 = 2;
    expect(ObjectUtils.clone(source2)).toBe(2);

    const source3 = { a: 1, b: 'test2' };
    expect(ObjectUtils.clone(source3)).toEqual({ a: 1, b: 'test2' });

    const innerObj = { d: false };
    const source4 = { a: 1, b: 'test2', c: innerObj };
    const cloneObj = ObjectUtils.clone(source4);
    source4.c.d = true;
    expect(cloneObj.c.d).toBeTruthy();
  });

  test('deepCloneTest', () => {
    const source1 = null;
    expect(ObjectUtils.deepClone(source1)).toBeNull();

    const source2 = 2;
    expect(ObjectUtils.deepClone(source2)).toBe(2);

    const source3 = { a: 1, b: 'test2' };
    expect(ObjectUtils.deepClone(source3)).toEqual({ a: 1, b: 'test2' });

    const innerObj = { d: false };
    const source4 = { a: 1, b: 'test2', c: innerObj };
    const cloneObj = ObjectUtils.deepClone(source4);
    source4.c.d = true;
    expect(cloneObj['c'].d).toBeFalsy();
  });

  test('compareTest', () => {
    const a1 = null;
    const b1 = null;
    expect(ObjectUtils.compare(a1, b1, (left, right) => left - right)).toBe(0);

    const a2 = null;
    const b2 = 1;
    expect(ObjectUtils.compare(a2, b2, (left, right) => left - right)).toBeLessThanOrEqual(-1);

    const a3 = 2;
    const b3 = 1;
    expect(ObjectUtils.compare(a3, b3, (left, right) => left - right)).toBeGreaterThanOrEqual(1);
  });

  test('defaultIfConditionTest', () => {
    expect(ObjectUtils.defaultIfCondition(null, {}, true)).toStrictEqual(null);
    expect(ObjectUtils.defaultIfCondition(null, {}, false)).toStrictEqual({});
    expect(ObjectUtils.defaultIfCondition('', '1234', true)).toStrictEqual('');
    expect(ObjectUtils.defaultIfCondition('', '1234', false)).toStrictEqual('1234');
    expect(
      ObjectUtils.defaultIfCondition({ test: 1 }, { test: 2 }, (value) =>
        ObjectUtils.isNotNull(value),
      ),
    ).toStrictEqual({ test: 1 });
    expect(
      ObjectUtils.defaultIfCondition(null, { test: 2 }, (value) => ObjectUtils.isNotNull(value)),
    ).toStrictEqual({ test: 2 });
  });

  test('firstNonNullTest', () => {
    expect(ObjectUtils.firstNonNull(null, {}, true)).toStrictEqual({});
    expect(ObjectUtils.firstNonNull(null, undefined, false)).toStrictEqual(false);
    expect(ObjectUtils.firstNonNull('', { test: 1 }, true)).toStrictEqual('');
  });

  test('isEmptyTest', () => {
    expect(ObjectUtils.isEmpty(null)).toBeTruthy();
    expect(ObjectUtils.isEmpty('')).toBeTruthy();
    expect(ObjectUtils.isEmpty('ab')).toBeFalsy();
    expect(ObjectUtils.isEmpty([])).toBeTruthy();
    expect(ObjectUtils.isEmpty([1, 2, 3])).toBeFalsy();
    expect(ObjectUtils.isEmpty({})).toBeTruthy();
    expect(ObjectUtils.isEmpty({ test: 1234 })).toBeFalsy();
    expect(ObjectUtils.isEmpty(new Date())).toBeFalsy();
    const map = new Map();
    expect(ObjectUtils.isEmpty(map)).toBeTruthy();
    map.set(1, '1');
    expect(ObjectUtils.isEmpty(map)).toBeFalsy();
    const set = new Set();
    expect(ObjectUtils.isEmpty(set)).toBeTruthy();
    set.add(1);
    expect(ObjectUtils.isEmpty(set)).toBeFalsy();
  });

  test('isNotEmptyTest', () => {
    expect(ObjectUtils.isNotEmpty(null)).toBeFalsy();
    expect(ObjectUtils.isNotEmpty('')).toBeFalsy();
    expect(ObjectUtils.isNotEmpty('ab')).toBeTruthy();
    expect(ObjectUtils.isNotEmpty([])).toBeFalsy();
    expect(ObjectUtils.isNotEmpty([1, 2, 3])).toBeTruthy();
    expect(ObjectUtils.isNotEmpty({})).toBeFalsy();
    expect(ObjectUtils.isNotEmpty({ test: 1234 })).toBeTruthy();
    expect(ObjectUtils.isNotEmpty(new Date())).toBeTruthy();
    const map = new Map();
    expect(ObjectUtils.isNotEmpty(map)).toBeFalsy();
    map.set(1, '1');
    expect(ObjectUtils.isNotEmpty(map)).toBeTruthy();
    const set = new Set();
    expect(ObjectUtils.isNotEmpty(set)).toBeFalsy();
    set.add(1);
    expect(ObjectUtils.isNotEmpty(set)).toBeTruthy();
  });

  test('maxTest', () => {
    expect(ObjectUtils.max((left, right) => left - right, 1, 2, 3, 4, 7, 3, 9, 10, 2, 15, 1)).toBe(
      15,
    );
    expect(ObjectUtils.max((left, right) => left - right, 1, 1, 1)).toBe(1);
    expect(
      ObjectUtils.max(
        (left, right) => left - right,
        1,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        2,
        3,
        4,
        7,
        3,
        9,
        10,
        2,
        15,
        1,
        null,
      ),
    ).toBe(15);
    expect(ObjectUtils.max((left, right) => left - right, null, null, null)).toBe(null);
  });

  test('minTest', () => {
    expect(ObjectUtils.min((left, right) => left - right, 1, 2, 3, 4, 7, 3, 9, 10, 2, 15, 1)).toBe(
      1,
    );
  });

  test('equalsTest', () => {
    expect(ObjectUtils.equal(1, 2, (left, right) => left === right)).toBeFalsy();
    expect(ObjectUtils.equal(1, 1, (left, right) => left === right)).toBeTruthy();
    expect(ObjectUtils.equal(1, null, (left, right) => left === right)).toBeFalsy();
    expect(ObjectUtils.equal(null, 2, (left, right) => left === right)).toBeFalsy();
    expect(ObjectUtils.equal(null, null)).toBeTruthy();
  });

  test('notEqualTest', () => {
    expect(ObjectUtils.notEqual(1, 2, (left, right) => left === right)).toBeTruthy();
    expect(ObjectUtils.notEqual(1, 1, (left, right) => left === right)).toBeFalsy();
    expect(ObjectUtils.notEqual(1, null, (left, right) => left === right)).toBeTruthy();
    expect(ObjectUtils.notEqual(null, 2, (left, right) => left === right)).toBeTruthy();
  });

  test('toStringTest', () => {
    expect(ObjectUtils.toString(1, '')).toBe('1');
    expect(ObjectUtils.toString(null, '123')).toBe('123');
  });

  test('isBasicTypeTest', () => {
    expect(ObjectUtils.isBasicType(1)).toBeTruthy();
    expect(ObjectUtils.isBasicType('1')).toBeTruthy();
    expect(ObjectUtils.isBasicType(true)).toBeTruthy();
    expect(ObjectUtils.isBasicType(Symbol(1))).toBeTruthy();
    expect(ObjectUtils.isBasicType(BigInt(1))).toBeTruthy();
    expect(ObjectUtils.isBasicType(null)).toBeTruthy();
    expect(ObjectUtils.isBasicType(undefined)).toBeTruthy();
    expect(ObjectUtils.isBasicType({})).toBeFalsy();
    expect(ObjectUtils.isBasicType([])).toBeFalsy();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(ObjectUtils.isBasicType(() => {})).toBeFalsy();
  });

  test('isAnyTypeTest', () => {
    expect(ObjectUtils.isAnyType(1, String, Number)).toBeTruthy();
    expect(ObjectUtils.isAnyType('1', Number, String, Object)).toBeTruthy();
    expect(ObjectUtils.isAnyType(true, Number, String, Boolean)).toBeTruthy();
    expect(ObjectUtils.isAnyType(Symbol(1), Number, String, Symbol)).toBeTruthy();
    expect(ObjectUtils.isAnyType(BigInt(1), Number, BigInt, Symbol)).toBeTruthy();
    expect(ObjectUtils.isAnyType(null, Number, BigInt, Symbol)).toBeFalsy();
    expect(ObjectUtils.isAnyType(undefined, Number, BigInt, Symbol)).toBeFalsy();
    expect(ObjectUtils.isAnyType([], Array, Number, BigInt, Symbol)).toBeTruthy();
    expect(ObjectUtils.isAnyType('', Array, Number, BigInt, Symbol)).toBeFalsy();
    expect(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      ObjectUtils.isAnyType(() => {}, Function, Array, BigInt, Symbol),
    ).toBeTruthy();
    expect(ObjectUtils.isAnyType(new Date(), Function, Array, Date)).toBeTruthy();
  });

  test('propertyNameToUnderLineTest', () => {
    const obj = {
      dateStr: '1',
      dateTime: 11111,
      '1111Adad': {
        dateStr2: 1213123213,
        '11111Aaaa': 12313123123,
      },
      '11111_arr': [1, 1, 1, 1, 1],
      objArr: [
        {
          obj_aaa: 13132,
          objaaa1Aaaasdad: 13132,
        },
      ],
    };
    expect(ObjectUtils.propertyNameToUnderLine(obj)).toStrictEqual({
      date_str: '1',
      date_time: 11111,
      '1111_adad': {
        date_str2: 1213123213,
        '11111_aaaa': 12313123123,
      },
      '11111_arr': [1, 1, 1, 1, 1],
      obj_arr: [
        {
          obj_aaa: 13132,
          objaaa1_aaaasdad: 13132,
        },
      ],
    });
  });

  test('propertyNameToCamlCaseTest', () => {
    const obj = {
      date_str: '1',
      dateTime: 11111,
      'date-str2': 11231313,
      '1111_adad': {
        date_str2: 1213123213,
        '11111-aaaa': 12313123123,
      },
      '11111-arr': [1, 1, 1, 1, 1],
      objArr: [
        {
          obj_aaa: 13132,
          'objaaa1-aaaasdad': 13132,
        },
      ],
    };
    expect(ObjectUtils.propertyNameToCamlCase(obj)).toStrictEqual({
      dateStr: '1',
      dateTime: 11111,
      dateStr2: 11231313,
      '1111Adad': {
        dateStr2: 1213123213,
        '11111Aaaa': 12313123123,
      },
      '11111Arr': [1, 1, 1, 1, 1],
      objArr: [
        {
          objAaa: 13132,
          objaaa1Aaaasdad: 13132,
        },
      ],
    });
  });
});
