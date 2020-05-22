// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import store from './store'
import messages from './assets/lang/index'
import ElementUI from 'element-ui'

import '@galaplat/utils/src/styles/theme/index.css'
import '@galaplat/utils/src/styles/index.less'
import 'element-ui/lib/theme-chalk/base.css'

import Utils from '@galaplat/utils'
import BaseComponents from '@galaplat/base-components'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import esrConfig from './common/config'
import AsyncValidator from 'async-validator'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.prototype.$esrValid = AsyncValidator

function lang () {
  let t = window.localStorage.getItem('esr-global-language')
  if (t) return t
  else return 'zh'
}
const currlanguage = lang()
const i18n = new VueI18n({
  locale: currlanguage,
  messages
})
Vue.use(BaseComponents)
Vue.use(Utils, {
  store,
  i18n,
  config: esrConfig
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})

// 超管(173419359958331392),管理员(173419398210383872),成员(173419584856911872)
