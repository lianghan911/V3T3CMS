<template>
  <div class="dashboard">
    <!--1.顶部数据统计 -->
    <el-row :gutter="10">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :xs="24" :md="12" :lg="6" :xl="6">
          <statistical-panel :panelData="item" />
        </el-col>
      </template>
    </el-row>
    <!--2.中间图标  -->
    <el-row :gutter="10">
      <el-col :span="7">
        <lh-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </lh-card>
      </el-col>
      <el-col :span="10">
        <lh-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </lh-card>
      </el-col>
      <el-col :span="7">
        <lh-card title="分类商品数量(玫瑰图)"
          ><rose-echart :roseData="categoryGoodsCount"></rose-echart
        ></lh-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <lh-card title="分类商品的销量"
          ><line-echart v-bind="categoryGoodsSale"></line-echart
        ></lh-card>
      </el-col>
      <el-col :span="12">
        <lh-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart
        ></lh-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from '@/store'

import LhCard from '@/base-ui/card'

import StatisticalPanel from '@/components/statistical-panel'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    LhCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart,
    StatisticalPanel
  },
  setup() {
    const store = useStore()
    // 1.发起数据统计的网络请求
    store.dispatch('dashboardModule/getDashboardDataAction')

    // 2.获取顶部PanelData
    const topPanelData = computed(
      () => store.state.dashboardModule.topPanelDatas
    )

    // 改变数据
    const goodsSaleTop10 = computed(() => {
      return store.state.dashboardModule.goodsSaleTop10.map((item: any) => {
        return { value: item.saleCount, name: item.name }
      })
    })
    const categoryGoodsCount = computed(() => {
      return store.state.dashboardModule.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboardModule.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboardModule.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboardModule.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale,
      goodsSaleTop10,
      topPanelData
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
