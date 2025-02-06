import { ObjectUtils } from './ObjectUtils';
import { BooleanUtils } from './BooleanUtils';
import { ArrayUtils } from './ArrayUtils';
import {
  IllegalArgumentError,
  IndexOutOfBoundsError,
} from '../error/runtimeError';
import { Supplier } from '../type/FunctionAlias';

/**
 * 字符串工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class StringUtils {
  /**
   * 空字符串 ""。
   */
  public static readonly EMPTY = '';
  /**
   * 空白字符的字符串。
   */
  public static readonly SPACE = ' ';
  /**
   * 表示失败的索引搜索。
   */
  public static readonly INDEX_NOT_FOUND = -1;
  /**
   * <p>填充常量可以扩展的最大大小。</p>
   */
  public static readonly PAD_LIMIT = 8192;
  /**
   * 换行符 LF ('\n', Unicode 000a)。
   */
  public static readonly LF = '\n';
  /**
   * 回车字符 CR ('\r', Unicode 000d)。
   */
  public static readonly CR = '\r';
  /**
   * <a href="http:www.unicode.orgglossarycode_point"> Unicode 代码点</a> 的最小值，常量 U+0000。
   */
  public static readonly MIN_CODE_POINT = 0x000000;
  /**
   * <a href="http:www.unicode.orgglossarycode_point"> Unicode 码位</a> 的最大值，常量 U+10FFFF。
   */
  public static readonly MAX_CODE_POINT = 0x10ffff;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * <p>使用省略号缩写字符串。这会将“现在是所有好人的时候”变成“现在是...的时候了”</p>
   *
   * <p>具体来说：</p>
   * <ul>
   *   <li>如果 str 中的字符数小于或等于 maxWidth，则返回 str。</li>
   *   <li>否则将其缩写为 {@link substring}(str, 0, max-3) + "...")。</li>
   *   <li>如果 maxWidth 小于 4，则抛出 {@link IllegalArgumentError}。</li>
   *   <li>在任何情况下，它都不会返回长度大于 maxWidth 的字符串。</li>
   * </ul>
   *
   * <pre>
   * StringUtils.abbreviate(null, *)      = null
   * StringUtils.abbreviate("", 4)        = ""
   * StringUtils.abbreviate("abcdefg", 6) = "abc..."
   * StringUtils.abbreviate("abcdefg", 7) = "abcdefg"
   * StringUtils.abbreviate("abcdefg", 8) = "abcdefg"
   * StringUtils.abbreviate("abcdefg", 4) = "a..."
   * StringUtils.abbreviate("abcdefg", 3) = {@link IllegalArgumentError}
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param maxWidth 结果字符串的最大长度，必须至少为 4
   * @return 缩写字符串，如果为空字符串输入则返回 null
   * @throws {@link IllegalArgumentError} 如果 maxWidth 太小
   */
  public static abbreviate(str: string, maxWidth: number): string;

  /**
   * <p>使用省略号缩写字符串。这会将“现在是所有好人的时候”变成“现在是...的时候了”</p>
   *
   * <p>像 {@link abbreviate}(str, maxWidth) 一样工作，但允许您指定“左边缘”偏移量。
   * 请注意，此左边缘不一定是结果中最左边的字符，也不一定是椭圆后面的第一个字符，但它会出现在结果中的某个位置。
   *
   * <p>在任何情况下，它都不会返回长度大于 maxWidth 的字符串。</p>
   *
   * <pre>
   * StringUtils.abbreviate(null, *, *)                = null
   * StringUtils.abbreviate("", 0, 4)                  = ""
   * StringUtils.abbreviate("abcdefghijklmno", -1, 10) = "abcdefg..."
   * StringUtils.abbreviate("abcdefghijklmno", 0, 10)  = "abcdefg..."
   * StringUtils.abbreviate("abcdefghijklmno", 1, 10)  = "abcdefg..."
   * StringUtils.abbreviate("abcdefghijklmno", 4, 10)  = "abcdefg..."
   * StringUtils.abbreviate("abcdefghijklmno", 5, 10)  = "...fghi..."
   * StringUtils.abbreviate("abcdefghijklmno", 6, 10)  = "...ghij..."
   * StringUtils.abbreviate("abcdefghijklmno", 8, 10)  = "...ijklmno"
   * StringUtils.abbreviate("abcdefghijklmno", 10, 10) = "...ijklmno"
   * StringUtils.abbreviate("abcdefghijklmno", 12, 10) = "...ijklmno"
   * StringUtils.abbreviate("abcdefghij", 0, 3)        = IllegalArgumentException
   * StringUtils.abbreviate("abcdefghij", 5, 6)        = IllegalArgumentException
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param offset 源字符串的左边缘
   * @param maxWidth 结果字符串的最大长度，必须至少为 4
   * @return 缩写字符串，如果为空字符串输入则返回 null
   * @throws {@link IllegalArgumentError} 如果 maxWidth 太小
   */
  public static abbreviate(
    str: string,
    offset: number,
    maxWidth: number,
  ): string;
  /**
   * <p>使用另一个给定的字符串作为替换标记来缩写字符串。
   * 如果“...”被定义为替换标记，这会将“现在是所有好人的时候”变成“现在是...的时候了”。</p>
   *
   * <p>具体来说：</p>
   * <ul>
   *   <li>如果 str 中的字符数小于或等于 maxWidth，则返回 str。</li>
   *   <li>否则将其缩写为 {@link substring}(str, 0, max-abbrevMarker.length) + abbrevMarker)。</li>
   *   <li>如果 maxWidth 小于 abbrevMarker.length + 1，则抛出 {@link IllegalArgumentError}。</li>
   *   <li>在任何情况下，它都不会返回长度大于 maxWidth 的字符串。</li>
   * </ul>
   *
   * <pre>
   * StringUtils.abbreviate(null, "...", *)      = null
   * StringUtils.abbreviate("abcdefg", null, *)  = "abcdefg"
   * StringUtils.abbreviate("", "...", 4)        = ""
   * StringUtils.abbreviate("abcdefg", ".", 5)   = "abcd."
   * StringUtils.abbreviate("abcdefg", ".", 7)   = "abcdefg"
   * StringUtils.abbreviate("abcdefg", ".", 8)   = "abcdefg"
   * StringUtils.abbreviate("abcdefg", "..", 4)  = "ab.."
   * StringUtils.abbreviate("abcdefg", "..", 3)  = "a.."
   * StringUtils.abbreviate("abcdefg", "..", 2)  = IllegalArgumentException
   * StringUtils.abbreviate("abcdefg", "...", 3) = IllegalArgumentException
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param abbrevMarker 用作替换标记的字符串
   * @param maxWidth 结果字符串的最大长度，必须至少为 abbrevMarker.length + 1
   * @return 缩写字符串，如果为空字符串输入则返回 null
   * @throws {@link IllegalArgumentError} 如果 maxWidth 太小
   */
  public static abbreviate(
    str: string,
    abbrevMarker: string,
    maxWidth: number,
  ): string;
  /**
   * <p>使用给定的替换标记缩写字符串。
   * 如果“...”被定义为替换标记，这会将“现在是所有好人的时候”变成“......是时候......”。</p>
   *
   * <p>像 {@link abbreviate}(string, string, number)} 一样工作，但允许您指定“左边缘”偏移量。
   * 请注意，这个左边缘不一定是结果中最左边的字符，或者替换标记之后的第一个字符，但它会出现在结果中的某个位置。
   *
   * <p>在任何情况下，它都不会返回长度大于 maxWidth 的字符串。</p>
   *
   * <pre>
   * StringUtils.abbreviate(null, null, *, *)                 = null
   * StringUtils.abbreviate("abcdefghijklmno", null, *, *)    = "abcdefghijklmno"
   * StringUtils.abbreviate("", "...", 0, 4)                  = ""
   * StringUtils.abbreviate("abcdefghijklmno", "---", -1, 10) = "abcdefg---"
   * StringUtils.abbreviate("abcdefghijklmno", ",", 0, 10)    = "abcdefghi,"
   * StringUtils.abbreviate("abcdefghijklmno", ",", 1, 10)    = "abcdefghi,"
   * StringUtils.abbreviate("abcdefghijklmno", ",", 2, 10)    = "abcdefghi,"
   * StringUtils.abbreviate("abcdefghijklmno", "::", 4, 10)   = "::efghij::"
   * StringUtils.abbreviate("abcdefghijklmno", "...", 6, 10)  = "...ghij..."
   * StringUtils.abbreviate("abcdefghijklmno", "*", 9, 10)    = "*ghijklmno"
   * StringUtils.abbreviate("abcdefghijklmno", "'", 10, 10)   = "'ghijklmno"
   * StringUtils.abbreviate("abcdefghijklmno", "!", 12, 10)   = "!ghijklmno"
   * StringUtils.abbreviate("abcdefghij", "abra", 0, 4)       = IllegalArgumentException
   * StringUtils.abbreviate("abcdefghij", "...", 5, 6)        = IllegalArgumentException
   * </pre>
   *
   * @param str 要检查的字符串，可能为空
   * @param abbrevMarker 用作替换标记的字符串
   * @param offset 源字符串的左边缘
   * @param maxWidth 结果字符串的最大长度，必须至少为 4
   * @return 缩写字符串，如果为空字符串输入则返回 null
   * @throws {@link IllegalArgumentError} 如果 maxWidth 太小
   */
  public static abbreviate(
    str: string,
    abbrevMarker: string,
    offset: number,
    maxWidth: number,
  ): string;
  static abbreviate(
    str: string,
    abbrevMarker: string | number,
    offset?: number,
    maxWidth?: number,
  ): string {
    if (maxWidth === undefined) {
      if (offset === undefined) {
        return this.abbreviate(str, abbrevMarker as number);
      }
      if (typeof abbrevMarker === 'string') {
        return this.abbreviate(str, abbrevMarker, offset);
      }
      return this.abbreviate(str, abbrevMarker, offset);
    }

    if (this.isNotEmpty(str) && this.EMPTY === abbrevMarker && maxWidth > 0) {
      return this.substring(str, 0, maxWidth);
    } else if (this.isAnyEmpty(str, abbrevMarker as string)) {
      return str;
    }
    const abbrevMarkerLength = (abbrevMarker as string).length;
    const minAbbrevWidth = abbrevMarkerLength + 1;
    const minAbbrevWidthOffset = abbrevMarkerLength + abbrevMarkerLength + 1;

    if (maxWidth < minAbbrevWidth) {
      throw new IllegalArgumentError('最小缩写宽度为 ' + minAbbrevWidth);
    }
    const strLen = str.length;
    if (strLen <= maxWidth) {
      return str;
    }
    if (offset > strLen) {
      offset = strLen;
    }
    if (strLen - offset < maxWidth - abbrevMarkerLength) {
      offset = strLen - (maxWidth - abbrevMarkerLength);
    }
    if (offset <= abbrevMarkerLength + 1) {
      return str.substring(0, maxWidth - abbrevMarkerLength) + abbrevMarker;
    }
    if (maxWidth < minAbbrevWidthOffset) {
      throw new IllegalArgumentError(
        '带偏移的最小缩写宽度为 ' + minAbbrevWidthOffset,
      );
    }
    if (offset + maxWidth - abbrevMarkerLength < strLen) {
      return (
        abbrevMarker +
        this.abbreviate(
          str.substring(offset),
          abbrevMarker as string,
          maxWidth - abbrevMarkerLength,
        )
      );
    }
    return (
      abbrevMarker + str.substring(strLen - (maxWidth - abbrevMarkerLength))
    );
  }

  /**
   * <p>将字符串缩写为传递的长度，用提供的替换字符串替换中间字符。</p>
   *
   * <p>仅当满足以下条件时才会出现此缩写：</p>
   * <ul>
   * <li>缩写字符串和替换字符串都不是 null、undefined 或空</li>
   * <li>要截断的长度小于提供的字符串的长度</li>
   * <li>要截断的长度大于 0</li>
   * <li>缩写的字符串将有足够的空间容纳提供的替换字符串的长度以及提供的缩写字符串的第一个和最后一个字符</li>
   * </ul>
   * <p>否则，返回的字符串将与提供的缩写字符串相同。
   * </p>
   *
   * <pre>
   * StringUtils.abbreviateMiddle(null, null, 0)      = null
   * StringUtils.abbreviateMiddle("abc", null, 0)      = "abc"
   * StringUtils.abbreviateMiddle("abc", ".", 0)      = "abc"
   * StringUtils.abbreviateMiddle("abc", ".", 3)      = "abc"
   * StringUtils.abbreviateMiddle("abcdef", ".", 4)     = "ab.f"
   * </pre>
   *
   * @param str 要缩写的字符串，可以为 null、undefined
   * @param middle 用于替换中间字符的字符串，可能为 null、undefined
   * @param length str 的缩写长度。
   * @return {} 如果满足上述条件，则为缩写字符串，或为缩写提供的原始字符串。
   */
  public static abbreviateMiddle(
    str: string,
    middle: string,
    length: number,
  ): string {
    if (
      this.isAnyEmpty(str, middle) ||
      length >= str.length ||
      length < middle.length + 2
    ) {
      return str;
    }

    const targetSting = length - middle.length;
    const startOffset = targetSting / 2 + (targetSting % 2);
    const endOffset = str.length - targetSting / 2;

    return str.substring(0, startOffset) + middle + str.substring(endOffset);
  }

  /**
   * 如果字符串尚未以任何后缀结尾，则将后缀附加到字符串的末尾。
   *
   * <pre>
   * StringUtils.appendIfMissing(null, null) = null
   * StringUtils.appendIfMissing("abc", null) = "abc"
   * StringUtils.appendIfMissing("", "xyz") = "xyz"
   * StringUtils.appendIfMissing("abc", "xyz") = "abcxyz"
   * StringUtils.appendIfMissing("abcxyz", "xyz") = "abcxyz"
   * StringUtils.appendIfMissing("abcXYZ", "xyz") = "abcXYZxyz"
   * </pre>
   *
   * <p>加上额外的后缀，</p>
   * <pre>
   * StringUtils.appendIfMissing(null, null, null) = null
   * StringUtils.appendIfMissing("abc", null, null) = "abc"
   * StringUtils.appendIfMissing("", "xyz", null) = "xyz"
   * StringUtils.appendIfMissing("abc", "xyz", new CharSequence[]{null}) = "abcxyz"
   * StringUtils.appendIfMissing("abc", "xyz", "") = "abc"
   * StringUtils.appendIfMissing("abc", "xyz", "mno") = "abcxyz"
   * StringUtils.appendIfMissing("abcxyz", "xyz", "mno") = "abcxyz"
   * StringUtils.appendIfMissing("abcmno", "xyz", "mno") = "abcmno"
   * StringUtils.appendIfMissing("abcXYZ", "xyz", "mno") = "abcXYZxyz"
   * StringUtils.appendIfMissing("abcMNO", "xyz", "mno") = "abcMNOxyz"
   * </pre>
   *
   * @param str 字符串。
   * @param suffix 附加到字符串末尾的后缀。
   * @param suffixes 作为有效终止符的附加后缀。
   * @return {} 如果附加了后缀，则为新字符串，否则为相同的字符串。
   */
  public static appendIfMissing(
    str: string,
    suffix: string,
    ...suffixes: string[]
  ): string {
    if (
      ObjectUtils.isNull(str) ||
      this.isEmpty(suffix) ||
      this.endsWith(str, suffix, false)
    ) {
      return str;
    }
    if (ArrayUtils.isNotEmpty(suffixes)) {
      for (let i = 0; i < suffixes.length; i++) {
        if (this.endsWith(str, suffix.charAt(i), false)) {
          return str;
        }
      }
    }
    return str + suffix.toString();
  }

  /**
   * 如果字符串尚未结束，则将后缀附加到字符串的末尾，不区分大小写，带有任何后缀。
   *
   * <pre>
   * StringUtils.appendIfMissingIgnoreCase(null, null) = null
   * StringUtils.appendIfMissingIgnoreCase("abc", null) = "abc"
   * StringUtils.appendIfMissingIgnoreCase("", "xyz") = "xyz"
   * StringUtils.appendIfMissingIgnoreCase("abc", "xyz") = "abcxyz"
   * StringUtils.appendIfMissingIgnoreCase("abcxyz", "xyz") = "abcxyz"
   * StringUtils.appendIfMissingIgnoreCase("abcXYZ", "xyz") = "abcXYZ"
   * </pre>
   * <p>加上额外的后缀，</p>
   * <pre>
   * StringUtils.appendIfMissingIgnoreCase(null, null, null) = null
   * StringUtils.appendIfMissingIgnoreCase("abc", null, null) = "abc"
   * StringUtils.appendIfMissingIgnoreCase("", "xyz", null) = "xyz"
   * StringUtils.appendIfMissingIgnoreCase("abc", "xyz", new CharSequence[]{null}) = "abcxyz"
   * StringUtils.appendIfMissingIgnoreCase("abc", "xyz", "") = "abc"
   * StringUtils.appendIfMissingIgnoreCase("abc", "xyz", "mno") = "abcxyz"
   * StringUtils.appendIfMissingIgnoreCase("abcxyz", "xyz", "mno") = "abcxyz"
   * StringUtils.appendIfMissingIgnoreCase("abcmno", "xyz", "mno") = "abcmno"
   * StringUtils.appendIfMissingIgnoreCase("abcXYZ", "xyz", "mno") = "abcXYZ"
   * StringUtils.appendIfMissingIgnoreCase("abcMNO", "xyz", "mno") = "abcMNO"
   * </pre>
   *
   * @param str 字符串。
   * @param suffix 附加到字符串末尾的后缀。
   * @param suffixes 作为有效终止符的附加后缀。
   * @return {} 如果附加了后缀，则为新字符串，否则为相同的字符串。
   */
  public static appendIfMissingIgnoreCase(
    str: string,
    suffix: string,
    ...suffixes: string[]
  ): string {
    if (
      ObjectUtils.isNull(str) ||
      this.isEmpty(suffix) ||
      this.endsWith(str, suffix, true)
    ) {
      return str;
    }
    if (ArrayUtils.isNotEmpty(suffixes)) {
      for (let i = 0; i < suffixes.length; i++) {
        if (this.endsWith(str, suffix.charAt(i), true)) {
          return str;
        }
      }
    }
    return str + suffix.toString();
  }

  /**
   * <p>将一个字符串居中在一个较大的 size 大小的字符串中。
   * 使用提供的字符串作为填充字符串的值。</p>
   *
   * <p>如果大小小于字符串长度，则返回字符串。null、undefined 字符串返回 null。负大小被视为零。</p>
   *
   * <pre>
   * StringUtils.center(null, *, *)     = null
   * StringUtils.center("", 4, " ")     = "    "
   * StringUtils.center("ab", -1, " ")  = "ab"
   * StringUtils.center("ab", 4, " ")   = " ab "
   * StringUtils.center("abcd", 2, " ") = "abcd"
   * StringUtils.center("a", 4, " ")    = " a  "
   * StringUtils.center("a", 4, "yz")   = "yayz"
   * StringUtils.center("abc", 7, null) = "  abc  "
   * StringUtils.center("abc", 7, "")   = "  abc  "
   * </pre>
   *
   * @param str 居中的字符串，可能为 null 或 undefined
   * @param size 新字符串的大小，负数视为零
   * @param padStr 用于填充新字符串的字符串，不能为 null、undefined 或空
   * @return 居中字符串，如果为 null 或 undefined 字符串输入则返回 null
   * @throws {@link IllegalArgumentError} 如果 padStr 为 null、undefined 或为空
   */
  public static center(str: string, size: number, padStr = this.SPACE): string {
    if (ObjectUtils.isNull(str) || size <= 0) {
      return str;
    }
    if (this.isEmpty(padStr)) {
      padStr = this.SPACE;
    }
    const strLen = str.length;
    const pads = size - strLen;
    if (pads <= 0) {
      return str;
    }
    str = this.leftPad(str, strLen + pads / 2, padStr);
    str = this.rightPad(str, size, padStr);
    return str;
  }

  /**
   * <p>如果字符串存在，则从字符串末尾删除一个换行符，否则不理会它。
   * 换行符是 \n、\r 或 \r\n。</p>
   *
   * <pre>
   * StringUtils.chomp(null)          = null
   * StringUtils.chomp("")            = ""
   * StringUtils.chomp("abc \r")      = "abc "
   * StringUtils.chomp("abc\n")       = "abc"
   * StringUtils.chomp("abc\r\n")     = "abc"
   * StringUtils.chomp("abc\r\n\r\n") = "abc\r\n"
   * StringUtils.chomp("abc\n\r")     = "abc\n"
   * StringUtils.chomp("abc\n\rabc")  = "abc\n\rabc"
   * StringUtils.chomp("\r")          = ""
   * StringUtils.chomp("\n")          = ""
   * StringUtils.chomp("\r\n")        = ""
   * </pre>
   *
   * @param str 要从中选择换行符的字符串，可能为 null 或 undefined
   * @return 不带换行符的字符串，如果为 null、undefined 字符串输入则返回 null
   */
  public static chomp(str: string): string {
    if (this.isEmpty(str)) {
      return str;
    }

    if (str.length === 1) {
      const ch = str.charAt(0);
      if (ch === this.CR || ch === this.LF) {
        return this.EMPTY;
      }
      return str;
    }

    let lastIdx = str.length - 1;
    const last = str.charAt(lastIdx);

    if (last === this.LF) {
      if (str.charAt(lastIdx - 1) === this.CR) {
        lastIdx--;
      }
    } else if (last !== this.CR) {
      lastIdx++;
    }
    return str.substring(0, lastIdx);
  }

  /**
   * <p>字符串中删除最后一个字符。</p>
   *
   * <p>如果字符串以 \r\n 结尾，则删除它们。</p>
   *
   * <pre>
   * StringUtils.chop(null)          = null
   * StringUtils.chop("")            = ""
   * StringUtils.chop("abc \r")      = "abc "
   * StringUtils.chop("abc\n")       = "abc"
   * StringUtils.chop("abc\r\n")     = "abc"
   * StringUtils.chop("abc")         = "ab"
   * StringUtils.chop("abc\nabc")    = "abc\nab"
   * StringUtils.chop("a")           = ""
   * StringUtils.chop("\r")          = ""
   * StringUtils.chop("\n")          = ""
   * StringUtils.chop("\r\n")        = ""
   * </pre>
   *
   * @param str 要从中删除最后一个字符的字符串，可能为 null 或 undefined
   * @return 没有最后一个字符的字符串，如果为 null、undefined 字符串输入则返回 null
   */
  public static chop(str: string): string {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    const strLen = str.length;
    if (strLen < 2) {
      return this.EMPTY;
    }
    const lastIdx = strLen - 1;
    const ret = str.substring(0, lastIdx);
    const last = str.charAt(lastIdx);
    if (last === this.LF && ret.charAt(lastIdx - 1) === this.CR) {
      return ret.substring(0, lastIdx - 1);
    }
    return ret;
  }

  /**
   * <p>根据字典顺序比较两个字符串（null 安全版本），返回：</p>
   *  <ul>
   *  <li>= 0，如果 str1 等于 str2（或两者都为 null ）</li>
   *  <li>< 0，如果 str1 小于 str2</li>
   *  <li>> 0，如果 str1 大于 str2</li>
   * </ul>
   *
   * <p>null 或 undefined 输入根据 nullIsLess 参数进行处理。两个 null 或 undefined 引用被认为是相等的。</p>
   *
   * <pre>
   * StringUtils.compare(null, null, *)     = 0
   * StringUtils.compare(null , "a", true)  &lt; 0
   * StringUtils.compare(null , "a", false) &gt; 0
   * StringUtils.compare("a", null, true)   &gt; 0
   * StringUtils.compare("a", null, false)  &lt; 0
   * StringUtils.compare("abc", "abc", *)   = 0
   * StringUtils.compare("a", "b", *)       &lt; 0
   * StringUtils.compare("b", "a", *)       &gt; 0
   * StringUtils.compare("a", "B", *)       &gt; 0
   * StringUtils.compare("ab", "abc", *)    &lt; 0
   * </pre>
   *
   * @param str1 要比较的字符串
   * @param str2 要比较的字符串
   * @param nullIsLess 是否考虑 null 值小于非 null 值
   * @return {} < 0, 0, > 0，如果 str1 分别小于、等于或大于 str2
   * @see compare
   */
  public static compare(str1: string, str2: string, nullIsLess = true): number {
    return this.compareStr(str1, str2, nullIsLess, false);
  }

  /**
   * <p>根据字典顺序比较两个字符串（null 安全版本），忽略大小写差异，返回：</p>
   *  <ul>
   *  <li>= 0，如果 str1 等于 str2（或两者都为 null ）</li>
   *  <li>< 0，如果 str1 小于 str2</li>
   *  <li>> 0，如果 str1 大于 str2</li>
   * </ul>
   *
   * <p>null 或 undefined 输入根据 nullIsLess 参数进行处理。两个 null 或 undefined 引用被认为是相等的。比较不区分大小写。</p>
     *
     * <pre>
     * StringUtils.compareIgnoreCase(null, null)   = 0
     * StringUtils.compareIgnoreCase(null , "a")   &lt; 0
     * StringUtils.compareIgnoreCase("a", null)    &gt; 0
     * StringUtils.compareIgnoreCase("abc", "abc") = 0
     * StringUtils.compareIgnoreCase("abc", "ABC") = 0
     * StringUtils.compareIgnoreCase("a", "b")     &lt; 0
     * StringUtils.compareIgnoreCase("b", "a")     &gt; 0
     * StringUtils.compareIgnoreCase("a", "B")     &lt; 0
   * StringUtils.compareIgnoreCase("A", "b")     &lt; 0
   * StringUtils.compareIgnoreCase("ab", "ABC")  &lt; 0
   * </pre>
   *
   * @param str1 要比较的字符串
   * @param str2 要比较的字符串
   * @param nullIsLess 是否考虑 null 值小于非 null 值
   * @return {} < 0, 0, > 0，如果 str1 分别小于、等于或大于 str2
   @see compare
   */
  public static compareToIgnoreCase(
    str1: string,
    str2: string,
    nullIsLess = true,
  ): number {
    return this.compareStr(str1, str2, nullIsLess, true);
  }

  /**
   * <p>检查字符串是否包含 searchStr，处理 null。</p>
   * <p>null 或 undefined 字符串将返回 false。</p>
   *
   * <pre>
   * StringUtils.contains(null, *)     = false
   * StringUtils.contains(*, null)     = false
   * StringUtils.contains("", "")      = true
   * StringUtils.contains("abc", "")   = true
   * StringUtils.contains("abc", "a")  = true
   * StringUtils.contains("abc", "z")  = false
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchStr 要查找的字符串，可能为 null 或 undefined
   * @return {boolean} 如果字符串包含 searchStr，则为 true，否则为 false。字符串为 null 或 undefined 则返回 null。
   */
  public static contains(str: string, searchStr: string): boolean {
    if (ObjectUtils.anyNull(str, searchStr)) {
      return false;
    }
    return str.includes(searchStr);
  }

  /**
   * <p>检查字符串是否包含给定数组中的任何字符串。</p>
   * <p>如果字符串为 null，将返回 false。搜索数组为 null 或长度为 0 将返回 false。</p>
   *
   * <pre>
   * StringUtils.containsAny(null, *)                  = false
   * StringUtils.containsAny("", *)                    = false
   * StringUtils.containsAny(*, null)                  = false
   * StringUtils.containsAny(*, [])                    = false
   * StringUtils.containsAny("zzabyycdxx", ['z', 'a']) = true
   * StringUtils.containsAny("zzabyycdxx", ['b', 'y']) = true
   * StringUtils.containsAny("zzabyycdxx", ['z', 'y']) = true
   * StringUtils.containsAny("aba", ['z'])             = false
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchStrs 要搜索的字符串数组或单个字符串，可能为 null 或 undefined。单个字符串也可以为 null 或 undefined。
   * @return {boolean} 如果找到任何搜索数组中的元素，则为 true ，否则为 false
   */
  public static containsAny(str: string, ...searchStrs: string[]): boolean {
    if (this.isEmpty(str) || ArrayUtils.isEmpty(searchStrs)) {
      return false;
    }
    for (const searchStr of searchStrs) {
      if (this.contains(str, searchStr)) {
        return true;
      }
    }
    return false;
  }

  /**
   * <p>检查字符串是否包含给定数组中的任何字符串。</p>
   * <p>如果字符串为 null 或 undefined，将返回 false。搜索数组为 null 或长度为 0 将返回 false。</p>
   *
   * <pre>
   * StringUtils.containsAny(null, *)            = false
   * StringUtils.containsAny("", *)              = false
   * StringUtils.containsAny(*, null)            = false
   * StringUtils.containsAny(*, [])              = false
   * StringUtils.containsAny("abcd", "ab", null) = true
   * StringUtils.containsAny("abcd", "ab", "cd") = true
   * StringUtils.containsAny("abc", "d", "abc")  = true
   * StringUtils.containsAny("abc", "D", "ABC")  = true
   * StringUtils.containsAny("ABC", "d", "abc")  = true
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchStrs 要搜索的字符串数组，可能为 null 或 undefined。单个字符串也可以为 null 或 undefined。
   * @return {boolean} 如果找到任何搜索数组中的元素，则为 true ，否则为 false
   */
  public static containsAnyIgnoreCase(
    str: string,
    ...searchStrs: string[]
  ): boolean {
    if (this.isEmpty(str) || ArrayUtils.isEmpty(searchStrs)) {
      return false;
    }
    for (const searchStr of searchStrs) {
      if (this.containsIgnoreCase(str, searchStr)) {
        return true;
      }
    }
    return false;
  }

  /**
   * <p>忽略大小写，检查字符串是否包含 searchStr，处理 null。</p>
   * <p>null 或 undefined 字符串将返回 false。</p>
   *
   * <pre>
   * StringUtils.containsIgnoreCase(null, *) = false
   * StringUtils.containsIgnoreCase(*, null) = false
   * StringUtils.containsIgnoreCase("", "") = true
   * StringUtils.containsIgnoreCase("abc", "") = true
   * StringUtils.containsIgnoreCase("abc", "a") = true
   * StringUtils.containsIgnoreCase("abc", "z") = false
   * StringUtils.containsIgnoreCase("abc", "A") = true
   * StringUtils.containsIgnoreCase("abc", "Z") = false
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchStr 要查找的字符串，可能为 null 或 undefined
   * @return {boolean} 如果字符串包含忽略大小写的 searchStr，则为 true，否则为 false。字符串为 null 或 undefined 则返回 null。
   */
  public static containsIgnoreCase(str: string, searchStr: string): boolean {
    if (ObjectUtils.anyNull(str, searchStr)) {
      return false;
    }
    return str.toLowerCase().includes(searchStr);
  }

  /**
   * 检查字符串是否不包含某些字符。<br />
   * 如果字符串为 null，将返回 true。无效字符串为 null，将返回 true。
   * 空字符串 (str.length === 0) 始终返回 true。
   *
   * <pre>
   * StringUtils.containsNone(null, *)       = true
   * StringUtils.containsNone(*, null)       = true
   * StringUtils.containsNone("", *)         = true
   * StringUtils.containsNone("ab", '')      = true
   * StringUtils.containsNone("abab", 'xyz') = true
   * StringUtils.containsNone("ab1", 'xyz')  = true
   * StringUtils.containsNone("abz", 'xyz')  = false
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param invalidString 无效字符串，可能为 null 或 undefined
   * @return {boolean} 如果它不包含任何无效字符或为 null、undefined，则为 true
   */
  public static containsNone(str: string, invalidString: string): boolean {
    if (ObjectUtils.anyNull(str, invalidString)) {
      return true;
    }

    const strLen = str.length;
    const strLast = strLen - 1;
    const searchLen = invalidString.length;
    const searchLast = searchLen - 1;
    for (let i = 0; i < strLen; i++) {
      const ch = str.charAt(i);
      for (let j = 0; j < searchLen; j++) {
        if (invalidString.charAt(j) === ch) {
          if (j === searchLast) {
            return false;
          }
          if (
            i < strLast &&
            invalidString.charAt(j + 1) === str.charAt(i + 1)
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  /**
   * 检查字符串是否仅包含某些字符。<br />
   * 如果字符串为 null，将返回 false。有效字符串为 null，将返回 false。
   * 空字符串 (str.length === 0) 始终返回 true。
   *
   * <pre>
   * StringUtils.containsOnly(null, *)       = false
   * StringUtils.containsOnly(*, null)       = false
   * StringUtils.containsOnly("", *)         = true
   * StringUtils.containsOnly("ab", '')      = false
   * StringUtils.containsOnly("abab", 'abc') = true
   * StringUtils.containsOnly("ab1", 'abc')  = false
   * StringUtils.containsOnly("abz", 'abc')  = false
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param validString 有效字符串，可能为 null 或 undefined
   * @return {boolean} 如果它只包含有效字符并且是非 null、 undefined 的，则为 true
   */
  public static containsOnly(str: string, validString: string): boolean {
    if (ObjectUtils.anyNull(str, validString)) {
      return false;
    }
    if (str.length === 0) {
      return true;
    }
    if (validString.length === 0) {
      return false;
    }
    return this.indexOfAnyBut(str, validString) === this.INDEX_NOT_FOUND;
  }

  /**
   * 检查给定的字符串是否包含任何空白字符。
   *
   * <p>空白定义为 {@link isWhitespace}(string).</p>
   *
   * @param str 要检查的字符串，可能为 null
   * @return {boolean} 如果字符串不为空并且包含至少 1 个（中断）空白字符，则为 true
   */
  public static containsWhitespace(str: string): boolean {
    if (this.isEmpty(str)) {
      return false;
    }

    const strLen = str.length;
    for (let i = 0; i < strLen; i++) {
      if (this.isWhitespace(str.charAt(i))) {
        return true;
      }
    }
    return false;
  }

  /**
   * <p>计算子字符串在较大字符串中出现的次数。
   * 请注意，代码仅计算非重叠匹配。</p>
   *
   * <p>null、undefined 或空 ("") 字符串输入返回 0。</p>
   *
   * <pre>
   * StringUtils.countMatches(null, *)       = 0
   * StringUtils.countMatches("", *)         = 0
   * StringUtils.countMatches("abba", null)  = 0
   * StringUtils.countMatches("abba", "")    = 0
   * StringUtils.countMatches("abba", "a")   = 2
   * StringUtils.countMatches("abba", "ab")  = 1
   * StringUtils.countMatches("abba", "xxx") = 0
   * StringUtils.countMatches("ababa", "aba") = 1
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param sub 要计数的子字符串，可能为 null 或 undefined
   * @return 出现次数，如果任一 字符串为 null 或 undefined，则为 0
   */
  public static countMatches(str: string, sub: string): number {
    if (this.isAnyEmpty(str, sub)) {
      return 0;
    }

    let count = 0;
    let idx = 0;
    while ((idx = this.indexOf(str, sub, idx)) != this.INDEX_NOT_FOUND) {
      count++;
      idx += sub.length;
    }
    return count;
  }

  /**
   * <p>返回传入的字符串，或者如果字符串是空白(" ")、空 ("")、null 或 undefined，则返回 defaultStr 的值。</p>
   *
   * <p>空白定义为 {@link isWhitespace}(string).</p>
   *
   * <pre>
   * StringUtils.defaultIfBlank(null, "NULL")  = "NULL"
   * StringUtils.defaultIfBlank("", "NULL")    = "NULL"
   * StringUtils.defaultIfBlank(" ", "NULL")   = "NULL"
   * StringUtils.defaultIfBlank("bat", "NULL") = "bat"
   * StringUtils.defaultIfBlank("", null)      = null
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param defaultStr 要返回的默认字符串，如果输入为空白(" ")、空 ("")、null 或 undefined，则可能为 null
   * @return {} 传入的字符串，或默认字符
   * @see defaultString
   */
  public static defaultIfBlank(str: string, defaultStr = ''): string {
    return this.isBlank(str) ? defaultStr : str;
  }

  /**
   * <p>返回传入的字符串，或者如果字符串为空 ("")、null 或 undefined，则返回 defaultStr 的值。</p>
   *
   * <pre>
   * StringUtils.defaultIfBlank(null, "NULL")  = "NULL"
   * StringUtils.defaultIfBlank("", "NULL")    = "NULL"
   * StringUtils.defaultIfBlank(" ", "NULL")   = "NULL"
   * StringUtils.defaultIfBlank("bat", "NULL") = "bat"
   * StringUtils.defaultIfBlank("", null)      = null
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param defaultStr 要返回的默认字符串，如果输入为空 ("")、null 或 undefined，则可能为 null
   * @return {} 传入的字符串，或默认字符
   * @see defaultString
   */
  public static defaultIfEmpty(str: string, defaultStr = ''): string {
    return this.isEmpty(str) ? defaultStr : str;
  }

  /**
   * <p>返回传入的字符串，或者如果字符串是 null 或 undefined，则返回 defaultStr 的值。</p>
   *
   * <pre>
   * StringUtils.defaultString(null, "NULL")  = "NULL"
   * StringUtils.defaultString("", "NULL")    = ""
   * StringUtils.defaultString("bat", "NULL") = "bat"
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param defaultStr 要返回的默认字符串，如果输入为 null 或 undefined，则可能为 null
   * @return 传入的字符串，如果是 null 或 undefined 则为默认值
   */
  public static defaultString(str: string, defaultStr = ''): string {
    return ObjectUtils.defaultIfNull(str, defaultStr);
  }

  /**
   * <p>从{@link isWhitespace}(string) 定义的字符串中删除所有空白。</p>
   *
   * <pre>
   * StringUtils.deleteWhitespace(null)         = null
   * StringUtils.deleteWhitespace("")           = ""
   * StringUtils.deleteWhitespace("abc")        = "abc"
   * StringUtils.deleteWhitespace("   ab  c  ") = "abc"
   * </pre>
   *
   * @param str 要从中删除空白的字符串，可能为 null 或 undefined
   * @return 没有空白的字符串，如果字符串输入为 null 或 undefined 则返回 null
   */
  public static deleteWhitespace(str: string): string {
    if (this.isEmpty(str)) {
      return str;
    }

    const sz = str.length;
    const chs = new Array<string>(sz);
    let count = 0;
    for (let i = 0; i < sz; i++) {
      if (!this.isWhitespace(str.charAt(i))) {
        chs[count++] = str.charAt(i);
      }
    }
    if (count === sz) {
      return str;
    }
    if (count === 0) {
      return this.EMPTY;
    }
    return chs.slice(0, count).join('');
  }

  /**
   * <p>比较两个字符串，并返回它们不同的部分。
   * 更准确地说，返回第二个字符串的剩余部分，从它与第一个不同的地方开始。
   * 这意味着 “abc” 和 “ab” 之间的区别是空字符串而不是 “c”。</p>
   *
   * <p>例如，StringUtils.difference("i am a machine", "i am a robot") -> "robot".</p>
   *
   * <pre>
   * StringUtils.difference(null, null) = null
   * StringUtils.difference("", "") = ""
   * StringUtils.difference("", "abc") = "abc"
   * StringUtils.difference("abc", "") = ""
   * StringUtils.difference("abc", "abc") = ""
   * StringUtils.difference("abc", "ab") = ""
   * StringUtils.difference("ab", "abxyz") = "xyz"
   * StringUtils.difference("abcde", "abxyz") = "xyz"
   * StringUtils.difference("abcde", "xyz") = "xyz"
   * </pre>
   *
   * @param str1 第一个字符串，可能为 null 或 undefined
   * @param str2 第二个字符串，可能为 null 或 undefined
   * @return str2 与 str1 不同的部分；如果它们相等，则返回空字符串
   * @see indexOfDifference
   */
  public static difference(str1: string, str2: string): string {
    if (ObjectUtils.isNull(str1)) {
      return str2;
    }
    if (ObjectUtils.isNull(str2)) {
      return str1;
    }
    const at = this.indexOfDifference(str1, str2);
    if (at === this.INDEX_NOT_FOUND) {
      return this.EMPTY;
    }
    return str2.substring(at);
  }

  /**
   * <p>检查字符串是否以指定的后缀结尾。</p>
   *
   * <p>无 null 或 undefined 异常处理。两个 null 或 undefined 引用被认为是相等的。比较区分大小写。</p>
   *
   * <pre>
   * StringUtils.endsWith(null, null)      = true
   * StringUtils.endsWith(null, "def")     = false
   * StringUtils.endsWith("abcdef", null)  = false
   * StringUtils.endsWith("abcdef", "def") = true
   * StringUtils.endsWith("ABCDEF", "def") = false
   * StringUtils.endsWith("ABCDEF", "cde") = false
   * StringUtils.endsWith("ABCDEF", "")    = true
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param suffix 要查找的后缀，可能为 null 或 undefined
   * @param ignoreCase 指示比较是否应忽略大小写（不区分大小写）。
   * @return 如果字符串以 suffix 结尾则返回 true，区分大小写，或两者都有 null、undefined
   */
  public static endsWith(
    str: string,
    suffix: string,
    ignoreCase = false,
  ): boolean {
    if (ObjectUtils.anyNull(str, suffix)) {
      return str === suffix;
    }
    if (suffix.length > str.length) {
      return false;
    }
    return ignoreCase
      ? str.toLowerCase().endsWith(suffix)
      : str.endsWith(suffix);
  }

  /**
   * <p>检查字符串是否以任何提供的区分大小写的后缀结尾。</p>
   *
   * <pre>
   * StringUtils.endsWithAny(null, null)      = false
   * StringUtils.endsWithAny(null, ["abc"])  = false
   * StringUtils.endsWithAny("abcxyz", null)     = false
   * StringUtils.endsWithAny("abcxyz", [""]) = true
   * StringUtils.endsWithAny("abcxyz", ["xyz"]) = true
   * StringUtils.endsWithAny("abcxyz", [null, "xyz", "abc"]) = true
   * StringUtils.endsWithAny("abcXYZ", "def", "XYZ") = true
   * StringUtils.endsWithAny("abcXYZ", "def", "xyz") = false
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchStrings 要查找的区分大小写的字符串，可能为空或包含 null、undefined
   * @return 如果输入字符串是 null 或 undefined 并且没有提供 searchStrings 则返回 true，
   * 或者输入字符串以任何提供的区分大小写的 searchStrings 结尾。
   * @see endsWith
   */
  public static endsWithAny(str: string, ...searchStrings: string[]): boolean {
    if (this.isEmpty(str) || ArrayUtils.isEmpty(searchStrings)) {
      return false;
    }
    for (const searchString of searchStrings) {
      if (this.endsWith(str, searchString)) {
        return true;
      }
    }
    return false;
  }

  /**
   * <p>不区分大小写检查字符串是否以指定的后缀结尾。</p>
   *
   * <p>无 null 或 undefined 异常处理。两个 null 或 undefined 引用被认为是相等的。比较不区分大小写。</p>
   *
   * <pre>
   * StringUtils.endsWithAny(null, null)      = false
   * StringUtils.endsWithAny(null, ["abc"])  = false
   * StringUtils.endsWithAny("abcxyz", null)     = false
   * StringUtils.endsWithAny("abcxyz", [""]) = true
   * StringUtils.endsWithAny("abcxyz", ["xyz"]) = true
   * StringUtils.endsWithAny("abcxyz", [null, "XYZ"]) = true
   * StringUtils.endsWithAny("abcxyz", "def", "XYZ") = true
   * StringUtils.endsWithAny("abcXYZ", "def", "xyz") = true
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param suffix 要查找的后缀，可能为 null 或 undefined
   * @return 如果字符串以 suffix 结尾则返回 true，不区分大小写，或两者都有 null、undefined
   */
  public static endsWithIgnoreCase(str: string, suffix: string): boolean {
    return this.endsWith(str, suffix, true);
  }

  /**
   * <p>比较两个字符串，如果它们表示相等的字符序列，则返回 true。</p>
   *
   * <p>无 null、undefined 异常处理。两个 null 或 undefined 被认为是相等的。比较<strong>默认区分大小写<strong>。</p>
   *
   * <pre>
   * StringUtils.equals(null, null)   = true
   * StringUtils.equals(null, "abc")  = false
   * StringUtils.equals("abc", null)  = false
   * StringUtils.equals("abc", "abc") = true
   * StringUtils.equals("abc", "ABC") = false
   * </pre>
   *
   * @param str1 第一个字符串，可能是 null 或 undefined
   * @param str2 第二个字符串，可能是 null 或 undefined
   * @param ignoreCase 指示比较是否应忽略大小写（不区分大小写）。
   * @return 如果字符串相等则返回 true，或者两者都是 null 或 undefined
   * @see equalsIgnoreCase
   */
  public static equals(
    str1: string,
    str2: string,
    ignoreCase = false,
  ): boolean {
    if (ObjectUtils.allNull(str1, str2)) {
      return true;
    }
    if (ObjectUtils.anyNull(str1, str2)) {
      return false;
    }
    if (str1.length !== str2.length) {
      return false;
    }
    return ignoreCase
      ? str1.toUpperCase() === str2.toUpperCase()
      : str1 === str2;
  }

  /**
   * <p>将给定的字符串与 searchStrings 中的每个字符串 进行比较，如果给定的字符串等于 searchStrings 中的任何字符串，则返回 true。</p>
   *
   * <pre>
   * StringUtils.equalsAny(null, null, null)    = true
   * StringUtils.equalsAny(null, "abc", "def")  = false
   * StringUtils.equalsAny("abc", null, "def")  = false
   * StringUtils.equalsAny("abc", "abc", "def") = true
   * StringUtils.equalsAny("abc", "ABC", "DEF") = false
   * </pre>
   *
   * @param str 待比较字符串，可能是 null 或 undefined。
   * @param searchStrings 要搜索的字符串数组或单个字符串，可能为 null 或 undefined
   * @return 如果字符串与 searchStrings 的任何其他元素相等（区分大小写）则返回true；
   * 如果 searchStrings为 null、undefined 或不包含匹配项则返回 false。
   */
  public static equalsAny(str: string, ...searchStrings: string[]): boolean {
    if (ArrayUtils.isNotEmpty(searchStrings)) {
      for (const next of searchStrings) {
        if (this.equals(str, next)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * <p>将给定的字符串与 searchStrings 中的每个字符串 进行比较，如果给定的字符串等于 searchStrings 中的任何字符串，则返回 true。</p>
   *
   * <pre>
   * StringUtils.equalsAnyIgnoreCase(null, null, null)    = true
   * StringUtils.equalsAnyIgnoreCase(null, "abc", "def")  = false
   * StringUtils.equalsAnyIgnoreCase("abc", null, "def")  = false
   * StringUtils.equalsAnyIgnoreCase("abc", "abc", "def") = true
   * StringUtils.equalsAnyIgnoreCase("abc", "ABC", "DEF") = true
   * </pre>
   *
   * @param str 待比较字符串，可能是 null 或 undefined。
   * @param searchStrings 要搜索的字符串数组或单个字符串，可能为 null 或 undefined
   * @return 如果字符串与 searchStrings 的任何其他元素相等（不区分大小写）则返回true；
   * 如果 searchStrings为 null、undefined 或不包含匹配项则返回 false。
   */
  public static equalsAnyIgnoreCase(
    str: string,
    ...searchStrings: string[]
  ): boolean {
    if (ArrayUtils.isNotEmpty(searchStrings)) {
      for (const next of searchStrings) {
        if (this.equalsIgnoreCase(str, next)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * <p>比较两个字符串，如果它们表示相等的字符序列，则返回 true，忽略大小写。</p>
   *
   * <p>无 null、undefined 异常处理。两个 null 或 undefined 被认为是相等的。比较<strong>不区分大小写<strong>。</p>
   *
   * <pre>
   * StringUtils.equalsIgnoreCase(null, null)   = true
   * StringUtils.equalsIgnoreCase(null, "abc")  = false
   * StringUtils.equalsIgnoreCase("abc", null)  = false
   * StringUtils.equalsIgnoreCase("abc", "abc") = true
   * StringUtils.equalsIgnoreCase("abc", "ABC") = true
   * </pre>
   *
   * @param str1 第一个字符串，可能是 null 或 undefined
   * @param str2 第二个字符串，可能是 null 或 undefined
   * @return 如果字符串相等（不区分大小写）则返回 true，或者两者都是 null 或 undefined
   * @see equals
   */
  public static equalsIgnoreCase(str1: string, str2: string): boolean {
    return this.equals(str1, str2, true);
  }

  /**
   * <p>返回数组中第一个非空值 ("")、null、undefined 或仅空白。</p>
   *
   * <p>空白定义为 {@link isWhitespace}(string).</p>
   *
   * <p>如果所有值都为空或数组为 null、undefined 或为空，则返回 null。</p>
   *
   * <pre>
   * StringUtils.firstNonBlank(null, null, null)     = null
   * StringUtils.firstNonBlank(null, "", " ")        = null
   * StringUtils.firstNonBlank("abc")                = "abc"
   * StringUtils.firstNonBlank(null, "xyz")          = "xyz"
   * StringUtils.firstNonBlank(null, "", " ", "xyz") = "xyz"
   * StringUtils.firstNonBlank(null, "xyz", "abc")   = "xyz"
   * StringUtils.firstNonBlank()                     = null
   * </pre>
   *
   * @param values 要测试的值，可以是 null、undefined 或空
   * @return value 中的第一个非空白值，如果没有非空白值，则返回 null
   */
  public static firstNonBlank(...values: string[]): string {
    if (ObjectUtils.isNotNull(values)) {
      for (const val of values) {
        if (this.isNotBlank(val)) {
          return val;
        }
      }
    }
    return null;
  }

  /**
   * <p>返回数组中第一个非空("")、null、undefined值。</p>
   *
   * <p>如果所有值都为空或数组为 null、undefined 或为空，则返回 null。</p>
   *
   * <pre>
   * StringUtils.firstNonEmpty(null, null, null)   = null
   * StringUtils.firstNonEmpty(null, null, "")     = null
   * StringUtils.firstNonEmpty(null, "", " ")      = " "
   * StringUtils.firstNonEmpty("abc")              = "abc"
   * StringUtils.firstNonEmpty(null, "xyz")        = "xyz"
   * StringUtils.firstNonEmpty("", "xyz")          = "xyz"
   * StringUtils.firstNonEmpty(null, "xyz", "abc") = "xyz"
   * StringUtils.firstNonEmpty()                   = null
   * </pre>
   *
   * @param values 要测试的值，可以是 null、undefined 或空
   * @return values 中的第一个非空值，如果没有非空值，则为 null
   */
  public static firstNonEmpty(...values: string[]): string {
    if (ObjectUtils.isNotNull(values)) {
      for (const val of values) {
        if (this.isNotEmpty(val)) {
          return val;
        }
      }
    }
    return null;
  }

  /**
   * <p>比较数组中的所有字符串并返回所有字符串共有的起始字符串。</p>
   *
   * <p>For example,
   * StringUtils.getCommonPrefix("i am a machine", "i am a robot") -> "i am a "</p>
   *
   * <pre>
   * StringUtils.getCommonPrefix(null) = ""
   * StringUtils.getCommonPrefix([]) = ""
   * StringUtils.getCommonPrefix("abc") = "abc"
   * StringUtils.getCommonPrefix(null, null) = ""
   * StringUtils.getCommonPrefix("", "") = ""
   * StringUtils.getCommonPrefix("", null) = ""
   * StringUtils.getCommonPrefix("abc", null, null) = ""
   * StringUtils.getCommonPrefix(null, null, "abc") = ""
   * StringUtils.getCommonPrefix("", "abc") = ""
   * StringUtils.getCommonPrefix("abc", "") = ""
   * StringUtils.getCommonPrefix("abc", "abc") = "abc"
   * StringUtils.getCommonPrefix("abc", "a") = "a"
   * StringUtils.getCommonPrefix("ab", "abxyz") = "ab"
   * StringUtils.getCommonPrefix("abcde", "abxyz") = "ab"
   * StringUtils.getCommonPrefix("abcde", "xyz") = ""
   * StringUtils.getCommonPrefix("xyz", "abcde") = ""
   * StringUtils.getCommonPrefix("i am a machine", "i am a robot") = "i am a "
   * </pre>
   *
   * @param strs 字符串数组，可能为空、null 或 undefined
   * @return {} 数组中所有字符串共有的起始字符串；如果数组为空、元素全部为空或没有公共前缀，则为空字符串。
   */
  public static getCommonPrefix(...strs: string[]): string {
    if (ArrayUtils.isEmpty(strs)) {
      return this.EMPTY;
    }
    const smallestIndexOfDiff = this.indexOfDifference(...strs);
    if (smallestIndexOfDiff === this.INDEX_NOT_FOUND) {
      if (ObjectUtils.isNull(strs[0])) {
        return this.EMPTY;
      }
      return strs[0];
    } else if (smallestIndexOfDiff === 0) {
      return this.EMPTY;
    } else {
      return strs[0].substring(0, smallestIndexOfDiff);
    }
  }

  /**
   * <p>返回传入的字符串，或者如果 CharSequence 是空白、空 ("")、null 或 undefined，则返回由 {@link Supplier defaultSupplier} 提供的值。</p>
   *
   * <p>空白定义为 {@link isWhitespace}(string).</p>
   *
   * <p>调用者负责 {@link Supplier defaultSupplier} 的异常处理</p>
   *
   * <pre>
   * StringUtils.getIfBlank(null, () => "NULL")   = "NULL"
   * StringUtils.getIfBlank("", () => "NULL")     = "NULL"
   * StringUtils.getIfBlank(" ", () => "NULL")    = "NULL"
   * StringUtils.getIfBlank("bat", () => "NULL")  = "bat"
   * StringUtils.getIfBlank("", () => null)       = null
   * StringUtils.getIfBlank("", null)             = null
   * </pre>
   *
   * @param str 要测试的值，可能是 null、undefined 或空
   * @param defaultSupplier 如果输入为空白、空 ("")、null 或 undefined，则返回默认字符串的 {@link Supplier defaultSupplier}，可能为 null 或 undefined
   * @return {} 传入的字符串，或默认值
   * @see defaultString
   */
  public static getIfBlank(
    str: string,
    defaultSupplier: Supplier<string>,
  ): string {
    return this.isBlank(str)
      ? ObjectUtils.isNull(defaultSupplier)
        ? null
        : defaultSupplier()
      : str;
  }

  /**
   * <p>返回传入的字符串，或者如果字符串为空、null 或 undefined，则返回由 {@link Supplier defaultSupplier}} 提供的值。</p>
   *
   * <p>调用者负责 {@link Supplier defaultSupplier} 的异常处理</p>
   *
   * <pre>
   * StringUtils.getIfEmpty(null, () => "NULL")    = "NULL"
   * StringUtils.getIfEmpty("", () => "NULL")      = "NULL"
   * StringUtils.getIfEmpty(" ", () => "NULL")     = " "
   * StringUtils.getIfEmpty("bat", () => "NULL")   = "bat"
   * StringUtils.getIfEmpty("", () => null)        = null
   * StringUtils.getIfEmpty("", null)              = null
   * </pre>
   *
   * @param str 要测试的值，可能是 null、undefined 或空
   * @param defaultSupplier 如果输入为空白、空 ("")、null 或 undefined，则返回默认字符串的 {@link Supplier defaultSupplier}，可能为 null 或 undefined
   * @return {} 传入的字符串，或默认值
   * @see defaultString
   */
  public static getIfEmpty(
    str: string,
    defaultSupplier: Supplier<string>,
  ): string {
    return this.isEmpty(str)
      ? ObjectUtils.isNull(defaultSupplier)
        ? null
        : defaultSupplier()
      : str;
  }

  /**
   * <p>查找字符串中的第一个索引，处理 null、undefined。
   * 如果可能，此方法使用 {@link string.indexOf}。</p>
   *
   * <p>null、undefined 字符串 将返回 -1。负的起始位置被视为零。
   * 空 ("") 搜索字符串始终匹配。大于字符串长度的起始位置仅匹配空 ("")搜索字符串。</p>
   *
   * <pre>
   * StringUtils.indexOf(null, *, *)          = -1
   * StringUtils.indexOf(*, null, *)          = -1
   * StringUtils.indexOf("", "", 0)           = 0
   * StringUtils.indexOf("", *, 0)            = -1 (except when * = "")
   * StringUtils.indexOf("aabaabaa", "a", 0)  = 0
   * StringUtils.indexOf("aabaabaa", "b", 0)  = 2
   * StringUtils.indexOf("aabaabaa", "ab", 0) = 1
   * StringUtils.indexOf("aabaabaa", "b", 3)  = 5
   * StringUtils.indexOf("aabaabaa", "b", 9)  = -1
   * StringUtils.indexOf("aabaabaa", "b", -1) = 2
   * StringUtils.indexOf("aabaabaa", "", 2)   = 2
   * StringUtils.indexOf("abc", "", 9)        = 3
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchString 要查找的字符串，可能为 null 或 undefined
   * @param startPos 起始位置，负数视为零
   * @return 搜索字符串的第一个索引（总是 ≥ startPos），如果不匹配或 null、undefined 字符串输入，则为 -1
   */
  public static indexOf(
    str: string,
    searchString: string,
    startPos = 0,
  ): number {
    if (ObjectUtils.anyNull(str, searchString)) {
      return this.INDEX_NOT_FOUND;
    }
    if (startPos < 0) {
      startPos = 0;
    }
    return str.indexOf(searchString, startPos);
  }

  /**
   * <p>找到任何一组潜在子串的第一个索引。</p>
   *
   * <p>null 或 undefined 字符串将返回 -1。null、undefined 或空搜索数组将返回 -1。
   * null 或 undefined 搜索数组条目将被忽略，但如果 str 不为空，包含 "" 的搜索数组将返回 0。
   * 如果可能，此方法使用 {@link string.indexOf}。</p>
   *
   * <pre>
   * StringUtils.indexOfAny(null, *)                      = -1
   * StringUtils.indexOfAny(*, null)                      = -1
   * StringUtils.indexOfAny(*, [])                        = -1
   * StringUtils.indexOfAny("zzabyycdxx", ["ab", "cd"])   = 2
   * StringUtils.indexOfAny("zzabyycdxx", ["cd", "ab"])   = 2
   * StringUtils.indexOfAny("zzabyycdxx", ["mn", "op"])   = -1
   * StringUtils.indexOfAny("zzabyycdxx", ["zab", "aby"]) = 1
   * StringUtils.indexOfAny("zzabyycdxx", [""])           = 0
   * StringUtils.indexOfAny("", [""])                     = 0
   * StringUtils.indexOfAny("", ["a"])                    = -1
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchStrs 要搜索的字符串，可能为 null 或 undefined
   * @return str 中任何 searchStrs 的第一个索引，如果不匹配，则为 -1
   */
  public static indexOfAny(str: string, ...searchStrs: string[]): number {
    if (ObjectUtils.anyNull(str, ...searchStrs)) {
      return this.INDEX_NOT_FOUND;
    }

    let ret = Number.MAX_VALUE;
    let tmp = 0;
    for (const searchStr of searchStrs) {
      if (ObjectUtils.isNull(searchStr)) {
        continue;
      }
      tmp = str.indexOf(searchStr, 0);
      if (tmp === this.INDEX_NOT_FOUND) {
        continue;
      }

      if (tmp < ret) {
        ret = tmp;
      }
    }

    return ret === Number.MAX_VALUE ? this.INDEX_NOT_FOUND : ret;
  }

  /**
   * <p>搜索字符串以查找不在给定字符串中的任何字符的第一个索引。</p>
   *
   * <p>null、undefined 字符串将返回 -1。null、undefined 或空搜索字符串将返回 -1。</p>
   *
   * <pre>
   * StringUtils.indexOfAnyBut(null, *)            = -1
   * StringUtils.indexOfAnyBut("", *)              = -1
   * StringUtils.indexOfAnyBut(*, null)            = -1
   * StringUtils.indexOfAnyBut(*, "")              = -1
   * StringUtils.indexOfAnyBut("zzabyycdxx", "za") = 3
   * StringUtils.indexOfAnyBut("zzabyycdxx", "")   = -1
   * StringUtils.indexOfAnyBut("aba", "ab")        = -1
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchChars 要搜索的字符串，可能为 null 或 undefined
   * @return 任何字符的索引，如果不匹配或输入为 null、undefined，则为 -1
   */
  public static indexOfAnyBut(str: string, searchChars: string): number {
    if (this.isEmpty(str) || this.isEmpty(searchChars)) {
      return this.INDEX_NOT_FOUND;
    }
    const strLen = str.length;
    for (let i = 0; i < strLen; i++) {
      const ch = str.charAt(i);
      const chFound = searchChars.indexOf(ch, 0) >= 0;
      if (i + 1 < strLen) {
        const ch2 = str.charAt(i + 1);
        if (chFound && searchChars.indexOf(ch2, 0) < 0) {
          return i;
        }
      } else if (!chFound) {
        return i;
      }
    }
    return this.INDEX_NOT_FOUND;
  }

  /**
   * <p>比较数组中的所有字符串并返回字符串起始不同的索引。</p>
   *
   * <p>例如，
   * StringUtils.indexOfDifference("i am a machine", "i am a robot") -> 7</p>
   *
   * <pre>
   * StringUtils.indexOfDifference(null) = -1
   * StringUtils.indexOfDifference() = -1
   * StringUtils.indexOfDifference("abc") = -1
   * StringUtils.indexOfDifference(null, null) = -1
   * StringUtils.indexOfDifference("", "") = -1
   * StringUtils.indexOfDifference("", null) = 0
   * StringUtils.indexOfDifference("abc", null, null) = 0
   * StringUtils.indexOfDifference(null, null, "abc") = 0
   * StringUtils.indexOfDifference("", "abc") = 0
   * StringUtils.indexOfDifference("abc", ""}) = 0
   * StringUtils.indexOfDifference("abc", "abc") = -1
   * StringUtils.indexOfDifference("abc", "a") = 1
   * StringUtils.indexOfDifference("ab", "abxyz") = 2
   * StringUtils.indexOfDifference("abcde", "abxyz") = 2
   * StringUtils.indexOfDifference("abcde", "xyz") = 0
   * StringUtils.indexOfDifference("xyz", "abcde") = 0
   * StringUtils.indexOfDifference("i am a machine", "i am a robot") = 7
   * </pre>
   *
   * @param strs 字符串数组，其中元素可能为 null、undefined
   * @return 字符串开始不同的索引；如果它们都相等，则返回 -1
   */
  public static indexOfDifference(...strs: string[]): number {
    if (ArrayUtils.getLength(strs) <= 1) {
      return this.INDEX_NOT_FOUND;
    }
    let anyStringNull = false;
    let allStringsNull = true;
    const arrayLen = strs.length;
    let shortestStrLen = Number.MAX_SAFE_INTEGER;
    let longestStrLen = 0;

    for (const str of strs) {
      if (ObjectUtils.isNull(str)) {
        anyStringNull = true;
        shortestStrLen = 0;
      } else {
        allStringsNull = false;
        shortestStrLen = Math.min(strs.length, shortestStrLen);
        longestStrLen = Math.max(strs.length, longestStrLen);
      }
    }

    if (allStringsNull || (longestStrLen === 0 && !anyStringNull)) {
      return this.INDEX_NOT_FOUND;
    }

    if (shortestStrLen === 0) {
      return 0;
    }

    let firstDiff = -1;
    for (let stringPos = 0; stringPos < shortestStrLen; stringPos++) {
      const comparisonChar = strs[0].charAt(stringPos);
      for (let arrayPos = 1; arrayPos < arrayLen; arrayPos++) {
        if (strs[arrayPos].charAt(stringPos) !== comparisonChar) {
          firstDiff = stringPos;
          break;
        }
      }
      if (firstDiff != -1) {
        break;
      }
    }

    if (firstDiff === -1 && shortestStrLen !== longestStrLen) {
      return shortestStrLen;
    }
    return firstDiff;
  }

  /**
   * <p>从指定位置查找字符串中的第一个索引，不区分大小写。</p>
   *
   * <p>null 或 undefined 字符串将返回 -1。负的起始位置被视为零。
   * 空 ("") 搜索字符串始终匹配。大于字符串长度的起始位置仅匹配空 ("")搜索字符串。</p>
   *
   * <pre>
   * StringUtils.indexOfIgnoreCase(null, *, *)          = -1
   * StringUtils.indexOfIgnoreCase(*, null, *)          = -1
   * StringUtils.indexOfIgnoreCase("", "", 0)           = 0
   * StringUtils.indexOfIgnoreCase("aabaabaa", "A", 0)  = 0
   * StringUtils.indexOfIgnoreCase("aabaabaa", "B", 0)  = 2
   * StringUtils.indexOfIgnoreCase("aabaabaa", "AB", 0) = 1
   * StringUtils.indexOfIgnoreCase("aabaabaa", "B", 3)  = 5
   * StringUtils.indexOfIgnoreCase("aabaabaa", "B", 9)  = -1
   * StringUtils.indexOfIgnoreCase("aabaabaa", "B", -1) = 2
   * StringUtils.indexOfIgnoreCase("aabaabaa", "", 2)   = 2
   * StringUtils.indexOfIgnoreCase("abc", "", 9)        = -1
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchStr 要查找的字符串，可能为 null 或 undefined
   * @param startPos 起始位置，负数视为零
   * @return 搜索字符串的第一个索引（总是 ≥ startPos），如果不匹配或 null、undefined 字符串输入，则为 -1
   */
  public static indexOfIgnoreCase(
    str: string,
    searchStr: string,
    startPos = 0,
  ): number {
    if (ObjectUtils.anyNull(str, searchStr)) {
      return this.INDEX_NOT_FOUND;
    }
    if (startPos < 0) {
      startPos = 0;
    }
    const endLimit = str.length - searchStr.length + 1;
    if (startPos > endLimit) {
      return this.INDEX_NOT_FOUND;
    }
    if (searchStr.length === 0) {
      return startPos;
    }
    return str.toLowerCase().indexOf(searchStr, startPos);
  }

  /**
   * <p>检查所有字符串是否为空 ("")、null、undefined 或仅空白。</p>
   *
   * <p>空白定义为 {@link isWhitespace}(string).</p>
   *
   * <pre>
   * StringUtils.isAllBlank(null)             = true
   * StringUtils.isAllBlank(null, "foo")      = false
   * StringUtils.isAllBlank(null, null)       = true
   * StringUtils.isAllBlank("", "bar")        = false
   * StringUtils.isAllBlank("bob", "")        = false
   * StringUtils.isAllBlank("  bob  ", null)  = false
   * StringUtils.isAllBlank(" ", "bar")       = false
   * StringUtils.isAllBlank("foo", "bar")     = false
   * StringUtils.isAllBlank()  = true
   * </pre>
   *
   * @param strs 要检查的字符串数组，可以为 null、undefined 或为空
   * @return 如果所有字符串为空、null、undefined 或仅空白，则返回 true
   */
  public static isAllBlank(...strs: string[]): boolean {
    if (ArrayUtils.isEmpty(strs)) {
      return true;
    }
    for (const str of strs) {
      if (this.isNotBlank(str)) {
        return false;
      }
    }
    return true;
  }

  /**
   * <p>检查所有字符串是否为空 ("")、null 或 undefined。</p>
   *
   * <pre>
   * StringUtils.isAllEmpty(null)             = true
   * StringUtils.isAllEmpty(null, "")         = true
   * StringUtils.isAllEmpty()                 = true
   * StringUtils.isAllEmpty(null, "foo")      = false
   * StringUtils.isAllEmpty("", "bar")        = false
   * StringUtils.isAllEmpty("bob", "")        = false
   * StringUtils.isAllEmpty("  bob  ", null)  = false
   * StringUtils.isAllEmpty(" ", "bar")       = false
   * StringUtils.isAllEmpty("foo", "bar")     = false
   * </pre>
   *
   * @param strs 要检查的字符串数组，可以为 null、undefined 或为空
   * @return 如果所有字符串为空、null 或 undefined，则返回 true
   */
  public static isAllEmpty(...strs: string[]): boolean {
    if (ArrayUtils.isEmpty(strs)) {
      return true;
    }
    for (const str of strs) {
      if (this.isNotEmpty(str)) {
        return false;
      }
    }
    return true;
  }

  /**
   * <p>判断是否为大写字符, 如果输入字符串为 ""、null 或 undefined 则返回 false</p>
   *
   * <p>如果输入字符串长度大于 1，则只判断第一个字符是否为大写</p>
   *
   * <pre>
   * StringUtils.isUpperCase(null)   = false
   * StringUtils.isUpperCase("")     = false
   * StringUtils.isUpperCase("ABC")  = true
   * StringUtils.isUpperCase("aBC")  = false
   * StringUtils.isUpperCase("a")    = false
   * StringUtils.isUpperCase("A")    = true
   * </pre>
   *
   * @param str 待判断字符，可能为 null、undefined
   * @return 大写字符则返回 true，否则返回 false
   */
  public static isUpperCase(str: string): boolean {
    if (this.isEmpty(str)) {
      return false;
    }
    const code = str.charCodeAt(0);
    return code >= 65 && code <= 90;
  }

  /**
   * <p>判断是否为小写字符, 如果输入字符串为 ""、null 或 undefined 则返回 false</p>
   *
   * <p>如果输入字符串长度大于 1，则只判断第一个字符是否为小写</p>
   *
   * <pre>
   * StringUtils.isLowerCase(null)   = false
   * StringUtils.isLowerCase("")     = false
   * StringUtils.isLowerCase("Abc")  = false
   * StringUtils.isLowerCase("aBC")  = true
   * StringUtils.isLowerCase("a")    = true
   * StringUtils.isLowerCase("A")    = false
   * </pre>
   *
   * @param str 待判断字符，可能为 null、undefined
   * @return 大写字符则返回 true，否则返回 false
   */
  public static isLowerCase(str: string): boolean {
    if (this.isEmpty(str)) {
      return false;
    }
    const code = str.charCodeAt(0);
    return code >= 97 && code <= 122;
  }

  /**
   * <p>检查字符串是否仅包含小写字符。</p>
   *
   * <p>null 将返回 false。一个空的字符串(“”)将返回 false。</p>
   *
   * <pre>
   * StringUtils.isAllLowerCase(null)   = false
   * StringUtils.isAllLowerCase("")     = false
   * StringUtils.isAllLowerCase("  ")   = false
   * StringUtils.isAllLowerCase("abc")  = true
   * StringUtils.isAllLowerCase("abC")  = false
   * StringUtils.isAllLowerCase("ab c") = false
   * StringUtils.isAllLowerCase("ab1c") = false
   * StringUtils.isAllLowerCase("ab/c") = false
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @return 如果只包含小写字符，并且不为空，则返回 true
   */
  public static isAllLowerCase(str: string): boolean {
    if (this.isEmpty(str)) {
      return false;
    }
    const sz = str.length;
    for (let i = 0; i < sz; i++) {
      if (!this.isLowerCase(str.charAt(i))) {
        return false;
      }
    }
    return true;
  }

  /**
   * <p>检查字符串是否仅包含大写字符。</p>
   *
   * <p>null 将返回 false。一个空的字符串(“”)将返回 false。</p>
   *
   * <pre>
   * StringUtils.isAllUpperCase(null)   = false
   * StringUtils.isAllUpperCase("")     = false
   * StringUtils.isAllUpperCase("  ")   = false
   * StringUtils.isAllUpperCase("ABC")  = true
   * StringUtils.isAllUpperCase("aBC")  = false
   * StringUtils.isAllUpperCase("A C")  = false
   * StringUtils.isAllUpperCase("A1C")  = false
   * StringUtils.isAllUpperCase("A/C")  = false
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @return 如果只包含大写字符，并且不为空，则返回 true
   */
  public static isAllUpperCase(str: string): boolean {
    if (this.isEmpty(str)) {
      return false;
    }
    const sz = str.length;
    for (let i = 0; i < sz; i++) {
      if (!this.isUpperCase(str.charAt(i))) {
        return false;
      }
    }
    return true;
  }

  /**
   * <p>检查任何字符串是否为空 ("")、null、undefined 或仅空白。</p>
   *
   * <p>空白定义为 {@link isWhitespace}(string).</p>
   *
   * <pre>
   * StringUtils.isAnyBlank(null)             = true
   * StringUtils.isAnyBlank(null, "foo")      = true
   * StringUtils.isAnyBlank(null, null)       = true
   * StringUtils.isAnyBlank("", "bar")        = true
   * StringUtils.isAnyBlank("bob", "")        = true
   * StringUtils.isAnyBlank("  bob  ", null)  = true
   * StringUtils.isAnyBlank(" ", "bar")       = true
   * StringUtils.isAnyBlank("")               = true
   * StringUtils.isAnyBlank("foo", "bar")     = false
   * </pre>
   *
   * @param strs 要检查的字符串数组，可以为 null、undefined 或为空
   * @return 如果任何字符串为空、null、undefined 或仅空白，则返回 true
   */
  public static isAnyBlank(...strs: string[]): boolean {
    if (ArrayUtils.isEmpty(strs)) {
      return false;
    }
    for (const str of strs) {
      if (this.isBlank(str)) {
        return true;
      }
    }
    return false;
  }

  /**
   * <p>检查任何字符串是否为空 ("")、null、undefined。</p>
   *
   * <pre>
   * StringUtils.isAnyEmpty(null)             = true
   * StringUtils.isAnyEmpty(null, "foo")      = true
   * StringUtils.isAnyEmpty("", "bar")        = true
   * StringUtils.isAnyEmpty("bob", "")        = true
   * StringUtils.isAnyEmpty("  bob  ", null)  = true
   * StringUtils.isAnyEmpty(" ", "bar")       = false
   * StringUtils.isAnyEmpty("foo", "bar")     = false
   * StringUtils.isAnyEmpty("")               = true
   * </pre>
   *
   * @param strs 要检查的字符串数组，可以为 null、undefined 或为空
   * @return 如果任何 CharSequence 为空、null 或 undefined，则返回 true
   */
  public static isAnyEmpty(...strs: string[]): boolean {
    if (ArrayUtils.isEmpty(strs)) {
      return false;
    }
    for (const str of strs) {
      if (this.isEmpty(str)) {
        return true;
      }
    }
    return false;
  }

  /**
   * <p>检查 CharSequence 是否为空 ("")、null、undefined 或仅空白。</p>
   *
   * <p>空白定义为 {@link isWhitespace}(string).</p>
   *
   * <pre>
   * StringUtils.isBlank(null)      = true
   * StringUtils.isBlank("")        = true
   * StringUtils.isBlank(" ")       = true
   * StringUtils.isBlank("bob")     = false
   * StringUtils.isBlank("  bob  ") = false
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @return 如果字符串为空、nul、undefined 或仅空白，则返回 true
   */
  public static isBlank(str: string): boolean {
    const strLen = this.getLength(str);
    if (strLen === 0) {
      return true;
    }
    for (let i = 0; i < str.length; i++) {
      if (this.isWhitespace(str.charAt(i))) {
        return false;
      }
    }
    return true;
  }

  /**
   * <p>检查字符串是否为空 ("")、null 或 undefined。</p>
   *
   * <pre>
   * StringUtils.isEmpty(null)      = true
   * StringUtils.isEmpty("")        = true
   * StringUtils.isEmpty(" ")       = false
   * StringUtils.isEmpty("bob")     = false
   * StringUtils.isEmpty("  bob  ") = false
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @return 如果字符串为空、null 或 undefined，则返回 true
   */
  public static isEmpty(str: string): boolean {
    return ObjectUtils.isNull(str) || str.length === 0;
  }

  /**
   * <p>检查字符串是否包含大小写字符的混合大小写</p>
   *
   * <p>null、undefined 将返回 false。一个空的字符串(“”) 将返回 false。</p>
   *
   * <pre>
   * StringUtils.isMixedCase(null)    = false
   * StringUtils.isMixedCase("")      = false
   * StringUtils.isMixedCase("ABC")   = false
   * StringUtils.isMixedCase("abc")   = false
   * StringUtils.isMixedCase("aBc")   = true
   * StringUtils.isMixedCase("A c")   = true
   * StringUtils.isMixedCase("A1c")   = true
   * StringUtils.isMixedCase("a/C")   = true
   * StringUtils.isMixedCase("aC\t")  = true
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @return 如果字符串同时包含大写和小写字符，则返回 true
   */
  public static isMixedCase(str: string): boolean {
    if (this.isEmpty(str) || str.length == 1) {
      return false;
    }
    let containsUppercase = false;
    let containsLowercase = false;
    const sz = str.length;
    for (let i = 0; i < sz; i++) {
      if (containsUppercase && containsLowercase) {
        return true;
      } else if (this.isUpperCase(str.charAt(i))) {
        containsUppercase = true;
      } else if (this.isLowerCase(str.charAt(i))) {
        containsLowercase = true;
      }
    }
    return containsUppercase && containsLowercase;
  }

  /**
   * <p>检查是否没有任何字符串为空 ("")、null、undefined 或仅空白。</p>
   *
   * <p>空白定义为 {@link isWhitespace}(string).</p>
   *
   * <pre>
   * StringUtils.isNoneBlank(null)             = false
   * StringUtils.isNoneBlank(null, "foo")      = false
   * StringUtils.isNoneBlank(null, null)       = false
   * StringUtils.isNoneBlank("", "bar")        = false
   * StringUtils.isNoneBlank("bob", "")        = false
   * StringUtils.isNoneBlank("  bob  ", null)  = false
   * StringUtils.isNoneBlank(" ", "bar")       = false
   * StringUtils.isNoneBlank("")               = false
   * StringUtils.isNoneBlank("foo", "bar")     = true
   * </pre>
   *
   * @param strs 要检查的字符串数组，可以为 null、undefined 或为空
   * @return 如果没有一个字符串是空的、null、undefined 或只有空白，则返回 true
   */
  public static isNoneBlank(...strs: string[]): boolean {
    return !this.isAnyBlank(...strs);
  }

  /**
   * <p>检查是否没有任何字符串为空 ("")、null 或 undefined。</p>
   *
   * <pre>
   * StringUtils.isNoneEmpty(null)             = false
   * StringUtils.isNoneEmpty(null, "foo")      = false
   * StringUtils.isNoneEmpty("", "bar")        = false
   * StringUtils.isNoneEmpty("bob", "")        = false
   * StringUtils.isNoneEmpty("  bob  ", null)  = false
   * StringUtils.isNoneEmpty("")               = false
   * StringUtils.isNoneEmpty(" ", "bar")       = true
   * StringUtils.isNoneEmpty("foo", "bar")     = true
   * </pre>
   *
   * @param strs 要检查的字符串，可以为 null、undefined 或为空
   * @return 如果没有一个字符串为空、null 或 undefined，则返回 true
   */
  public static isNoneEmpty(...strs: string[]): boolean {
    return !this.isAnyEmpty(...strs);
  }

  /**
   * <p>检查字符串是否不为空 ("")、不为null、不为 undefined 且仅不为空白。</p>
   *
   * <p>空白定义为 {@link isWhitespace}(string).</p>
   *
   * <pre>
   * StringUtils.isNotBlank(null)      = false
   * StringUtils.isNotBlank("")        = false
   * StringUtils.isNotBlank(" ")       = false
   * StringUtils.isNotBlank("bob")     = true
   * StringUtils.isNotBlank("  bob  ") = true
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @return 如果字符串不为空且不为 null 且不为 undefined 且仅为空格，则返回 true
   */
  public static isNotBlank(str: string): boolean {
    return !this.isBlank(str);
  }

  /**
   * <p>检查字符串是否不为空 ("") 且不为 null 且不为 undefined。</p>
   *
   * <pre>
   * StringUtils.isNotEmpty(null)      = false
   * StringUtils.isNotEmpty("")        = false
   * StringUtils.isNotEmpty(" ")       = true
   * StringUtils.isNotEmpty("bob")     = true
   * StringUtils.isNotEmpty("  bob  ") = true
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @return 如果字符串不为空且不为 null 且不为 undefined，则返回 true
   */
  public static isNotEmpty(str: string): boolean {
    return !this.isEmpty(str);
  }

  /**
   * <p>检查字符串是否仅包含空白。</p>
   *
   * <p>null 或 undefined 将返回 false。一个空的字符串("") 将返回 true。</p>
   *
   * <pre>
   * StringUtils.isWhitespace(null)   = false
   * StringUtils.isWhitespace("")     = true
   * StringUtils.isWhitespace("  ")   = true
   * StringUtils.isWhitespace("abc")  = false
   * StringUtils.isWhitespace("ab2c") = false
   * StringUtils.isWhitespace("ab-c") = false
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @return 如果只包含空格，并且不为 null 或 undefined 则返回 true
   */
  public static isWhitespace(str: string): boolean {
    if (ObjectUtils.isNull(str)) {
      return false;
    }
    const sz = str.length;
    for (let i = 0; i < sz; i++) {
      if (str.charAt(i) === ' ') {
        return false;
      }
    }
    return true;
  }

  /**
   * <p>将提供的数组的元素连接到包含提供的元素列表的单个字符串中。</p>
   *
   * <p>列表前后不加分隔符。
   * null 分隔符与空字符串 ("") 相同。
   * 数组中的 null、undefined 对象或空字符串由空字符串表示。</p>
   *
   * <pre>
   * StringUtils.join(null, *, *, *)                = null
   * StringUtils.join([], *, *, *)                  = ""
   * StringUtils.join([null], *, *, *)              = ""
   * StringUtils.join(["a", "b", "c"], "--", 0, 3)  = "a--b--c"
   * StringUtils.join(["a", "b", "c"], "--", 1, 3)  = "b--c"
   * StringUtils.join(["a", "b", "c"], "--", 2, 3)  = "c"
   * StringUtils.join(["a", "b", "c"], "--", 2, 2)  = ""
   * StringUtils.join(["a", "b", "c"], null, 0, 3)  = "abc"
   * StringUtils.join(["a", "b", "c"], "", 0, 3)    = "abc"
   * StringUtils.join([null, "", "a"], ',', 0, 3)   = ",,a"
   * </pre>
   *
   * @param array 要连接在一起的值数组，可以为 null 或 undefined
   * @param separator 要使用的分隔符，null 或 undefined 被视为 “”
   * @param startIndex 开始加入的第一个索引。
   * @param endIndex 停止加入的索引（不包括）。
   * @return 连接在一起的字符串，如果为空数组输入，则返回 null；
   * 如果 endIndex - startIndex <= 0，则为空字符串。
   * 连接条目的数量由 endIndex - startIndex 给出
   * @throws {IndexOutOfBoundsError} 如果：<br>
   * startIndex < 0 或 <br>
   * startIndex >= array.length 或 <br>
   * endIndex < 0 或 <br>
   * endIndex > array.length
   */
  public static join<T>(
    array: T[],
    separator = this.EMPTY,
    startIndex = 0,
    endIndex = array.length,
  ): string {
    if (ObjectUtils.isNull(array)) {
      return null;
    }
    if (endIndex - startIndex <= 0) {
      return this.EMPTY;
    }

    if (startIndex < 0) {
      throw new IndexOutOfBoundsError('startIndex 不可小于0');
    } else if (startIndex >= array.length) {
      throw new IndexOutOfBoundsError('startIndex 不可大于等于数组长度');
    } else if (endIndex < 0) {
      throw new IndexOutOfBoundsError('endIndex 不可小于0');
    } else if (endIndex > array.length) {
      throw new IndexOutOfBoundsError(`endIndex 不可大于数组长度`);
    }

    return array.slice(startIndex, endIndex).join(separator);
  }

  /**
   * <p>将提供的数组的元素连接到包含提供的元素列表的单个字符串中。</p>
   *
   * <p>没有分隔符添加到连接的字符串。
   * 数组中的 null、undefined 对象或空字符串由空字符串表示。</p>
   *
   * <pre>
   * StringUtils.join(null)            = null
   * StringUtils.join([])              = ""
   * StringUtils.join([null])          = ""
   * StringUtils.join(["a", "b", "c"]) = "abc"
   * StringUtils.join([null, "", "a"]) = "a"
   * </pre>
   *
   * @param elements 要连接在一起的值，可能为 null 或 undefined
   * @return 连接在一起的字符串，如果为空数组输入则返回 null
   */
  public static joinWith<T>(...elements: T[]): string {
    return this.join(elements);
  }

  /**
   * <p>查找字符串中的最后一个索引，处理 null 和 undefined。</p>
   *
   * <p>null 或 undefined 字符串 将返回 -1。负的起始位置返回 -1。
   * 除非起始位置为负，否则空 ("") 搜索字符串始终匹配。
   * 大于字符串长度的起始位置会搜索整个字符串。
   * 搜索从 startPos 开始并向后进行；在开始位置之后开始的匹配将被忽略。
   * </p>
   *
   * <pre>
   * StringUtils.lastIndexOf(null, *, *)          = -1
   * StringUtils.lastIndexOf(*, null, *)          = -1
   * StringUtils.lastIndexOf("aabaabaa", "a", 8)  = 7
   * StringUtils.lastIndexOf("aabaabaa", "b", 8)  = 5
   * StringUtils.lastIndexOf("aabaabaa", "ab", 8) = 4
   * StringUtils.lastIndexOf("aabaabaa", "b", 9)  = 5
   * StringUtils.lastIndexOf("aabaabaa", "b", -1) = -1
   * StringUtils.lastIndexOf("aabaabaa", "a", 0)  = 0
   * StringUtils.lastIndexOf("aabaabaa", "b", 0)  = -1
   * StringUtils.lastIndexOf("aabaabaa", "b", 1)  = -1
   * StringUtils.lastIndexOf("aabaabaa", "b", 2)  = 2
   * StringUtils.lastIndexOf("aabaabaa", "ba", 2)  = 2
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchStr 要查找的字符串，可能为 null 或 undefined
   * @param startPos 起始位置，负数视为零
   * @return 搜索字符串的最后一个索引（总是 ≤ startPos），如果不匹配、null 或 undefined 字符串输入，则为 -1
   */
  public static lastIndexOf(
    str: string,
    searchStr: string,
    startPos = str.length,
  ): number {
    if (ObjectUtils.anyNull(str, searchStr)) {
      return this.INDEX_NOT_FOUND;
    }
    if (startPos < 0) {
      return this.INDEX_NOT_FOUND;
    }
    return str.lastIndexOf(searchStr, Math.min(startPos, str.length));
  }

  /**
   * <p>在一组潜在子串中查找任何子串的最新索引。</p>
   *
   * <p>null、undefined 字符串将返回 -1。 null 搜索数组将返回 -1。
   * null、undefined 或零长度搜索数组条目将被忽略，但如果 str 不为空，包含 "" 的搜索数组将返回 str 的长度。</p>
   *
   * <pre>
   * StringUtils.lastIndexOfAny(null, *)                    = -1
   * StringUtils.lastIndexOfAny(*, null)                    = -1
   * StringUtils.lastIndexOfAny(*, [])                      = -1
   * StringUtils.lastIndexOfAny(*, [null])                  = -1
   * StringUtils.lastIndexOfAny("zzabyycdxx", ["ab", "cd"]) = 6
   * StringUtils.lastIndexOfAny("zzabyycdxx", ["cd", "ab"]) = 6
   * StringUtils.lastIndexOfAny("zzabyycdxx", ["mn", "op"]) = -1
   * StringUtils.lastIndexOfAny("zzabyycdxx", ["mn", "op"]) = -1
   * StringUtils.lastIndexOfAny("zzabyycdxx", ["mn", ""])   = 10
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchStrs 要搜索的字符串，可能为 null 或 undefined
   * @return 任何字符串的最后一个索引，如果不匹配，则为 -1
   */
  public static lastIndexOfAny(str: string, ...searchStrs: string[]): number {
    if (ObjectUtils.anyNull(str, searchStrs)) {
      return this.INDEX_NOT_FOUND;
    }
    let ret = this.INDEX_NOT_FOUND;
    let tmp = 0;
    for (const search of searchStrs) {
      if (ObjectUtils.isNull(search)) {
        continue;
      }
      tmp = str.lastIndexOf(search, str.length);
      if (tmp > ret) {
        ret = tmp;
      }
    }
    return ret;
  }

  /**
   * <p>从指定位置查找字符串中的最后一个索引，不区分大小写。</p>
   *
   * <p>null 或 undefined 字符串将返回 -1。负的起始位置返回 -1。
   * 除非起始位置为负，否则空 ("") 搜索字符串始终匹配。
   * 大于字符串长度的起始位置会搜索整个字符串。
   * 搜索从 startPos 开始并向后进行；在开始位置之后开始的匹配将被忽略。
   * </p>
   *
   * <pre>
   * StringUtils.lastIndexOfIgnoreCase(null, *, *)          = -1
   * StringUtils.lastIndexOfIgnoreCase(*, null, *)          = -1
   * StringUtils.lastIndexOfIgnoreCase("aabaabaa", "A", 8)  = 7
   * StringUtils.lastIndexOfIgnoreCase("aabaabaa", "B", 8)  = 5
   * StringUtils.lastIndexOfIgnoreCase("aabaabaa", "AB", 8) = 4
   * StringUtils.lastIndexOfIgnoreCase("aabaabaa", "B", 9)  = 5
   * StringUtils.lastIndexOfIgnoreCase("aabaabaa", "B", -1) = -1
   * StringUtils.lastIndexOfIgnoreCase("aabaabaa", "A", 0)  = 0
   * StringUtils.lastIndexOfIgnoreCase("aabaabaa", "B", 0)  = -1
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchStr 要查找的字符串，可能为 null 或 undefined
   * @param startPos 起始位置
   * @return 搜索字符串的最后一个索引（总是 ≤ startPos），如果不匹配或 null、undefined 输入，则为 -1
   */
  public static lastIndexOfIgnoreCase(
    str: string,
    searchStr: string,
    startPos = str.length,
  ): number {
    if (ObjectUtils.anyNull(str, searchStr)) {
      return this.INDEX_NOT_FOUND;
    }
    const searchStrLength = searchStr.length;
    const strLength = str.length;
    if (startPos > strLength - searchStrLength) {
      startPos = strLength - searchStrLength;
    }
    if (startPos < 0) {
      return this.INDEX_NOT_FOUND;
    }
    if (searchStrLength === 0) {
      return startPos;
    }
    return str.toLowerCase().lastIndexOf(searchStr, startPos);
  }

  /**
   * <p>查找字符串中的第 n 个最后索引，处理 null 或 undefined。</p>
   *
   * <p>null 或 undefined 字符串将返回 -1。</p>
   *
   * <pre>
   * StringUtils.lastOrdinalIndexOf(null, *, *)          = -1
   * StringUtils.lastOrdinalIndexOf(*, null, *)          = -1
   * StringUtils.lastOrdinalIndexOf("", "", *)           = 0
   * StringUtils.lastOrdinalIndexOf("aabaabaa", "a", 1)  = 7
   * StringUtils.lastOrdinalIndexOf("aabaabaa", "a", 2)  = 6
   * StringUtils.lastOrdinalIndexOf("aabaabaa", "b", 1)  = 5
   * StringUtils.lastOrdinalIndexOf("aabaabaa", "b", 2)  = 2
   * StringUtils.lastOrdinalIndexOf("aabaabaa", "ab", 1) = 4
   * StringUtils.lastOrdinalIndexOf("aabaabaa", "ab", 2) = 1
   * StringUtils.lastOrdinalIndexOf("aabaabaa", "", 1)   = 8
   * StringUtils.lastOrdinalIndexOf("aabaabaa", "", 2)   = 8
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchStr 要查找的字符串，可能为 null 或 undefined
   * @param ordinal 要查找的第 n 个最后 searchStr
   * @return 搜索字符串 的第 n 个最后索引，如果不匹配，则为 -1 ({@link INDEX_NOT_FOUND}) 或 null、undefined 字符串输入
   */
  public static lastOrdinalIndexOf(
    str: string,
    searchStr: string,
    ordinal: number,
  ): number {
    return this.ordinalStrIndexOf(str, searchStr, ordinal, true);
  }

  /**
   * <p>获取字符串最左边的 length 个字符。</p>
   *
   * <p>如果 length 个字符不可用，或者字符串为 null 或 undefined，则字符串将无异常返回。
   * 如果 length 为负数，则返回一个空字符串。</p>
   *
   * <pre>
   * StringUtils.left(null, *)    = null
   * StringUtils.left(*, -ve)     = ""
   * StringUtils.left("", *)      = ""
   * StringUtils.left("abc", 0)   = ""
   * StringUtils.left("abc", 2)   = "ab"
   * StringUtils.left("abc", 4)   = "abc"
   * </pre>
   *
   * @param str 要从中获取最左边的字符的字符串，可能为 null 或 undefined
   * @param length 所需字符串的长度
   * @return 最左边的字符，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static left(str: string, length: number): string {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    if (length < 0) {
      return this.EMPTY;
    }
    if (str.length <= length) {
      return str;
    }
    return str.substring(0, length);
  }

  /**
   * <p>左填充一个具有指定字符串的字符串。</p>
   *
   * <p>填充到 size 的大小。</p>
   *
   * <pre>
   * StringUtils.leftPad(null, *, *)      = null
   * StringUtils.leftPad("", 3, "z")      = "zzz"
   * StringUtils.leftPad("bat", 3, "yz")  = "bat"
   * StringUtils.leftPad("bat", 5, "yz")  = "yzbat"
   * StringUtils.leftPad("bat", 8, "yz")  = "yzyzybat"
   * StringUtils.leftPad("bat", 1, "yz")  = "bat"
   * StringUtils.leftPad("bat", -1, "yz") = "bat"
   * StringUtils.leftPad("bat", 5, null)  = "  bat"
   * StringUtils.leftPad("bat", 5, "")    = "  bat"
   * </pre>
   *
   * @param str 要填充的字符串，可能为 null 或 undefined
   * @param size 要填充的大小
   * @param padStr 要填充的字符串，null、undefined 或空视为单个空白
   * @return 如果不需要填充，则为左填充字符串或原始字符串，如果为空字符串输入，则返回 null
   */
  public static leftPad(
    str: string,
    size: number,
    padStr = this.SPACE,
  ): string {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    if (this.isEmpty(padStr)) {
      padStr = this.SPACE;
    }
    return str.padStart(size + str.length, padStr);
  }

  /**
   * 获取字符串长度，如果字符串为 null 或 undefined，则返回 0。
   *
   * @param str 一个字符串或 null 或 undefined
   * @return 获取字符串长度，如果字符串为 null 或 undefined，则返回 0。
   */
  public static getLength(str: string): number {
    return ObjectUtils.isNull(str) ? 0 : str.length;
  }

  /**
   * <p>根据 {@link String#toLowerCase} 将字符串转换为小写。</p>
   *
   * <p>null 或 undefined 输入字符串返回 null。</p>
   *
   * <pre>
   * StringUtils.lowerCase(null)  = null
   * StringUtils.lowerCase("")    = ""
   * StringUtils.lowerCase("aBc") = "abc"
   * </pre>
   *
   * @param str 小写的字符串，可能为 null 或 undefined
   * @param locales 定义大小写转换规则的语言环境，不能为空
   * @return 小写字符串，如果为空字符串输入则返回 null
   */
  public static lowerCase(str: string, locales?: string | string[]): string {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    return str.toLocaleLowerCase(locales);
  }

  /**
   * <p>从字符串的中间获取 length 个字符。</p>
   *
   * <p>如果 length 个字符不可用，则将返回字符串的其余部分而无异常。
   * 如果字符串为 null 或 undefined，则返回 null。
   * 如果 length 为负数或超过 str 的长度，则返回一个空字符串。</p>
   *
   * <pre>
   * StringUtils.mid(null, *, *)    = null
   * StringUtils.mid("", 0, *)      = ""
   * StringUtils.mid("abc", 0, 2)   = "ab"
   * StringUtils.mid("abc", 0, 4)   = "abc"
   * StringUtils.mid("abc", 2, 4)   = "c"
   * StringUtils.mid("abc", 4, 2)   = ""
   * StringUtils.mid("abc", -2, 2)  = "ab"
   * </pre>
   *
   * @param str 要从中获取字符的字符串，可能为 null 或 undefined
   * @param pos 开始的位置，负数视为零
   * @param length 所需字符串的长度
   * @return 中间字符，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static mid(str: string, pos: number, length: number): string {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    if (length < 0 || pos > str.length) {
      return this.EMPTY;
    }
    if (pos < 0) {
      pos = 0;
    }
    if (str.length <= pos + length) {
      return str.substring(pos);
    }
    return str.substring(pos, pos + length);
  }

  /**
   * <p>查找字符串中的第 n 个索引，处理 null 和 undefined。
   * 如果可能，此方法使用 {@link String#indexOf}。</p>
   *
   * <p><b>Note:</b>
   * 代码开始在目标的开头寻找匹配，每次成功匹配后将起始索引加一（除非 searchStr 是一个空字符串，在这种情况下，位置永远不会增加并且 0 是立即返回）。
   * 这意味着匹配可能会重叠。</p>
   *
   * <p>null 或 undefined 字符串将返回 -1。</p>
   *
   * <pre>
   * StringUtils.ordinalIndexOf(null, *, *)          = -1
   * StringUtils.ordinalIndexOf(*, null, *)          = -1
   * StringUtils.ordinalIndexOf("", "", *)           = 0
   * StringUtils.ordinalIndexOf("aabaabaa", "a", 1)  = 0
   * StringUtils.ordinalIndexOf("aabaabaa", "a", 2)  = 1
   * StringUtils.ordinalIndexOf("aabaabaa", "b", 1)  = 2
   * StringUtils.ordinalIndexOf("aabaabaa", "b", 2)  = 5
   * StringUtils.ordinalIndexOf("aabaabaa", "ab", 1) = 1
   * StringUtils.ordinalIndexOf("aabaabaa", "ab", 2) = 4
   * StringUtils.ordinalIndexOf("aabaabaa", "", 1)   = 0
   * StringUtils.ordinalIndexOf("aabaabaa", "", 2)   = 0
   * </pre>
   *
   * <p>匹配可能重叠：</p>
   * <pre>
   * StringUtils.ordinalIndexOf("ababab", "aba", 1)   = 0
   * StringUtils.ordinalIndexOf("ababab", "aba", 2)   = 2
   * StringUtils.ordinalIndexOf("ababab", "aba", 3)   = -1
   *
   * StringUtils.ordinalIndexOf("abababab", "abab", 1) = 0
   * StringUtils.ordinalIndexOf("abababab", "abab", 2) = 2
   * StringUtils.ordinalIndexOf("abababab", "abab", 3) = 4
   * StringUtils.ordinalIndexOf("abababab", "abab", 4) = -1
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchStr 要查找的字符串，可能为 null 或 undefined
   * @param ordinal 要查找的第 n 个 searchStr
   * @return 搜索字符串的第 n 个索引，如果没有匹配或 null、undefined 字符串输入则返回 -1 ({@link INDEX_NOT_FOUND})
   */
  public static ordinalIndexOf(
    str: string,
    searchStr: string,
    ordinal: number,
  ): number {
    return this.ordinalStrIndexOf(str, searchStr, ordinal, false);
  }

  /**
   * <p>用另一个字符串覆盖一个字符串的一部分。</p>
   *
   * <p>null 或 undefined 字符串输入返回 null。
   * 负索引被视为零。大于字符串长度的索引被视为字符串长度。
   * 起始索引始终是两个索引中较小的一个。</p>
   *
   * <pre>
   * StringUtils.overlay(null, *, *, *)            = null
   * StringUtils.overlay("", "abc", 0, 0)          = "abc"
   * StringUtils.overlay("abcdef", null, 2, 4)     = "abef"
   * StringUtils.overlay("abcdef", "", 2, 4)       = "abef"
   * StringUtils.overlay("abcdef", "", 4, 2)       = "abef"
   * StringUtils.overlay("abcdef", "zzzz", 2, 4)   = "abzzzzef"
   * StringUtils.overlay("abcdef", "zzzz", 4, 2)   = "abzzzzef"
   * StringUtils.overlay("abcdef", "zzzz", -1, 4)  = "zzzzef"
   * StringUtils.overlay("abcdef", "zzzz", 2, 8)   = "abzzzz"
   * StringUtils.overlay("abcdef", "zzzz", -2, -3) = "zzzzabcdef"
   * StringUtils.overlay("abcdef", "zzzz", 8, 10)  = "abcdefzzzz"
   * </pre>
   *
   * @param str 要覆盖的字符串，可能为 null 或 undefined
   * @param overlay 要覆盖的字符串，可能为 null 或 undefined
   * @param start 开始覆盖的位置
   * @param end 之前停止覆盖的位置
   * @return 覆盖字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static overlay(
    str: string,
    overlay: string,
    start: number,
    end: number,
  ): string {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    if (ObjectUtils.isNull(overlay)) {
      overlay = this.EMPTY;
    }
    const len = str.length;
    if (start < 0) {
      start = 0;
    }
    if (start > len) {
      start = len;
    }
    if (end < 0) {
      end = 0;
    }
    if (end > len) {
      end = len;
    }
    if (start > end) {
      const temp = start;
      start = end;
      end = temp;
    }
    return str.substring(0, start) + overlay + str.substring(end);
  }

  /**
   * 如果字符串尚未以任何前缀开头，则将前缀添加到字符串的开头。
   *
   * <pre>
   * StringUtils.prependIfMissing(null, null) = null
   * StringUtils.prependIfMissing("abc", null) = "abc"
   * StringUtils.prependIfMissing("", "xyz") = "xyz"
   * StringUtils.prependIfMissing("abc", "xyz") = "xyzabc"
   * StringUtils.prependIfMissing("xyzabc", "xyz") = "xyzabc"
   * StringUtils.prependIfMissing("XYZabc", "xyz") = "xyzXYZabc"
   * </pre>
   * <p>带有附加前缀，</p>
   * <pre>
   * StringUtils.prependIfMissing(null, null, null) = null
   * StringUtils.prependIfMissing("abc", null, null) = "abc"
   * StringUtils.prependIfMissing("", "xyz", null) = "xyz"
   * StringUtils.prependIfMissing("abc", "xyz", [null]) = "xyzabc"
   * StringUtils.prependIfMissing("abc", "xyz", "") = "abc"
   * StringUtils.prependIfMissing("abc", "xyz", "mno") = "xyzabc"
   * StringUtils.prependIfMissing("xyzabc", "xyz", "mno") = "xyzabc"
   * StringUtils.prependIfMissing("mnoabc", "xyz", "mno") = "mnoabc"
   * StringUtils.prependIfMissing("XYZabc", "xyz", "mno") = "xyzXYZabc"
   * StringUtils.prependIfMissing("MNOabc", "xyz", "mno") = "xyzMNOabc"
   * </pre>
   *
   * @param str 字符串。
   * @param prefix 附加到字符串开头的前缀。
   * @param prefixes 其他有效的前缀。
   * @return {} 如果前缀被添加，则为新字符串，否则为相同的字符串。
   */
  public static prependIfMissing(
    str: string,
    prefix: string,
    ...prefixes: string[]
  ): string {
    return this.prependStrIfMissing(str, prefix, false, ...prefixes);
  }

  /**
   * 如果字符串尚未以任何前缀开头，不区分大小写，则将前缀添加到字符串的开头。
   *
   * <pre>
   * StringUtils.prependIfMissingIgnoreCase(null, null) = null
   * StringUtils.prependIfMissingIgnoreCase("abc", null) = "abc"
   * StringUtils.prependIfMissingIgnoreCase("", "xyz") = "xyz"
   * StringUtils.prependIfMissingIgnoreCase("abc", "xyz") = "xyzabc"
   * StringUtils.prependIfMissingIgnoreCase("xyzabc", "xyz") = "xyzabc"
   * StringUtils.prependIfMissingIgnoreCase("XYZabc", "xyz") = "XYZabc"
   * </pre>
   * <p>加上额外的前缀，</p>
   * <pre>
   * StringUtils.prependIfMissingIgnoreCase(null, null, null) = null
   * StringUtils.prependIfMissingIgnoreCase("abc", null, null) = "abc"
   * StringUtils.prependIfMissingIgnoreCase("", "xyz", null) = "xyz"
   * StringUtils.prependIfMissingIgnoreCase("abc", "xyz", [null]) = "xyzabc"
   * StringUtils.prependIfMissingIgnoreCase("abc", "xyz", "") = "abc"
   * StringUtils.prependIfMissingIgnoreCase("abc", "xyz", "mno") = "xyzabc"
   * StringUtils.prependIfMissingIgnoreCase("xyzabc", "xyz", "mno") = "xyzabc"
   * StringUtils.prependIfMissingIgnoreCase("mnoabc", "xyz", "mno") = "mnoabc"
   * StringUtils.prependIfMissingIgnoreCase("XYZabc", "xyz", "mno") = "XYZabc"
   * StringUtils.prependIfMissingIgnoreCase("MNOabc", "xyz", "mno") = "MNOabc"
   * </pre>
   *
   * @param str 字符串。
   * @param prefix 附加到字符串开头的前缀。
   * @param prefixes 有效的附加前缀（可选）。
   * @return {} 如果前缀被添加，则为新字符串，否则为相同的字符串。
   */
  public static prependIfMissingIgnoreCase(
    str: string,
    prefix: string,
    ...prefixes: string[]
  ): string {
    return this.prependStrIfMissing(str, prefix, true, ...prefixes);
  }

  /**
   * <p>从源字符串中删除所有出现的子字符串。</p>
   *
   * <p>null 或 undefined 源字符串将返回 null。空 ("") 源字符串将返回空字符串。
   * null 删除字符串将返回源字符串。空 ("") 删除字符串将返回源字符串。</p>
   *
   * <pre>
   * StringUtils.remove(null, *)        = null
   * StringUtils.remove("", *)          = ""
   * StringUtils.remove(*, null)        = *
   * StringUtils.remove(*, "")          = *
   * StringUtils.remove("queued", "ue") = "qd"
   * StringUtils.remove("queued", "zz") = "queued"
   * </pre>
   *
   * @param str 要搜索的源字符串，可能为 null 或 undefined
   * @param remove 要搜索和删除的字符串，可能为 null 或 undefined
   * @return 如果找到，则删除字符串的子字符串，如果为 null 或 undefined 字符串输入，则返回 null
   */
  public static remove(str: string, remove: string): string {
    if (this.isEmpty(str) || this.isEmpty(remove)) {
      return str;
    }
    return this.replace(str, remove, this.EMPTY, -1);
  }

  /**
   * <p>仅当子字符串位于源字符串的末尾时才删除它，否则返回源字符串。</p>
   *
   * <p>null 或 undefined 源字符串将返回 null。
   * 空 ("") 源字符串将返回空字符串。
   * null 或 undefined 搜索字符串将返回源字符串。</p>
   *
   * <pre>
   * StringUtils.removeEnd(null, *)      = null
   * StringUtils.removeEnd("", *)        = ""
   * StringUtils.removeEnd(*, null)      = *
   * StringUtils.removeEnd("www.domain.com", ".com.")  = "www.domain.com"
   * StringUtils.removeEnd("www.domain.com", ".com")   = "www.domain"
   * StringUtils.removeEnd("www.domain.com", "domain") = "www.domain.com"
   * StringUtils.removeEnd("abc", "")    = "abc"
   * </pre>
   *
   * @param str 要搜索的源字符串，可能为 null 或 undefined
   * @param remove 要搜索和删除的字符串，可能为 null 或 undefined
   * @return 如果找到，则删除字符串的子字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static removeEnd(str: string, remove: string): string {
    if (this.isEmpty(str) || this.isEmpty(remove)) {
      return str;
    }
    if (str.endsWith(remove)) {
      return str.substring(0, str.length - remove.length);
    }
    return str;
  }

  /**
   * <p>如果子字符串位于源字符串的末尾，则不区分大小写，否则返回源字符串</p>
   *
   * <p>null 或 undefined 源字符串将返回 null。空 ("") 源字符串将返回空字符串。
   * null 或 undefined 搜索字符串将返回源字符串。</p>
   *
   * <pre>
   * StringUtils.removeEndIgnoreCase(null, *)      = null
   * StringUtils.removeEndIgnoreCase("", *)        = ""
   * StringUtils.removeEndIgnoreCase(*, null)      = *
   * StringUtils.removeEndIgnoreCase("www.domain.com", ".com.")  = "www.domain.com"
   * StringUtils.removeEndIgnoreCase("www.domain.com", ".com")   = "www.domain"
   * StringUtils.removeEndIgnoreCase("www.domain.com", "domain") = "www.domain.com"
   * StringUtils.removeEndIgnoreCase("abc", "")    = "abc"
   * StringUtils.removeEndIgnoreCase("www.domain.com", ".COM") = "www.domain")
   * StringUtils.removeEndIgnoreCase("www.domain.COM", ".com") = "www.domain")
   * </pre>
   *
   * @param str 要搜索的源字符串，可能为 null 或 undefined
   * @param remove 要搜索（不区分大小写）和删除的字符串，可能为 null 或 undefined
   * @return 如果找到则删除字符串的子字符串，如果输入字符串为 null 或 undefined 则返回 null
   */
  public static removeEndIgnoreCase(str: string, remove: string): string {
    if (this.isEmpty(str) || this.isEmpty(remove)) {
      return str;
    }
    if (this.endsWithIgnoreCase(str, remove)) {
      return str.substring(0, str.length - remove.length);
    }
    return str;
  }

  /**
   * <p>从源字符串中删除所有出现的子字符串，不区分大小写。</p>
   *
   * <p>null 或 undefined 源字符串将返回 null。空 ("") 源字符串将返回空字符串。
   * null 或 undefined 删除字符串将返回源字符串。空 ("") 删除字符串将返回源字符串。</p>
   *
   * <pre>
   * StringUtils.removeIgnoreCase(null, *)        = null
   * StringUtils.removeIgnoreCase("", *)          = ""
   * StringUtils.removeIgnoreCase(*, null)        = *
   * StringUtils.removeIgnoreCase(*, "")          = *
   * StringUtils.removeIgnoreCase("queued", "ue") = "qd"
   * StringUtils.removeIgnoreCase("queued", "zz") = "queued"
   * StringUtils.removeIgnoreCase("quEUed", "UE") = "qd"
   * StringUtils.removeIgnoreCase("queued", "zZ") = "queued"
   * </pre>
   *
   * @param str 要搜索的源字符串，可能为 null 或 undefined
   * @param remove 要搜索（不区分大小写）和删除的字符串，可能为 null 或 undefined
   * @return 如果找到，则删除字符串的子字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static removeIgnoreCase(str: string, remove: string): string {
    return this.replaceIgnoreCase(str, remove, this.EMPTY, -1);
  }

  /**
   * <p>仅当子字符串位于源字符串的开头时才删除它，否则返回源字符串。</p>
   *
   * <p>null 或 undefined 源字符串将返回 null。空 ("") 源字符串将返回空字符串。
   * null 或 undefined 搜索字符串将返回源字符串。</p>
   *
   * <pre>
   * StringUtils.removeStart(null, *)      = null
   * StringUtils.removeStart("", *)        = ""
   * StringUtils.removeStart(*, null)      = *
   * StringUtils.removeStart("www.domain.com", "www.")   = "domain.com"
   * StringUtils.removeStart("domain.com", "www.")       = "domain.com"
   * StringUtils.removeStart("www.domain.com", "domain") = "www.domain.com"
   * StringUtils.removeStart("abc", "")    = "abc"
   * </pre>
   *
   * @param str 要搜索的源字符串，可能为 null 或 undefined
   * @param remove 要搜索和删除的字符串，可能为 null 或 undefined
   * @return 如果找到，则删除字符串的子字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static removeStart(str: string, remove: string): string {
    if (this.isEmpty(str) || this.isEmpty(remove)) {
      return str;
    }
    if (str.startsWith(remove)) {
      return str.substring(remove.length);
    }
    return str;
  }

  /**
   * <p>如果子字符串位于源字符串的开头，则不区分大小写，否则返回源字符串。</p>
   *
   * <p>null 或 undefined 源字符串将返回 null。空 ("") 源字符串将返回空字符串。
   * null 或 undefined 搜索字符串将返回源字符串。</p>
   *
   * <pre>
   * StringUtils.removeStartIgnoreCase(null, *)      = null
   * StringUtils.removeStartIgnoreCase("", *)        = ""
   * StringUtils.removeStartIgnoreCase(*, null)      = *
   * StringUtils.removeStartIgnoreCase("www.domain.com", "www.")   = "domain.com"
   * StringUtils.removeStartIgnoreCase("www.domain.com", "WWW.")   = "domain.com"
   * StringUtils.removeStartIgnoreCase("domain.com", "www.")       = "domain.com"
   * StringUtils.removeStartIgnoreCase("www.domain.com", "domain") = "www.domain.com"
   * StringUtils.removeStartIgnoreCase("abc", "")    = "abc"
   * </pre>
   *
   * @param str 要搜索的源字符串，可能为 null 或 undefined
   * @param remove 要搜索（不区分大小写）和删除的字符串，可能为 null 或 undefined
   * @return 如果找到，则删除字符串的子字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static removeStartIgnoreCase(str: string, remove: string): string {
    if (ObjectUtils.isNotNull(str) && this.startsWithIgnoreCase(str, remove)) {
      return str.substring(this.getLength(remove));
    }
    return str;
  }

  /**
   * <p>重复一个字符串 repeat 次以形成一个新字符串。</p>
   *
   * <pre>
   * StringUtils.repeat(null, 2) = null
   * StringUtils.repeat("", 0)   = ""
   * StringUtils.repeat("", 2)   = ""
   * StringUtils.repeat("a", 3)  = "aaa"
   * StringUtils.repeat("ab", 2) = "abab"
   * StringUtils.repeat("a", -2) = ""
   * </pre>
   *
   * @param str 要重复的字符串，可能为 null 或 undefined
   * @param repeat 重复 str 的次数，负数视为零
   * @return 由重复的原始字符串组成的新字符串，如果字符串输入为 null 或 undefined 则返回 null
   */
  public static repeat(str: string, repeat: number): string;

  /**
   * <p>重复一个字符串 repeat 次以形成一个新的字符串，每次都注入一个字符串分隔符。</p>
   *
   * <pre>
   * StringUtils.repeat(null, null, 2) = null
   * StringUtils.repeat(null, "x", 2)  = null
   * StringUtils.repeat("", null, 0)   = ""
   * StringUtils.repeat("", "", 2)     = ""
   * StringUtils.repeat("", "x", 3)    = "xxx"
   * StringUtils.repeat("?", ", ", 3)  = "?, ?, ?"
   * </pre>
   *
   * @param str 要重复的字符串，可能为 null 或 undefined
   * @param separator 要注入的字符串，可能为 null 或 undefined
   * @param repeat 重复 str 的次数，负数视为零
   * @return 由重复的原始字符串组成的新字符串，如果字符串输入为 null 或 undefined 则返回 null
   */
  public static repeat(str: string, separator: string, repeat: number): string;

  public static repeat(
    str: string,
    separator: string | number,
    repeat?: number,
  ): string {
    if (ObjectUtils.anyNull(str, separator)) {
      return this.repeat(str, repeat);
    }

    if (typeof separator === 'number') {
      if (ObjectUtils.isNull(str)) {
        return null;
      }
      if (repeat <= 0) {
        return this.EMPTY;
      }
      return str.repeat(repeat);
    }

    const result = this.repeat(str + separator, repeat);
    return this.removeEnd(result, separator);
  }

  /**
   * <p>对于搜索字符串的第一个 max 值，将一个字符串替换为更大字符串中的另一个字符串。</p>
   *
   * <p>传递给此方法的 null 或 undefined 是无操作的。</p>
   *
   * <pre>
   * StringUtils.replace(null, *, *, *)         = null
   * StringUtils.replace("", *, *, *)           = ""
   * StringUtils.replace("any", null, *, *)     = "any"
   * StringUtils.replace("any", *, null, *)     = "any"
   * StringUtils.replace("any", "", *, *)       = "any"
   * StringUtils.replace("any", *, *, 0)        = "any"
   * StringUtils.replace("abaa", "a", null, -1) = "abaa"
   * StringUtils.replace("abaa", "a", "", -1)   = "b"
   * StringUtils.replace("abaa", "a", "z", 0)   = "abaa"
   * StringUtils.replace("abaa", "a", "z", 1)   = "zbaa"
   * StringUtils.replace("abaa", "a", "z", 2)   = "zbza"
   * StringUtils.replace("abaa", "a", "z", -1)  = "zbzz"
   * </pre>
   *
   * @param text 要搜索和替换的文本，可能为 null 或 undefined
   * @param searchString 要搜索的字符串，可能为 null 或 undefined
   * @param replacement 替换它的字符串，可能为 null 或 undefined
   * @param max 要替换的最大值数，如果没有最大值，则为 -1
   * @return 处理任何替换的文本，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static replace(
    text: string,
    searchString: string,
    replacement: string,
    max = -1,
  ): string {
    return this.replaceStr(text, searchString, replacement, max, false);
  }

  /**
   * <p>一次性替换字符串中的多个字符。此方法也可用于删除字符。</p>
   *
   * <p>例如：<br>
   * replaceChars(&quot;hello&quot;, &quot;ho&quot;, &quot;jy&quot;) = jelly.</p>
   *
   * <p>null 或 undefined 字符串输入返回 null。
   * 空 ("") 字符串输入返回空字符串。
   * 一组 null、undefined 或空的搜索字符返回输入字符串。</p>
   *
   * <p>搜索字符的长度通常应等于替换字符的长度。
   * 如果搜索字符较长，则删除多余的搜索字符。
   * 如果搜索字符较短，则忽略多余的替换字符。</p>
   *
   * <pre>
   * StringUtils.replaceChars(null, *, *)           = null
   * StringUtils.replaceChars("", *, *)             = ""
   * StringUtils.replaceChars("abc", null, *)       = "abc"
   * StringUtils.replaceChars("abc", "", *)         = "abc"
   * StringUtils.replaceChars("abc", "b", null)     = "ac"
   * StringUtils.replaceChars("abc", "b", "")       = "ac"
   * StringUtils.replaceChars("abcba", "bc", "yz")  = "ayzya"
   * StringUtils.replaceChars("abcba", "bc", "y")   = "ayya"
   * StringUtils.replaceChars("abcba", "bc", "yzx") = "ayzya"
   * </pre>
   *
   * @param str 替换字符的字符串，可以为 null 或 undefined
   * @param searchChars 要搜索的一组字符，可能为 null 或 undefined
   * @param replaceChars 一组要替换的字符，可以为 null 或 undefined
   * @return 修改后的字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static replaceChars(
    str: string,
    searchChars: string,
    replaceChars: string,
  ): string {
    if (this.isEmpty(str) || this.isEmpty(searchChars)) {
      return str;
    }
    if (ObjectUtils.isNull(replaceChars)) {
      replaceChars = this.EMPTY;
    }
    let modified = false;
    const replaceCharsLength = replaceChars.length;
    const strLength = str.length;
    const buf = new Array(strLength);
    for (let i = 0; i < strLength; i++) {
      const ch = str.charAt(i);
      const index = searchChars.indexOf(ch);
      if (index >= 0) {
        modified = true;
        if (index < replaceCharsLength) {
          buf[i] = replaceChars.charAt(index);
        }
      } else {
        buf[i] = ch;
      }
    }
    if (modified) {
      return buf.join('');
    }
    return str;
  }

  /**
   * <p>对于搜索字符串的第一个 max 值，不区分大小写将字符串替换为较大字符串中的另一个字符串。</p>
   *
   * <p>传递给此方法的 null 或 undefined 引用是无操作的。</p>
   *
   * <pre>
   * StringUtils.replaceIgnoreCase(null, *, *, *)         = null
   * StringUtils.replaceIgnoreCase("", *, *, *)           = ""
   * StringUtils.replaceIgnoreCase("any", null, *, *)     = "any"
   * StringUtils.replaceIgnoreCase("any", *, null, *)     = "any"
   * StringUtils.replaceIgnoreCase("any", "", *, *)       = "any"
   * StringUtils.replaceIgnoreCase("any", *, *, 0)        = "any"
   * StringUtils.replaceIgnoreCase("abaa", "a", null, -1) = "abaa"
   * StringUtils.replaceIgnoreCase("abaa", "a", "", -1)   = "b"
   * StringUtils.replaceIgnoreCase("abaa", "a", "z", 0)   = "abaa"
   * StringUtils.replaceIgnoreCase("abaa", "A", "z", 1)   = "zbaa"
   * StringUtils.replaceIgnoreCase("abAa", "a", "z", 2)   = "zbza"
   * StringUtils.replaceIgnoreCase("abAa", "a", "z", -1)  = "zbzz"
   * </pre>
   *
   * @param text 要搜索和替换的文本，可能为 null 或 undefined
   * @param searchString 要搜索的字符串（不区分大小写），可能为 null 或 undefined
   * @param replacement 替换它的字符串，可能为 null 或 undefined
   * @param max 要替换的最大值数，如果没有最大值，则为 -1
   * @return 处理任何替换的文本，如果为 null、undefined 字符串输入则返回 null
   */
  public static replaceIgnoreCase(
    text: string,
    searchString: string,
    replacement: string,
    max = -1,
  ): string {
    return this.replaceStr(text, searchString, replacement, max, true);
  }

  /**
   * <p>用更大字符串中的另一个字符串替换一个字符串，一次。</p>
   *
   * <p>传递给此方法的 null 或 undefined 引用是无操作的。</p>
   *
   * <pre>
   * StringUtils.replaceOnce(null, *, *)        = null
   * StringUtils.replaceOnce("", *, *)          = ""
   * StringUtils.replaceOnce("any", null, *)    = "any"
   * StringUtils.replaceOnce("any", *, null)    = "any"
   * StringUtils.replaceOnce("any", "", *)      = "any"
   * StringUtils.replaceOnce("aba", "a", null)  = "aba"
   * StringUtils.replaceOnce("aba", "a", "")    = "ba"
   * StringUtils.replaceOnce("aba", "a", "z")   = "zba"
   * </pre>
   *
   * @param text 要搜索和替换的文本，可能为 null 或 undefined
   * @param searchString 要搜索的字符串，可能为 null 或 undefined
   * @param replacement 替换它的字符串，可能为 null 或 undefined
   * @return 处理任何替换的文本，如果为 null、undefined 字符串输入则返回 null
   */
  public static replaceOnce(
    text: string,
    searchString: string,
    replacement: string,
  ): string {
    return this.replaceStr(text, searchString, replacement, 1, false);
  }

  /**
   * <p>不区分大小写将一个字符串替换为一个较大字符串中的另一个字符串，一次。</p>
   *
   * <p>传递给此方法的 null 或 undefined 引用是无操作的。</p>
   *
   * <pre>
   * StringUtils.replaceOnceIgnoreCase(null, *, *)        = null
   * StringUtils.replaceOnceIgnoreCase("", *, *)          = ""
   * StringUtils.replaceOnceIgnoreCase("any", null, *)    = "any"
   * StringUtils.replaceOnceIgnoreCase("any", *, null)    = "any"
   * StringUtils.replaceOnceIgnoreCase("any", "", *)      = "any"
   * StringUtils.replaceOnceIgnoreCase("aba", "a", null)  = "aba"
   * StringUtils.replaceOnceIgnoreCase("aba", "a", "")    = "ba"
   * StringUtils.replaceOnceIgnoreCase("aba", "a", "z")   = "zba"
   * StringUtils.replaceOnceIgnoreCase("FoOFoofoo", "foo", "") = "Foofoo"
   * </pre>
   *
   * @param text 要搜索和替换的文本，可能为 null 或 undefined
   * @param searchString 要搜索的字符串（不区分大小写），可能为 null 或 undefined
   * @param replacement 替换它的字符串，可能为 null 或 undefined
   * @return 处理任何替换的文本，如果为 null、undefined 字符串输入则返回 null
   */
  public static replaceOnceIgnoreCase(
    text: string,
    searchString: string,
    replacement: string,
  ): string {
    return this.replaceStr(text, searchString, replacement, 1, true);
  }

  /**
   * <p>反转字符串</p>
   *
   * <p>null 或 undefined 字符串将返回 null </p>
   *
   * <pre>
   * StringUtils.reverse(null)  = null
   * StringUtils.reverse("")    = ""
   * StringUtils.reverse("bat") = "tab"
   * </pre>
   *
   * @param str 要反转的字符串，可能为 null 或 undefined
   * @return 反转的字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static reverse(str: string): string {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    return this.toChars(str).reverse().join('');
  }

  /**
   * <p>反转由特定字符分隔的字符串。</p>
   *
   * <p>分隔符之间的字符串不反转。因此 javascript.and.typescript 变为 typescript.and.javascript （如果分隔符是 '.'）。</p>
   *
   * <pre>
   * StringUtils.reverseDelimited(null, *)      = null
   * StringUtils.reverseDelimited("", *)        = ""
   * StringUtils.reverseDelimited("a.b.c", 'x') = "a.b.c"
   * StringUtils.reverseDelimited("a.b.c", ".") = "c.b.a"
   * </pre>
   *
   * @param str 要反转的字符串，可能为 null 或 undefined
   * @param separatorChar 要使用的分隔符
   * @return 反转的字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static reverseDelimited(str: string, separatorChar: string): string {
    if (ObjectUtils.anyNull(str, separatorChar)) {
      return null;
    }
    return str.split(separatorChar).reverse().join(separatorChar);
  }

  /**
   * <p>获取字符串最右边的 length 个字符。</p>
   *
   * <p>如果 length 个字符不可用，或者字符串为 null 或 undefined，则字符串将无异常返回。
   * 如果 length 为负数，则返回一个空字符串。</p>
   *
   * <pre>
   * StringUtils.right(null, *)    = null
   * StringUtils.right(*, -ve)     = ""
   * StringUtils.right("", *)      = ""
   * StringUtils.right("abc", 0)   = ""
   * StringUtils.right("abc", 2)   = "bc"
   * StringUtils.right("abc", 4)   = "abc"
   * </pre>
   *
   * @param str 要从中获取最右边字符的字符串，可能为 null 或 undefined
   * @param length 所需字符串的长度
   * @return 最右边的字符，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static right(str: string, length: number): string {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    if (length < 0) {
      return this.EMPTY;
    }
    if (str.length <= length) {
      return str;
    }
    return str.substring(str.length - length);
  }

  /**
   * <p>用指定的字符串右填充一个字符串。</p>
   *
   * <p>字符串被填充到 size 的大小。</p>
   *
   * <pre>
   * StringUtils.rightPad(null, *, *)      = null
   * StringUtils.rightPad("", 3, "z")      = "zzz"
   * StringUtils.rightPad("bat", 3, "yz")  = "bat"
   * StringUtils.rightPad("bat", 5, "yz")  = "batyz"
   * StringUtils.rightPad("bat", 8, "yz")  = "batyzyzy"
   * StringUtils.rightPad("bat", 1, "yz")  = "bat"
   * StringUtils.rightPad("bat", -1, "yz") = "bat"
   * StringUtils.rightPad("bat", 5, null)  = "bat  "
   * StringUtils.rightPad("bat", 5, "")    = "bat  "
   * </pre>
   *
   * @param str 要填充的字符串，可能为 null 或 undefined
   * @param size 要填充的大小
   * @param padStr 要填充的字符串，null、undefined 或空视为单个空白
   * @return 如果不需要填充，则右填充字符串或原始字符串，如果为 null 或 undefined 字符串输入，则返回 null
   */
  public static rightPad(
    str: string,
    size: number,
    padStr = this.SPACE,
  ): string {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    if (this.isEmpty(padStr)) {
      padStr = this.SPACE;
    }
    return str.padEnd(str.length + size, padStr);
  }

  /**
   * <p>旋转（循环移位）一串 {@code shift} 字符。</p>
   * <ul>
   *  <li>如果 {@code shift > 0}，右循环移位（例如：ABCDEF => FABCDE）</li>
   *  <li>如果 {@code shift < 0}，左循环移位（例如：ABCDEF => BCDEFA）</li>
   * </ul>
   *
   * <pre>
   * StringUtils.rotate(null, *)        = null
   * StringUtils.rotate("", *)          = ""
   * StringUtils.rotate("abcdefg", 0)   = "abcdefg"
   * StringUtils.rotate("abcdefg", 2)   = "fgabcde"
   * StringUtils.rotate("abcdefg", -2)  = "cdefgab"
   * StringUtils.rotate("abcdefg", 7)   = "abcdefg"
   * StringUtils.rotate("abcdefg", -7)  = "abcdefg"
   * StringUtils.rotate("abcdefg", 9)   = "fgabcde"
   * StringUtils.rotate("abcdefg", -9)  = "cdefgab"
   * </pre>
   *
   * @param str 要旋转的字符串，可能为 null 或 undefined
   * @param shift 移位的次数（正：右移，负：左移）
   * @return 旋转后的字符串，如果 shift === 0 则为原始字符串，如果输入字符串为 null 或 undefined，则返回 null
   */
  public static rotate(str: string, shift: number): string {
    if (ObjectUtils.isNull(str)) {
      return null;
    }

    const strLen = str.length;
    if (shift === 0 || strLen === 0 || shift % strLen === 0) {
      return str;
    }

    const buf = [];
    const offset = -(shift % strLen);
    buf.push(this.substring(str, offset), this.substring(str, 0, offset));
    return buf.join('');
  }

  /**
   * <p>将提供的文本拆分为具有最大长度、指定分隔符的数组。</p>
   *
   * <p>返回的字符串数组中不包含分隔符。相邻的分隔符被视为一个分隔符。</p>
   *
   * <p>null 或 undefined 输入字符串返回 null。
   * null 或 undefined 分隔字符在空白处拆分。</p>
   *
   * <p>如果找到超过 max 个分隔的子字符串，则最后一个返回的字符串包括第一个 max - 1 个返回的字符串之后的所有字符（包括分隔符）。</p>
   *
   * <pre>
   * StringUtils.split(null, *, *)            = null
   * StringUtils.split("", *, *)              = []
   * StringUtils.split("ab cd ef", null, 0)   = ["ab", "cd", "ef"]
   * StringUtils.split("ab   cd ef", null, 0) = ["ab", "cd", "ef"]
   * StringUtils.split("ab:cd:ef", ":", 0)    = ["ab", "cd", "ef"]
   * StringUtils.split("ab:cd:ef", ":", 2)    = ["ab", "cd:ef"]
   * </pre>
   *
   * @param str 要解析的字符串，可能为 null 或 undefined
   * @param separatorChars 用作分隔符的字符，null 或 undefined 在空格上拆分
   * @param max 包含在数组中的最大元素数。零或负值意味着没有限制
   * @return 已解析字符串数组，如果为 null 或 undefined 字符串输入，则返回 null
   */
  public static split(
    str: string,
    separatorChars = this.EMPTY,
    max = -1,
  ): string[] {
    return this.splitWorker(str, separatorChars, max, false);
  }

  /**
   * <p>将提供的文本拆分为一个数组，指定分隔符字符串。返回最多 max 个子字符串。</p>
   *
   * <p>分隔符不会包含在返回的字符串数组中。相邻的分隔符被视为一个分隔符。</p>
   *
   * <p>null 或 undefined 输入字符串返回 null。
   * null 或 undefined 分隔字符在空白处拆分。</p>
   *
   * <pre>
   * StringUtils.splitByWholeSeparator(null, *, *)               = null
   * StringUtils.splitByWholeSeparator("", *, *)                 = []
   * StringUtils.splitByWholeSeparator("ab de fg", null, 0)      = ["ab", "de", "fg"]
   * StringUtils.splitByWholeSeparator("ab   de fg", null, 0)    = ["ab", "de", "fg"]
   * StringUtils.splitByWholeSeparator("ab:cd:ef", ":", 2)       = ["ab", "cd:ef"]
   * StringUtils.splitByWholeSeparator("ab-!-cd-!-ef", "-!-", 5) = ["ab", "cd", "ef"]
   * StringUtils.splitByWholeSeparator("ab-!-cd-!-ef", "-!-", 2) = ["ab", "cd-!-ef"]
   * </pre>
   *
   * @param str 要解析的字符串，可能为 null 或 undefined
   * @param separatorChars 包含要用作分隔符的字符串的字符串，null 或 undefined 在空白处拆分
   * @param max 返回数组中包含的最大元素数。零或负值意味着没有限制。
   * @return 已解析字符串的数组，如果输入了 null 或 undefined 字符串，则返回 null
   */
  public static splitByWholeSeparator(
    str: string,
    separatorChars: string,
    max = -1,
  ): string[] {
    return this.splitByWholeSeparatorWorker(str, separatorChars, max, false);
  }

  /**
   * <p>将提供的文本拆分为一个数组，指定分隔符字符串。返回最多 max 个子字符串。</p>
   *
   * <p>返回的字符串数组中不包含分隔符。相邻分隔符被视为空标记的分隔符。</p>
   *
   * <p>null 或 undefined 输入字符串返回 null。
   * null 或 undefined 分隔字符在空白处拆分。</p>
   *
   * <pre>
   * StringUtils.splitByWholeSeparatorPreserveAllTokens(null, *, *)               = null
   * StringUtils.splitByWholeSeparatorPreserveAllTokens("", *, *)                 = []
   * StringUtils.splitByWholeSeparatorPreserveAllTokens("ab de fg", null, 0)      = ["ab", "de", "fg"]
   * StringUtils.splitByWholeSeparatorPreserveAllTokens("ab   de fg", null, 0)    = ["ab", "", "", "de", "fg"]
   * StringUtils.splitByWholeSeparatorPreserveAllTokens("ab:cd:ef", ":", 2)       = ["ab", "cd:ef"]
   * StringUtils.splitByWholeSeparatorPreserveAllTokens("ab-!-cd-!-ef", "-!-", 5) = ["ab", "cd", "ef"]
   * StringUtils.splitByWholeSeparatorPreserveAllTokens("ab-!-cd-!-ef", "-!-", 2) = ["ab", "cd-!-ef"]
   * </pre>
   *
   * @param str 要解析的字符串，可能为 null 或 undefined
   * @param separatorChars 包含要用作分隔符的字符串的字符串，null 或 undefined 在空白处拆分
   * @param max 返回数组中包含的最大元素数。零或负值意味着没有限制。
   * @return 已解析字符串的数组，如果输入了 null 或 undefined 字符串，则返回 null
   */
  public static splitByWholeSeparatorPreserveAllTokens(
    str: string,
    separatorChars: string,
    max = -1,
  ): string[] {
    return this.splitByWholeSeparatorWorker(str, separatorChars, max, true);
  }

  /**
   * <p>将提供的文本拆分为具有最大长度的数组，指定分隔符，保留所有标记，包括由相邻分隔符创建的空标记。</p>
   *
   * <p>返回的字符串数组中不包含分隔符。相邻分隔符被视为空标记的分隔符。相邻的分隔符被视为一个分隔符。</p>
   *
   * <p>null 或 undefined 输入字符串返回 null。
   * null 或 undefined 分隔字符在空白处拆分。</p>
   *
   * <p>如果找到超过 max 个分隔的子字符串，则最后一个返回的字符串包括第一个 max - 1 个返回的字符串之后的所有字符（包括分隔符）。</p>
   *
   * <pre>
   * StringUtils.splitPreserveAllTokens(null, *, *)            = null
   * StringUtils.splitPreserveAllTokens("", *, *)              = []
   * StringUtils.splitPreserveAllTokens("ab de fg", null, 0)   = ["ab", "de", "fg"]
   * StringUtils.splitPreserveAllTokens("ab   de fg", null, 0) = ["ab", "", "", "de", "fg"]
   * StringUtils.splitPreserveAllTokens("ab:cd:ef", ":", 0)    = ["ab", "cd", "ef"]
   * StringUtils.splitPreserveAllTokens("ab:cd:ef", ":", 2)    = ["ab", "cd:ef"]
   * StringUtils.splitPreserveAllTokens("ab   de fg", null, 2) = ["ab", "  de fg"]
   * StringUtils.splitPreserveAllTokens("ab   de fg", null, 3) = ["ab", "", " de fg"]
   * StringUtils.splitPreserveAllTokens("ab   de fg", null, 4) = ["ab", "", "", "de fg"]
   * </pre>
   *
   * @param str 要解析的字符串，可能为 null 或 undefined
   * @param separatorChars 用作分隔符的字符，null 或 undefined 在空格上拆分
   * @param max 包含在数组中的最大元素数。零或负值意味着没有限制
   * @return 已解析字符串数组，如果字符串输入为 null 或 undefined，则返回 null
   */
  public static splitPreserveAllTokens(
    str: string,
    separatorChars = this.EMPTY,
    max = -1,
  ): string[] {
    return this.splitWorker(str, separatorChars, max, true);
  }

  /**
   * <p>检查字符串是否以指定的前缀开头。</p>
   *
   * <p>null 或 undefined 无异常处理。两个 null 或 undefined 引用被认为是相等的。比较默认区分大小写。</p>
   *
   * <pre>
   * StringUtils.startsWith(null, null)      = true
   * StringUtils.startsWith(null, "abc")     = false
   * StringUtils.startsWith("abcdef", null)  = false
   * StringUtils.startsWith("abcdef", "abc") = true
   * StringUtils.startsWith("ABCDEF", "abc") = false
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param prefix 要查找的前缀，可能为 null 或 undefined
   * @param ignoreCase 指示比较是否应忽略大小写（不区分大小写）。
   * @return 如果字符串以前缀、区分大小写，或两者都为 null、undefined 则返回 true
   * @see String#startsWith
   */
  public static startsWith(
    str: string,
    prefix: string,
    ignoreCase = false,
  ): boolean {
    if (ObjectUtils.anyNull(str, prefix)) {
      return str === prefix;
    }
    const preLen = prefix.length;
    if (preLen > str.length) {
      return false;
    }
    return ignoreCase
      ? str.toLowerCase().startsWith(prefix)
      : str.startsWith(prefix);
  }

  /**
   * <p>检查字符串是否以任何提供的区分大小写的前缀开头。</p>
   *
   * <pre>
   * StringUtils.startsWithAny(null, null)      = false
   * StringUtils.startsWithAny(null, "abc")  = false
   * StringUtils.startsWithAny("abcxyz", null)     = false
   * StringUtils.startsWithAny("abcxyz", "") = true
   * StringUtils.startsWithAny("abcxyz", "abc") = true
   * StringUtils.startsWithAny("abcxyz", null, "xyz", "abc") = true
   * StringUtils.startsWithAny("abcxyz", null, "xyz", "ABCX") = false
   * StringUtils.startsWithAny("ABCXYZ", null, "xyz", "abc") = false
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param searchStrings 区分大小写的字符串前缀，可能为空或包含 null、undefined
   * @return 如果输入字符串是 null 或 undefined 并且没有提供 searchStrings 则返回 true，
   * 或者输入字符串以任何提供的区分大小写的 searchStrings 起始。
   */
  public static startsWithAny(
    str: string,
    ...searchStrings: string[]
  ): boolean {
    if (this.isEmpty(str) || ArrayUtils.isEmpty(searchStrings)) {
      return false;
    }
    for (const searchString of searchStrings) {
      if (this.startsWith(str, searchString)) {
        return true;
      }
    }
    return false;
  }

  /**
   * <p>不区分大小写检查字符串是否以指定的前缀开头。</p>
   *
   * <p>null 或 undefined 无异常处理。两个 null 或 undefined 引用被认为是相等的。比较不区分大小写。</p>
   *
   * <pre>
   * StringUtils.startsWithIgnoreCase(null, null)      = true
   * StringUtils.startsWithIgnoreCase(null, "abc")     = false
   * StringUtils.startsWithIgnoreCase("abcdef", null)  = false
   * StringUtils.startsWithIgnoreCase("abcdef", "abc") = true
   * StringUtils.startsWithIgnoreCase("ABCDEF", "abc") = true
   * </pre>
   *
   * @param str 要检查的字符串，可能为 null 或 undefined
   * @param prefix 要查找的前缀，可能为 null 或 undefined
   * @return 如果字符串以前缀、不区分大小写，或两者都为 null、undefined 则返回 true
   * @see String#startsWith
   */
  public static startsWithIgnoreCase(str: string, prefix: string): boolean {
    return this.startsWith(str, prefix, true);
  }

  /**
   * <p>从字符串的开头和结尾删除任何一组字符。
   * 这类似于 {@link String#trim} 但允许剥离字符以进行控制。</p>
   *
   * <p>null 或 undefined 输入字符串返回 null。空字符串 ("") 输入返回空字符串。</p>
   *
   * <p>如果 stripChars 字符串是 null 或 undefined，
   * 则按照 {@link isWhitespace} 的定义去除空格。</p>
   *
   * <pre>
   * StringUtils.strip(null, *)          = null
   * StringUtils.strip("", *)            = ""
   * StringUtils.strip("abc", null)      = "abc"
   * StringUtils.strip("  abc", null)    = "abc"
   * StringUtils.strip("abc  ", null)    = "abc"
   * StringUtils.strip(" abc ", null)    = "abc"
   * StringUtils.strip("  abcyx", "xyz") = "  abc"
   * </pre>
   *
   * @param str 要从中删除字符的字符串，可能为 null 或 undefined
   * @param stripChars 要删除的字符，null 或 undefined 被视为空格
   * @return 剥离的字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static strip(str: string, stripChars = null): string {
    str = this.stripStart(str, stripChars);
    return this.stripEnd(str, stripChars);
  }

  /**
   * <p>从数组中每个字符串的开头和结尾去除空格。
   * 空白由 {@link isWhitespace} 定义。</p>
   *
   * <p>每次返回一个新数组，长度为零除外。
   * null 或 undefined 数组将返回 null。
   * 一个空数组将返回自身。
   * null 或 undefined 数组条目将被忽略。</p>
   *
   * <pre>
   * StringUtils.stripAll(null)             = null
   * StringUtils.stripAll([])               = []
   * StringUtils.stripAll(["abc", "  abc"]) = ["abc", "abc"]
   * StringUtils.stripAll(["abc  ", null])  = ["abc", null]
   * </pre>
   *
   * @param strs 要从中删除空格的数组，可能为 null 或 undefined
   * @return 剥离的字符串，如果为数组输入为 null 或 undefined 则返回 null
   */
  public static stripAll(...strs: string[]): string[] {
    return this.stripAllWithChars(strs, null);
  }

  /**
   * <p>从数组中每个字符串的开头和结尾删除一组字符中的任何一个。</p>
   * <p>空格由 {@link isWhitespace} 定义。</p>
   *
   * <p>每次返回一个新数组，长度为零除外。
   * null 或 undefined 数组将返回 null。
   * 一个空数组将返回自身。
   * null 或 undefined 数组条目将被忽略。
   * null 或 undefined 剥离字符将去除由 {@link isWhitespace} 定义的空白。</p>
   *
   * <pre>
   * StringUtils.stripAll(null, *)                = null
   * StringUtils.stripAll([], *)                  = []
   * StringUtils.stripAll(["abc", "  abc"], null) = ["abc", "abc"]
   * StringUtils.stripAll(["abc  ", null], null)  = ["abc", null]
   * StringUtils.stripAll(["abc  ", null], "yz")  = ["abc  ", null]
   * StringUtils.stripAll(["yabcz", null], "yz")  = ["abc", null]
   * </pre>
   *
   * @param strs 要从中删除字符的数组，可能为 null 或 undefined
   * @param stripChars 要删除的字符，null 或 undefined 被视为空格
   * @return 剥离的字符串，如果数组输入为 null 或 undefined 则返回 null
   */
  public static stripAllWithChars(strs: string[], stripChars = null): string[] {
    if (!Array.isArray(strs)) {
      throw new TypeError('strs 必须是数组或可变参数');
    }
    if (ObjectUtils.isNull(stripChars)) {
      stripChars = null;
    }
    if (ArrayUtils.isEmpty(strs)) {
      return strs;
    }
    const newArr = new Array(strs.length);
    for (let i = 0; i < strs.length; i++) {
      newArr[i] = this.strip(strs[i], stripChars);
    }
    return newArr;
  }

  /**
   * <p>从字符串的末尾删除任何一组字符。</p>
   *
   * <p>null 或 undefined 输入字符串返回 null。
   * 空字符串 ("") 输入返回空字符串。</p>
   *
   * <p>如果 stripChars 字符串是 null 或 undefined，
   * 则按照 {@link isWhitespace} 的定义去除空格。</p>
   *
   * <pre>
   * StringUtils.stripEnd(null, *)          = null
   * StringUtils.stripEnd("", *)            = ""
   * StringUtils.stripEnd("abc", "")        = "abc"
   * StringUtils.stripEnd("abc", null)      = "abc"
   * StringUtils.stripEnd("  abc", null)    = "  abc"
   * StringUtils.stripEnd("abc  ", null)    = "abc"
   * StringUtils.stripEnd(" abc ", null)    = " abc"
   * StringUtils.stripEnd("  abcyx", "xyz") = "  abc"
   * StringUtils.stripEnd("120.00", ".0")   = "12"
   * </pre>
   *
   * @param str 要从中删除字符的字符串，可能为 null 或 undefined
   * @param stripChars 要删除的字符集，null 或 undefined 被视为空格
   * @return 剥离的字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static stripEnd(str: string, stripChars: string): string {
    let end = this.getLength(str);
    if (end === 0) {
      return str;
    }

    if (ObjectUtils.isNull(stripChars)) {
      while (end != 0 && this.isWhitespace(str.charAt(end - 1))) {
        end--;
      }
    } else if (stripChars === '') {
      return str;
    } else {
      while (end != 0 && stripChars.includes(str.charAt(end - 1))) {
        end--;
      }
    }
    return str.substring(0, end);
  }

  /**
   * <p>从字符串的开头去除一组字符中的任何一个。</p>
   *
   * <p>null 或 undefined 输入字符串返回 null。
   * 空字符串 ("") 输入返回空字符串。</p>
   *
   * <p>如果 stripChars 字符串是 null 或 undefined，
   * 则按照 {@link isWhitespace} 的定义去除空格。</p>
   *
   * <pre>
   * StringUtils.stripStart(null, *)          = null
   * StringUtils.stripStart("", *)            = ""
   * StringUtils.stripStart("abc", "")        = "abc"
   * StringUtils.stripStart("abc", null)      = "abc"
   * StringUtils.stripStart("  abc", null)    = "abc"
   * StringUtils.stripStart("abc  ", null)    = "abc  "
   * StringUtils.stripStart(" abc ", null)    = "abc "
   * StringUtils.stripStart("yxabc  ", "xyz") = "abc  "
   * </pre>
   *
   * @param str 要从中删除字符的字符串，可能为 null 或 undefined
   * @param stripChars 要删除的字符集，null 或 undefined 被视为空格
   * @return 剥离的字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static stripStart(str: string, stripChars: string): string {
    const strLen = this.getLength(str);
    if (strLen === 0) {
      return str;
    }
    let start = 0;
    if (ObjectUtils.isNull(stripChars)) {
      while (start != str.length && this.isWhitespace(str.charAt(start))) {
        start++;
      }
    } else if (this.isEmpty(stripChars)) {
      return str;
    } else {
      while (start != str.length && stripChars.includes(str.charAt(start))) {
        start++;
      }
    }
    return str.substring(start);
  }

  /**
   * <p>从返回的字符串的开头和结尾去除空格
   * 如果输入为 null 或 undefined 则返回空字符串</p>
   *
   * <p>这类似于 {@link trimToEmpty} 但删除了空格。
   * 空白由 {@link isWhitespace} 定义。</p>
   *
   * <pre>
   * StringUtils.stripToEmpty(null)     = ""
   * StringUtils.stripToEmpty("")       = ""
   * StringUtils.stripToEmpty("   ")    = ""
   * StringUtils.stripToEmpty("abc")    = "abc"
   * StringUtils.stripToEmpty("  abc")  = "abc"
   * StringUtils.stripToEmpty("abc  ")  = "abc"
   * StringUtils.stripToEmpty(" abc ")  = "abc"
   * StringUtils.stripToEmpty(" ab c ") = "ab c"
   * </pre>
   *
   * @param str 要剥离的字符串，可能为 null 或 undefined
   * @return 修剪后的字符串，如果输入为 null 或 undefined 则为空字符串
   */
  public static stripToEmpty(str: string): string {
    return ObjectUtils.isNull(str) ? this.EMPTY : this.strip(str, null);
  }

  /**
   * <p>从返回的字符串的开头和结尾去除空格
   * 如果字符串在剥离后为空 ("")则返回 null</p>
   *
   * <p>这类似于 {@link trimToNull} 但删除了空格。
   * 空白由 {@link isWhitespace} 定义。</p>
   *
   * <pre>
   * StringUtils.stripToNull(null)     = null
   * StringUtils.stripToNull("")       = null
   * StringUtils.stripToNull("   ")    = null
   * StringUtils.stripToNull("abc")    = "abc"
   * StringUtils.stripToNull("  abc")  = "abc"
   * StringUtils.stripToNull("abc  ")  = "abc"
   * StringUtils.stripToNull(" abc ")  = "abc"
   * StringUtils.stripToNull(" ab c ") = "ab c"
   * </pre>
   *
   * @param str 要剥离的字符串，可能为 null 或 undefined
   * @return 剥离的字符串，如果空格、空、null 或 undefined 字符串输入则返回 null
   */
  public static stripToNull(str: string): string {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    str = this.strip(str, null);
    return this.isEmpty(str) ? null : str;
  }

  /**
   * <p>从指定的字符串中获取子字符串，避免异常。</p>
   *
   * <p>负起始位置可用于从字符串末尾开始 n 个字符。</p>
   *
   * <p>返回的子字符串以 start 位置中的字符开始，并在 end 位置之前结束。
   * 所有位置计数都是从零开始的——即，从字符串的开头开始使用 start = 0。
   * 负的开始和结束位置可用于指定相对于字符串结尾的偏移量。</p>
   *
   * <p>如果 start 不严格位于 end 的左侧，则返回 ""。</p>
   *
   * <pre>
   * StringUtils.substring(null, *, *)    = null
   * StringUtils.substring("", * ,  *)    = "";
   * StringUtils.substring("abc", 0, 2)   = "ab"
   * StringUtils.substring("abc", 2, 0)   = ""
   * StringUtils.substring("abc", 2, 4)   = "c"
   * StringUtils.substring("abc", 4, 6)   = ""
   * StringUtils.substring("abc", 2, 2)   = ""
   * StringUtils.substring("abc", -2, -1) = "b"
   * StringUtils.substring("abc", -4, 2)  = "ab"
   * </pre>
   *
   * @param str 要从中获取子字符串的字符串，可能为 null 或 undefined
   * @param start 开始的位置，负数表示从字符串的末尾倒数这么多字符
   * @param end 结束的位置（不包括），负数表示从字符串的末尾倒数这么多字符
   * @return 从开始位置到结束位置的子字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static substring(str: string, start: number, end?: number): string {
    if (ObjectUtils.isNull(str)) {
      return null;
    }

    if (start < 0) {
      start = str.length + start;
    }

    if (start < 0) {
      start = 0;
    }

    if (ObjectUtils.isNull(end)) {
      if (start > str.length) {
        return this.EMPTY;
      }
    } else {
      if (end < 0) {
        end = str.length + end;
      }

      if (end > str.length) {
        end = str.length;
      }

      if (start > end) {
        return this.EMPTY;
      }

      if (end < 0) {
        end = 0;
      }
    }

    return str.substring(start, end);
  }

  /**
   * <p>获取第一次出现分隔符后的子字符串。不返回分隔符。</p>
   *
   * <p>null 或 undefined 字符串输入将返回 null。
   * 空 ("") 字符串输入将返回空字符串。
   * 如果输入字符串不是 null 或 undefined，则 null 或 undefined 分隔符将返回空字符串。</p>
   *
   * <p>如果没有找到，则返回空字符串。</p>
   *
   * <pre>
   * StringUtils.substringAfter(null, *)      = null
   * StringUtils.substringAfter("", *)        = ""
   * StringUtils.substringAfter(*, null)      = ""
   * StringUtils.substringAfter("abc", "a")   = "bc"
   * StringUtils.substringAfter("abcba", "b") = "cba"
   * StringUtils.substringAfter("abc", "c")   = ""
   * StringUtils.substringAfter("abc", "d")   = ""
   * StringUtils.substringAfter("abc", "")    = "abc"
   * </pre>
   *
   * @param str 要从中获取子字符串的字符串，可能为 null 或 undefined
   * @param separator 要搜索的字符串，可能为 null 或 undefined
   * @return 第一次出现分隔符后的子字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static substringAfter(str: string, separator: string): string {
    if (this.isEmpty(str)) {
      return str;
    }
    if (ObjectUtils.isNull(separator)) {
      return this.EMPTY;
    }
    const pos = str.indexOf(separator);
    if (pos === this.INDEX_NOT_FOUND) {
      return this.EMPTY;
    }
    return str.substring(pos + separator.length);
  }

  /**
   * <p>获取最后一次出现分隔符之后的子字符串。不返回分隔符。</p>
   *
   * <p>null 或 undefined 字符串输入将返回 null。
   * 空 ("") 字符串输入将返回空字符串。
   * 如果输入字符串不是 null 或 undefined，则空、null 或 undefined 分隔符将返回空字符串。</p>
   *
   * <p>如果没有找到，则返回空字符串。</p>
   *
   * <pre>
   * StringUtils.substringAfterLast(null, *)      = null
   * StringUtils.substringAfterLast("", *)        = ""
   * StringUtils.substringAfterLast(*, "")        = ""
   * StringUtils.substringAfterLast(*, null)      = ""
   * StringUtils.substringAfterLast("abc", "a")   = "bc"
   * StringUtils.substringAfterLast("abcba", "b") = "a"
   * StringUtils.substringAfterLast("abc", "c")   = ""
   * StringUtils.substringAfterLast("a", "a")     = ""
   * StringUtils.substringAfterLast("a", "z")     = ""
   * </pre>
   *
   * @param str 要从中获取子字符串的字符串，可能为 null 或 undefined
   * @param separator  要搜索的字符串，可能为 null 或 undefined
   * @return 最后一次出现分隔符后的子字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static substringAfterLast(str: string, separator: string): string {
    if (this.isEmpty(str)) {
      return str;
    }
    if (this.isEmpty(separator)) {
      return this.EMPTY;
    }
    const pos = str.lastIndexOf(separator);
    if (pos === this.INDEX_NOT_FOUND || pos === str.length - separator.length) {
      return this.EMPTY;
    }
    return str.substring(pos + separator.length);
  }

  /**
   * <p>获取第一次出现分隔符之前的子字符串。不返回分隔符。</p>
   *
   * <p>null 或 undefined 字符串输入将返回 null。
   * 空 ("") 字符串输入将返回空字符串。
   * null 或 undefined 分隔符将返回输入字符串。</p>
   *
   * <p>如果没有找到，则返回空字符串。</p>
   *
   * <pre>
   * StringUtils.substringBefore(null, *)      = null
   * StringUtils.substringBefore("", *)        = ""
   * StringUtils.substringBefore("abc", "a")   = ""
   * StringUtils.substringBefore("abcba", "b") = "a"
   * StringUtils.substringBefore("abc", "c")   = "ab"
   * StringUtils.substringBefore("abc", "d")   = "abc"
   * StringUtils.substringBefore("abc", "")    = ""
   * StringUtils.substringBefore("abc", null)  = "abc"
   * </pre>
   *
   * @param str 要从中获取子字符串的字符串，可能为 null 或 undefined
   * @param separator 要搜索的字符串，可能为 null 或 undefined
   * @return 第一次出现分隔符之前的子字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static substringBefore(str: string, separator: string): string {
    if (this.isEmpty(str) || ObjectUtils.isNull(separator)) {
      return str;
    }
    if (separator === this.EMPTY) {
      return this.EMPTY;
    }
    const pos = str.indexOf(separator);
    if (pos === this.INDEX_NOT_FOUND) {
      return str;
    }
    return str.substring(0, pos);
  }

  /**
   * <p>获取最后一次出现分隔符之前的子字符串。不返回分隔符。</p>
   *
   * <p> null 或 undefined 字符串输入将返回 null。
   * 空 ("") 字符串输入将返回空字符串。
   * 空、null 或 undefined 分隔符将返回输入字符串。</p>
   *
   * <p>如果没有找到，则返回空字符串。</p>
   *
   * <pre>
   * StringUtils.substringBeforeLast(null, *)      = null
   * StringUtils.substringBeforeLast("", *)        = ""
   * StringUtils.substringBeforeLast("abcba", "b") = "abc"
   * StringUtils.substringBeforeLast("abc", "c")   = "ab"
   * StringUtils.substringBeforeLast("a", "a")     = ""
   * StringUtils.substringBeforeLast("a", "z")     = "a"
   * StringUtils.substringBeforeLast("a", null)    = "a"
   * StringUtils.substringBeforeLast("a", "")      = "a"
   * </pre>
   *
   * @param str 要从中获取子字符串的字符串，可能为 null 或 undefined
   * @param separator 要搜索的字符串，可能为 null 或 undefined
   * @return 最后一次出现分隔符之前的子字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static substringBeforeLast(str: string, separator: string): string {
    if (this.isAnyEmpty(str, separator)) {
      return str;
    }
    const pos = str.lastIndexOf(separator);
    if (pos === this.INDEX_NOT_FOUND) {
      return str;
    }
    return str.substring(0, pos);
  }

  /**
   * <p>获取嵌套在同一字符串的两个实例之间的字符串。</p>
   *
   * <p>null 或 undefined 输入字符串返回 null。
   * null 或 undefined 标签返回 null。</p>
   *
   * <pre>
   * StringUtils.substringBetween(null, *)            = null
   * StringUtils.substringBetween("", "")             = ""
   * StringUtils.substringBetween("", "tag")          = null
   * StringUtils.substringBetween("tagabctag", null)  = null
   * StringUtils.substringBetween("tagabctag", "")    = ""
   * StringUtils.substringBetween("tagabctag", "tag") = "abc"
   * </pre>
   *
   * @param str 包含子字符串的字符串， 可能为 null 或 undefined
   * @param tag 子字符串前后的字符串，可能为 null 或 undefined
   * @return 子字符串，如果不匹配则返回 null
   */
  public static substringBetween(str: string, tag: string): string;

  /**
   * <p>获取嵌套在两个字符串之间的字符串。仅返回第一个匹配项。</p>
   *
   * <p>null 或 undefined 输入字符串返回 null。
   * null 或 undefined 的 open或close 返回 null（不匹配）。
   * 空 ("") open或close返回一个空字符串。</p>
   *
   * <pre>
   * StringUtils.substringBetween("wx[b]yz", "[", "]") = "b"
   * StringUtils.substringBetween(null, *, *)          = null
   * StringUtils.substringBetween(*, null, *)          = null
   * StringUtils.substringBetween(*, *, null)          = null
   * StringUtils.substringBetween("", "", "")          = ""
   * StringUtils.substringBetween("", "", "]")         = null
   * StringUtils.substringBetween("", "[", "]")        = null
   * StringUtils.substringBetween("yabcz", "", "")     = ""
   * StringUtils.substringBetween("yabcz", "y", "z")   = "abc"
   * StringUtils.substringBetween("yabczyabcz", "y", "z")   = "abc"
   * </pre>
   *
   * @param str 包含子字符串的字符串，可以为 null 或 undefined
   * @param open 子字符串之前的字符串，可能为 null 或 undefined
   * @param close 子字符串之后的字符串，可能为 null 或 undefined
   * @return 子字符串，如果不匹配则返回 null
   */
  public static substringBetween(
    str: string,
    open: string,
    close?: string,
  ): string {
    if (!ObjectUtils.allNotNull(str, open, close)) {
      return null;
    }
    const start = str.indexOf(open);
    if (start != this.INDEX_NOT_FOUND) {
      const end = str.indexOf(close, start + open.length);
      if (end != this.INDEX_NOT_FOUND) {
        return str.substring(start + open.length, end);
      }
    }
    return null;
  }

  /**
   * <p>获取嵌套在两个字符串之间的字符串。仅返回第一个匹配项。</p>
   *
   * <p>null 或 undefined 输入字符串返回 null。
   * null 或 undefined 的 open 或 close 返回 null（不匹配）。
   * 空 ("") open 或 close 返回一个空字符串。</p>
   *
   * <pre>
   * StringUtils.substringBetween("wx[b]yz", "[", "]") = "b"
   * StringUtils.substringBetween(null, *, *)          = null
   * StringUtils.substringBetween(*, null, *)          = null
   * StringUtils.substringBetween(*, *, null)          = null
   * StringUtils.substringBetween("", "", "")          = ""
   * StringUtils.substringBetween("", "", "]")         = null
   * StringUtils.substringBetween("", "[", "]")        = null
   * StringUtils.substringBetween("yabcz", "", "")     = ""
   * StringUtils.substringBetween("yabcz", "y", "z")   = "abc"
   * StringUtils.substringBetween("yabczyabcz", "y", "z")   = "abc"
   * </pre>
   *
   * @param str 要从中获取子字符串的字符串，可能为 null 或 undefined
   * @param open 子字符串之前的字符串，可能为 null 或 undefined
   * @param close 子字符串之后的字符串，可能为 null 或 undefined
   * @return 子字符串，如果不匹配则返回 null
   */
  public static substringsBetween(
    str: string,
    open: string,
    close: string,
  ): string[] {
    if (ObjectUtils.isNull(str) || this.isEmpty(str) || this.isEmpty(close)) {
      return null;
    }
    const strLen = str.length;
    if (strLen === 0) {
      return [];
    }
    const closeLen = close.length;
    const openLen = open.length;
    const list = [];
    let pos = 0;
    while (pos < strLen - closeLen) {
      let start = str.indexOf(open, pos);
      if (start < 0) {
        break;
      }
      start += openLen;
      const end = str.indexOf(close, start);
      if (end < 0) {
        break;
      }
      list.push(str.substring(start, end));
      pos = end + closeLen;
    }
    if (list.length === 0) {
      return null;
    }
    return list;
  }

  /**
   * <p>交换字符串的大小写，将大写更改为小写，将小写更改为大写。</p>
   *
   * <ul>
   *  <li>大写字符转换为小写</li>
   *  <li>小写字符转换为大写</li>
   * </ul>
   *
   * <pre>
   * StringUtils.swapCase(null)                 = null
   * StringUtils.swapCase("")                   = ""
   * StringUtils.swapCase("The dog has a BONE") = "tHE DOG HAS A bone"
   * </pre>
   *
   * @param str 要交换大小写的字符串，可能为 null 或 undefined
   * @return 更改后的字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static swapCase(str: string): string {
    if (this.isEmpty(str)) {
      return str;
    }

    const strLen = str.length;
    const newChars = new Array(strLen);
    for (let i = 0; i < strLen; i++) {
      const oldChar = str.charAt(i);
      let newChar;
      if (this.isUpperCase(oldChar)) {
        newChar = oldChar.toLowerCase();
      } else if (this.isLowerCase(oldChar)) {
        newChar = oldChar.toUpperCase();
      } else {
        newChar = oldChar;
      }
      newChars[i] = newChar;
    }
    return newChars.join('');
  }

  /**
   * <p>将字符串转换为代码点数组。</p>
   *
   * <pre>
   * StringUtils.toCodePoints(null)   =  null
   * StringUtils.toCodePoints("")     =  []  // empty array
   * </pre>
   *
   * @param str 要转换的字符串
   * @return {} 代码点数组
   */
  public static toCodePoints(str: string): number[] {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    if (str.length === 0) {
      return [];
    }

    const result = new Array[str.length]();
    for (let i = 0; i < result.length; i++) {
      result[i] = str.codePointAt(i);
    }
    return result;
  }

  /**
   * <p>将字符串转换为字符编码数组。</p>
   *
   * <pre>
   * StringUtils.toCharCodes(null)   =  null
   * StringUtils.toCharCodes("")     =  []  // empty array
   * </pre>
   *
   * @param str 要转换的字符串
   * @return {} 字符编码数组
   */
  public static toCharCodes(str: string): number[] {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    if (str.length === 0) {
      return [];
    }

    const result = new Array[str.length]();
    for (let i = 0; i < result.length; i++) {
      result[i] = str.charCodeAt(i);
    }
    return result;
  }

  /**
   * <p>将字符串转换为字符数组。</p>
   *
   * <pre>
   * StringUtils.toChars(null)   =  null
   * StringUtils.toChars("")     =  []  // empty array
   * </pre>
   *
   * @param str 要转换的字符串
   * @return {} 字符数组
   */
  public static toChars(str: string): string[] {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    if (str.length === 0) {
      return [];
    }

    const result = new Array[str.length]();
    for (let i = 0; i < result.length; i++) {
      result[i] = str.charAt(i);
    }
    return result;
  }

  /**
   * <p>将代码点数组转换为字符串。</p>
   *
   * <pre>
   * StringUtils.fromCodePoint(null)          =  null
   * StringUtils.fromCodePoint(97, 98, 98)  =  "abc"
   * </pre>
   *
   * @param codePoints 代码点数组，可能为 null 或 undefined
   * @return {} 转换后的字符串, 如果代码点数组输入为 null 或 undefined 则返回 null
   */
  public static fromCodePoint(...codePoints: number[]): string {
    return ObjectUtils.isNull(codePoints)
      ? null
      : String.fromCodePoint(...codePoints);
  }

  /**
   * <p>将字符编码数组转换为字符串。</p>
   *
   * <pre>
   * StringUtils.fromChars(null)          =  null
   * StringUtils.fromChars(97, 98, 98)  =  "abc"
   * </pre>
   *
   * @param charCodes 字符编码数组，可能为 null 或 undefined
   * @return {} 转换后的字符串, 如果字符编码数组输入为 null 或 undefined 则返回 null
   */
  public static fromCharCodes(...charCodes: number[]): string {
    return ObjectUtils.isNull(charCodes)
      ? null
      : String.fromCharCode(...charCodes);
  }

  /**
   * <p>将字符串数组转换为字符串。</p>
   *
   * <pre>
   * StringUtils.fromChars(null)             =  null
   * StringUtils.fromChars("", "a", "anas")  =  "aanas"
   * </pre>
   *
   * @param chars 字符串数组，可能为 null 或 undefined
   * @return {} 转换后的字符串, 如果字符串数组输入为 null 或 undefined 则返回 null
   */
  public static fromChars(...chars: string[]): string {
    return ObjectUtils.isNull(chars) ? null : chars.join('');
  }

  /**
   * <p>移除此字符串两端的控制字符 (char <= 32)，通过返回 null 处理 null 或 undefined。</p>
   *
   * <p>使用 {@link String#trim} 修剪字符串。 Trim 删除开始和结束字符 <= 32。要去除空格，请使用 {@link strip}。</p>
   *
   * <p>要修剪您选择的字符，请使用 {@link strip} 方法。</p>
   *
   * <pre>
   * StringUtils.trim(null)          = null
   * StringUtils.trim("")            = ""
   * StringUtils.trim("     ")       = ""
   * StringUtils.trim("abc")         = "abc"
   * StringUtils.trim("    abc    ") = "abc"
   * </pre>
   *
   * @param str 要修剪的字符串，可以为 null 或 undefined
   * @return 修剪后的字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static trim(str: string): string {
    return ObjectUtils.isNull(str) ? null : str.trim();
  }

  /**
   * <p>如果在修剪后字符串为空 ("")、null 或 undefined，则从此字符串的两端删除控制字符 (char <= 32)，返回 null。
   *
   * <p>使用 {@link String#trim} 修剪字符串。修剪删除开始和结束字符 <= 32。
   * 要去除空格，请使用 {@link stripToNull}。</p>
   *
   * <pre>
   * StringUtils.trimToNull(null)          = null
   * StringUtils.trimToNull("")            = null
   * StringUtils.trimToNull("     ")       = null
   * StringUtils.trimToNull("abc")         = "abc"
   * StringUtils.trimToNull("    abc    ") = "abc"
   * </pre>
   *
   * @param str 要修剪的字符串，可能为 null 或 undefined
   * @return 修剪后的字符串，如果只有 chars <= 32，空、null 或 undefined 字符串输入
   */
  public static trimToNull(str: string): string {
    const trimStr = this.trim(str);
    return this.isEmpty(trimStr) ? null : trimStr;
  }

  /**
   * <p>如果修剪后字符串为空 ("")、null 或 undefined，则从此字符串的两端删除控制字符 (char <= 32)，返回空字符串 ("")。
   *
   * <p>使用 {@link String#trim} 修剪字符串。
   * Trim 删除开始和结束字符 <= 32。
   * 要去除空格，请使用 {@link stripToEmpty}。</p>
   *
   * <pre>
   * StringUtils.trimToEmpty(null)          = ""
   * StringUtils.trimToEmpty("")            = ""
   * StringUtils.trimToEmpty("     ")       = ""
   * StringUtils.trimToEmpty("abc")         = "abc"
   * StringUtils.trimToEmpty("    abc    ") = "abc"
   * </pre>
   *
   * @param str 要修剪的字符串，可能为 null 或 undefined
   * @return 修剪后的字符串，如果 null 或 undefined 输入则为空字符串
   */
  public static trimToEmpty(str: string): string {
    return ObjectUtils.isNull(str) ? this.EMPTY : str.trim();
  }

  /**
   * <p>截断字符串. 这将把 "Now is the time for all good men" 变成 "is the time for all".</p>
   *
   * <p>具体来说：</p>
   * <ul>
   *   <li>如果字符串的长度小于 maxWidth 个字符，则返回它。</li>
   *   <li>否则将其截断为 substring(str, offset, maxWidth)。/li>
   *   <li>如果 maxWidth 小于 0，则抛出 {@link IllegalArgumentError}。</li>
   *   <li>如果 offset 小于 0，则抛出 {@link IllegalArgumentError}。</li>
   *   <li>在任何情况下，它都不会返回长度大于 maxWidth 的字符串。</li>
   * </ul>
   *
   * <pre>
   * StringUtils.truncate(null, 0, 0) = null
   * StringUtils.truncate(null, 2, 4) = null
   * StringUtils.truncate("", 0, 10) = ""
   * StringUtils.truncate("", 2, 10) = ""
   * StringUtils.truncate("abcdefghij", 0, 3) = "abc"
   * StringUtils.truncate("abcdefghij", 5, 6) = "fghij"
   * StringUtils.truncate("raspberry peach", 10, 15) = "peach"
   * StringUtils.truncate("abcdefghijklmno", 0, 10) = "abcdefghij"
   * StringUtils.truncate("abcdefghijklmno", -1, 10) = throws an IllegalArgumentException
   * StringUtils.truncate("abcdefghijklmno", Integer.MIN_VALUE, 10) = throws an IllegalArgumentException
   * StringUtils.truncate("abcdefghijklmno", Integer.MIN_VALUE, Integer.MAX_VALUE) = throws an IllegalArgumentException
   * StringUtils.truncate("abcdefghijklmno", 0, Integer.MAX_VALUE) = "abcdefghijklmno"
   * StringUtils.truncate("abcdefghijklmno", 1, 10) = "bcdefghijk"
   * StringUtils.truncate("abcdefghijklmno", 2, 10) = "cdefghijkl"
   * StringUtils.truncate("abcdefghijklmno", 3, 10) = "defghijklm"
   * StringUtils.truncate("abcdefghijklmno", 4, 10) = "efghijklmn"
   * StringUtils.truncate("abcdefghijklmno", 5, 10) = "fghijklmno"
   * StringUtils.truncate("abcdefghijklmno", 5, 5) = "fghij"
   * StringUtils.truncate("abcdefghijklmno", 5, 3) = "fgh"
   * StringUtils.truncate("abcdefghijklmno", 10, 3) = "klm"
   * StringUtils.truncate("abcdefghijklmno", 10, Integer.MAX_VALUE) = "klmno"
   * StringUtils.truncate("abcdefghijklmno", 13, 1) = "n"
   * StringUtils.truncate("abcdefghijklmno", 13, Integer.MAX_VALUE) = "no"
   * StringUtils.truncate("abcdefghijklmno", 14, 1) = "o"
   * StringUtils.truncate("abcdefghijklmno", 14, Integer.MAX_VALUE) = "o"
   * StringUtils.truncate("abcdefghijklmno", 15, 1) = ""
   * StringUtils.truncate("abcdefghijklmno", 15, Integer.MAX_VALUE) = ""
   * StringUtils.truncate("abcdefghijklmno", Integer.MAX_VALUE, Integer.MAX_VALUE) = ""
   * StringUtils.truncate("abcdefghij", 3, -1) = throws an IllegalArgumentException
   * StringUtils.truncate("abcdefghij", -2, 4) = throws an IllegalArgumentException
   * </pre>
   *
   * @param str 要截断的字符串，可能为 null 或 undefined
   * @param maxWidth 结果字符串的最大长度，必须为正数
   * @param offset 源字符串的左边缘
   * @return 截断字符串，如果为 null、undefined 字符串输入则返回 null
   * @throws {@link IllegalArgumentError} 如果 offset 或 maxWidth 小于 0
   */
  public static truncate(str: string, maxWidth: number, offset = 0): string {
    if (offset < 0) {
      throw new RangeError('偏移量不能为负数');
    }
    if (maxWidth < 0) {
      throw new RangeError('最大长度不能为负数');
    }
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    if (offset > str.length) {
      return this.EMPTY;
    }
    if (str.length > maxWidth) {
      const ix = Math.min(offset + maxWidth, str.length);
      return str.substring(offset, ix);
    }
    return str.substring(offset);
  }

  /**
   * <p>根据 {@link String#toUpperCase} 将字符串转换为大写。</p>
   *
   * <p>null 或 undefined 输入字符串返回 null。</p>
   *
   * <pre>
   * StringUtils.upperCase(null)  = null
   * StringUtils.upperCase("")    = ""
   * StringUtils.upperCase("aBc") = "ABC"
   * </pre>
   *
   * @param str 符串转大写，可能为 null 或 undefined
   * @param locales 定义大小写转换规则的语言环境
   * @return 大写字符串，如果为 null 或 undefined 字符串输入则返回 null
   */
  public static upperCase(str: string, locales?: string | string[]): string {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    return str.toLocaleLowerCase(locales);
  }

  /**
   * 测试两个字符串区域是否相等。参数 str 的子字符串与参数 other 的子字符串进行比较。
   *
   * <p>
   * 如果这些子字符串表示相同的字符序列，则结果为 true，当且仅当 ignoreCase 为 true 时忽略大小写。
   * 要比较的 str 的子串从索引 strOffset 开始，长度为 length。
   * 要比较的 other 的子串从索引 otherOffset 开始，长度为 length。
   * </p>
   *
   * 当且仅当以下至少一项为真时，结果为 false:
   * <ul>
   *  <li>strOffset 小于 0</li>
   *  <li>otherOffset 小于 0</li>
   *  <li>strOffset + length 大于 str.length</li>
   *  <li>otherOffset + length 大于 other.length</li>
   *  <li>
   *     ignoreCase 为 false 并且存在一些小于 length 的非负整数k使得：
   *     <p>str.charAt(strOffset + k) !== other.charAt(otherOffset + k)</p>
   *  </li>
   *  <li>
   *      ignoreCase 为 true 并且存在一些小于 length 非负整数k使得：
   *      <p>str.charAt(strOffset + k).toLowerCase() !== other.charAt(otherOffset + k).toLowerCase()</p>
   *      <p>和：</p>
   *      <p>str.charAt(strOffset + k).toUpperCase() !== other.charAt(otherOffset + k).toUpperCase()</p>
   *  </li>
   * </ul>
   *
   * @param str1 第一个字符串
   * @param str1Offset 第一个字符串中子区域的起始偏移量
   * @param str2 第二个字符串
   * @param str2Offset 第二个字符串中子区域的起始偏移量
   * @param length 要比较的字符数。
   * @param ignoreCase 如果为 true，则在比较字符时忽略大小写
   * @return {boolean} 如果此字符串的指定子区域与字符串参数的指定子区域匹配，则为 true；否则为 false。
   * 匹配是精确匹配还是不区分大小写取决于 ignoreCase 参数。
   */
  public static regionMatches(
    str1: string,
    str1Offset: number,
    str2: string,
    str2Offset: number,
    length: number,
    ignoreCase: boolean,
  ): boolean {
    const strArr = this.toChars(str1);
    let to = str1Offset;

    const otherArr = this.toChars(str2);
    let po = str2Offset;

    if (
      BooleanUtils.or(
        str1Offset < 0 || str2Offset < 0,
        str1Offset > strArr.length - length,
        str2Offset > otherArr.length - length,
      )
    ) {
      return false;
    }

    while (length-- > 0) {
      const c1 = strArr[to++];
      const c2 = otherArr[po++];
      if (c1 === c2) {
        continue;
      }
      if (ignoreCase) {
        const u1 = c1.toUpperCase();
        const u2 = c2.toUpperCase();
        if (u1 === u2) {
          continue;
        }
        if (u1.toLowerCase() === u2.toLowerCase()) {
          continue;
        }
      }
      return false;
    }
    return true;
  }

  /**
   * 下划线格式字符串转为小驼峰格式，如果字符串输入为 null 或 undefined 则返回 ""
   *
   * @param str 要转换的字符串
   * @return 转换后的字符串，如果输入字符串为 null 或 undefined 则返回 ""
   */
  public static underLineToCamelCase(str: string): string {
    if (this.isEmpty(str)) {
      return this.EMPTY;
    }
    const strArr = str.split('_');
    for (let i = 1; i < strArr.length; i++) {
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
    }
    return strArr.join('');
  }

  /**
   * 小驼峰格式字符串转下划线格式，如果字符串输入为 null 或 undefined 则返回 ""
   *
   * @param str 要转换的字符串
   * @return 转换后的字符串，如果输入字符串为 null 或 undefined 则返回 ""
   */
  public static camelCaseToUnderLine(str: string): string {
    if (this.isEmpty(str)) {
      return this.EMPTY;
    }

    const newStr = [];
    const indexArr = [0];
    for (let i = 1; i < str.length; i++) {
      if (StringUtils.isUpperCase(str[i])) {
        indexArr.push(i);
      }
    }
    indexArr.forEach((value, index) => {
      newStr.push(
        str.charAt(value).toLowerCase() +
          str.substring(value + 1, indexArr[index + 1]),
      );
    });
    return newStr.join('_');
  }

  private static compareStr(
    str1: string,
    str2: string,
    nullIsLess: boolean,
    ignoreCase: boolean,
  ): number {
    if (str1 === str2) {
      return 0;
    }
    if (ObjectUtils.isNull(str1)) {
      return nullIsLess ? -1 : 1;
    }
    if (ObjectUtils.isNull(str2)) {
      return nullIsLess ? 1 : -1;
    }

    const str1Len = str1.length;
    const str2Len = str2.length;
    const lim = Math.min(str1.length, str2.length);
    const char1Array = this.toChars(str1);
    const char2Array = this.toChars(str2);

    let k = 0;
    while (k < lim) {
      const char1 = ignoreCase ? char1Array[k].toUpperCase() : char1Array[k];
      const char2 = ignoreCase ? char2Array[k].toUpperCase() : char1Array[k];
      if (char1 !== char2) {
        return char1.charCodeAt(0) - char2.charCodeAt(0);
      }
      k++;
    }
    return str1Len - str2Len;
  }

  private static ordinalStrIndexOf(
    str: string,
    searchString: string,
    ordinal: number,
    lastIndex: boolean,
  ): number {
    if (ObjectUtils.anyNull(str, searchString) || ordinal <= 0) {
      return this.INDEX_NOT_FOUND;
    }
    if (searchString.length === 0) {
      return lastIndex ? str.length : 0;
    }
    let found = 0;
    let index = lastIndex ? str.length : this.INDEX_NOT_FOUND;
    do {
      if (lastIndex) {
        index = str.lastIndexOf(searchString, index - 1);
      } else {
        index = str.indexOf(searchString, index + 1);
      }
      if (index < 0) {
        return index;
      }
      found++;
    } while (found < ordinal);
    return index;
  }

  private static prependStrIfMissing(
    str: string,
    prefix: string,
    ignoreCase: boolean,
    ...prefixes: string[]
  ): string {
    if (
      ObjectUtils.isNull(str) ||
      this.isEmpty(prefix) ||
      this.startsWith(str, prefix, ignoreCase)
    ) {
      return str;
    }
    if (ArrayUtils.isNotEmpty(prefixes)) {
      for (const prefix of prefixes) {
        if (this.startsWith(str, prefix, ignoreCase)) {
          return str;
        }
      }
    }
    return prefix.toString() + str;
  }

  private static replaceStr(
    text: string,
    searchString: string,
    replacement: string,
    max: number,
    ignoreCase: boolean,
  ): string {
    if (
      this.isEmpty(text) ||
      this.isEmpty(searchString) ||
      ObjectUtils.isNull(replacement) ||
      max === 0
    ) {
      return text;
    }
    if (ignoreCase) {
      searchString = searchString.toLowerCase();
    }
    let start = 0;
    let end = ignoreCase
      ? this.indexOfIgnoreCase(text, searchString, start)
      : this.indexOf(text, searchString, start);
    if (end === this.INDEX_NOT_FOUND) {
      return text;
    }
    const replLength = searchString.length;
    const buf = [];
    while (end != this.INDEX_NOT_FOUND) {
      buf.push(text.substring(start, end), replacement);
      start = end + replLength;
      if (--max === 0) {
        break;
      }
      end = ignoreCase
        ? this.indexOfIgnoreCase(text, searchString, start)
        : this.indexOf(text, searchString, start);
    }
    buf.push(text.substring(start));
    return buf.join('');
  }

  private static splitByWholeSeparatorWorker(
    str: string,
    separator: string,
    max: number,
    preserveAllTokens: boolean,
  ): string[] {
    if (ObjectUtils.isNull(str)) {
      return null;
    }

    const len = str.length;

    if (len === 0) {
      return [];
    }

    if (this.isEmpty(separator)) {
      return this.splitWorker(str, null, max, preserveAllTokens);
    }

    const separatorLength = separator.length;

    const substrings = [];
    let numberOfSubstrings = 0;
    let beg = 0;
    let end = 0;
    while (end < len) {
      end = str.indexOf(separator, beg);

      if (end > -1) {
        if (end > beg) {
          numberOfSubstrings += 1;

          if (numberOfSubstrings === max) {
            end = len;
            substrings.push(str.substring(beg));
          } else {
            substrings.push(str.substring(beg, end));
            beg = end + separatorLength;
          }
        } else {
          if (preserveAllTokens) {
            numberOfSubstrings += 1;
            if (numberOfSubstrings === max) {
              end = len;
              substrings.push(str.substring(beg));
            } else {
              substrings.push(this.EMPTY);
            }
          }
          beg = end + separatorLength;
        }
      } else {
        substrings.push(str.substring(beg));
        end = len;
      }
    }
    return substrings;
  }

  private static splitWorker(
    str: string,
    separatorChars,
    max: number,
    preserveAllTokens: boolean,
  ): string[] {
    if (ObjectUtils.isNull(str)) {
      return null;
    }
    const len = str.length;
    if (len === 0) {
      return [];
    }
    const list = [];
    let sizePlus1 = 1;
    let i = 0;
    let start = 0;
    let match = false;
    let lastMatch = false;
    if (ObjectUtils.isNull(separatorChars)) {
      while (i < len) {
        if (this.isWhitespace(str.charAt(i))) {
          if (match || preserveAllTokens) {
            lastMatch = true;
            if (sizePlus1++ === max) {
              i = len;
              lastMatch = false;
            }
            list.push(str.substring(start, i));
            match = false;
          }
          start = ++i;
          continue;
        }
        lastMatch = false;
        match = true;
        i++;
      }
    } else if (separatorChars.length === 1) {
      const sep = separatorChars.charAt(0);
      while (i < len) {
        if (str.charAt(i) === sep) {
          if (match || preserveAllTokens) {
            lastMatch = true;
            if (sizePlus1++ === max) {
              i = len;
              lastMatch = false;
            }
            list.push(str.substring(start, i));
            match = false;
          }
          start = ++i;
          continue;
        }
        lastMatch = false;
        match = true;
        i++;
      }
    } else {
      while (i < len) {
        if (separatorChars.indexOf(str.charAt(i)) >= 0) {
          if (match || preserveAllTokens) {
            lastMatch = true;
            if (sizePlus1++ === max) {
              i = len;
              lastMatch = false;
            }
            list.push(str.substring(start, i));
            match = false;
          }
          start = ++i;
          continue;
        }
        lastMatch = false;
        match = true;
        i++;
      }
    }
    if (match || (preserveAllTokens && lastMatch)) {
      list.push(str.substring(start, i));
    }
    return list;
  }
}
