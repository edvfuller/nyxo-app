import { ScaleTime } from 'd3'
import { format } from 'date-fns'
import React, { memo, FC } from 'react'
import { G, Line, Text } from 'react-native-svg'
import styled from 'styled-components/native'

interface Props {
  chartWidth: number
  scaleY: ScaleTime<unknown, number>
  ticks: Date[]
}

const YTicks: FC<Props> = ({ chartWidth, scaleY, ticks }) => {
  const timeTicks = ticks.map((tick, index) => {
    return (
      <G key={index}>
        <TickLine
          strokeWidth={0.25}
          x1={40}
          x2={chartWidth}
          y1={scaleY(tick)}
          y2={scaleY(tick)}
        />
        <StyledText
          alignmentBaseline="middle"
          key={index}
          x={5}
          y={scaleY(tick)}>
          {format(tick, 'HH:mm')}
        </StyledText>
      </G>
    )
  })

  return <G>{timeTicks}</G>
}

export default memo(YTicks)

const TickLine = styled(Line).attrs(({ theme }) => ({
  stroke: theme.SECONDARY_TEXT_COLOR
}))``

const StyledText = styled(Text).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR
}))``
