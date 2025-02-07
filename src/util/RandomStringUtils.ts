import { StringUtils } from './StringUtils';
import { IllegalArgumentError } from '../error/runtimeError';
import { RandomUtils } from './RandomUtils';
import { ArrayUtils } from './ArrayUtils';
import { ObjectUtils } from './ObjectUtils';

/**
 * 随机字符串工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class RandomStringUtils {
  /**
   * 小写字母起始字符
   */
  public static readonly MIN_LOWERCASE_CHAR = 'a';
  /**
   * 小写字母结束字符
   */
  public static readonly MAX_LOWERCASE_CHAR = 'z';
  /**
   * 大写字母起始字符
   */
  public static readonly MIN_UPPERCASE_CHAR = 'A';
  /**
   * 大写字母结束字符
   */
  public static readonly MAX_UPPERCASE_CHAR = 'Z';
  /**
   * 数字起始字符
   */
  public static readonly MIN_NUMBER_CHAR = '0';
  /**
   * 数字结束字符
   */
  public static readonly MAX_NUMBER_CHAR = '9';
  /**
   * ASCII 起始可打印字符
   */
  public static readonly MIN_ASCII_PRINT_CHAR = ' ';
  /**
   * ASCII 结束可打印字符
   */
  public static readonly MAX_ASCII_PRINT_CHAR = '~';
  /**
   * ASCII 起始字符
   */
  public static readonly MIN_ASCII_CHAR = '\x00';
  /**
   * ASCII 结束字符
   */
  public static readonly MAX_ASCII_CHAR = '\x7F';
  /**
   * 中文 Unicode 起始字符
   */
  public static readonly MIN_CHINESE_UNICODE_CHAR = '\u4e00';
  /**
   * 中文 Unicode 结束字符
   */
  public static readonly MAX_CHINESE_UNICODE_CHAR = '\u9fa5';
  /**
   * 最小 Unicode 起始字符
   */
  public static readonly MIN_UNICODE_CHAR = '\x00';
  /**
   * Unicode 结束字符
   */
  public static readonly MAX_UNICODE_CHAR = '\uDBFF';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * <p>创建一个长度为指定字符数的随机数字字符串。<p>
   *
   * <p>字符将从 介于 "0' 和 '9' 之间的字符集中选择。</p>
   *
   * @param length 要创建的随机字符串的长度
   * @return {} 随机字符串
   */
  public static randomNumber(length: number): string;

  /**
   * <p>创建一个长度为指定字符数的随机数字字符串。<p>
   *
   * <p>字符将从 介于 '0' 和 '9' 之间的字符集中选择。</p>
   *
   * @param minLength 要创建的随机字符串的最小长度
   * @param maxLength 要创建的随机字符串的最大长度
   * @return {} 随机字符串
   */
  public static randomNumber(minLength: number, maxLength: number): string;

  static randomNumber(minLength: number, maxLength?: number): string {
    return this.randomString(this.MIN_NUMBER_CHAR, this.MAX_NUMBER_CHAR, minLength, maxLength);
  }

  /**
   * <p>创建一个长度为指定字符数的随机字母字符串。<p>
   *
   * <p>字符将从 ['A', 'Z'] 和 ['a', 'z'] 之间的字符集中选择。</p>
   *
   * @param length 要创建的随机字符串的长度
   * @return {} 随机字符串
   */
  public static randomLetter(length: number): string;

  /**
   * <p>创建一个长度为指定字符数的随机字母字符串。<p>
   *
   * <p>字符将从 ['A', 'Z'] 和 ['a', 'z'] 之间的字符集中选择。</p>
   *
   * @param minLength 要创建的随机字符串的最小长度
   * @param maxLength 要创建的随机字符串的最大长度
   * @return {} 随机字符串
   */
  public static randomLetter(minLength: number, maxLength: number): string;

  static randomLetter(minLength: number, maxLength?: number): string {
    return this.randomLetterString(false, minLength, maxLength);
  }

  /**
   * <p>创建一个长度为指定字符数的随机字母与数字字符串。<p>
   *
   * <p>字符将从 ['A', 'Z']、['a', 'z'] 和 ['0', '9'] 之间的字符集中选择。</p>
   *
   * @param length 要创建的随机字符串的长度
   * @return {} 随机字符串
   */
  public static randomLetterNumber(length: number): string;

  /**
   * <p>创建一个长度为指定字符数的随机字母与数字字符串。<p>
   *
   * <p>字符将从 ['A', 'Z']、['a', 'z'] 和 ['0', '9'] 之间的字符集中选择。</p>
   *
   * @param minLength 要创建的随机字符串的最小长度
   * @param maxLength 要创建的随机字符串的最大长度
   * @return {} 随机字符串
   */
  public static randomLetterNumber(minLength: number, maxLength: number): string;

  static randomLetterNumber(minLength: number, maxLength?: number): string {
    return this.randomLetterString(true, minLength, maxLength);
  }

  /**
   * <p>创建一个长度为指定字符数的随机小写字母字符串。<p>
   *
   * <p>字符将从 介于 'a' 和 'z' 之间的字符集中选择。</p>
   *
   * @param length 要创建的随机字符串的长度
   * @return {} 随机字符串
   */
  public static randomLowercaseLetter(length: number): string;

  /**
   * <p>创建一个长度为指定字符数的随机小写字母字符串。<p>
   *
   * <p>字符将从 介于 'a' 和 'z' 之间的字符集中选择。</p>
   *
   * @param minLength 要创建的随机字符串的最小长度
   * @param maxLength 要创建的随机字符串的最大长度
   * @return {} 随机字符串
   */
  public static randomLowercaseLetter(minLength: number, maxLength: number): string;

  static randomLowercaseLetter(minLength: number, maxLength?: number): string {
    return this.randomString(
      this.MIN_LOWERCASE_CHAR,
      this.MAX_LOWERCASE_CHAR,
      minLength,
      maxLength,
    );
  }

  /**
   * <p>创建一个长度为指定字符数的随机大写字母符串。<p>
   *
   * <p>字符将从 介于 'A' 和 'Z' 之间的字符集中选择。</p>
   *
   * @param length 要创建的随机字符串的长度
   * @return {} 随机字符串
   */
  public static randomUppercaseLetter(length: number): string;

  /**
   * <p>创建一个长度为指定字符数的随机大写字母字符串。<p>
   *
   * <p>字符将从 介于 'A' 和 'Z' 之间的字符集中选择。</p>
   *
   * @param minLength 要创建的随机字符串的最小长度
   * @param maxLength 要创建的随机字符串的最大长度
   * @return {} 随机字符串
   */
  public static randomUppercaseLetter(minLength: number, maxLength: number): string;

  static randomUppercaseLetter(minLength: number, maxLength?: number): string {
    return this.randomString(
      this.MIN_UPPERCASE_CHAR,
      this.MAX_UPPERCASE_CHAR,
      minLength,
      maxLength,
    );
  }

  /**
   * <p>创建一个长度为指定字符数的随机中文字符串。<p>
   *
   * <p>字符将从 介于 '\u4e00' 和 '\u9fa5' 之间的字符集中选择。</p>
   *
   * @param length 要创建的随机字符串的长度
   * @return {} 随机字符串
   */
  public static randomChinese(length: number): string;

  /**
   * <p>创建一个长度为指定字符数的随机中文字符串。<p>
   *
   * <p>字符将从 介于 '\u4e00' 和 '\u9fa5' 之间的字符集中选择。</p>
   *
   * @param minLength 要创建的随机字符串的最小长度
   * @param maxLength 要创建的随机字符串的最大长度
   * @return {} 随机字符串
   */
  public static randomChinese(minLength: number, maxLength: number): string;

  static randomChinese(minLength: number, maxLength?: number): string {
    return this.randomString(
      this.MIN_CHINESE_UNICODE_CHAR,
      this.MAX_CHINESE_UNICODE_CHAR,
      minLength,
      maxLength,
    );
  }

  /**
   * <p>创建一个长度为指定字符数的随机 ASCII 字符串。<p>
   *
   * <p>字符将从 介于 '\x00' 和 '\x7F' 之间的字符集中选择。</p>
   *
   * @param length 要创建的随机字符串的长度
   * @return {} 随机字符串
   */
  public static randomAscii(length: number): string;

  /**
   * <p>创建一个长度为指定字符数的随机 ASCII 字符串。<p>
   *
   * <p>字符将从 介于 '\x00' 和 '\x7F' 之间的字符集中选择。</p>
   *
   * @param minLength 要创建的随机字符串的最小长度
   * @param maxLength 要创建的随机字符串的最大长度
   * @return {} 随机字符串
   */
  public static randomAscii(minLength: number, maxLength: number): string;

  static randomAscii(minLength: number, maxLength?: number): string {
    return this.randomString(this.MIN_ASCII_CHAR, this.MAX_ASCII_CHAR, minLength, maxLength);
  }

  /**
   * <p>创建一个长度为指定字符数的随机 ASCII 可打印字符串。<p>
   *
   * <p>字符将从 介于 ' ' 和 '~' 之间的字符集中选择。</p>
   *
   * @param length 要创建的随机字符串的长度
   * @return {} 随机字符串
   */
  public static randomAsciiPrint(length: number): string;

  /**
   * <p>创建一个长度为指定字符数的随机 ASCII 可打印字符串。<p>
   *
   * <p>字符将从 介于 ' ' 和 '~' 之间的字符集中选择。</p>
   *
   * @param minLength 要创建的随机字符串的最小长度
   * @param maxLength 要创建的随机字符串的最大长度
   * @return {} 随机字符串
   */
  public static randomAsciiPrint(minLength: number, maxLength: number): string;

  static randomAsciiPrint(minLength: number, maxLength?: number): string {
    return this.randomString(
      this.MIN_ASCII_PRINT_CHAR,
      this.MAX_ASCII_PRINT_CHAR,
      minLength,
      maxLength,
    );
  }

  /**
   * <p>创建一个长度为指定字符数的随机 Unicode 字符串。<p>
   *
   * <p>字符将从 介于 '\x00' 和 '\uDBFF' 之间的字符集中选择。</p>
   *
   * @param length 要创建的随机字符串的长度
   * @return {} 随机字符串
   */
  public static randomUnicode(length: number): string;

  /**
   * <p>创建一个长度为指定字符数的随机 Unicode 字符串。<p>
   *
   * <p>字符将从 介于 '\x00' 和 '\uDBFF' 之间的字符集中选择。</p>
   *
   * @param minLength 要创建的随机字符串的最小长度
   * @param maxLength 要创建的随机字符串的最大长度
   * @return {} 随机字符串
   */
  public static randomUnicode(minLength: number, maxLength: number): string;

  static randomUnicode(minLength: number, maxLength?: number): string {
    return this.randomString(this.MIN_UNICODE_CHAR, this.MAX_UNICODE_CHAR, minLength, maxLength);
  }

  /**
   * 返回指定字符范围内的随机字符串。
   *
   * @param startChar 起始字符范围，必须为长度为 1 的字符串，不可为空、null 或 undefined
   * @param endChar 结束字符范围，必须为长度为 1 的字符串，不可为空、null 或 undefined
   * @param length 字符串长度，不可小于 1 且不能为 null 或 undefined
   * @throws {IllegalArgumentError} 如果（startChar 或 endChar 为空、null 或 undefined）
   * 或（startChar 或 endChar 长度大于 1）
   * 或（length 为 null、 undefined 或 小于 1）
   * @return {} 随机字符串
   */
  public static randomString(startChar: string, endChar: string, length: number);

  /**
   * 返回指定字符范围内的随机字符串。
   *
   * @param startChar 起始字符范围，必须为长度为 1 的字符串，不可为空、null 或 undefined
   * @param endChar 结束字符范围，必须为长度为 1 的字符串，不可为空、null 或 undefined
   * @param minLength 最小字符串长度，不可小于 1 且不能为 null 或 undefined
   * @param maxLength 最大字符串长度，不可小于 1 且不能为 null 或 undefined
   * @throws {IllegalArgumentError} 如果（startChar 或 endChar 为空、null 或 undefined）
   * 或（startChar 或 endChar 长度大于 1）
   * 或（minLength 为 null、 undefined 或 小于 1）
   * @return {} 随机字符串
   */
  public static randomString(
    startChar: string,
    endChar: string,
    minLength: number,
    maxLength: number,
  );

  static randomString(
    startChar: string,
    endChar: string,
    minLength: number,
    maxLength?: number,
  ): string {
    if (StringUtils.isAnyEmpty(startChar, endChar)) {
      throw new IllegalArgumentError('结束字符范围不可为空。');
    }

    if (endChar.length > 1 || startChar.length > 1) {
      throw new IllegalArgumentError('起始字符或结束字符长度不可大于1');
    }

    if (ObjectUtils.isNull(minLength)) {
      throw new IllegalArgumentError('长度不可为空');
    }
    if (maxLength < 1) {
      throw new IllegalArgumentError('长度不可小于1');
    }

    const endCharCode = endChar.charCodeAt(0);
    const startCharCode = startChar.charCodeAt(0);
    const length = ObjectUtils.defaultIfCondition(
      RandomUtils.nextInt(minLength, maxLength),
      minLength,
      ObjectUtils.isNotNull(maxLength),
    );

    if (startCharCode === endCharCode) {
      const charCodes = ArrayUtils.fill(startCharCode, length);
      return String.fromCharCode(...charCodes);
    }

    const charCodes = RandomUtils.nextIntArray(length, startCharCode, endCharCode);
    return String.fromCharCode(...charCodes);
  }

  private static randomLetterString(
    number: boolean,
    minLength: number,
    maxLength?: number,
  ): string {
    if (ObjectUtils.isNull(minLength)) {
      throw new IllegalArgumentError('长度不可为空');
    }
    if (maxLength < 1) {
      throw new IllegalArgumentError('长度不可小于1');
    }

    const length = ObjectUtils.defaultIfCondition(
      RandomUtils.nextInt(minLength, maxLength),
      minLength,
      ObjectUtils.isNotNull(maxLength),
    );

    const chars = new Array(length);
    for (let i = 0; i < length; i++) {
      let letter = true;
      if (number) {
        letter = RandomUtils.nextBoolean();
      }
      if (letter) {
        const lowercase = RandomUtils.nextBoolean();
        if (lowercase) {
          chars[i] = RandomUtils.nextInt(
            this.MIN_LOWERCASE_CHAR.charCodeAt(0),
            this.MAX_LOWERCASE_CHAR.charCodeAt(0),
          );
        } else {
          chars[i] = RandomUtils.nextInt(
            this.MIN_UPPERCASE_CHAR.charCodeAt(0),
            this.MAX_UPPERCASE_CHAR.charCodeAt(0),
          );
        }
      } else {
        chars[i] = RandomUtils.nextInt(
          this.MIN_NUMBER_CHAR.charCodeAt(0),
          this.MAX_NUMBER_CHAR.charCodeAt(0),
        );
      }
    }
    return String.fromCharCode(...chars);
  }
}
