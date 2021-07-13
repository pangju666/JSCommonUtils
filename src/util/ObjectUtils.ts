import { BooleanUtils } from "./BooleanUtils";

/**
 * 对象工具类，包含常用对象处理函数
 *
 * @author pangju
 * @version 1.0 2021-6-21
 */
export class ObjectUtils {
  /**
   * 值是否存在
   */
  public static isExist(value: unknown): boolean {
    return value !== undefined
  }

  /**
   * 值是否不存在
   */
  public static isNotExist(value: unknown): boolean {
    return value === undefined
  }

  /**
   * 判断对象是否不为空
   */
  public static isNotNull(value: unknown): boolean {
      return BooleanUtils.and(value !== undefined, value !== null)
  }

  /**
   * 判断对象是否为空
   */
  public static isNull(value: unknown): boolean {
      return BooleanUtils.or(value === undefined, value === null)
  }

  /**
   * 判断对象属性值是否存在
   *
   * @param object 待判断对象
   * @param expression 属性表达式
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static isExistProperty(object: object, expression: string = ''): boolean {
    if (ObjectUtils.isNotExist(object)) {
      return false
    }
    if (typeof expression !== "string") {
     throw new TypeError('参数expression必须为string类型')
    }

    let propertyVal
    for (const propertyName of expression.split('.')) {
      propertyVal = object[propertyName]
      if (ObjectUtils.isNotExist(propertyVal)) {
        return false
      }
    }
    return true
  }

  /**
   * 判断对象属性值是否不存在
   *
   * @param object 待判断对象
   * @param expression 属性表达式
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static isNotExistProperty(object: object, expression: string = ''): boolean {
    return !this.isExistProperty(object, expression)
  }

  /**
   * 判断对象属性值是否为空
   *
   * @param object 待验证对象
   * @param expression 获取属性表达式
   * @return{boolean} 对象属性为空则返回false, 否则返回true
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static isNotNullProperty(object: object, expression: string = ''): boolean {
    if (ObjectUtils.isNull(object)) {
      return false
    }
    if (typeof expression !== "string") {
      throw new TypeError('参数expression必须为string类型')
    }

    let objectCopy = object
    const propertyNames = expression.split('.')
    for (const propertyName of propertyNames) {
      if (ObjectUtils.isNull(objectCopy[propertyName])) {
        return false
      }
      objectCopy = objectCopy[propertyName]
    }
    return true
  }

  /**
   * 判断对象属性值是否为空
   *
   * @param object 待验证对象
   * @param expression 获取属性表达式
   * @return{boolean} 对象属性为空则返回true, 否则返回false
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static isNullProperty(object: object, expression: string = ''): boolean {
    return !this.isNotNullProperty(object, expression)
  }

  /**
   * 安全取值，如果取值条件不成立则返回默认值
   *
   * @param value 待取值变量
   * @param defaultVal 变量默认值
   * @param condition 取值条件，如果不传入则默认为判断值是否为空值
   * @return{T} 条件成立则返回此变量，否则返回默认值
   */
  public static getSafeValue<T>(value: T, defaultVal: T, condition = ObjectUtils.isNotNull) : T {
    return condition(value) ? value : defaultVal
  }

  /**
   * 安全获取对象属性值，如果属性不存在或为空则返回默认值
   *
   * @param object 待取值属性
   * @param defaultVal 属性默认值
   * @param expression 获取属性表达式
   * @return{any} 对象属性值或默认值
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static getSafeProperty(object: object, expression: string = '', defaultVal: unknown): unknown {
    if (ObjectUtils.isNullProperty(object, expression)) {
      return defaultVal
    }
    if (typeof expression !== "string") {
      throw new TypeError('参数expression必须为string类型')
    }

    let objectCopy = object
    const propertyNames = expression.split('.')
    for (const propertyName of propertyNames) {
      objectCopy = objectCopy[propertyName]
    }
    return this.getSafeValue(objectCopy, defaultVal)
  }

  /**
   * 安全获取对象，将对象中为空或未定义的属性，使用默认对象中对应的属性值进行替换
   *
   * @param object 待获取对象
   * @param defaultObject 默认对象
   * @return{object} 对象为空时会直接返回默认对象，否则进行安全获取操作
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static getSafeObject(object: object, defaultObject: object = {}): object {
    const propertyDefaultValMap = new Map(Object.entries(defaultObject))
    const objectCopy = { ...object }
    const propertyNames = Object.getOwnPropertyNames(objectCopy)
    for (const propertyName of propertyNames) {
        if (propertyDefaultValMap.has(propertyName)) {
            if (ObjectUtils.isNull(objectCopy[propertyName])) {
                objectCopy[propertyName] = propertyDefaultValMap.get(propertyName)
            } else if (ObjectUtils.isType(objectCopy[propertyName], Object)) {
                const defaultObj = propertyDefaultValMap.get(propertyName)
                objectCopy[propertyName] = this.getSafeObject(objectCopy[propertyName], defaultObj)
            }
        }
    }
    return objectCopy
  }

  /**
   * 深度拷贝目标对象
   *
   * @param object 待拷贝对象
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static deepClone<T>(object: T): T {
      if (this.isBasicType(object)) {
          return object
      }
      const newObject = {}
      for (const propertyName of Object.getOwnPropertyNames(object)) {
          newObject[propertyName] = this.deepClone(object[propertyName])
      }
      return newObject as T
  }

  /**
   * 是否为基础类型
   *
   * @param value 待判断的值
   */
  public static isBasicType(value: unknown): boolean {
    return this.isNull(value)
      || typeof value === "string"
      || typeof value === "number"
      || typeof value === "boolean"
      || typeof value === "symbol"
  }

  /**
   * 判断对象是否为对象
   *
   * @param value 对象值，不可以为空或未定义
   * @param type 待比较类型
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static isType(value: unknown, type: Function): boolean {
    return value instanceof type
  }

  /**
   * 判断对象是否为对象
   *
   * @param value 对象值，不可以为空或未定义
   * @param types 待比较类型
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static isAnyType(value: unknown, types: Function[]): boolean {
      return types.some(type => this.isType(value, type))
  }

  // 防止实例化
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {
  }
}
