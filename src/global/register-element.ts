import { App } from 'vue'
import 'element-plus/theme-chalk/base.css'
import * as ElIconMoudles from '@element-plus/icons-vue'
import {
  ElAside,
  ElAvatar,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElDatePicker,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElRadio,
  ElRow,
  ElCol,
  ElSelect,
  ElTabPane,
  ElTabs,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElConfigProvider,
  ElImage,
  ElDialog,
  ElCard,
  ElLink,
  ElDescriptions,
  ElDescriptionsItem,
  ElTag,
  ElTooltip
} from 'element-plus'
const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElCol,
  ElRow,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElConfigProvider,
  ElImage,
  ElDialog,
  ElCard,
  ElLink,
  ElDescriptions,
  ElDescriptionsItem,
  ElTag,
  ElTooltip
]

export default function registerElement(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}

// 全局注册所有的图标
const icons: any = ElIconMoudles
export function registerIcons(app: App): void {
  for (const icon in icons) {
    // 附带prototype的对象(实例)用这个方法
    if (Object.prototype.hasOwnProperty.call(icons, icon)) {
      app.component(icons[icon].name, icons[icon])
    }
  }
}
