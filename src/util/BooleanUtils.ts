import { ObjectUtils } from './ObjectUtils';
import { IllegalArgumentError } from '../error/runtimeError';

/**
 * 布尔工具类
 *
 * @category 工具类
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class BooleanUtils {
  /**
   * false 字符串
   * @category 只读常量
   */
  public static readonly FALSE = 'false';
  /**
   * no 字符串
   * @category 只读常量
   */
  public static readonly NO = 'no';
  /**
   * off 字符串
   * @category 只读常量
   */
  public static readonly OFF = 'off';
  /**
   * on 字符串
   * @category 只读常量
   */
  public static readonly ON = 'on';
  /**
   * true 字符串
   * @category 只读常量
   */
  public static readonly TRUE = 'true';
  /**
   * yes 字符串
   * @category 只读常量
   */
  public static readonly YES = 'yes';

  /**
   * <p>对一组布尔值执行“与”运算。</p>
   *
   * @example
   * ```js
   *   BooleanUtils.and(true, true) // true
   *   BooleanUtils.and(false, false) // false
   *   BooleanUtils.and(true, false) // false
   *   BooleanUtils.and(true, true, false) //false
   *   BooleanUtils.and(true, true, true) // true
   * ```
   *
   * @param values 一组布尔值或布尔表达式
   * @returns {} 逻辑“与”运算的结果。如果任何参数为 false 则为 false，否则为 true
   * @throws {@link NullError} 如果数组为 null 或 undefined
   * @throws {@link IllegalArgumentError} 如果参数数量为 0
   */
  public static and(...values: boolean[]): boolean {
    ObjectUtils.requireNonEmpty(values, '参数不能为空');
    return values.every((value) => value);
  }

  /**
   * <p>比较两个布尔值。</p>
   *
   * @param x 第一个要比较的布尔值
   * @param y 第二个要比较的布尔值
   * @returns {} 如果 x === y 则返回 0；!x && y 则返回 -1；如果 x && !y 则返回 1。
   */
  public static compare(x: boolean, y: boolean): number {
    if (x === y) {
      return 0;
    }
    return x ? 1 : -1;
  }

  /**
   * <p>指定的布尔值执行“取反”运算。</p>
   *
   * <p>如果传入 null，则返回 null。</p>
   *
   * @example
   * ```js
   *   BooleanUtils.negate(true)  // false;
   *   BooleanUtils.negate(false) // true;
   *   BooleanUtils.negate(null)  // null;
   * ```
   *
   * @param value 待否定的布尔值，可能为空
   * @returns {} 取反的布尔值，如果传入 null 则返回 null。
   */
  public static not(value: boolean): boolean {
    if (ObjectUtils.isNull(value)) {
      return null;
    }
    return !value;
  }

  /**
   * <p>对一组布尔值执行“或”运算。</p>
   *
   * @example
   * ```js
   *   BooleanUtils.or(true, true)          // true
   *   BooleanUtils.or(false, false)        // false
   *   BooleanUtils.or(true, false)         // true
   *   BooleanUtils.or(true, true, false)   // true
   *   BooleanUtils.or(true, true, true)    // true
   *   BooleanUtils.or(false, false, false) // false
   * ```
   *
   * @param values 一组布尔值或布尔表达式
   * @returns {} 如果任何参数为 true 则返回 true，否则返回 false。
   * @throws {@link NullError} 如果数组为 null 或 undefined。
   * @throws {@link IllegalArgumentError} 如果数组长度为 0。
   */
  public static or(...values: boolean[]): boolean {
    ObjectUtils.requireNonEmpty(values, '参数不能为空');
    return values.some((value) => value);
  }

  /**
   * {@label NUMBER_DEFAULT}
   * <p> 使用 0 为 false 的约定将数字转换为布尔值，其他所有内容为 true。 </p>
   *
   * @example
   * ```js
   *   BooleanUtils.toBoolean(0) // false
   *   BooleanUtils.toBoolean(1) // true
   *   BooleanUtils.toBoolean(2) // true
   * ```
   *
   * @param value 要转换的数字
   * @returns {} true 如果非零，false 如果为零
   * @throws {@link IllegalArgumentError} 如果 value < 0 或 value 为 null、undefined
   */
  public static toBoolean(value: number): boolean;
  /**
   * {@label NUMBER}
   * <p>将数字转换为指定转换值的布尔值。</p>
   *
   * <p>如果 trueValue 和 falseValue 是相同的数字，则返回值将是 true 如果 value 匹配它。</p>
   *
   * @example
   * ```js
   *   BooleanUtils.toBoolean(0, 1, 0) // false
   *   BooleanUtils.toBoolean(1, 1, 0) // true
   *   BooleanUtils.toBoolean(1, 1, 1) // true
   *   BooleanUtils.toBoolean(2, 1, 2) // false
   *   BooleanUtils.toBoolean(2, 2, 0) // true
   * ```
   *
   * @param value 要转换的数字
   * @param trueValue true 匹配的值
   * @param falseValue false 匹配的值
   * @returns {} true 或 false
   * @throws {@link IllegalArgumentError} 如果 value 不匹配 trueValue 或 falseValue
   */
  public static toBoolean(value: number, trueValue: number, falseValue: number): boolean;
  /**
   * {@label STRING_DEFAULT}
   * <p>将字符串转换为布尔值（针对性能进行了优化）。</p>
   *
   * <p>'true'、 'on'、 'y'、 't' 或 'yes'（不区分大小写）将返回 true，否则返回 false。</p>
   *
   * @example
   * ```js
   *   BooleanUtils.toBoolean(null)    // false
   *   BooleanUtils.toBoolean("true")  // true
   *   BooleanUtils.toBoolean("TRUE")  // true
   *   BooleanUtils.toBoolean("tRUe")  // true
   *   BooleanUtils.toBoolean("on")    // true
   *   BooleanUtils.toBoolean("yes")   // true
   *   BooleanUtils.toBoolean("false") // false
   *   BooleanUtils.toBoolean("x gti") // false
   *   BooleanUtils.toBoolean("y") = true
   *   BooleanUtils.toBoolean("n") = false
   *   BooleanUtils.toBoolean("t") = true
   *   BooleanUtils.toBoolean("f") = false
   * ```
   *
   * @param str 要检查的字符串
   * @returns {} 字符串的布尔值，如果不匹配，则为 false
   * @throws {@link IllegalArgumentError} 如果 str 不匹配
   */
  public static toBoolean(str: string): boolean;
  /**
   * {@label STRING}
   * <p>将字符串转换为指定转换值的布尔值。</p>
   *
   * <p>如果 trueValue 和 falseValue 是相同的字符串，则返回值将是 true 如果 value 匹配它。</p>
   *
   * @example
   * ```js
   *   BooleanUtils.toBoolean("true", "true", "false")  // true
   *   BooleanUtils.toBoolean("false", "true", "false") // false
   * ```
   *
   * @param str 要检查的字符串
   * @param trueString 与 true 匹配的字符串（区分大小写）
   * @param falseString 与 false 匹配的字符串（区分大小写）
   * @returns {} 字符串的布尔值
   * @throws {@link IllegalArgumentError} 如果 str 不匹配 trueValue 或 falseValue
   */
  public static toBoolean(str: string, trueString: string, falseString: string): boolean;
  static toBoolean(
    value: number | string,
    trueValue?: number | string,
    falseValue?: number | string,
  ): boolean {
    if (ObjectUtils.isNull(value)) {
      if (ObjectUtils.isNull(trueValue)) {
        return true;
      } else if (ObjectUtils.isNull(falseValue)) {
        return false;
      }
    } else if (ObjectUtils.allNull(trueValue, falseValue)) {
      if (typeof value === 'number') {
        if (value === 0) {
          return false;
        } else if (value > 0) {
          return true;
        }
      } else if (typeof value === 'string') {
        const result = this.fromString(value);
        if (ObjectUtils.isNotNull(result)) {
          return result;
        }
      }
    } else {
      if (value === trueValue) {
        return true;
      } else if (value === falseValue) {
        return false;
      }
    }
    throw new IllegalArgumentError('参数与任何一个指定值都不匹配');
  }

  /**
   * <p>将布尔值转换为指定转换值的数字。</p>
   *
   * @example
   * ```js
   *   BooleanUtils.toInteger(true, 1, 0) = 1
   *   BooleanUtils.toInteger(false, 1, 0) = 0
   * ```
   *
   * @param value 要转换的布尔值
   * @param trueValue 如果 value 为 true 返回的值，默认返回 1
   * @param falseValue 如果 value 为 false 返回的值，默认返回 0
   * @param nullValue 如果 value 为 null 或 undefined 返回的值，默认返回 {@link NaN}
   * @returns {} 三个输入数字之一
   */
  public static toInteger(value: boolean, trueValue = 1, falseValue = 0, nullValue = NaN): number {
    if (ObjectUtils.isNull(value)) {
      return nullValue;
    }
    return value ? trueValue : falseValue;
  }

  /**
   * <p>将布尔值转换为返回输入字符串之一的字符串。</p>
   *
   * @example
   * ```js
   *   BooleanUtils.toString(true, "true", "false")  // "true"
   *   BooleanUtils.toString(false, "true", "false") // "false"
   *   BooleanUtils.toString(null, "true", "false")         // ""
   * ```
   *
   * @param value 要检查的布尔值
   * @param trueString 如果 true 要返回的字符串，可能是 null
   * @param falseString 如果 false 要返回的字符串，可能是 null
   * @param nullString 如果 null 要返回的字符串，默认为 “”
   * @returns {} 三个输入字符串之一
   */
  public static toString(
    value: boolean,
    trueString: string,
    falseString: string,
    nullString = '',
  ): string {
    if (ObjectUtils.isNull(value)) {
      return nullString;
    }
    return value ? trueString : falseString;
  }

  /**
   * <p>将布尔值转换为返回 'on' 或 'off' 的字符串。</p>
   *
   * @example
   * ```js
   *   BooleanUtils.toStringOnOff(true)   = "on"
   *   BooleanUtils.toStringOnOff(false)  = "off"
   * ```
   *
   * @param value 要检查的布尔值
   * @param nullString 如果 null 要返回的字符串，默认为 “”
   * @returns {} 'on', 'off', 参数为 null 或 undefined 则返回 nullString
   */
  public static toStringOnOff(value: boolean, nullString = ''): string {
    return this.toString(value, this.ON, this.OFF, nullString);
  }

  /**
   * <p>将布尔值转换为返回 'true' 或 'false' 的字符串。</p>
   *
   * @example
   * ```js
   *   BooleanUtils.toStringTrueFalse(true)   = "true"
   *   BooleanUtils.toStringTrueFalse(false)  = "false"
   * ```
   *
   * @param value 要检查的布尔值
   * @param nullString 如果 null 要返回的字符串，默认为 “”
   * @returns {} 'true', 'false', 参数为 null 或 undefined 则返回 nullString
   */
  public static toStringTrueFalse(value: boolean, nullString = ''): string {
    return this.toString(value, this.TRUE, this.FALSE, nullString);
  }

  /**
   * <p>将布尔值转换为返回 'yes' 或 'no' 的字符串。</p>
   *
   * <pre>
   *   BooleanUtils.toStringYesNo(true)   = "yes"
   *   BooleanUtils.toStringYesNo(false)  = "no"
   * </pre>
   *
   * @param value 要检查的布尔值
   * @param nullString 如果 null 要返回的字符串，默认为 “”
   * @returns {} 'yes', 'no', 参数为 null 或 undefined 则返回 nullString
   */
  public static toStringYesNo(value: boolean, nullString = ''): string {
    return this.toString(value, this.YES, this.NO, nullString);
  }

  private static fromString(str: string): boolean {
    if (str === this.TRUE) {
      return true;
    }
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    switch (str.length) {
      case 1: {
        const ch0 = str.charAt(0);
        if (ch0 === 'y' || ch0 === 'Y' || ch0 === 't' || ch0 === 'T' || ch0 === '1') {
          return true;
        }
        if (ch0 === 'n' || ch0 === 'N' || ch0 === 'f' || ch0 === 'F' || ch0 === '0') {
          return false;
        }
        break;
      }
      case 2: {
        const ch0 = str.charAt(0);
        const ch1 = str.charAt(1);
        if ((ch0 === 'o' || ch0 === 'O') && (ch1 === 'n' || ch1 === 'N')) {
          return true;
        }
        if ((ch0 === 'n' || ch0 === 'N') && (ch1 === 'o' || ch1 === 'O')) {
          return false;
        }
        break;
      }
      case 3: {
        const ch0 = str.charAt(0);
        const ch1 = str.charAt(1);
        const ch2 = str.charAt(2);
        if (
          (ch0 === 'y' || ch0 === 'Y') &&
          (ch1 === 'e' || ch1 === 'E') &&
          (ch2 === 's' || ch2 === 'S')
        ) {
          return true;
        }
        if (
          (ch0 === 'o' || ch0 === 'O') &&
          (ch1 === 'f' || ch1 === 'F') &&
          (ch2 === 'f' || ch2 === 'F')
        ) {
          return false;
        }
        break;
      }
      case 4: {
        const ch0 = str.charAt(0);
        const ch1 = str.charAt(1);
        const ch2 = str.charAt(2);
        const ch3 = str.charAt(3);
        if (
          (ch0 === 't' || ch0 === 'T') &&
          (ch1 === 'r' || ch1 === 'R') &&
          (ch2 === 'u' || ch2 === 'U') &&
          (ch3 === 'e' || ch3 === 'E')
        ) {
          return true;
        }
        break;
      }
      case 5: {
        const ch0 = str.charAt(0);
        const ch1 = str.charAt(1);
        const ch2 = str.charAt(2);
        const ch3 = str.charAt(3);
        const ch4 = str.charAt(4);
        if (
          (ch0 === 'f' || ch0 === 'F') &&
          (ch1 === 'a' || ch1 === 'A') &&
          (ch2 === 'l' || ch2 === 'L') &&
          (ch3 === 's' || ch3 === 'S') &&
          (ch4 === 'e' || ch4 === 'E')
        ) {
          return false;
        }
        break;
      }
      default:
        break;
    }
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
}
