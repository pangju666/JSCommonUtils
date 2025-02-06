import { IllegalArgumentError } from '../error/runtimeError';
import { ObjectUtils } from './ObjectUtils';

/**
 * 随机数工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class RandomUtils {
  /**
   * 返回一个随机布尔值
   *
   * @return {} 随机布尔值
   */
  public static nextBoolean(): boolean {
    return this.nextInt(0, 1) === 1;
  }

  /**
   * 返回一个随机布尔值数组
   *
   * @param length 数组长度，不可小于 1 且不能为 null 或 undefined
   * @return {} 随机布尔值数组
   */
  public static nextBooleanArray(length: number): boolean[] {
    const result = this.nextIntArray(0, 1, length);
    return result.map((item) => item === 1);
  }

  /**
   * 返回 [0, {@link Number.MAX_SAFE_INTEGER}] 内的随机整数
   *
   * @return {} 随机整数
   */
  public static nextInt(): number;
  /**
   * 返回指定范围 [0, bound] 内的随机整数。
   *
   * @param bound 可以返回的最大值，必须为非负数
   * @throws {IllegalArgumentError} 如果 bound 为负数
   * @return {} 随机整数
   */
  public static nextInt(bound: number): number;
  /**
   * 返回指定范围 [startInclusive, endExclusive] 内的随机整数。
   *
   * @param startInclusive 可以返回的最小值，必须为非负数
   * @param endExclusive 可以返回的最大值，必须为非负数
   * @throws {IllegalArgumentError} 如果 startInclusive > endExclusive 或 startInclusive 为负数
   * @return {} 随机整数
   */
  public static nextInt(startInclusive: number, endExclusive: number): number;
  static nextInt(startInclusive?: number, endExclusive?: number): number {
    if (ObjectUtils.isNull(endExclusive)) {
      if (ObjectUtils.isNull(startInclusive)) {
        return Math.floor(this.random(0, Number.MAX_SAFE_INTEGER));
      }
      return Math.floor(this.random(0, startInclusive));
    }
    return Math.floor(this.random(startInclusive, endExclusive));
  }

  /**
   * 返回 [0, {@link Number.MAX_SAFE_INTEGER}] 内的随机整数数组
   *
   * @param length 数组长度，不可小于 1 且不能为 null 或 undefined
   * @throws {IllegalArgumentError} 如果 length 为 null 或 undefined 或 length 小于 1
   * @return {} 随机整数数组
   */
  public static nextIntArray(length: number): number[];
  /**
   * 返回指定范围 [0, bound] 内的随机整数数组。
   *
   * @param length 数组长度，不可小于 1 且不能为 null 或 undefined
   * @param bound 可以返回的最大值，必须为非负数
   * @throws {IllegalArgumentError} 如果 (bound 为负数) 或
   * （length 为 null 或 undefined 或 length 小于 1）
   * @return {} 随机整数数组
   */
  public static nextIntArray(length: number, bound: number): number[];
  /**
   * 返回指定范围内的随机整数数组。
   *
   * @param length 数组长度，不可小于 1 且不能为 null 或 undefined
   * @param startInclusive 可以返回的最小值，必须为非负数
   * @param endExclusive 可以返回的最大值，必须为非负数
   * @throws {IllegalArgumentError} 如果 （startInclusive > endExclusive 或 startInclusive 为负数） 或
   * （length 为 null 或 undefined 或 length 小于 1）
   * @return {} 随机整数数组
   */
  public static nextIntArray(
    length: number,
    startInclusive: number,
    endExclusive: number,
  ): number[];
  static nextIntArray(
    length: number,
    startInclusive?: number,
    endExclusive?: number,
  ): number[] {
    let result;
    if (ObjectUtils.isNull(endExclusive)) {
      if (ObjectUtils.isNull(startInclusive)) {
        result = this.randomArray(0, Number.MAX_SAFE_INTEGER, length, true);
      } else {
        result = this.randomArray(0, startInclusive - 1, length, true);
      }
    } else {
      result = this.randomArray(startInclusive, endExclusive, length, true);
    }
    return result.map((item) => Math.floor(item));
  }

  /**
   * 返回 [0, {@link Number.MAX_SAFE_INTEGER}] 内的不重复随机整数数组
   *
   * @param length 数组长度，不可小于 1 且不能为 null 或 undefined
   * @throws {IllegalArgumentError} 如果 length 为 null 或 undefined 或 length 小于 1
   * @return {} 随机无重复元素的整数数组
   */
  public static nextNoRepeatIntArray(length: number): number[];
  /**
   * 返回指定范围 [0, bound] 内的不重复随机整数数组。
   *
   * @param length 数组长度，不可小于 1 且不能为 null 或 undefined
   * @param bound 可以返回的最大值，必须为非负数
   * @throws {IllegalArgumentError} 如果 (bound 为负数) 或
   * （length 为 null 或 undefined 或 length 小于 1）
   * @return {} 随机无重复元素的整数数组
   */
  public static nextNoRepeatIntArray(length: number, bound: number): number[];
  /**
   * 返回指定范围内的不重复随机整数数组。
   *
   * @param length 数组长度，不可小于 1 且不能为 null 或 undefined
   * @param startInclusive 可以返回的最小值，必须为非负数
   * @param endExclusive 可以返回的最大值，必须为非负数
   * @throws {IllegalArgumentError} 如果 （startInclusive > endExclusive 或 startInclusive 为负数） 或
   * （length 为 null 或 undefined 或 length 小于 1）
   * @return {} 随机无重复元素的整数数组
   */
  public static nextNoRepeatIntArray(
    length: number,
    startInclusive: number,
    endExclusive: number,
  ): number[];
  static nextNoRepeatIntArray(
    length: number,
    startInclusive?: number,
    endExclusive?: number,
  ): number[] {
    let result;
    if (ObjectUtils.isNull(endExclusive)) {
      if (ObjectUtils.isNull(startInclusive)) {
        result = this.randomArray(0, Number.MAX_SAFE_INTEGER, length, false);
      } else {
        result = this.randomArray(0, startInclusive - 1, length, false);
      }
    } else {
      result = this.randomArray(startInclusive, endExclusive, length, false);
    }
    return result.map((item) => Math.floor(item));
  }

  /**
   * 返回 [0, {@link Number.MAX_VALUE}] 内的随机浮点数
   *
   * @return {} 随机整数
   */
  public static nextFloat(): number;
  /**
   * 返回指定范围 [0, bound] 内的随机浮点数。
   *
   * @param bound 可以返回的最大值，必须为非负数
   * @throws {IllegalArgumentError} 如果 bound 为负数
   * @return {} 随机浮点数
   */
  public static nextFloat(bound: number): number;
  /**
   * 返回指定范围内的随机浮点数。
   *
   * @param startInclusive 可以返回的最小值，必须为非负数
   * @param endExclusive 可以返回的最大值，必须为非负数
   * @throws {IllegalArgumentError} 如果 startInclusive > endExclusive 或 startInclusive 为负数
   * @return {} 随机浮点数
   */
  public static nextFloat(startInclusive: number, endExclusive: number): number;
  static nextFloat(startInclusive?: number, endExclusive?: number): number {
    if (ObjectUtils.isNull(endExclusive)) {
      if (ObjectUtils.isNull(startInclusive)) {
        return this.random(0, Number.MAX_VALUE);
      }
      return this.random(0, startInclusive - 1);
    }
    return this.random(startInclusive, endExclusive);
  }

  /**
   * 返回 [0, {@link Number.MAX_SAFE_INTEGER}] 内的随机整数数组
   *
   * @param length 数组长度，不可小于 1 且不能为 null 或 undefined
   * @throws {IllegalArgumentError} 如果 length 为 null 或 undefined 或 length 小于 1
   * @return {} 随机浮点数数组
   */
  public static nextFloatArray(length: number): number[];
  /**
   * 返回指定范围 [0, bound] 内的随机浮点数数组。
   *
   * @param length 数组长度，不可小于 1 且不能为 null 或 undefined
   * @param bound 可以返回的最大值，必须为非负数
   * @throws {IllegalArgumentError} 如果 (bound 为负数) 或
   * （length 为 null 或 undefined 或 length 小于 1）
   * @return {} 随机浮点数数组
   */
  public static nextFloatArray(length: number, bound: number): number[];
  /**
   * 返回指定范围内的随机浮点数数组。
   *
   * @param length 数组长度，不可小于 1 且不能为 null 或 undefined
   * @param startInclusive 可以返回的最小值，必须为非负数
   * @param endExclusive 可以返回的最大值，必须为非负数
   * @throws {IllegalArgumentError} 如果 （startInclusive > endExclusive 或 startInclusive 为负数） 或
   * （length 为 null 或 undefined 或 length 小于 1）
   * @return {} 随机浮点数数组
   */
  public static nextFloatArray(
    length: number,
    startInclusive: number,
    endExclusive: number,
  ): number[];
  static nextFloatArray(
    length: number,
    startInclusive?: number,
    endExclusive?: number,
  ): number[] {
    if (ObjectUtils.isNull(endExclusive)) {
      if (ObjectUtils.isNull(startInclusive)) {
        return this.randomArray(0, Number.MAX_VALUE, length, true);
      }
      return this.randomArray(0, startInclusive - 1, length, true);
    }
    return this.randomArray(startInclusive, endExclusive, length, true);
  }

  private static random(min: number, max: number): number {
    if (max < min) {
      throw new IllegalArgumentError('起始值必须小于或等于结束值。');
    }
    if (min < 0) {
      throw new IllegalArgumentError('两个范围值都必须为非负数。');
    }

    if (min === max) {
      return min;
    }

    return Math.random() * (max - min + 1) + min;
  }

  private static randomArray(
    min: number,
    max: number,
    length: number,
    repeat: boolean,
  ): number[] {
    if (ObjectUtils.isNull(length)) {
      throw new IllegalArgumentError('长度不可为 null 或 undefined。');
    }
    if (length < 1) {
      throw new IllegalArgumentError('长度不可小于1');
    }

    if (max < min) {
      throw new IllegalArgumentError('起始值必须小于或等于结束值。');
    }
    if (min < 0) {
      throw new IllegalArgumentError('两个范围值都必须为非负数。');
    }

    if (min === max) {
      const array = new Array(length);
      for (let i = 0; i < length; i++) {
        array[i] = min;
      }
      return array;
    }

    const result = new Array(length);
    for (let i = 0; i < length; i++) {
      let value;
      do {
        value = Math.random() * (max - min + 1) + min;
      } while (!repeat && result.includes(value));
      result[i] = value;
    }
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
}
