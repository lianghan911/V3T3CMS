// import { tableConfig } from '@/base-ui/table/types'
export const userTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100', slotName: 'userName' },
    {
      prop: 'realname',
      label: '真实姓名',
      minWidth: '100',
      slotName: 'realName'
    },
    {
      prop: 'cellphone',
      label: '手机号码',
      minWidth: '120',
      slotName: 'phone'
    },
    { prop: 'enable', label: '状态', minWidth: '80', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '180',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '180',
      slotName: 'updateAt'
    },
    { prop: 'operate', label: '操作', minWidth: '150', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
