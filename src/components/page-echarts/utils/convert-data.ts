import { coordinateData } from './coordinate-data'

export const convertData = function (data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    // 经纬度
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        // 数字拼接数组还是一个数组
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
