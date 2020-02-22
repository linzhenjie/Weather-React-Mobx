import { observable, action } from 'mobx'

const request = observable(
  {
    errorMsg: null, //只保留最后一次请求的错误
    load: 0,
    submit: 0,
    //区分提交和页面加载数据的计数器
    get loading() {
      return this.load > 0
    },
    get submiting() {
      return this.submit > 0
    },
    get error() {
      return this.load + this.submit === 0 ? this.errorMsg : null
    },
    set error(val) {
      this.errorMsg = val
    },
    start(type) {
      if (type === 'submit') {
        this.submit++
      } else {
        this.load++
      }
    },
    complete(type) {
      if (type === 'submit') {
        this.submit--
      } else {
        this.load--
      }
    },
    fail(e) {
      this.errorMsg = e
    }
  },
  {
    start: action,
    complete: action,
    fail: action
  }
)
export default request
