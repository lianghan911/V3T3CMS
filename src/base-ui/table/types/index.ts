export interface propConfigType {
  prop: string
  label: string
  minWidth?: string
  slotName?: string
}
export interface tableConfig {
  title?: string
  propList?: propConfigType[]
  showIndexColumn?: boolean
  showSelectColumn?: boolean
}
