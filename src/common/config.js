import { getServerConfig } from '@galaplat/utils/lib/common/service'
const config = getServerConfig()
// 开发环境，重新调整服务地址
if (config.env === 'DEV') {
  config.server = 'localhost:8080/'
}
window.__ENV = config.env

export default {
  proxy: true,
  proxyPath: 'proxy/',
  get autoRedirectLogin () {
    return false
  },
  get config () {
    return config
  },
  get platType () {
    // 1为ESRCLOUD，2为YEQEE
    return config.platType
  },
  get serviceUrl () {
    // 服务地址
    return `${config.protocol || window.location.protocol}//${config.server}`
  },
  get imgUrl () {
    // 文件服务地址
    return `${config.protocol || window.location.protocol}//${config.fileServer}`
  },
  get devConf () {
    // 开发环境，根据后端地址重写header的sysCode
    return {
    }
  },
  get defaultPage () {
    // 默认启动页
    return []
  }
}
