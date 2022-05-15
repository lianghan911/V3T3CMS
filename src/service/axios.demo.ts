import axios from 'axios'

axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000

axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res.data)
})

// 额外补充的Promise中类型的使用
new Promise<string>((resolve, reject) => {
  resolve('123')
}).then((res) => {})

axios
  .all([
    axios.get('/get', { params: { name: 'why', age: 18 } }),
    axios.post('/post', { data: { name: 'why', age: 18 } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })
