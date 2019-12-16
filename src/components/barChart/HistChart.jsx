import React from 'react'
import {
  Histogram,
  BarSeries,
  XAxis,
  YAxis,
  withParentSize
} from '@data-ui/histogram'
import { chartTheme } from '@data-ui/theme'

const ResponsiveHistogram = withParentSize(
  ({ parentWidth, ...rest }) => (
    <Histogram
      width={parentWidth}
      height={parentWidth * 0.5}
      {...rest}
    />

  )

)

const HistChart = (props) => {
  const maxYValue = Math.max(...props.data.map(d => d.count))

  return (
    <ResponsiveHistogram
      theme={chartTheme}
      ariaLabel='Histogram'
      orientation='vertical'
      valueAccessor={datum => datum}
      binType='numeric'
      binCount={22}
      renderTooltip={({ event, datum, data, color }) => (
        <div>
          <strong style={{ color: chartTheme.colors.categories[3] }}>
            {datum.bin0} to {datum.bin1}
          </strong>
          <div>
            <strong>count: </strong>
            {datum.count}
          </div>
        </div>
      )}
    >
      <BarSeries
        stroke={chartTheme.colors.categories[3]}
        fillOpacity={0.15}
        fill='rgb(202, 230, 151)'
        rawData={props.data}
      />
      <XAxis color='rgb(202, 230, 151)' />
      <YAxis label='Count' yDomain={[0, maxYValue]} />
    </ResponsiveHistogram>
  )
}

export default HistChart
