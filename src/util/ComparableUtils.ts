import { ObjectUtils } from './ObjectUtils';
import { Comparator, Predicate } from '../type/FunctionAlias';

/**
 * 比较工具类
 *
 * @category 工具类
 * @author 胖橘
 * @version 1.0
 * @since 2.0
 */
export class ComparableUtils {
  /**
   * 检查 [b <= a <= c] 或 [b >= a >= c] 其中 a 是测试对象。
   *
   * @param b 与测试对象进行比较的对象
   * @param c 与测试对象进行比较的对象
   * @param compareTo 比较规则
   * @returns 如果测试对象在 b 和 c 之间，则为 true 的谓词
   */
  public static between<T>(b: T, c: T, compareTo: Comparator<T>): Predicate<T> {
    return (a) =>
      this.betweenOrdered(a, b, c, compareTo) ||
      this.betweenOrdered(a, c, b, compareTo);
  }

  /**
   * 检查是否 (b < a < c) 或 (b > a > c) 其中 a 是测试对象。
   *
   * @param b 与测试对象进行比较的对象
   * @param c 与测试对象进行比较的对象
   * @param compareTo 比较规则
   * @returns 如果测试对象在 b 和 c 之间并且不等于那些，则为 true 的谓词
   */
  public static betweenExclusive<T>(
    b: T,
    c: T,
    compareTo: Comparator<T>,
  ): Predicate<T> {
    return (a) =>
      this.betweenOrderedExclusive(a, b, c, compareTo) ||
      this.betweenOrderedExclusive(a, c, b, compareTo);
  }

  /**
   * 检查是否 a == b 其中 a 是测试对象
   *
   * @param b 要与测试对象进行比较的对象
   * @param compareTo 比较规则
   * @returns 如果测试对象等于 b，则为 true 的谓词
   */
  public static eq<T>(b: T, compareTo: Comparator<T>): Predicate<T> {
    return (a) => ObjectUtils.compare(a, b, compareTo) === 0;
  }

  /**
   * 检查被测对象是否 > b
   *
   * @param b 与测试对象进行比较的对象
   * @param compareTo 比较规则
   * @returns 如果 {@link Comparator} 返回的值大于 0，则为 true 的谓词
   */
  public static gt<T>(b: T, compareTo: Comparator<T>): Predicate<T> {
    return (a) => this.greaterThan(a, b, compareTo);
  }

  /**
   * 检查被测对象是否 >= b
   *
   * @param b 与测试对象进行比较的对象
   * @param compareTo 比较规则
   * @returns 如果 {@link Comparator} 返回的值大于或等于 0，则为 true 的谓词
   */
  public static ge<T>(b: T, compareTo: Comparator<T>): Predicate<T> {
    return (a) => this.greaterThanOrEqualTo(a, b, compareTo);
  }

  /**
   * 检查被测对象是否 < b
   *
   * @param b 与测试对象进行比较的对象
   * @param compareTo 比较规则
   * @returns 如果 {@link Comparator} 返回的值小于 0，则为 true 的谓词
   */
  public static lt<T>(b: T, compareTo: Comparator<T>): Predicate<T> {
    return (a) => this.lessThan(a, b, compareTo);
  }

  /**
   * 检查被测对象是否 <= b
   *
   * @param b 与测试对象进行比较的对象
   * @param compareTo 比较规则
   * @returns 如果 {@link Comparator} 返回的值小于或等于 0，则为 true 的谓词
   */
  public static le<T>(b: T, compareTo: Comparator<T>): Predicate<T> {
    return (a) => this.lessThanOrEqualTo(a, b, compareTo);
  }

  private static betweenOrdered<T>(
    a: T,
    b: T,
    c: T,
    compareTo: Comparator<T>,
  ): boolean {
    return (
      this.greaterThanOrEqualTo(a, b, compareTo) &&
      this.lessThanOrEqualTo(a, c, compareTo)
    );
  }

  private static betweenOrderedExclusive<T>(
    a: T,
    b: T,
    c: T,
    compareTo: Comparator<T>,
  ): boolean {
    return this.greaterThan(a, b, compareTo) && this.lessThan(a, c, compareTo);
  }

  private static greaterThan<T>(a: T, b: T, compareTo: Comparator<T>): boolean {
    return ObjectUtils.compare(a, b, compareTo) > 0;
  }

  private static greaterThanOrEqualTo<T>(
    a: T,
    b: T,
    compareTo: Comparator<T>,
  ): boolean {
    return ObjectUtils.compare(a, b, compareTo) >= 0;
  }

  private static lessThan<T>(a: T, b: T, compareTo: Comparator<T>): boolean {
    return ObjectUtils.compare(a, b, compareTo) < 0;
  }

  private static lessThanOrEqualTo<T>(
    a: T,
    b: T,
    compareTo: Comparator<T>,
  ): boolean {
    return ObjectUtils.compare(a, b, compareTo) <= 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
}
