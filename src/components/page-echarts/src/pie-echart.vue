<template>
  <div class="pie-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'

import { dataType } from '../types'
import { EChartsOption } from 'echarts'

const props = defineProps<{ pieData: dataType[] }>()

// computed接收一个类型就是getter返回值类型或setter新值类型
const options = computed<EChartsOption>(() => {
  return {
    title: {
      text: '单词写错',
      subtext: '心如止水',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
