import lhRequest from '@/service'

import { dataType } from '@/service/type'

export function getPageListData(url: string, queryInfo: any) {
  return lhRequest.post<dataType>({
    url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return lhRequest.delete<dataType>({
    url
  })
}

export function createPageData(url: string, newData: any) {
  return lhRequest.post<dataType>({
    url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return lhRequest.patch<dataType>({
    url,
    data: editData
  })
}
