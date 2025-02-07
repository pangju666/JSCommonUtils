import { format } from 'date-fns';
import { ObjectUtils } from './ObjectUtils';
import { StringUtils } from './StringUtils';
import { FormatOptions } from 'date-fns/format';

/**
 * 日期格式化工具类
 *
 * @category 工具类
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class DateFormatUtils {
  /**
   * 日期 + 时间
   * @category 日期格式
   */
  public static readonly DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
  /**
   * 日期 + 时间 + 时区
   * @category 日期格式
   */
  public static readonly DATE_TIME_TIME_ZONE_FORMAT = 'yyyy-MM-dd HH:mm:ssZZ';
  /**
   * 日期
   * @category 日期格式
   */
  public static readonly DATE_FORMAT = 'yyyy-MM-dd';
  /**
   * 日期 + 时区
   * @category 日期格式
   */
  public static readonly DATE_TIME_ZONE_FORMAT = 'yyyy-MM-ddZZ';
  /**
   * 时间
   * @category 日期格式
   */
  public static readonly TIME_FORMAT = 'HH:mm:ss';

  /**
   * <p>将{@link Date 日期}或{@link number 时间戳}格式化为特定模式。</p>
   *
   * options 配置，含义如下：
   * <ul>
   *     <li>
   *     名称：locale（可选, 默认值：系统默认语言环境对象） <br />
   *     类型：<a href="https://date-fns.org/v2.28.0/docs/Locale">Locale</a>
   *    描述：语言环境对象。
   *    </li>
   *     <li>
   *     名称：weekStartsOn(可选, 默认值：0) <br />
   *     类型：Number（0 | 1 | 2 | 3 | 4 | 5 | 6）<br />
   *     描述：一周第一天的索引（0 为 星期日）
   *    </li>
   *    <li>
   *     名称：firstWeekContainsDate(可选, 默认值：1) <br />
   *     类型：Number（1 | 2 | 3 | 4 | 5 | 6 | 7）<br />
   *     描述：一月的那一天，总是在一年的第一周。
   *    </li>
   *     <li>
   *     名称：useAdditionalWeekYearTokens(可选, 默认值：false) <br />
   *     类型：Boolean <br />
   *     描述：如果为 true，则允许使用周编号年份标记 YY 和 YYYY；参阅：<a href="https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md">https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md</a>
   *    </li>
   *     <li>
   *     名称：useAdditionalDayOfYearTokens(可选, 默认值：false) <br />
   *     类型：Boolean <br />
   *     描述：如果为真，则允许使用年份令牌 D 和 DD；参阅：<a href="https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md">https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md</a>
   *    </li>
   * </ul>
   *
   * @param date 要格式化的日期（{@link Date}）或时间戳，不能为 null 或 undefined
   * @param formatStr 用于格式化日期的表达式，不能为空字符串、null 或 undefined，默认为{@link DateFormatUtils.DATE_FORMAT}
   * @param options 格式化配置
   * @returns {} 格式化后的日期字符串，如果date 或 formatStr 为 null、undefined 则返回 ""
   * @see https://date-fns.org/v2.28.0/docs/format
   */
  public static format(
    date: number | Date,
    formatStr = DateFormatUtils.DATE_FORMAT,
    options?: FormatOptions,
  ): string {
    if (ObjectUtils.anyNull(date, formatStr) || StringUtils.isEmpty(formatStr)) {
      return '';
    }
    return format(date, formatStr, options);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
}
