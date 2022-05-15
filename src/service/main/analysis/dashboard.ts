import lhRequest from '@/service'
enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale',
  goodsSaleTop10 = '/goods/sale/top10',
  amountList = '/goods/amount/list'
}
export function getCategoryGoodsCount() {
  return lhRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return lhRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return lhRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return lhRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}

export function getAmountList() {
  return lhRequest.get({
    url: DashboardAPI.amountList
  })
}

export function getGoodsSaleTop10() {
  return lhRequest.get({
    url: DashboardAPI.goodsSaleTop10
  })
}
