import {
  createSSRApp
} from 'vue'
import App from './App.vue'
import { store } from './stores'
import { routeInterceptor, requestInterceptor } from './interceptors'
export function createApp () {
  const app = createSSRApp(App)
  app.use(store)
  app.use(routeInterceptor)
  app.use(requestInterceptor)
  return {
    app
  }
}
