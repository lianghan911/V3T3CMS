import { useStore } from '@/store'
export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore()
  const permissions = store.state.loginModule.permissions
  const verifyPermission = `system:${pageName}:${hanldeName}`
  return !!permissions.find((item) => item === verifyPermission)
}
