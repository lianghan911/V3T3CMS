import lhRequest from '../index'
import { dataType } from '../type'
import { account, loginRequstResult } from './type'

enum loginApi {
  accountLogin = '/login',
  loginUserInfo = '/users/', // 用法: /users/1
  userMenus = '/role/' // 用法: role/1/menu
}

export function accountLoginRequest(account: account) {
  return lhRequest.post<dataType<loginRequstResult>>({
    url: loginApi.accountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return lhRequest.get<dataType>({
    url: loginApi.loginUserInfo + id,
    isShowLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return lhRequest.get<dataType>({
    url: loginApi.userMenus + id + '/menu',
    isShowLoading: false
  })
}
