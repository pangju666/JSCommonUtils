/**
 * 抛出以指示方法已传递了非法或不适当的参数。
 *
 * @category 错误
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class IllegalArgumentError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

/**
 * 抛出以指示某种索引（例如数组、字符串或向量）超出范围。
 *
 * @category 错误
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class IndexOutOfBoundsError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

/**
 * 抛出以指示方法已传递了 undefined 或 null 的参数。
 *
 * @category 错误
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class NullError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

/**
 * 表示解析时意外到达错误的信号。
 *
 * @category 错误
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class ParseError extends Error {
  constructor(message?: string) {
    super(message);
  }
}
