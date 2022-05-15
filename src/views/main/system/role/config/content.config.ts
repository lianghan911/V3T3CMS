import { tableConfig } from '@/base-ui/table/types'
export const roleTableConfig: tableConfig = {
  title: '角色列表',
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100', slotName: 'userName' },
    {
      prop: 'intro',
      label: '权限介绍',
      minWidth: '90',
      slotName: 'introName'
    },
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
