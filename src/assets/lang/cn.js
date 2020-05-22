import baseLang from '@galaplat/utils/src/assets/lang/zh.js'

let messagesCn = {
  ...baseLang,
  menu: {
    index: '首页',
    'setting-userlist': '用户管理',
    'setting-rolemanage': '角色管理',
    'setting-organManage': '组织管理',
    'actionLogs-list': '操作日志'
  }
}
let prompt = {
}
Object.assign(messagesCn.prompt, prompt)
export default messagesCn
