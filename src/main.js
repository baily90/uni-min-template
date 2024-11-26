import {
  createSSRApp
} from 'vue'
import App from './App.vue'
import { store } from './stores'
import { routeInterceptor, requestInterceptor } from './interceptors'
import uviewPlus from 'uview-plus'
export function createApp () {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  app.use(store)
  app.use(routeInterceptor)
  app.use(requestInterceptor)
  return {
    app
  }
}
