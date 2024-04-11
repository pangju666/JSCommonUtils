import { IllegalArgumentError, NullError } from "../error/runtimeError";
import {
  Comparator,
  Converter,
  Equalizer,
  Predicate,
} from "../type/FunctionAlias";

/**
 * 对象工具类
 *
 * @category 工具类
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class ObjectUtils {
  //TODO(idea): ObjectUtils 将一个对象去除部分属性，返回新对象（浅拷贝）

  /**
   * 将对象属性名称从驼峰格式转为下划线（_）格式
   *
   * @example
   * ```js
   * const obj = {
   *       dateStr: "1",
   *       dateTime: 11111,
   *       "1111Adad": {
   *         dateStr2: 1213123213,
   *         "11111Aaaa": 12313123123,
   *       },
   *       "11111_arr": [1, 1, 1, 1, 1],
   *       objArr: [
   *         {
   *           obj_aaa: 13132,
   *           objaaa1Aaaasdad: 13132,
   *         },
   *       ],
   * };
   * ObjectUtils.propertyNameToUnderLine(obj);
   * // 装换结果
   * const result = {
   *       date_str: "1",
   *       date_time: 11111,
   *       "1111_adad": {
   *         date_str2: 1213123213,
   *         "11111_aaaa": 12313123123,
   *       },
   *       "11111_arr": [1, 1, 1, 1, 1],
   *       obj_arr: [
   *         {
   *           obj_aaa: 13132,
   *           objaaa1_aaaasdad: 13132,
   *         },
   *       ],
   * };
   * ```
   *
   * @param obj 待转换的对象，基础类型无法转换
   * @returns {} 此方法会对值进行深拷贝操作，因为会返回一个新的对象，不会影响原始值
   * @see {@link ObjectUtils#convertPropertyNames}
   */
  public static propertyNameToUnderLine(obj: unknown): unknown {
    return this.convertPropertyNames(obj, (propertyName) => {
      if (this.isNull(propertyName) || propertyName.length === 0) {
        return "";
      }

      const newStr = [];
      const indexArr = [0];
      for (let i = 1; i < propertyName.length; i++) {
        const code = propertyName[i].charCodeAt(0);
        if (code >= 65 && code <= 90) {
          indexArr.push(i);
        }
      }
      indexArr.forEach((value, index) => {
        newStr.push(
          propertyName.charAt(value).toLowerCase() +
            propertyName.substring(value + 1, indexArr[index + 1])
        );
      });
      return newStr.join("_");
    });
  }

  /**
   * 将对象属性名称从下划线格式（_）或中划线格式（-）转为驼峰格式
   *
   * @example
   * ```js
   * const obj = {
   *       date_str: "1",
   *       dateTime: 11111,
   *       "date-str2": 11231313,
   *       "1111_adad": {
   *         date_str2: 1213123213,
   *         "11111-aaaa": 12313123123,
   *       },
   *       "11111-arr": [1, 1, 1, 1, 1],
   *       objArr: [
   *         {
   *           obj_aaa: 13132,
   *           "objaaa1-aaaasdad": 13132,
   *         },
   *       ],
   * };
   * ObjectUtils.propertyNameToCamlCase(obj);
   * // 装换结果
   * const result = {
   *       dateStr: "1",
   *       dateTime: 11111,
   *       "dateStr2": 11231313,
   *       "1111Adad": {
   *         dateStr2: 1213123213,
   *         "11111Aaaa": 12313123123,
   *       },
   *       "11111Arr": [1, 1, 1, 1, 1],
   *       objArr: [
   *         {
   *           objAaa: 13132,
   *           "objaaa1Aaaasdad": 13132,
   *         },
   *       ],
   * };
   * ```
   *
   * @param obj 待转换的对象，基础类型无法转换
   * @returns {} 此方法会对值进行深拷贝操作，因为会返回一个新的对象，不会影响原始值
   * @see {@link ObjectUtils#convertPropertyNames}
   */
  public static propertyNameToCamlCase(obj: unknown): unknown {
    return this.convertPropertyNames(obj, (propertyName) => {
      if (this.isNull(propertyName) || propertyName.length === 0) {
        return "";
      }
      const strArr = propertyName.split(/_|-/);
      for (let i = 1; i < strArr.length; i++) {
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
      }
      return strArr.join("");
    });
  }

  /**
   * 转换属性名称
   *
   * @param obj 待转换的对象，基础类型无法转换
   * @param converter 属性名转换器，用于定义如何转换属性名称
   * @returns {} 此方法会对值进行深拷贝操作，因为会返回一个新的对象，不会影响原始值
   */
  public static convertPropertyNames(
    obj: unknown,
    converter: Converter<string>
  ): unknown {
    if (this.isNull(obj)) {
      return null;
    }
    if (this.isBasicType(obj)) {
      return obj;
    }

    // 判断是否为数组
    if (Array.isArray(obj)) {
      return obj.map((curVal) => {
        // 判断是否为基础类型
        if (this.isBasicType(curVal)) {
          return curVal;
        }
        // 执行转换操作
        return this.convertPropertyNames(curVal, converter);
      });
    }

    // 不为数组则直接执行对象转换
    const newObj = {};
    // 遍历属性名称
    Object.keys(obj).forEach((propertyName) => {
      const newPropertyName = converter(propertyName);
      const val = obj[propertyName];
      // 判断是否为基础类型或是否符合排除条件
      if (this.isBasicType(val)) {
        newObj[newPropertyName] = val;
      } else {
        newObj[newPropertyName] = this.convertPropertyNames(val, converter);
      }
    });
    return newObj;
  }

  /**
   * 根据属性表达式获取对象的属性
   *
   * @example
   * ```js
   * const a = {
   *     b: "test",
   *     c: {
   *         d: "test2"
   *     },
   *     e: ["test4"],
   *     f: [{g: "test3"}]
   * };
   *
   * ObjectUtils.getProp({id: 1}, "", "a") // a
   * ObjectUtils.getProp(null, "") // null
   * ObjectUtils.getProp({id: 1}, undefined, {}) // {}
   * ObjectUtils.getProp({id: 1}, null, {}) // {}
   * ObjectUtils.getProp({id: 1}, "", {}) // {}
   * ObjectUtils.getProp(a, "b", {}) // "test"
   * ObjectUtils.getProp(a, "c.d", {}) // "test2"
   * ObjectUtils.getProp(a, "e[0]", {}) // "test4"
   * ObjectUtils.getProp(a, "f[0].g", {}) // "test3"
   * ```
   *
   * @param value 测试对象，如果对象为 null、undefined 则返回 defaultValue
   * @param key 属性表达式，如果参数为 null、undefined、"" 则返回 defaultValue
   * @param defaultValue 默认值，默认为 null
   * @throws {@link TypeError} 如果 key 不为 {@link String} 类型
   * @returns {} value 中 key 指向的属性
   */
  public static getProp(
    value: unknown,
    key: string,
    defaultValue = null
  ): unknown {
    if (this.isNotNull(key) && typeof key !== "string") {
      throw new TypeError("key 必须为字符串类型");
    }

    if (this.anyNull(value, key) || key.length === 0) {
      return defaultValue;
    }

    const props = key.replace(/\[/g, ".").replace(/]/g, "").split(".");
    if (props.length <= 1) {
      return this.defaultIfNull(value[props[0]], defaultValue);
    }
    const propValue = props.reduce((value, prop) => (value || {})[prop], value);
    return this.defaultIfNull(propValue, defaultValue);
  }

  /**
   * 判断属性表达式指向的属性是否存在
   *
   * @example
   * ```js
   * const a = {
   *     b: "test",
   *     c: {
   *         d: "test2"
   *     },
   *     e: ["test4"],
   *     f: [{g: "test3"}]
   * };
   *
   * ObjectUtils.isExistProp({id: 1}, "") // false
   * ObjectUtils.isExistProp(null, "") // false
   * ObjectUtils.isExistProp({id: 1}, undefined) // false
   * ObjectUtils.isExistProp({id: 1}, null) // false
   * ObjectUtils.isExistProp({id: 1}, "") // false
   * ObjectUtils.isExistProp(a, "b") // true
   * ObjectUtils.isExistProp(a, "c.d") // true
   * ObjectUtils.isExistProp(a, "e[0]") // true
   * ObjectUtils.isExistProp(a, "f[0].g") // true
   * ```
   *
   * @param value 测试对象, 如果 value为 null、undefined 则返回 false
   * @param key 属性表达式，如果参数为 null、undefined、"" 则返回 false
   * @throws {@link TypeError} 如果 key 不为 {@link string} 类型
   * @returns 如果 value 中存在 key 指向的属性则为 true，否则为 false
   */
  public static isExistProp(value: unknown, key: string): boolean {
    return this.getProp(value, key) !== null;
  }

  /**
   * 根据属性表达式获取对象的属性
   *
   * @example
   * ```js
   * const a = {
   *     b: "test",
   *     c: {
   *         d: "test2"
   *     },
   *     e: ["test4"],
   *     f: [{g: "test3"}]
   * };
   *
   * ObjectUtils.isNotExistProp({id: 1}, "") // true
   * ObjectUtils.isNotExistProp(null, "") // true
   * ObjectUtils.isNotExistProp({id: 1}, undefined) // true
   * ObjectUtils.isNotExistProp({id: 1}, null) // true
   * ObjectUtils.isNotExistProp({id: 1}, "") // true
   * ObjectUtils.isNotExistProp(a, "b") // false
   * ObjectUtils.isNotExistProp(a, "c.d") // false
   * ObjectUtils.isNotExistProp(a, "e[0]") // false
   * ObjectUtils.isNotExistProp(a, "f[0].g") // false
   * ```
   *
   * @param value 测试对象
   * @param key 属性表达式，如果参数为 null、undefined、"" 则返回默认值
   * @throws {@link TypeError} 如果 key 不为 {@link string} 类型
   * @returns 对象属性值，如果对象为 null、undefined 则返回 defaultValue
   */
  public static isNotExistProp(value: unknown, key: string): boolean {
    return this.getProp(value, key) === null;
  }

  /**
   * 判断值是否不为 null 或 undefined
   *
   * @example
   * ```js
   * ObjectUtils.isNotNull(undefined) // false
   * ObjectUtils.isNotNull(null) // false
   * ObjectUtils.isNotNull("demo") // true
   * ObjectUtils.isNotNull(1) // true
   * ObjectUtils.isNotNull(true) // true
   * ObjectUtils.isNotNull(false) // true
   * ObjectUtils.isNotNull({ name: "admin" }) // true
   * ```
   *
   * @param value 待判断的值
   * @returns {} 值为 null 或 undefined 则返回 false，否则为 true
   */
  public static isNotNull(value: unknown): boolean {
    return value !== undefined && value !== null;
  }

  /**
   * 判断值是否为 null 或 undefined
   *
   * @example
   * ```js
   * ObjectUtils.isNotNull(undefined) // true
   * ObjectUtils.isNotNull(null) // true
   * ObjectUtils.isNotNull("demo") // false
   * ObjectUtils.isNotNull(1) // false
   * ObjectUtils.isNotNull(true) // false
   * ObjectUtils.isNotNull(false) // false
   * ObjectUtils.isNotNull({ name: "admin" }) // false
   * ```
   *
   * @param value 待判断的值
   * @returns {} 值为 null 或 undefined 则返回 true，否则为 false
   */
  public static isNull(value: unknown): boolean {
    return !this.isNotNull(value);
  }

  /**
   * 检查给定参数中的所有值是否都不为 null 或 undefined
   *
   * @param values 待测试的一组值
   * @returns {} 如果给定参数中存在至少一个空值或给定参数是 null 或 undefined 值则返回 false，
   * 如果给定参数中的所有值都不是 null 或 undefined 值则返回 true。
   */
  public static allNotNull(...values: unknown[]): boolean {
    if (this.isNull(values)) {
      return false;
    }
    for (const value of values) {
      if (this.isNull(value)) {
        return false;
      }
    }
    return true;
  }

  /**
   * 检查给定参数中的所有值是否都为 null 或 undefined
   *
   * @param values 待测试的一组值
   * @returns {} 如果给定参数中存在至少一个非 null 或 undefined 值则返回 false，
   * 如果给定参数中的所有值都是 null 或 undefined 值则返回 true。
   */
  public static allNull(...values: unknown[]): boolean {
    if (this.isNull(values)) {
      return true;
    }
    for (const value of values) {
      if (this.isNotNull(value)) {
        return false;
      }
    }
    return true;
  }

  /**
   * 检查给定参数中是否存在非 null 或 undefined 值
   *
   * @param values 待测试的一组值
   * @returns {} 如果在给定参数中至少存在一个非 null 或 undefined 值则返回 true，
   * 如果给定参数中的所有值都是 null 或 undefined 值，则返回 false
   */
  public static anyNotNull(...values: unknown[]): boolean {
    if (this.isNull(values)) {
      return false;
    }
    for (const value of values) {
      if (this.isNotNull(value)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 检查给定参数中是否存在 null 或 undefined 值
   *
   * @param values 待测试的一组值
   * @returns {} 如果在给定参数中至少存在一个 null 或 undefined 值则返回 true，
   * 如果给定参数中的所有值都是非 null 或 undefined 值，则返回 false
   */
  public static anyNull(...values: unknown[]): boolean {
    if (this.isNull(values)) {
      return true;
    }
    for (const value of values) {
      if (this.isNull(value)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 拷贝源对象至目标对象，如果 source 或 target 为 null 或 undefined，则什么也不发生
   *
   * @example
   * ```js
   * const source1 = { a: 1, b: "test2" };
   * const target1 = { c: 1, d: false };
   * ObjectUtils.copy(source1, target1);
   * // target1 === { a: 1, b: "test2", c: 1, d: false })
   *
   * const source2 = { a: 1, b: "test2" };
   * const target2 = {};
   * ObjectUtils.copy(source2, target2);
   * // target2 === { a: 1, b: "test2" })
   *
   * const source3 = { a: 1, b: "test2" };
   * const target3 = { a: 2, b: "test1" };
   * ObjectUtils.copy(source3, target3);
   * // target3 === { a: 1, b: "test2" })
   *
   * const source4 = { a: 1, b: "test2" };
   * const target4 = null;
   * ObjectUtils.copy(source4, target4);
   * // target3 === null
   *
   * const source5 = null;
   * const target5 = { a: 2, b: "test1" };
   * ObjectUtils.copy(source5, target5);
   * // target3 === { a: 2, b: "test1" }
   * ```
   *
   * @param source 源对象
   * @param target 目标对象
   */
  public static copy(source: unknown, target: unknown): void {
    if (this.allNotNull(source, target)) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    }
  }

  /**
   * 浅克隆目标对象
   *
   * @typeParam T -待克隆对象类型
   * @param source 待克隆对象
   * @returns {} 克隆出的新对象，如果 source 为 null、undefined 则返回 null
   */
  public static clone<T>(source: T): T {
    if (this.isNull(source)) {
      return null;
    }
    if (this.isBasicType(source)) {
      return source;
    }
    return Object.create(
      Object.getPrototypeOf(source),
      Object.getOwnPropertyDescriptors(source)
    );
  }

  /**
   * 深克隆目标对象, 也可以使用{@link https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm structuredClone}实现
   *
   * @param value 待克隆对象
   * @returns {} 隆出的新对象，如果 source 为 null、undefined 则返回 null
   */
  public static deepClone(value: unknown): unknown {
    return this.deepCloneImpl(value, new WeakSet());
  }

  /**
   * null、undefined 安全的值比较（null 和 undefined 被认为相等）。
   *
   * @typeParam T -待比较值类型
   * @param c1 第一个可比较的值，可能为 null 或 undefined
   * @param c2 第二个可比较的值，可能为 null 或 undefined
   * @param compareTo 值比较函数
   * @param nullGreater 如果为 true，则 null、undefined 被认为大于非 null、undefined 值，
   * 或者如果为 false，则 null、undefined 被认为小于非 null、undefined 值
   * @returns {} 如果 c1 < c2 则为负值，如果 c1 = c2 则为零，如果 c1 > c2 则为正值
   */
  public static compare<T>(
    c1: T,
    c2: T,
    compareTo: Comparator<T>,
    nullGreater = false
  ): number {
    if (this.isNull(c1)) {
      if (this.isNull(c2)) {
        return 0;
      }
      return nullGreater ? 1 : -1;
    }
    if (this.isNull(c2)) {
      return nullGreater ? -1 : 1;
    }
    return compareTo(c1, c2);
  }

  /**
   * 如果传递的值为 null 或 undefined，则返回默认值。
   *
   * @example
   * ```js
   * ObjectUtils.defaultIfNull(null, {}); // {}
   * ObjectUtils.defaultIfNull("", {}); // ""
   * ObjectUtils.defaultIfNull({test: 1}, {test: 2}); // {test: 1}
   * ```
   *
   * @typeParam T -待传递值类型
   * @param value 待传递的值
   * @param defaultValue 默认值
   * @returns {} 如果不为 null 或 undefined 则返回 value，否则返回 defaultValue
   */
  public static defaultIfNull<T>(value: T, defaultValue: T): T {
    return value ?? defaultValue;
  }

  /**
   * 条件取值，如果取值条件不成立则返回默认值
   *
   * @example
   * ```js
   * ObjectUtils.defaultIfCondition(null, {}, true); // null
   * ObjectUtils.defaultIfCondition(null, {}, false); // {}
   * ObjectUtils.defaultIfCondition("", "1234", true); // ""
   * ObjectUtils.defaultIfCondition("", "1234", false); // {}
   * ObjectUtils.defaultIfCondition({test: 1}, {test: 2}, (value) => ObjectUtils.isNotNull(value)); // {test: 1}
   * ObjectUtils.defaultIfCondition(null, {test: 2}, (value) => ObjectUtils.isNotNull(value)); // {test: 2}
   * ```
   *
   * @typeParam T -待传递值类型
   * @param value 待取值变量
   * @param defaultValue 默认值
   * @param condition 取值条件
   * @returns {} 条件成立则返回 value，否则返回 defaultValue
   */
  public static defaultIfCondition<T>(
    value: T,
    defaultValue: T,
    condition: boolean | Predicate<T>
  ): T {
    if (typeof condition === "boolean") {
      return condition ? value : defaultValue;
    }
    return condition(value) ? value : defaultValue;
  }

  /**
   * 返回给定参数中第一个不为 null 或 undefined 的值
   *
   * @example
   * ```js
   * ObjectUtils.firstNonNull(null, {}, true); // {}
   * ObjectUtils.firstNonNull(null, undefined, false); // false
   * ObjectUtils.firstNonNull("", {test: 1}, true); // ""
   * ```
   *
   * @param values 待测试的一组值，可能是 null 或 undefined
   * @returns {} 给定参数中第一个不是 null 或 undefined 的值。
   * 如果所有值都为 null、undefined，则返回 null
   */
  public static firstNonNull(...values: unknown[]): unknown {
    if (this.isNull(values)) {
      return null;
    }
    for (const value of values) {
      if (this.isNotNull(value)) {
        return value;
      }
    }
    return null;
  }

  /**
   * <p>检查参数是否为空，null 或 undefined。</p>
   *
   * 支持以下类型：
   * <ul>
   * <li>{@link String}: 如果它的长度为零，则认为是空的。</li>
   * <li>{@link Array}: 如果它的长度为零，则认为是空的。</li>
   * <li>{@link Set}: 如果它有零个元素，则认为是空的。</li>
   * <li>{@link Map}: 如果它有零个键值映射，则认为是空的。</li>
   * <li>{@link Object}: 如果它有零个属性，则认为是空的。</li>
   * </ul>
   *
   * @example
   * ```js
   * ObjectUtils.isEmpty(null) // true
   * ObjectUtils.isEmpty("") // true
   * ObjectUtils.isEmpty("ab") // false
   * ObjectUtils.isEmpty([]) // true
   * ObjectUtils.isEmpty([1,2,3]) // false
   * ObjectUtils.isEmpty({}) // true
   * ObjectUtils.isEmpty({test: 1234}) // false
   * ObjectUtils.isEmpty(new Date()) // false
   * ```
   *
   * @param value 待判断的值，可能是 null 或 undefined
   * @returns {} 如果对象具有受支持的类型并且为空、null 或 undefined，则为 true，否则为 false
   */
  public static isEmpty(value: unknown): boolean {
    if (this.isNull(value)) {
      return true;
    }
    if (typeof value === "string" || Array.isArray(value)) {
      return value.length === 0;
    }
    if (value instanceof Map || value instanceof Set) {
      return value.size === 0;
    }
    if (typeof value === "object") {
      return JSON.stringify(value) === "{}";
    }
    return false;
  }

  /**
   * 判断对象是否不为空
   *
   * 支持以下类型：
   * <ul>
   * <li>{@link String}: 如果它的长度为零，则认为是空的。</li>
   * <li>{@link Array}: 如果它的长度为零，则认为是空的。</li>
   * <li>{@link Set}: 如果它有零个元素，则认为是空的。</li>
   * <li>{@link Map}: 如果它有零个键值映射，则认为是空的。</li>
   * <li>{@link Object}: 如果它有零个属性，则认为是空的。</li>
   * </ul>
   *
   * @example
   * ```js
   * ObjectUtils.isEmpty(null) // false
   * ObjectUtils.isEmpty("") // false
   * ObjectUtils.isEmpty("ab") // true
   * ObjectUtils.isEmpty([]) // false
   * ObjectUtils.isEmpty([1,2,3]) // true
   * ObjectUtils.isEmpty({}) // false
   * ObjectUtils.isEmpty({test: 1234}) // true
   * ObjectUtils.isEmpty(new Date()) // true
   * ```
   *
   * @param value 待判断的值，可能是 null 或 undefined
   * @returns {} 如果对象具有不受支持的类型或不为空、不为 null 且不为 undefined，则为 true，否则为 false
   */
  public static isNotEmpty(value: unknown): boolean {
    return !this.isEmpty(value);
  }

  /**
   * <p>取一组值中最大的一个（null 和 undefined 被认为相等）。</p>
   *
   * @typeParam T -待比较值类型
   * @param compareTo 值比较函数
   * @param values 待比较的一组值，可能为 null 或 undefined
   * @returns {}
   *  <ul>
   *   <li>如果所有对象都不为 null 或 undefined 且不相等，则为最大的对象。</li>
   *   <li>如果所有对象都不为 null 或 undefined 且相等，则为第一个。</li>
   *   <li>如果所有对象都为 null 或 undefined，则返回 null。</li>
   *  </ul>
   */
  public static max<T>(compareTo: Comparator<T>, ...values: T[]): T {
    if (this.isNull(values)) {
      return null;
    }

    let result = null;
    values.forEach((value, index) => {
      if (index === 0) {
        result = value;
      }
      if (this.compare(value, result, compareTo) > 0) {
        result = value;
      }
    });
    return result;
  }

  /**
   * <p>取一组值中最小的一个（null 和 undefined 被认为相等）。</p>
   *
   * @typeParam T -待比较值类型
   * @param compareTo 值比较函数
   * @param values 待比较的一组值，可能为 null 或 undefined
   * @returns {}
   * <ul>
   *   <li>如果所有对象都不为 null 或 undefined 且不相等，则为最小的对象。</li>
   *   <li>如果所有对象都不为 null 或 undefined 且相等，则为第一个。</li>
   *   <li>如果所有对象都为 null 或 undefined，则返回 null。</li>
   *  </ul>
   */
  public static min<T>(compareTo: Comparator<T>, ...values: T[]): T {
    if (this.isNull(values)) {
      return null;
    }

    let result = null;
    values.forEach((value, index) => {
      if (index === 0) {
        result = value;
      }
      if (this.compare(value, result, compareTo) < 0) {
        result = value;
      }
    });
    return result;
  }

  /**
   * 找出最常出现的变量
   *
   * @example
   * ```js
   * ObjectUtils.mode(1, 2, 2, 1); // 1
   * ObjectUtils.mode(1, 2, 2, 1, 2); // 2
   * ```
   *
   * @param values 待检查的一组变量
   * @returns {} 出现次数最最多的项，如果不唯一或待检查的变量为 null 或 undefined，则返回 null
   */
  public static mode(...values: unknown[]): unknown {
    if (this.isEmpty(values)) {
      return null;
    }

    const occurrences = new Map();
    for (const value of values) {
      const count = occurrences.get(value);
      if (count === undefined) {
        occurrences.set(value, 1);
      } else {
        occurrences.set(value, count + 1);
      }
    }

    let result = null;
    let max = 0;
    occurrences.forEach((value, key) => {
      const cmp = value;
      if (cmp === max) {
        result = null;
      } else if (cmp > max) {
        max = cmp;
        result = key;
      }
    });
    return result;
  }

  /**
   * 判断两个值是否相等。<br />
   * 任意一个参数为 null、undefined 则返回 false，若都为 null、undefined 则返回 true。 <br />
   * 若 equalizer 为 null 或 undefined且两个值都不为 null、undefined 则调用{@link Object.is}进行判断
   *
   * @typeParam T -待比较值类型
   * @param value1 第一个对象，可能为 null 或 undefined
   * @param value2 第二个对象，可能为 null 或 undefined
   * @param equalizer 值相等判断函数
   * @returns {} 符合相等判断规则，则为 true，否则为 false
   */
  public static equal<T>(
    value1: T,
    value2: T,
    equalizer?: Equalizer<T>
  ): boolean {
    if (this.isNull(value1)) {
      return this.isNull(value2);
    }
    if (this.isNull(equalizer) || typeof equalizer !== "function") {
      return Object.is(value1, value2);
    }
    return equalizer(value1, value2);
  }

  /**
   * 比较两个对象是否相等。<br />
   * 任意一个参数为 null、undefined 则返回 true，若都为 null、undefined 则返回 false。 <br />
   * equalizer 若为 null 或 undefined，则调用{@link Object.is}进行判断
   *
   * @typeParam T -待比较值类型
   * @param value1 第一个对象，可能为 null 或 undefined
   * @param value2 第二个对象，可能为 null 或 undefined
   * @param equalizer 值相等判断函数
   * @returns {} 符合相等判断规则，则为 false，否则为 true
   */
  public static notEqual<T>(
    value1: T,
    value2: T,
    equalizer?: Equalizer<T>
  ): boolean {
    return !this.equal(value1, value2, equalizer);
  }

  /**
   * 检查指定的对象引用不为 null，undefined 或为空。
   * 使用此方法进行验证，例如：
   *
   * @example
   * ```js
   * ObjectUtils.requireNonEmpty("demo", "参数不可为空"); // "demo"
   * ObjectUtils.requireNonEmpty(null, "参数不可为空"); // NullError("参数不可为空")
   * const obj = new Map();
   * ObjectUtils.requireNonEmpty(obj, "map不可为空"); // IllegalArgumentError("map不可为空")
   * ```
   *
   * @param value 检查无效性的值
   * @param message 错误描述
   * @returns {} 如果不为 null、undefined 或为空, 则返回 value。
   * @throws {@link NullError} 如果 value 为 null 或 undefined
   * @throws {@link IllegalArgumentError} 如果 value 为空.
   */
  public static requireNonEmpty(value: unknown, message?: string): unknown {
    if (this.isNull(value)) {
      throw new NullError(message);
    }
    if (this.isEmpty(value)) {
      throw new IllegalArgumentError(message);
    }
    return value;
  }

  /**
   * 返回传入对象的字符串表示。
   *
   * @param value 传入的值
   * @param nullStr value 为 null、undefined 时返回的字符串
   * @returns {} 传入 value 的{@link toString}，如果为 null 或 undefined，则返回 nullStr
   */
  public static toString(value: unknown, nullStr: string): string {
    return this.isNull(value) ? nullStr : value.toString();
  }

  /**
   * 是否为基础类型, 包含以下类型：
   * <ul>
   *   <li> null </li>
   *   <li> undefined </li>
   *   <li> string </li>
   *   <li> number </li>
   *   <li> boolean </li>
   *   <li> symbol </li>
   *   <li> bigint </li>
   * </ul>
   *
   * @example
   * ```js
   * ObjectUtils.isBasicType(1); // true
   * ObjectUtils.isBasicType("1"); // true
   * ObjectUtils.isBasicType(true); // true
   * ObjectUtils.isBasicType(Symbol(1)); // true
   * ObjectUtils.isBasicType(BigInt(1)); // true
   * ObjectUtils.isBasicType(null); // true
   * ObjectUtils.isBasicType(undefined); // true
   * ObjectUtils.isBasicType({}); // false
   * ObjectUtils.isBasicType([]); // false
   * ObjectUtils.isBasicType(() => {}); // false
   * ```
   *
   * @param value 待判断的值
   * @returns {} 如果值为基础类型，则为 true，否则为 false
   */
  public static isBasicType(value: unknown): boolean {
    if (this.isNull(value)) {
      return true;
    }
    return (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "symbol" ||
      typeof value === "bigint"
    );
  }

  /**
   * 判断对象是否为某个类型
   *
   * @example
   * ```js
   * ObjectUtils.isAnyType(1, String, Number); // true
   * ObjectUtils.isAnyType("1", Number, String, Object); // true
   * ObjectUtils.isAnyType(true, Number, String, Boolean); // true
   * ObjectUtils.isAnyType(Symbol(1), Number, String, Symbol); // true
   * ObjectUtils.isAnyType(BigInt(1), Number, BigInt, Symbol); // true
   * ObjectUtils.isAnyType(null, Number, BigInt, Symbol); // false
   * ObjectUtils.isAnyType(undefined, Number, BigInt, Symbol); // false
   * ObjectUtils.isAnyType([], Array, Number, BigInt, Symbol); // true
   * ObjectUtils.isAnyType("", Array, Number, BigInt, Symbol); // false
   * ObjectUtils.isAnyType(() => {}, Function, Array, BigInt, Symbol); // true
   * ObjectUtils.isAnyType(new Date(), Function, Array, Date); // true
   * ```
   *
   * @param value 待判断的值，不可以为 null 或 undefined
   * @param types 一组期待的类型
   * @returns {} 如果值为某个期待类型，则为 true，否则为 false
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static isAnyType(value: unknown, ...types: Function[]): boolean {
    if (this.isNull(value) || this.isEmpty(types)) {
      return false;
    }
    return types.some((type) => {
      if (type === String && typeof value === "string") {
        return true;
      }
      if (type === Number && typeof value === "number") {
        return true;
      }
      if (type === BigInt && typeof value === "bigint") {
        return true;
      }
      if (type === Boolean && typeof value === "boolean") {
        return true;
      }
      if (type === Symbol && typeof value === "symbol") {
        return true;
      }
      if (type === Object && typeof value === "object") {
        return true;
      }
      if (type === Function && typeof value === "function") {
        return true;
      }
      if (type === Array && Array.isArray(value)) {
        return true;
      }
      return value instanceof type || value.constructor === type;
    });
  }

  private static deepCloneImpl(value: unknown, hash = new WeakSet()): unknown {
    // 非 object 类型或 ERROR 对象，无法深度拷贝，直接返回原值
    if (
      this.isNull(value) ||
      value instanceof Error ||
      typeof value !== "object"
    ) {
      return value;
    }
    // dom节点，无法深度拷贝，直接返回原值
    if (
      typeof window !== "undefined" &&
      (value instanceof Node || value instanceof HTMLCollection)
    ) {
      return value;
    }
    // 判断传入的待拷贝值的引用是否存在于hash中
    if (hash.has(value)) {
      return value;
    }

    /* if (typeof structuredClone !== "undefined") {
          return structuredClone(value);
        }*/
    const newValue = {};
    for (const key of Object.keys(value)) {
      const currentValue = value[key];
      if (
        this.isNull(currentValue) ||
        value instanceof Error ||
        typeof currentValue !== "object"
      ) {
        newValue[key] = currentValue;
      } else if (Array.isArray(currentValue)) {
        newValue[key] = currentValue.map((item) =>
          this.deepCloneImpl(item, hash)
        );
      } else if (currentValue instanceof Set) {
        const newSet = new Set();
        currentValue.forEach((item) => {
          newSet.add(this.deepCloneImpl(item));
        });
        newValue[key] = newSet;
      } else if (currentValue instanceof Map) {
        const newMap = new Map();
        currentValue.forEach((itemValue, itemKey) => {
          newMap.set(itemKey, this.deepCloneImpl(itemValue, hash));
        });
        newValue[key] = newMap;
      } else {
        hash.add(value);
        newValue[key] = this.deepCloneImpl(currentValue, hash);
      }
    }
    return newValue;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
}
