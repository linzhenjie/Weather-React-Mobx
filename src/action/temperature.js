import { observable, computed, action } from 'mobx'
import temperatures, { cacheKey } from '../store/temperatures'
import request from './request'

//单一的数据源
class Temperature {
  id = Math.random()
  @observable unit = 'C'
  @observable temperatureCelsius = 0
  @observable location = ''
  @computed get temperatureKrlvin() {
    return this.temperatureCelsius + 273.15
  }
  @computed get temperatureFahrenheit() {
    return this.temperatureCelsius * 1.8 + 32
  }
  @computed get temperature() {
    switch (this.unit) {
      case 'K':
        return this.temperatureKrlvin + '°K'
      case 'F':
        return this.temperatureFahrenheit + '°F'
      default:
        return this.temperatureCelsius + '°C'
    }
  }
  constructor(location, temperatureCelsius) {
    this.location = location
    this.temperatureCelsius = temperatureCelsius
    //when api see：https://cn.mobx.js.org/refguide/when.html
    // when(
    //   () => this.temperatureCelsius === 0,// 触发条件
    //   () => {
    //     alert('地址：【'+this.location+'】错误')
    //     new Error('地址：【'+this.location+'】错误')
    //   }
    // )
  }
  @action setUnit = unit => {
    this.unit = unit
  }
}

//定义业务操作
export function fetchTemperature(location, loadingType = 'submit') {
  const URL = `/telematics/v3/weather?output=json&ak=3p49MVra6urFRGOT9s8UBWr2&location=${location}`
  request(URL, {
    loadingType: loadingType
  })
    .then(data => {
      // API没有实时温度字段，只能通过日期切割出来
      let temperatureCelsius = data[0]['weather_data'][0]['date']
        .substr(14)
        .split('℃')[0]
      console.log(
        'fetch : location:[' +
          location +
          '] temperatureCelsius:[' +
          temperatureCelsius +
          '°C]'
      )
      let temperature = new Temperature(location, parseInt(temperatureCelsius))
      temperatures.push(temperature)
    })
    .catch(e => {
      console.error(e)
    })
}

export function changeTemperatureUnit(unit) {
  temperatures.forEach(t => {
    t.setUnit(unit)
  })
}
export function removeTemperature(id) {
  let index = temperatures.findIndex(t => {
    return t.id === id
  })
  temperatures.splice(index, 1)
}

//从缓存里加载上次添加的数据
const cacheData = localStorage.getItem(cacheKey)
cacheData &&
  cacheData.split(',').forEach((location, index) => {
    fetchTemperature(location, 'load')
  })
