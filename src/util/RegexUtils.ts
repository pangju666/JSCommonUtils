import { ObjectUtils } from "./ObjectUtils";
import { StringUtils } from "./StringUtils";

/**
 * 正则表达式工具类
 *
 * @category 工具类
 * @author 胖橘
 * @version 1.0
 */
export class RegexUtils {
  /**
   * 大写字母
   * @category 正则表达式
   */
  public static readonly UPPERCASE = "[A-Z]+";
  /**
   * 小写字母
   * @category 正则表达式
   */
  public static readonly LOWERCASE = "[a-z]+";
  /**
   * 字母
   * @category 正则表达式
   */
  public static readonly LETTER = "[a-zA-Z]+";
  /**
   * 中文
   * @category 正则表达式
   */
  public static readonly CHINESE = "[\u4e00-\u9fa5]+";
  /**
   * 数字
   * @category 正则表达式
   */
  public static readonly NUMBER = "^-?(\\d+\\.)?\\d+$";
  /**
   * 正数
   * @category 正则表达式
   */
  public static readonly POSITIVE_NUMBER = "^(\\d+\\.)?\\d+$";
  /**
   * 负数
   * @category 正则表达式
   */
  public static readonly NEGATIVE_NUMBER = "^-(\\d+\\.)?\\d+$";
  /**
   * 十进制，不匹配空白
   * @category 正则表达式
   */
  public static readonly DECIMAL = "\\d+";
  /**
   * 十六进制，不匹配空白
   * @category 正则表达式
   */
  public static readonly HEXADECIMAL = "(0[xX])?[a-fA-F0-9]+";
  /**
   * 八进制，不匹配空白
   * @category 正则表达式
   */
  public static readonly OCTAL = "(o|O)(0-7)+";
  /**
   * 二进制，不匹配空白
   * @category 正则表达式
   */
  public static readonly BINARY = "(0|1)+";
  /**
   * 整数，不匹配空白
   * @category 正则表达式
   */
  public static readonly INTEGER = "-?\\d+";
  /**
   * 正整数，不匹配空白
   * @category 正则表达式
   */
  public static readonly POSITIVE_INTEGER = "\\d+";
  /**
   * 负整数，不匹配空白
   * @category 正则表达式
   */
  public static readonly NEGATIVE_INTEGER = "-\\d+";
  /**
   * 浮点数，不匹配空白
   * @category 正则表达式
   */
  public static readonly FLOAT = "-?\\d+\\.\\d+";
  /**
   * 正浮点数，不匹配空白
   * @category 正则表达式
   */
  public static readonly POSITIVE_FLOAT = "\\d+\\.\\d+";
  /**
   * 负浮点数，不匹配空白
   * @category 正则表达式
   */
  public static readonly NEGATIVE_FLOAT = "-\\d+\\.\\d+";

