import Vue from 'vue'
import Router from 'vue-router'
import gpUserManage from '@galaplat/modules-service-usermanage'
import gpOrgManage from '@galaplat/modules-service-organization'
import gpJump from '@galaplat/modules-service-jump'
import { commonBlackRoutes } from '@galaplat/utils/lib/common/utils'

Vue.use(Router)
const autoLoadBlackList = [
  ...commonBlackRoutes
]
const onlyRoutes = []
var router = new Router({
  mode: 'history',
  base: '/srs/',
  routes: [
    {path: '/:sysCode(\\w+)/',
      component: resolve => require(['@galaplat/modules-my-iframe'], resolve),
      props: { doGetConfig: false },
      children: [
        {path: '', redirect: 'index'},
        {path: 'index', name: 'index', meta: {only: true}, component: resolve => require(['@galaplat/modules-index'], resolve)},
        ...gpUserManage,
        ...gpOrgManage,
        ...gpJump,
        ...(r => {
          return r.keys().filter(key => {
            const path = key.match(/[^./].*(?=\.)/)[0]
            return autoLoadBlackList.indexOf(path) === -1
          }).map(key => {
            const path = key.match(/[^./].*(?=\.)/)[0]
            return {
              path,
              meta: { only: onlyRoutes.indexOf(path) > -1 },
              name: path.replace(/\//g, '.'),
              component: resolve => require([`@/components/${path}.vue`], resolve) // _import(path)
            }
          })
        })(require.context('../components', true, /.vue$/))
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})
router.afterEach((to, from) => {
})
export default router
