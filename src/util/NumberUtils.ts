import {ObjectUtils} from "./ObjectUtils";
import {IllegalArgumentError} from "../error/IllegalArgumentError";

/**
 * 数字工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class NumberUtils {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {
    }

    /**
     * <p>将字符串转换为整数，如果转换失败则返回默认值。</p>
     *
     * <p>如果字符串为 null 或 undefined，则返回默认值。</p>
     *
     * <pre>
     *   NumberUtils.toInt(null, 1) = 1
     *   NumberUtils.toInt("", 1)   = 1
     *   NumberUtils.toInt("1", 0)  = 1
     * </pre>
     *
     * @param str 要转换的字符串，可能为 null 或 undefined
     * @param defaultValue 默认值
     * @param radix 数字进制
     * @return {} 由字符串表示的数字，如果转换失败，则为默认值
     */
    public static toInt(str: string, defaultValue = 0, radix = 10): number {
        if (ObjectUtils.isNull(str)) {
            return defaultValue;
        }
        const value = Number.parseInt(str, radix);
        if (Number.isNaN(value)) {
            return defaultValue;
        }
        return value;
    }

    /**
     * <p>将字符串转换为浮点数，如果转换失败则返回默认值。</p>
     *
     * <p>如果字符串为 null 或 undefined，则返回默认值。</p>
     *
     * <pre>
     *   NumberUtils.toFloat(null, 1.1f)   = 1.0f
     *   NumberUtils.toFloat("", 1.1f)     = 1.1f
     *   NumberUtils.toFloat("1.5", 0.0f)  = 1.5f
     * </pre>
     *
     * @param str 要转换的字符串，可能为 null 或 undefined
     * @param defaultValue 默认值
     * @return 由字符串表示的浮点数，如果转换失败则为 defaultValue
     */
    public static toFloat(str: string, defaultValue = 0.0): number {
        if (ObjectUtils.isNull(str)) {
            return defaultValue;
        }
        const value = Number.parseFloat(str);
        if (Number.isNaN(value)) {
            return defaultValue;
        }
        return value;
    }

    /**
     * 返回数组中的最小值。
     *
     * @param array 一个数组，不能为 null 或为空
     * @return {number} 数组中的最小值
     * @throws {IllegalArgumentError} 如果数组为空、null 或 undefined
     */
    public static min(...array: number[]): number {
        this.validateArray(array);

        let min = array[0];
        for (let j = 1; j < array.length; j++) {
            if (array[j] < min) {
                min = array[j];
            }
        }

        return min;
    }

    /**
     * 返回一组数字相加的总和。
     *
     * @param array 一组数字，不能为 null 或 undefined
     * @return {} 这组数字的总和
     */
    public static sum(...array: number[]): number {
        return array.reduce((a, b) => a + b);
    }

    /**
     * 返回一组数字的平均数。
     *
     * @param array 一组数字，不能为 null 或 undefined
     * @return {number} 这组数字的平均数
     */
    public static average(...array: number[]): number {
        return this.sum(...array) / array.length;
    }

    /**
     * 返回一组数字的众数（出现频率超过总数的 1/2 的数字），如果不存在则返回-1。
     *
     * @param array 一组数字，不能为 null 或 undefined
     * @return {number} 这组数字的众数
     */
    public static mode(array: number[]): number {
        let count = 0, tmp = 0;

        for (const num of array) {
            if (count === 0) {
                tmp = num;
                count = 1;
            } else {
                num === tmp ? ++count : --count;
            }
        }
        count = 0;
        for (const num of array) {
            if (num === tmp) {
                ++count;
            }
        }
        if (count <= array.length / 2) {
            tmp = -1;
        }
        return tmp;
    }

    /**
     * 返回一组数字相加的中位数。若并未排序，则会先对其排序再求中位数。
     *
     * @param array 一组数字，不能为 null 或 undefined
     * @return {number} 这组数字的总和
     */
    public static median(...array: number[]): number {
        array.sort((a, b) => a - b);

        if (array.length % 2 !== 0) {
            return array[(array.length - 1) / 2];
        }

        const rightIndex = array.length / 2;
        const leftIndex = rightIndex - 1;
        return (array[leftIndex] + array[rightIndex]) / 2;
    }

    /**
     * 返回数组中的最大值。
     *
     * @param array 一个数组，不能为 null 或为空
     * @return {number} 数组中的最大值
     * @throws {IllegalArgumentError} 如果数组为空、null 或 undefined
     */
    public static max(...array: number[]): number {
        this.validateArray(array);

        let min = array[0];
        for (let j = 1; j < array.length; j++) {
            if (array[j] > min) {
                min = array[j];
            }
        }

        return min;
    }

    /**
     * 返回提供的数值表达式，对其四舍五入并保留指定的精度。
     *
     * @param value 数值表达式。
     * @param digits 小数点后的位数。必须在 0 - 20 的范围内，包括 0 到 20。如果参数为小数，则向下取整。
     * @throws {IllegalArgumentError} 如果 digits 参数 不在 0-20 之间
     * @return {} 参数四舍五入并保留指定的精度后的值。
     */
    public static round(value: number, digits = 0): number {
        if (digits < 0 || digits > 20) {
            throw new IllegalArgumentError("小数点后的位数，必须在 0 - 20 的范围内");
        }
        const fractionDigits = Math.floor(digits);
        return Number(Math.round(Number(value + "e" + fractionDigits)) + "e-" + fractionDigits);
    }

    /**
     * 返回提供的数值表达式，并保留指定的精度。
     *
     * @param value 数值表达式。
     * @param digits 小数点后的位数，必须在 0 - 20 的范围内，包括 0 到 20。如果参数为小数，则向下取整。
     * @throws {IllegalArgumentError} 如果 digits 参数 不在 0-20 之间
     * @return {} 参数保留指定的精度后的值。
     */
    public static toFixed(value: number, digits = 0): number {
        if (digits < 0 || digits > 20) {
            throw new IllegalArgumentError("小数点后的位数，必须在 0 - 20 的范围内");
        }
        const fractionDigits = Math.floor(digits);
        return Number(Math.floor(Number(value + "e" + fractionDigits)) + "e-" + fractionDigits);
    }

    private static validateArray(array: number[]): void {
        if (ObjectUtils.isNull(array)) {
            throw new IllegalArgumentError("参数不能为null");
        }
        if (array.length === 0) {
            throw new IllegalArgumentError("数组不能为空");
        }
    }
}
