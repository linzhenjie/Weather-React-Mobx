import { observable, autorun } from 'mobx'

//定义观观察数组
const temperatures = observable([])
export const cacheKey = 'temperatures'

//监听每次temperatures变化时写如缓存
autorun(() => {
  if (temperatures.length > 0) {
    const cacheData = temperatures
      .map(t => {
        return t.location
      })
      .join(',')
    localStorage.setItem(cacheKey, cacheData)
  }
})
export const $cacheKey = cacheKey
export default temperatures
