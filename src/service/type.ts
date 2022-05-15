/* 泛型套泛型,无非是这个泛型(一个类型)里面的数据也是泛型
(又一个类型) */
export interface dataType<T = any> {
  code: number
  data: T
}
