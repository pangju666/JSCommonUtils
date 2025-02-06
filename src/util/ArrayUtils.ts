import { ObjectUtils } from './ObjectUtils';
import {
  IllegalArgumentError,
  IndexOutOfBoundsError,
} from '../error/runtimeError';
import { ArrayPredicate, Comparator, ToString } from '../type/FunctionAlias';
import { RandomUtils } from './RandomUtils';

/**
 * 数组工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class ArrayUtils {
  /**
   * 未找到时的索引（-1）
   */
  public static readonly INDEX_NOT_FOUND = -1;

  /**
   * 填充数组，根据参数创建指定长度的数组，并指定指定的值进行填充
   *
   * @param value 要填充的值
   * @param length 数组长度
   * @return {} 填充后的数组
   * @throws {IllegalArgumentError} 数组长度小于 0、 null 或 undefined 时抛出
   */
  public static fill<T>(value: T, length: number): T[] {
    if (ObjectUtils.isNull(length) || length <= 0) {
      throw new IllegalArgumentError('数组长度必须大于0');
    }

    const array = new Array(length);
    for (let i = 0; i < length; i++) {
      array[i] = value;
    }
    return array;
  }

  /**
   * <p>复制给定数组并将给定元素添加到新数组的末尾。</p>
   *
   * <p>新数组包含输入数组的相同元素加上最后位置的给定元素。</p>
   *
   * <p>如果输入数组为 null 或 undefined，则返回一个新的元素数组</p>
   *
   * <pre>
   * ArrayUtils.add(null, null)      = IllegalArgumentException
   * ArrayUtils.add(null, "a")       = ["a"]
   * ArrayUtils.add(["a"], null)     = ["a", null]
   * ArrayUtils.add(["a"], "b")      = ["a", "b"]
   * ArrayUtils.add(["a", "b"], "c") = ["a", "b", "c"]
   * </pre>
   *
   * @param array 将元素添加到的数组，可能是 null 或 undefined
   * @param element 要添加的元素，可能是 null 或 undefined
   * @return {} 包含现有元素和新元素的新数组
   * 如果两者都为 null 或 undefined，则抛出{@link IllegalArgumentError}
   * @throws {IllegalArgumentError} 如果两个参数都为 null 或 undefined
   */
  public static add<T>(array: T[], element: T): T[] {
    if (ObjectUtils.isNull(array)) {
      if (ObjectUtils.isNull(element)) {
        throw new IllegalArgumentError('参数不能同时为 null 或 undefined');
      }
      return [element];
    }
    const newArray = [...array];
    newArray[newArray.length - 1] = element;
    return newArray;
  }

  /**
   * <p>将给定数组的所有元素添加到一个新数组中。
   * <p>新数组包含 array1 的所有元素，后跟所有元素 array2。
   * 当返回一个数组时，它始终是一个新数组。
   *
   * <pre>
   * ArrayUtils.addAll(null, null)     = null
   * ArrayUtils.addAll(array1, null)   = cloned copy of array1
   * ArrayUtils.addAll(null, array2)   = cloned copy of array2
   * ArrayUtils.addAll([], [])         = []
   * ArrayUtils.addAll([null], [null]) = [null, null]
   * ArrayUtils.addAll(["a", "b", "c"], ["1", "2", "3"]) = ["a", "b", "c", "1", "2", "3"]
   * </pre>
   *
   * @param array1 其元素添加到新数组的第一个数组可能是 null 或 undefined
   * @param array2 其元素添加到新数组的第二个数组可能是 null 或 undefined
   * @return 如果两个数组都是 null 或 undefined，新数组则为 null。
   */
  public static addAll<T>(array1: T[], ...array2: T[]): T[] {
    if (ObjectUtils.isNull(array1)) {
      return this.clone(array2);
    }
    if (ObjectUtils.isNull(array2)) {
      return this.clone(array1);
    }
    return [...array1, ...array2];
  }

  /**
   * 复制给定数组并将给定元素添加到新数组的开头。
   *
   * <p>新数组包含输入数组的相同元素以及第一个位置的给定元素。</p>
   *
   * <p>
   * 如果输入数组为 null 或 undefined，则返回一个新的元素数组
   * </p>
   *
   * <pre>
   * ArrayUtils.addFirst(null, null)      = IllegalArgumentException
   * ArrayUtils.addFirst(null, "a")       = ["a"]
   * ArrayUtils.addFirst(["a"], null)     = [null, "a"]
   * ArrayUtils.addFirst(["a"], "b")      = ["b", "a"]
   * ArrayUtils.addFirst(["a", "b"], "c") = ["c", "a", "b"]
   * </pre>
   *
   * @param array 将元素添加到的数组，可能是 null 或 undefined
   * @param element 要添加的元素，可能是 null 或 undefined
   * @return 包含现有元素和新元素的新数组，返回的数组类型将是输入数组的类型（除非为 null 或 undefined）。
   * 如果两者都为 null 或 undefined，则抛出{@link IllegalArgumentError}
   * @throws {IllegalArgumentError} 如果两个参数都为 null 或 undefined
   */
  public static addFirst<T>(array: T[], element: T): T[] {
    return ObjectUtils.isNull(array)
      ? this.add(array, element)
      : this.insert(0, array, element);
  }

  /**
   * <p>浅层克隆，并处理 null 或 undefined 的数组。
   *
   * <p>数组中的元素没有被克隆，因此对多维数组没有特殊处理。
   *
   * <p>此方法对 null 或 undefined 输入数组返回 null。
   *
   * @param array 要浅克隆的数组，可能是 null 或 undefined
   * @return 克隆的数组，null 如果 null 或 undefined 输入
   */
  public static clone<T>(array: T[]): T[] {
    if (ObjectUtils.isNull(array)) {
      return null;
    }
    return [...array];
  }

  /**
   * <p>深层克隆，并处理 null 或 undefined 的数组。
   *
   * <p>数组中的元素会被克隆，因此对多维数组有特殊处理。
   *
   * <p>此方法对 null 或 undefined 输入数组返回 null。
   *
   * @param array 要深克隆的数组，可能是 null 或 undefined
   * @return 深克隆的数组，null 如果 null 或 undefined 输入
   */
  public static deepClone<T>(array: T[]): T[] {
    if (ObjectUtils.isNull(array)) {
      return null;
    }
    return array.map((item) => ObjectUtils.deepClone(item) as T);
  }

  /**
   * <p>检查指定元素或符合提供的 {@link ArrayPredicate} 执行结果的元素是否在给定的数组中。
   *
   * <p>如果传入 null 或 undefined 数组，则该方法返回 false。
   *
   * @param array 要搜索的数组
   * @param search 要搜索的元素或谓词（{@link ArrayPredicate}），函数数组必须使用谓词方式
   * @return 如果数组包含元素则返回 true
   */
  public static contains<T>(
    array: T[],
    search: ArrayPredicate<T> | T,
  ): boolean {
    return this.indexOf(array, search) !== -1;
  }

  /**
   * 如果索引超出范围，则获取数组的第 n 个元素或默认值。
   *
   * @param array 要索引的数组
   * @param index 索引
   * @param defaultValue 给定索引超出范围的返回值
   * @return 如果索引超出范围，则为数组的第 n 个元素或默认值。
   */
  public static get<T>(array: T[], index: number, defaultValue = null): T {
    return this.isArrayIndexValid(array, index) ? array[index] : defaultValue;
  }

  /**
   * <p>返回指定数组的长度。
   *
   * <p>如果输入数组为 null 或 undefined，则返回 0。
   *
   * <pre>
   * ArrayUtils.getLength(null)            = 0
   * ArrayUtils.getLength([])              = 0
   * ArrayUtils.getLength([null])          = 1
   * ArrayUtils.getLength([true, false])   = 2
   * ArrayUtils.getLength([1, 2, 3])       = 3
   * ArrayUtils.getLength(["a", "b", "c"]) = 3
   * </pre>
   *
   * @param array 要从中检索长度的数组，可能为 null 或 undefined
   * @return 数组的长度，如果数组是 null，则为 0
   */
  public static getLength<T>(array: T[]): number {
    if (ObjectUtils.isNull(array)) {
      return 0;
    }
    if (!Array.isArray(array)) {
      return 0;
    }
    return array.length;
  }

  /**
   * 从给定索引开始查找数组中给定值或符合提供的 {@link ArrayPredicate} 执行结果的元素的索引。
   *
   * <p>此方法为 null 或 undefined 输入数组时，返回一个空的数组。</p>
   *
   * <p>负的 startIndex 被视为零。大于数组长度的 startIndex 将返回一个空的数组</p>
   *
   * @param array 要搜索元素的数组，可能是 null 或 undefined
   * @param search 要搜索的元素或谓词（{@link ArrayPredicate}），函数数组必须使用谓词方式
   * @param startIndex 开始搜索的索引
   * @return 数组中值的所有索引的数组，如果未找到或输入为 null、undefined 数组则返回空数组
   */
  public static indexesOf<T>(
    array: T[],
    search: ArrayPredicate<T> | T,
    startIndex = 0,
  ): number[] {
    const indexes = [];

    if (ObjectUtils.isNull(array)) {
      return indexes;
    }

    if (typeof search === 'function') {
      const predicate = search as ArrayPredicate<T>;
      for (let i = 0; i < array.length; i++) {
        if (i >= startIndex && predicate(array[i], i, array)) {
          indexes.push(i);
        }
      }
      return indexes;
    }

    let index = startIndex;
    while (index < array.length) {
      index = this.indexOf(array, search, index);

      if (index === this.INDEX_NOT_FOUND) {
        break;
      }

      indexes.push(index);
      ++startIndex;
    }
    return indexes;
  }

  /**
   * <p>从给定索引开始查找数组中给定值或符合提供的 {@link ArrayPredicate} 执行结果的元素的索引。
   *
   * <p>此方法为 null 或 undefined 输入数组返回 {@link INDEX_NOT_FOUND}。
   *
   * <p>负的 startIndex 被视为 0。大于数组长度的 startIndex 将返回 {@link INDEX_NOT_FOUND}。
   *
   * @param array 要搜索元素的数组，可能是 null 或 undefined
   * @param search 要搜索的元素或谓词（{@link ArrayPredicate}），函数数组必须使用谓词方式
   * @param startIndex 开始搜索的索引
   * @return 数组中值的索引，如果未找到或 null、undefined 数组输入则为 {@link INDEX_NOT_FOUND}
   */
  public static indexOf<T>(
    array: T[],
    search: ArrayPredicate<T> | T,
    startIndex = 0,
  ): number {
    if (ObjectUtils.isNull(array)) {
      return this.INDEX_NOT_FOUND;
    }

    if (startIndex < 0) {
      startIndex = 0;
    }

    if (typeof search === 'function') {
      for (let i = 0; i < array.length; i++) {
        const predicate = search as ArrayPredicate<T>;
        if (i >= startIndex && predicate(array[i], i, array)) {
          return i;
        }
      }
      return this.INDEX_NOT_FOUND;
    } else {
      return array.indexOf(search as T, startIndex);
    }
  }

  /**
   * <p>将元素插入到给定索引处的数组中（从 0 开始）。</p>
   *
   * <p>当返回一个数组时，它始终是一个新数组。</p>
   *
   * <pre>
   * ArrayUtils.insert(index, null, null)      = null
   * ArrayUtils.insert(index, array, null)     = cloned copy of 'array'
   * ArrayUtils.insert(index, null, values)    = null
   * </pre>
   *
   * @param index array 中插入新值的位置
   * @param array 插入值的数组，可能是 null 或 undefined
   * @param values 要插入的新值，可能是 null
   * @return {} 新数组
   * @throws {IndexOutOfBoundsError} 如果提供了 array 并且 index < 0 或 index > array.length
   */
  public static insert<T>(index: number, array: T[], ...values: T[]): T[] {
    if (ObjectUtils.isNull(array)) {
      return [];
    }
    if (this.isEmpty(values)) {
      return [...array];
    }
    if (index < 0 || index > array.length) {
      throw new IndexOutOfBoundsError(
        '索引: ' + index + ', 长度: ' + array.length,
      );
    }

    const newArray = [];
    for (let i = 0; index < array.length; i++) {
      newArray.push(array[i]);
      if (i === index) {
        newArray.push(...values);
      }
    }
    return newArray;
  }

  /**
   * 返回是否可以在给定索引处安全地访问给定数组。
   *
   * <pre>
   * ArrayUtils.isArrayIndexValid(null, 0)       = false
   * ArrayUtils.isArrayIndexValid([], 0)         = false
   * ArrayUtils.isArrayIndexValid(["a"], 0)      = true
   * </pre>
   *
   * @param array 要检查的数组，可能为 null 或 undefined
   * @param index 要检查的数组的索引
   * @return {} 给定的索引在给定的数组中是否可以安全访问
   */
  public static isArrayIndexValid<T>(array: T[], index: number): boolean {
    return index >= 0 && this.getLength(array) > index;
  }

  /**
   * <p>检查数组是否为空、 null 或 undefined。
   *
   * @param array 要测试的数组
   * @return true 如果数组为空、 null 或 undefined。
   */
  public static isEmpty<T>(array: T[]): boolean {
    return this.getLength(array) === 0;
  }

  /**
   * <p>检查数组是否不为空且不为 null 且不为 undefined
   *
   * @param array 要测试的数组
   * @return rue 如果数组不为空且不为 null 且不为 undefined。
   */
  public static isNotEmpty<T>(array: T[]): boolean {
    return !this.isEmpty(array);
  }

  /**
   * <p>检查两个数组的长度是否相同，将 null 或 undefined 数组视为长度 0。
   *
   * @param array1 第一个数组，可能是 null 或 undefined
   * @param array2 第二个数组，可能是 null 或 undefined
   * @return true 如果数组长度匹配，将 null 或 undefined 视为空数组
   */
  public static isSameLength<T>(array1: T[], array2: T[]): boolean {
    return this.getLength(array1) === this.getLength(array2);
  }

  /**
   * <p>此方法检查提供的数组是否根据提供的 {@link Comparator} 排序。
   *
   * @param array 要检查的数组
   * @param comparator 元素比较函数
   * @return {} 数组是否已排序
   */
  public static isSorted<T>(array: T[], comparator: Comparator<T>): boolean {
    if (ObjectUtils.isNull(comparator)) {
      throw new IllegalArgumentError(
        '元素比较函数不应该为 null 或 undefined。',
      );
    }

    if (ObjectUtils.isNull(array) || array.length < 2) {
      return true;
    }

    let previous = array[0];
    for (let i = 1; i < array.length; i++) {
      const current = array[i];
      if (comparator(previous, current) > 0) {
        return false;
      }

      previous = current;
    }
    return true;
  }

  /**
   * <p>从给定索引开始查找数组中给定值或符合提供的 {@link ArrayPredicate} 执行结果的元素的最后一个索引。
   *
   * <p>此方法为 null、undefined 输入数组返回 {@link INDEX_NOT_FOUND}。
   *
   * <p>负的 startIndex 将返回 {@link INDEX_NOT_FOUND}。大于数组长度的 startIndex 将从数组末尾开始搜索。
   *
   * @param array 要遍历以查找元素的数组，可能是 null 或 undefined
   * @param search 要搜索的元素或谓词（{@link ArrayPredicate}），函数数组必须使用谓词方式
   * @param startIndex 向后遍历的起始索引
   * @return 数组中值的最后一个索引，如果未找到或 null 、 undefined 数组输入，则返回{@link INDEX_NOT_FOUND}
   */
  public static lastIndexOf<T>(
    array: T[],
    search: ArrayPredicate<T> | T,
    startIndex = Number.MAX_SAFE_INTEGER,
  ): number {
    if (ObjectUtils.isNull(array)) {
      return this.INDEX_NOT_FOUND;
    }
    if (startIndex < 0) {
      return this.INDEX_NOT_FOUND;
    } else if (startIndex >= array.length) {
      startIndex = array.length - 1;
    }

    if (typeof search === 'function') {
      const predicate = search as ArrayPredicate<T>;
      for (let i = startIndex; i >= 0; i--) {
        if (predicate(array[i], i, array)) {
          return i;
        }
      }
      return this.INDEX_NOT_FOUND;
    }

    return array.lastIndexOf(search as T, startIndex);
  }

  /**
   * <p>如果输入数组为 null、undefined，则返回空数组
   *
   * @param array 要检查为null、undefined 或为空的数组
   * @return 相同的数组，如果 输入数组为 null、undefined 或空数组，则返回空数组
   */
  public static emptyIfNull<T>(array: T[]): T[] {
    if (this.isEmpty(array)) {
      return [];
    }
    return array;
  }

  /**
   * <p>从指定数组中移除指定位置的元素。所有后续元素都向左移动（从它们的索引中减去 1）。
   *
   * <p>此方法返回一个新数组，该数组与输入数组的元素相同，但指定位置的元素除外。
   *
   * <p>如果输入数组是 null 或 undefined，则会抛出{@link IndexOutOfBoundsError}，因为在这种情况下无法指定有效索引。
   *
   * <pre>
   * ArrayUtils.remove(["a"], 0)           = []
   * ArrayUtils.remove(["a", "b"], 0)      = ["b"]
   * ArrayUtils.remove(["a", "b"], 1)      = ["a"]
   * ArrayUtils.remove(["a", "b", "c"], 1) = ["a", "c"]
   * </pre>
   *
   * @param array 要从中删除元素的数组，不能是 null 或 undefined
   * @param index 要移除的元素的位置
   * @return {} 一个新数组，包含除指定位置的元素之外的现有元素。
   * @throws {IndexOutOfBoundsError} 如果索引超出范围（索引 < 0 || 索引 >= array.length），或者如果数组是 null 或 undefined。
   */
  public static remove<T>(array: T[], index: number): T[] {
    const length = this.getLength(array);
    if (index < 0 || index >= length) {
      throw new IndexOutOfBoundsError('索引: ' + index + ', 长度: ' + length);
    }

    const result = array.slice(index + 1);
    if (index < length - 1) {
      return result;
    }
    return Array.of(...array.slice(0, index - 1), ...result);
  }

  /**
   * <p>从指定数组中移除指定位置的元素。所有剩余的元素都向左移动。
   *
   * <p>此方法返回一个新数组，该数组与输入数组的元素相同，但指定位置的元素除外。
   *
   * <p>如果输入数组是 null 或 undefined，则会抛出{@link IndexOutOfBoundsError}，因为在这种情况下无法指定有效索引。
   *
   * <pre>
   * ArrayUtils.removeAll(["a", "b", "c"], 0, 2) = ["b"]
   * ArrayUtils.removeAll(["a", "b", "c"], 1, 2) = ["a"]
   * </pre>
   *
   * @param array 要从中删除元素的数组，不能为 null 或 undefined
   * @param indexes 要移除的元素的位置
   * @return {} 一个新数组，包含除指定位置之外的现有元素。
   * @throws {IndexOutOfBoundsError} 如果任何索引超出范围（索引 < 0 || 索引 >= array.length），或者数组为 null 或 undefined。
   */
  public static removeAll<T>(array: T[], ...indexes: number[]): T[] {
    const length = this.getLength(array);
    // 不同索引的数量，即将被删除的条目数
    let diff = 0;
    const clonedIndices = [...indexes].sort((a, b) => a - b);

    // 识别结果数组的长度
    if (this.isNotEmpty(clonedIndices)) {
      let i = clonedIndices.length;
      let prevIndex = length;
      while (--i >= 0) {
        const index = clonedIndices[i];
        if (index < 0 || index >= length) {
          throw new IndexOutOfBoundsError(
            '索引: ' + index + ', 长度: ' + length,
          );
        }
        if (index >= prevIndex) {
          continue;
        }
        diff++;
        prevIndex = index;
      }
    }

    // 创建结果数组
    const result = [];
    if (diff < length) {
      let end = length; // 最后一个副本之后的索引
      let dest = length - diff; // 到目前为止未复制的条目数
      for (let i = clonedIndices.length - 1; i >= 0; i--) {
        const index = clonedIndices[i];
        if (end - index > 1) {
          // 与 (cp > 0) 相同
          const cp = end - index - 1;
          dest -= cp;
          result.splice(index + 1, 0, ...array.slice(dest, dest + cp));
        }
        end = index;
      }
      if (end > 0) {
        return array.slice(0, end);
      }
    }
    return result;
  }

  /**
   * 从指定数组中删除指定元素的出现。
   *
   * <p>
   * 所有后续元素都向左移动（从它们的索引中减去 1）。
   * 如果数组不包含这样的元素，则不会从数组中删除任何元素。
   * 如果输入数组为 null 或 undefined，将返回 null。
   * </p>
   *
   * @param array 输入数组
   * @param search 要移除的元素或谓词（{@link ArrayPredicate}），函数数组必须使用谓词方式
   * @return {} 一个新数组，包含除指定元素的出现之外的现有元素。
   */
  public static removeAllOccurrences<T>(
    array: T[],
    search: ArrayPredicate<T> | T,
  ): T[] {
    return this.removeAll(array, ...this.indexesOf(array, search));
  }

  /**
   * <p>从指定数组中删除指定元素的第一个匹配项。所有后续元素都向左移动（从它们的索引中减去 1）。
   * 如果数组不包含这样的元素，则不会从数组中删除任何元素。
   * 从指定数组中删除指定元素的第一个匹配项。
   * 所有后续元素都向左移动（从它们的索引中减去 1）。
   * 如果数组不包含这样的元素，则不会从数组中删除任何元素。
   *
   * <p>此方法返回一个新数组，该数组具有与输入数组相同的元素，但指定元素的第一次出现除外。
   *
   * <pre>
   * ArrayUtils.removeElement(null, "a")            = null
   * ArrayUtils.removeElement([], "a")              = []
   * ArrayUtils.removeElement(["a"], "b")           = ["a"]
   * ArrayUtils.removeElement(["a", "b"], "a")      = ["b"]
   * ArrayUtils.removeElement(["a", "b", "a"], "a") = ["b", "a"]
   * </pre>
   *
   * @param array 要从中删除元素的数组，可能是 null 或 undefined
   * @param search 要移除的元素或谓词（{@link ArrayPredicate}），函数数组必须使用谓词方式
   * @return {} 一个新数组，包含除第一次出现的指定元素之外的现有元素。
   */
  public static removeElement<T>(
    array: T[],
    search: ArrayPredicate<T> | T,
  ): T[] {
    const index = this.indexOf(array, search);
    if (index === this.INDEX_NOT_FOUND) {
      return this.clone(array);
    }
    return this.remove(array, index);
  }

  /**
   * <p>从指定数组中删除指定数量的指定元素的出现。所有后续元素都向左移动。
   * 对于任何指定数量大于原始数组中包含的要删除的元素，除了删除现有匹配项之外不会发生任何更改。
   *
   * <p>此方法返回一个新数组，其中包含与输入数组相同的元素，但指定元素的最早出现次数除外。
   *
   * <pre>
   * ArrayUtils.removeElements(null, "a", "b")            = null
   * ArrayUtils.removeElements([], "a", "b")              = []
   * ArrayUtils.removeElements(["a"], "b", "c")           = ["a"]
   * ArrayUtils.removeElements(["a", "b"], "a", "c")      = ["b"]
   * ArrayUtils.removeElements(["a", "b", "a"], "a")      = ["b", "a"]
   * ArrayUtils.removeElements(["a", "b", "a"], "a", "a") = ["b"]
   * </pre>
   *
   * @param array 要从中删除元素的数组，可能是 null 或 undefined
   * @param elements 要移除的元素
   * @return {} 包含现有元素的新数组，但指定元素的最早出现次数除外。
   */
  public static removeElements<T>(array: T[], ...elements: T[]): T[] {
    if (this.isEmpty(array) || this.isEmpty(elements)) {
      return this.clone(array);
    }

    const occurrences = new Map<T, number>();
    for (const element of elements) {
      const count = ObjectUtils.defaultIfNull(occurrences.get(element), 0);
      occurrences.set(element, count + 1);
    }

    const toRemove = new Set<number>();
    for (let i = 0; i < array.length; i++) {
      const key = array[i];
      let count = occurrences.get(key);
      if (ObjectUtils.isNotNull(count)) {
        --count;
        if (count === 0) {
          occurrences.delete(key);
        } else {
          occurrences.set(key, count);
        }
        toRemove.add(i);
      }
    }

    return this.removeAll(array, ...Array.from(toRemove));
  }

  /**
   * <p>反转给定范围内给定数组的顺序。
   *
   * <p>此方法对 null 或 undefined 输入数组没有任何作用。
   *
   * @param array 要反转的数组，可能是 null 或 undefined
   * @param startIndexInclusive 起始索引。低于值 (<0) 提升为 0，高于值 (>array.length) 不会导致任何变化。
   * @param endIndexExclusive 直到 endIndex-1 的元素在数组中被反转。
   * 低于值（< 起始索引）不会导致任何变化。
   * 高于值 (>array.length) 降级为数组长度。
   */
  public static reverse<T>(
    array: T[],
    startIndexInclusive = 0,
    endIndexExclusive = array.length,
  ): void {
    if (ObjectUtils.isNull(array)) {
      return;
    }

    let i = Math.max(startIndexInclusive, 0);
    let j = Math.min(array.length, endIndexExclusive) - 1;
    while (j > i) {
      const tmp = array[j];
      array[j] = array[i];
      array[i] = tmp;
      j--;
      i++;
    }
  }

  /**
   * 移动给定数组中一系列元素的顺序。
   *
   * <p>多维数组没有特殊处理。此方法对 null、undefined 或空输入数组没有任何作用。</p>
   *
   * @param array 要移位的数组，可能是 null、undefined
   * @param offset 旋转元素的位置数。如果偏移量大于要旋转的元素数，则有效偏移量是要旋转的元素数的模数。
   */
  public static shift<T>(array: T[], offset: number): void;
  /**
   * 移动给定数组中一系列元素的顺序。
   *
   * <p>多维数组没有特殊处理。此方法对 null、undefined 或空输入数组没有任何作用。</p>
   *
   * @param array 要移位的数组，可能是 null、undefined
   * @param startIndexInclusive 起始索引。低值 (<0) 提升为 0，高值 (>array.length) 没有变化。
   * @param endIndexExclusive 直到 endIndex-1 的元素在数组中移动。低于值（< 起始索引）不会导致任何变化。高于值 (>array.length) 降级为数组长度。
   * @param offset 旋转元素的位置数。如果偏移量大于要旋转的元素数，则有效偏移量是要旋转的元素数的模数。
   */
  public static shift<T>(
    array: T[],
    startIndexInclusive: number,
    endIndexExclusive: number,
    offset: number,
  ): void;
  static shift<T>(
    array: T[],
    startIndexInclusive: number,
    endIndexExclusive?: number,
    offset?: number,
  ): void {
    if (endIndexExclusive === undefined && offset === undefined) {
      return this.shift(array, 0, array.length, offset);
    }

    if (ObjectUtils.isNull(array)) {
      return;
    }
    if (startIndexInclusive >= array.length - 1 || startIndexInclusive <= 0) {
      return;
    }

    if (startIndexInclusive < 0) {
      startIndexInclusive = 0;
    }
    if (endIndexExclusive >= array.length) {
      endIndexExclusive = array.length;
    }
    let n = endIndexExclusive - startIndexInclusive;
    if (n <= 1) {
      return;
    }
    offset %= n;
    if (offset < 0) {
      offset += n;
    }

    // 用于算法解释和 O(n) 时间复杂度和 O(1) 空间复杂度的证明
    // 参考 https://beradrian.wordpress.com/2015/04/07/shift-an-array-in-on-in-place/
    while (n > 1 && offset > 0) {
      const n_offset = n - offset;

      if (offset > n_offset) {
        this.swap(
          array,
          startIndexInclusive,
          startIndexInclusive + n - n_offset,
          n_offset,
        );
        n = offset;
        offset -= n_offset;
      } else if (offset < n_offset) {
        this.swap(
          array,
          startIndexInclusive,
          startIndexInclusive + n_offset,
          offset,
        );
        startIndexInclusive += offset;
        n = n_offset;
      } else {
        this.swap(
          array,
          startIndexInclusive,
          startIndexInclusive + n_offset,
          offset,
        );
        break;
      }
    }
  }

  /**
   * 使用 Fisher-Yates 算法随机排列指定数组的元素。
   *
   * @param array 要洗牌的数组
   * @see <a href="https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle">Fisher-Yates 洗牌算法</a>
   */
  public static shuffle<T>(array: T[]): void {
    for (let i = array.length; i > 1; i--) {
      this.swap(array, i - 1, RandomUtils.nextInt(i), 1);
    }
  }

  /**
   * <p>生成一个新数组，其中包含开始索引和结束索引之间的元素。
   *
   * <p>起始索引包含在内，结束索引不包含。数组为 null 或 undefined 输出为 null。
   *
   * @param array 数组
   * @param startIndexInclusive 起始索引。低于值 (<0) 提升为 0，高于值 (>array.length) 导致空数组。
   * @param endIndexExclusive 返回的子数组中存在直到 endIndex-1 的元素。
   * 低于值（< startIndex）产生空数组，高于值（>array.length）被降级为数组长度。
   * @return {} 包含开始和结束索引之间的元素的新数组。
   *
   * @see Array#slice
   */
  public static subarray<T>(
    array: T[],
    startIndexInclusive: number,
    endIndexExclusive: number,
  ): T[] {
    if (ObjectUtils.isNull(array)) {
      return null;
    }

    if (startIndexInclusive < 0) {
      startIndexInclusive = 0;
    }
    if (endIndexExclusive > array.length) {
      endIndexExclusive = array.length;
    }

    const newSize = endIndexExclusive - startIndexInclusive;
    if (newSize <= 0) {
      return [];
    }

    return array.slice(startIndexInclusive, endIndexExclusive);
  }

  /**
   * 交换给定数组中的一系列元素。
   *
   * <p>此方法对 null、 undefined 或空输入数组或溢出索引没有任何作用。
   * 负数索引提升为 0。
   * 如果要交换的任何子数组落在给定数组之外，则交换将在数组末尾停止，并交换尽可能多的元素。</p>
   *
   * 例如:
   * <ul>
   *     <li>ArrayUtils.swap(["1", "2", "3", "4"], 0, 2, 1) -&gt; ["3", "2", "1", "4"]</li>
   *     <li>ArrayUtils.swap(["1", "2", "3", "4"], 0, 0, 1) -&gt; ["1", "2", "3", "4"]</li>
   *     <li>ArrayUtils.swap(["1", "2", "3", "4"], 2, 0, 2) -&gt; ["3", "4", "1", "2"]</li>
   *     <li>ArrayUtils.swap(["1", "2", "3", "4"], -3, 2, 2) -&gt; ["3", "4", "1", "2"]</li>
   *     <li>ArrayUtils.swap(["1", "2", "3", "4"], 0, 3, 3) -&gt; ["4", "2", "3", "1"]</li>
   * </ul>
   *
   * @param array 要交换的数组，可能是 null 或 undefined
   * @param offset1 要交换的系列中第一个元素的索引
   * @param offset2 要交换的系列中第二个元素的索引
   * @param length 从给定索引开始交换的元素数
   */
  public static swap<T>(
    array: T[],
    offset1: number,
    offset2: number,
    length = 1,
  ): void {
    if (
      this.isEmpty(array) ||
      offset1 >= array.length ||
      offset2 >= array.length
    ) {
      return;
    }

    if (offset1 < 0) {
      offset1 = 0;
    }
    if (offset2 < 0) {
      offset2 = 0;
    }

    length = Math.min(
      Math.min(length, array.length - offset1),
      array.length - offset2,
    );
    for (let i = 0; i < length; i++, offset1++, offset2++) {
      const tmp = array[offset1];
      array[offset1] = array[offset2];
      array[offset2] = tmp;
    }
  }

  /**
   * <p>返回一个数组，其中包含处理 null 或 undefined 元素的参数数组中每个元素的字符串表示形式。</p>
   *
   * <p>此方法为 null 或 undefined 输入数组返回 null。</p>
   *
   * @param array 要处理的数组，可能为 null 或 undefined
   * @param valueForNullElements 如果元素为 null 或 undefined 则插入的值
   * @param elementToStringFunc 元素转字符串函数，未定义则使用{@link toString}进行输出
   * @return 一个字符串数组，如果为数组输入为 null 或 undefined 则返回 null
   */
  public static toStringArray<T>(
    array: T[],
    valueForNullElements: string,
    elementToStringFunc?: ToString<T>,
  ): string[] {
    if (ObjectUtils.isNull(array)) {
      return null;
    } else if (array.length == 0) {
      return [];
    }

    const result = [];
    for (let i = 0; i < array.length; i++) {
      if (ObjectUtils.isNull(elementToStringFunc)) {
        result[i] = ObjectUtils.defaultIfNull(
          array[i].toString(),
          valueForNullElements,
        );
      } else {
        result[i] = ObjectUtils.defaultIfNull(
          elementToStringFunc(array[i]),
          valueForNullElements,
        );
      }
    }

    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
}
