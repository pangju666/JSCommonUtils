/**
 * 树形结构
 *
 * @category 数据结构
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export interface TreeProp {
  /**
   * 编号属性名
   */
  id: string;
  /**
   * 父级节编号属性名
   */
  parentId: string;
  /**
   * 子级属性名
   */
  children: string;
}
