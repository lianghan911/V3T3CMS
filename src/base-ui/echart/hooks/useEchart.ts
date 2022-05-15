import * as echarts from 'echarts'
// 中国城市地图
import chinaMapData from '../data/china.json'
// 注入地图数据
echarts.registerMap('china', chinaMapData)
export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 折叠菜单栏后也可以做到响应式
  const updateSize = () => {
    echartInstance.resize()
  }
  // 使echars图做到响应式
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
