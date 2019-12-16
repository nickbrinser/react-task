import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import LineChart from './components/lineChart/LineChart'
import HistChart from './components/barChart/HistChart'
import { InputAlert } from './components/inputAlert/InputAlert'
import { Message } from 'semantic-ui-react'
import { ReactComponent as Loading } from './assets/graph-visual.svg'

import './App.css'

const socket = socketIOClient()

function App () {
  const [response, setResponse] = useState(false)
  const [alertField, setAlert] = useState('')
  const [lineChartData, setLine] = useState({
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
  })
  const [barChartData, setBar] = useState({
    data: []
  })
  const [currentValue, setCurrent] = useState()

  useEffect(() => {
    socket.on('data', res => {
      const y = new Date(res.timestamp).toLocaleTimeString()
      const x = res.value
      setLine((prevState) => ({
        ...prevState,
        labels: [...prevState.labels, y],
        datasets: [{ ...prevState.datasets[0], data: [...prevState.datasets[0].data, x] }]
      }))

      setBar((prevState) => ({
        ...prevState,
        data: [...prevState.data, x]
      }))
      setCurrent(res.value)
      setResponse(true)
    })
    socket.on('disconnect', () => {
      socket.disconnect()
      setResponse(false)
      console.log('disconnected from server')
    })
  }, [])
  const handleChange = (e) => {
    setAlert({
      alertField: e.target.value
    })
  }
  return (

    <div style={{ textAlign: 'center' }}>
      {response ? (
        <div>
          <div className='card-list'>
            <div className='card-container'>
              <LineChart
                data={lineChartData}
              />
            </div>
            <div className='card-container'>
              <HistChart
                data={barChartData.data}
              />
            </div>
          </div>
          <InputAlert
            placeholder='Alert Threshold'
            handleChange={handleChange}
          />
          {currentValue > parseInt(alertField.alertField) && alertField !== '' ? (
            <div className='alert-message'>
              <Message color='red' size='huge'>
                {' '}
                Threshold Exceeded {alertField.alertfield}!
              </Message>
            </div>
          ) : null}
        </div>
      ) : (
        <Loading className='graph-visual' />
      )}
    </div>
  )
}

export default App
