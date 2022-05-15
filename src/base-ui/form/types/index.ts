type formType = 'input' | 'password' | 'select' | 'datepicker'

export interface formItem {
  field: string
  type: formType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  defaultValue?: any
  isHidden?: boolean
}

export interface form {
  title?: string
  formItems: formItem[]
  labelWidth?: string
  colLayout: any
  itemStyle: any
}