  /**
   * 电话
   * @category 正则表达式
   */
  public static readonly PHONE_NUMBER =
    /^(13[0-9]|14[0-1,4-9]|15[0-3,5-9]|16[2,5-7]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
  /**
   * 身份证号码
   * @category 正则表达式
   */
  public static readonly ID_CARD = /\d{17}([0-9]|X|x)/;
  /**
   * QQ号码
   * @category 正则表达式
   */
  public static readonly QQ_NUMBER = /[1-9][0-9]{4,}/;
  /**
   * 微信号码
   * @category 正则表达式
   */
  public static readonly WECHAT_NUMBER = /[a-zA-Z][-\d]{6,}/;
  /**
   * 中国邮政编码
   * @category 正则表达式
   */
  public static readonly POSTAL_CODE = /[1-9]\d{5}(?!\d)/;
  /**
   * 电子邮箱, @前可存在中文
   * @category 正则表达式
   */
  public static readonly EMAIL =
    /[\u4e00-\u9fa5\w!#$%&'*+/=?^_`{|}~-]+(\.[\u4e00-\u9fa5\w!#$%&'*+/=?^_`{|}~-]+)*@([\w]([\w-]*[\w])?\.)+[\w]([\w-]*[\w])?/;
  /**
   * URL
   * @category 正则表达式
   */
  public static readonly URL =
    /[a-zA-Z]+:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]+/;
  /**
   * HTTP
   * @category 正则表达式
   */
  public static readonly HTTP =
    /(HTTP|http)[sS]?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]+/;
  /**
   * FTP
   * @category 正则表达式
   */
  public static readonly FTP =
    /(FTP|ftp)[sS]?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]+/;
  /**
   * FILE
   * @category 正则表达式
   */
  public static readonly FILE =
    /(FILE|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]+/;
  /**
   * IPV4地址
   * @category 正则表达式
   */
  public static readonly IPV4_ADDRESS = /(\d{1,3}\.){3}\d{1,3}/;
  /**
   * IPV6地址
   * @category 正则表达式
   */
  public static readonly IPV6_ADDRESS =
    /((([a-fA-F\d]{1,4}:){5,7}[a-fA-F\d]{1,4})|(::[a-fA-F\d]{1,4}))(\/128)?/;
  /**
   * 日期，YYYY-MM-DD格式
   * @category 正则表达式
   */
  public static readonly DATE =
    /^((\d{2}(([02468][048])|([13579][26]))[-/\s]?((((0?[13578])|(1[02]))[-/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[-/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[-/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[-/\s]?((((0?[13578])|(1[02]))[-/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[-/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[-/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[0-9])|([1-2][0-3])):([0-5]?[0-9])((\s)|(:([0-5]?[0-9])))))?$/;
  /**
   * 时间：HH:mm:SS
   * @category 正则表达式
   */
  public static readonly TIME = /\d{1,2}:\d{1,2}:\d{1,2}/;
  /**
   * 用户名,中文、数字、字母和下划线组成
   * @category 正则表达式
   */
  public static readonly USER_NAME = /[a-zA-Z0-9_\u4e00-\u9fa5]+/;
  /**
   * 弱密码, 仅由数字或字母组成
   * @category 正则表达式
   */
  public static readonly WEAK_PASSWORD = /\d+|[a-zA-Z]+/;
  /**
   * 一般密码, 数字和字母或数字和特殊字符或字母和特殊字符组成
   * @category 正则表达式
   */
  public static readonly MID_PASSWORD =
    /([a-zA-z\d]+|[a-zA-z`~!@#$%^&*()_\-+={}[\];:'"|/?,<>\\]+|[\d`~!@#$%^&*()_\-+={}[\];:'"|/?,<>\\]+)/;
  /**
   * 强密码, 数字、字母和特殊字符组成
   * @category 正则表达式
   */
  public static readonly STRONG_PASSWORD =
    /[a-zA-z\d`~!@#$%^&*()_\-+={}[\];:'"|/?,<>\\]+/;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
     * <p>删除与给定正则表达式模式匹配的文本字符串的每个子字符串。</p>
     *
     *
     * <p>传递给此方法的 null 或 undefined 是无操作的。</p>
     *
     * <pre>
     * RegexUtils.removeAll(null, *)      = null
     * RegexUtils.removeAll("any", (String) null)  = "any"
     * RegexUtils.removeAll("any", "")    = "any"
     * RegexUtils.removeAll("any", ".*")  = ""
     * RegexUtils.removeAll("any", ".+")  = ""
     * RegexUtils.removeAll("abc", ".?")  = ""
     * RegexUtils.removeAll("A<__>\n<__>B", "<.*>")      = "A\nB"
     * RegexUtils.removeAll("A<__>\n<__>B", "(?s)<.*>")  = "AB"
     * RegexUtils.removeAll("ABCabc123abc", "[a-z]")     = "ABC123"
     * </pre>
     *
     * @param text 要删除的文本，可能为 null 或 undefined
     * @param regex 此字符串要匹配的正则表达式
     * @return 处理任何删除的文本，如果为 null 或 undefined 字符串输入，则返回 null
     *
     * @see {@link RegexUtils#replaceAll}

     */
  public static removeAll(text: string, regex: string | RegExp): string {
    return this.replaceAll(text, regex, StringUtils.EMPTY);
  }

  /**
     * <p>删除与给定正则表达式模式匹配的文本字符串的第一个子字符串。</p>
     *
     * 这个方法是一个 null 和 undefined 安全的。
     *
     * <p>传递给此方法的 null 或 undefined 是无操作的。</p>
     *
     * <pre>
     * StringUtils.removeFirst(null, *)      = null
     * StringUtils.removeFirst("any", (String) null)  = "any"
     * StringUtils.removeFirst("any", "")    = "any"
     * StringUtils.removeFirst("any", ".*")  = ""
     * StringUtils.removeFirst("any", ".+")  = ""
     * StringUtils.removeFirst("abc", ".?")  = "bc"
     * StringUtils.removeFirst("A&lt;__&gt;\n&lt;__&gt;B", "&lt;.*&gt;")      = "A\n&lt;__&gt;B"
     * StringUtils.removeFirst("A&lt;__&gt;\n&lt;__&gt;B", "(?s)&lt;.*&gt;")  = "AB"
     * StringUtils.removeFirst("ABCabc123", "[a-z]")          = "ABCbc123"
     * StringUtils.removeFirst("ABCabc123abc", "[a-z]+")      = "ABC123abc"
     * </pre>
     *
     * @param text 要删除的文本，可能为 null 或 undefined
     * @param regex 此字符串要匹配的正则表达式
     * @return 处理第一个替换的文本，如果为 null 或 undefined 字符串输入，则返回 null
     *
     * @see {@link RegexUtils#replaceFirst}

     */
  public static removeFirst(text: string, regex: string | RegExp): string {
    return this.replaceFirst(text, regex, StringUtils.EMPTY);
  }

  /**
     * <p>使用 {@link RegExp#flags s} 选项删除与给定正则表达式匹配的源字符串的每个子字符串。</p>
     *
     * 这个方法是一个 null 和 undefined 安全的。
     *
     * <p>传递给此方法的 null 或 undefined 是无操作的。</p>
     *
     * <pre>
     * StringUtils.removePattern(null, *)       = null
     * StringUtils.removePattern("any", (String) null)   = "any"
     * StringUtils.removePattern("A&lt;__&gt;\n&lt;__&gt;B", "&lt;.*&gt;")  = "AB"
     * StringUtils.removePattern("ABCabc123", "[a-z]")    = "ABC123"
     * </pre>
     *
     * @param text 源字符串，可能为 null 或 undefined
     * @param regex 此字符串要匹配的正则表达式
     * @return {} 结果字符串，如果为 null 或 undefined 字符串输入，则返回 null

     */
  public static removePattern(text: string, regex: string | RegExp): string {
    return this.replacePattern(text, regex, StringUtils.EMPTY);
  }

  /**
     * <p>用给定的替换替换与给定正则表达式模式匹配的文本字符串的每个子字符串。</p>
     *
     * 这个方法是一个 null 和 undefined 安全的。
     *
     * <p>传递给此方法的 null 或 undefined 是无操作的。</p>
     *
     * <pre>
     * StringUtils.replaceAll(null, *, *)       = null
     * StringUtils.replaceAll("any", (String) null, *)   = "any"
     * StringUtils.replaceAll("any", *, null)   = "any"
     * StringUtils.replaceAll("", "", "zzz")    = "zzz"
     * StringUtils.replaceAll("", ".*", "zzz")  = "zzz"
     * StringUtils.replaceAll("", ".+", "zzz")  = ""
     * StringUtils.replaceAll("abc", "", "ZZ")  = "ZZaZZbZZcZZ"
     * StringUtils.replaceAll("&lt;__&gt;\n&lt;__&gt;", "&lt;.*&gt;", "z")      = "z\nz"
     * StringUtils.replaceAll("&lt;__&gt;\n&lt;__&gt;", "(?s)&lt;.*&gt;", "z")  = "z"
     * StringUtils.replaceAll("ABCabc123", "[a-z]", "_")       = "ABC___123"
     * StringUtils.replaceAll("ABCabc123", "[^A-Z0-9]+", "_")  = "ABC_123"
     * StringUtils.replaceAll("ABCabc123", "[^A-Z0-9]+", "")   = "ABC123"
     * StringUtils.replaceAll("Lorem ipsum  dolor   sit", "( +)([a-z]+)", "_$2")  = "Lorem_ipsum_dolor_sit"
     * </pre>
     *
     * @param text 要搜索和替换的文本，可能为 null 或 undefined
     * @param regex 此字符串要匹配的正则表达式
     * @param replacement 每个匹配项要替换的字符串
     * @return 处理任何替换的文本，如果为 null 或 undefined 字符串输入，则返回 null

     */
  public static replaceAll(
    text: string,
    regex: string | RegExp,
    replacement: string
  ): string {
    if (ObjectUtils.anyNull(text, regex, replacement)) {
      return text;
    }
    return text.replaceAll(new RegExp(regex), replacement);
  }

  /**
     * <p>用给定的替换替换与给定正则表达式模式匹配的文本字符串的第一个子字符串。</p>
     *
     * 这个方法是一个 null 和 undefined 安全的。
     *
     * <p>传递给此方法的 null 或 undefined 是无操作的。</p>
     *
     * <pre>
     * StringUtils.replaceFirst(null, *, *)       = null
     * StringUtils.replaceFirst("any", (String) null, *)   = "any"
     * StringUtils.replaceFirst("any", *, null)   = "any"
     * StringUtils.replaceFirst("", "", "zzz")    = "zzz"
     * StringUtils.replaceFirst("", ".*", "zzz")  = "zzz"
     * StringUtils.replaceFirst("", ".+", "zzz")  = ""
     * StringUtils.replaceFirst("abc", "", "ZZ")  = "ZZabc"
     * StringUtils.replaceFirst("&lt;__&gt;\n&lt;__&gt;", "&lt;.*&gt;", "z")      = "z\n&lt;__&gt;"
     * StringUtils.replaceFirst("&lt;__&gt;\n&lt;__&gt;", "(?s)&lt;.*&gt;", "z")  = "z"
     * StringUtils.replaceFirst("ABCabc123", "[a-z]", "_")          = "ABC_bc123"
     * StringUtils.replaceFirst("ABCabc123abc", "[^A-Z0-9]+", "_")  = "ABC_123abc"
     * StringUtils.replaceFirst("ABCabc123abc", "[^A-Z0-9]+", "")   = "ABC123abc"
     * StringUtils.replaceFirst("Lorem ipsum  dolor   sit", "( +)([a-z]+)", "_$2")  = "Lorem_ipsum  dolor   sit"
     * </pre>
     *
     * @param text 要搜索和替换的文本，可能为 null 或 undefined
     * @param regex 此字符串要匹配的正则表达式
     * @param replacement 要替换第一个匹配项的字符串
     * @return 处理第一个替换的文本，如果为 null 或 undefined 字符串输入，则返回 null

     */
  public static replaceFirst(
    text: string,
    regex: string | RegExp,
    replacement: string
  ): string {
    if (ObjectUtils.anyNull(text, regex, replacement)) {
      return text;
    }
    return text.replace(new RegExp(regex), replacement);
  }

  /**
     * <p>使用 {@link RegExp#flags s} 选项删除与给定正则表达式匹配的源字符串的每个子字符串。</p>
     *
     * 这个方法是一个 null 和 undefined 安全的。
     *
     * <p>传递给此方法的 null 或 undefined 是无操作的。</p>
     *
     * <pre>
     * StringUtils.removePattern(null, *)       = null
     * StringUtils.removePattern("any", (String) null)   = "any"
     * StringUtils.removePattern("A&lt;__&gt;\n&lt;__&gt;B", "&lt;.*&gt;")  = "AB"
     * StringUtils.removePattern("ABCabc123", "[a-z]")    = "ABC123"
     * </pre>
     *
     * @param text 源字符串
     * @param regex 此字符串要匹配的正则表达式
     * @param replacement 每个匹配项要替换的字符串
     * @return {} 结果字符串，如果为 null 或 undefined 字符串输入，则返回 null

     */
  public static replacePattern(
    text: string,
    regex: string | RegExp,
    replacement: string
  ): string {
    if (ObjectUtils.anyNull(text, regex, replacement)) {
      return text;
    }
    return text.replaceAll(new RegExp(regex, "s"), replacement);
  }
}
