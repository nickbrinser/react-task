import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import SocketMock from 'socket.io-mock'
import App from './App'
import HistChart from './components/barChart/HistChart'
import LineChart from './components/lineChart/LineChart'


it('renders without crashing', () => {
  shallow(<App />)
})

describe('<HistChart /> with empty dataset', () => {
  const initialProps = {
    data: []
  }
  const container = shallow(<HistChart data={initialProps.data} />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})

describe('<LineChart /> with empty dataset', () => {
  const initialProps = {
    labels: [],
    datasets: [
      {
        label: 'Line Chart',
        backgrounColor: 'rgba(0,0,0,0)',
        borderColor: '#ffffff',
        pointBackgrounColor: 'rgb(202, 230, 151)',
        pointBorderColor: 'rgb(202, 230, 151)',
        borderWidth: '2',
        lineTension: 0.45,
        data: []
      }
    ]
  }
  const container = shallow(<LineChart data={initialProps} />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})

describe('fast and isolated socket tests', () => {
  it('Sockets should be able to talk to each other without a server', () => {
    const socket = new SocketMock()

    socket.on('message', (message) => {
      expect(message).toBe('Hello World')
    })
    socket.socketClient.emit('message', 'Hello World')
  })
})