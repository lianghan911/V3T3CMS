// 编写好规则
export const rules = {
  name: [
    {
      required: true,
      message: '账号是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '账号必须是5~10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或者数字~',
      trigger: 'blur'
    }
  ]
}
