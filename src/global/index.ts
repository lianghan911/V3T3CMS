import { App } from 'vue'
import registerElement, { registerIcons } from './register-element'
import registerProperties from './register-properties'

export function globalRegister(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)
  app.use(registerIcons)
}
