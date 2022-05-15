import { ref } from 'vue'
import PageModal from '@/components/page-modal'
type CallbackFn = (tag?: string | any, item?: any) => void
export function usePageModal(cb?: CallbackFn) {
  const defaultModalInfo = ref({})

  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const handleNewData = () => {
    defaultModalInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    cb && cb('new')
  }
  const handleEditData = (item: any) => {
    // item:scope.row
    defaultModalInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    cb && cb('edit', item)
  }
  return [defaultModalInfo, pageModalRef, handleNewData, handleEditData]
}
