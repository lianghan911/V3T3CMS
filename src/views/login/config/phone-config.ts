// 编写好规则
export const rules = {
  num: [
    {
      required: true,
      message: '手机号是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请填写正确手机号~',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{4,}$/,
      message: '请填写4位验证码~',
      trigger: 'blur'
    }
  ]
}
