import temperatures from './temperatures'
import request from './request'

console.log(request)
//store 目录存放全局状态数据
//这里将store和action分开，action异步加载时可以减少在打包大小
export default {
  request: request,
  temperatures: temperatures
}
