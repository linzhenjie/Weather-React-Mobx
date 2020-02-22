import request from '../store/request'

const BASEURL = ''

export default function(url, config = {}) {
  request.start(config.loadingType)
  return fetch(BASEURL + url, config)
    .catch(e => {
      //处理fetch对302重定向等出现跨域问题的异常
      request.complete(config.loadingType)
      throw new Error('请求失败')
    })
    .then(res => {
      //这里处理网络错误
      request.complete(config.loadingType)
      if (res.status >= 400 && res.status < 500)
        throw new Error('请求资源不存在')
      if (res.status >= 500 && res.status < 600)
        throw new Error('服务端响应失败')

      return res.json()
    })
    .then(json => {
      //这里根据服务端定义的接口处理
      if (json.error !== 0) throw new Error('数据获取失败')
      return json.results
    })
    .catch(e => {
      request.fail(e.message)
      //抛出到上层
      throw new Error(e.message)
    })
}
