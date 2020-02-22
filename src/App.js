import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import {
  fetchTemperature,
  changeTemperatureUnit,
  removeTemperature
} from './action/temperature'

@inject('request')
@observer
class MyForm extends React.Component {
  @observable input = '' //这里用观察的方式定义属性
  state = {
    hideError: false
  }
  onChangeInput = e => (this.input = e.target.value)
  onSubmit = () => {
    if (!this.input) return alert('请输入地址')
    fetchTemperature(this.input)
    this.input = ''
  }
  hideError = () => {
    this.props.request.error = null
  }
  render() {
    const { submiting, error } = this.props.request
    return (
      <div>
        地址：
        <input onChange={this.onChangeInput} value={this.input} />{' '}
        <button onClick={this.onSubmit}>添加{submiting ? '...' : ''}</button>
        {error && <span onClick={this.hideError}>{error}</span>}
      </div>
    )
  }
}

@inject('temperatures')
@inject('request') //通过inject的方式加载
@observer
class App extends React.Component {
  onChangeUnit = e => changeTemperatureUnit(e.target.value)
  onRemove = id => removeTemperature(id)
  render() {
    const { loading } = this.props.request
    return (
      <div>
        {/* temperatures 传递到子组件，分开不同文件可以减少inject的使用 */}
        <MyForm temperatures={this.props.temperatures} />
        <div>
          单位：
          <select onChange={this.onChangeUnit}>
            <option value="C">°C</option>
            <option value="K">°K</option>
            <option value="F">°F</option>
          </select>
        </div>
        <div>{loading ? '数据加载中' : ''}</div>
        <ul>
          {this.props.temperatures.map(t => {
            return (
              <div key={t.id}>
                {t.location + '：' + t.temperature}{' '}
                <span onClick={() => this.onRemove(t.id)}>&#12288;删除</span>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}
export default App
