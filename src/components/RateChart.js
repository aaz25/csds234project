import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, CartesianGrid, Line, XAxis, YAxis, Label, Tooltip, ResponsiveContainer } from 'recharts';
import { format, timeFormat } from 'd3';
import Title from './Title';

const xTickFormat = timeFormat('%m/%d');

const yTickFormat = format('.2s');

export default function RateChart({ title, data, y, yAxisLabel }) {
  const theme = useTheme();

  // if (data.location === 'All') {
  //   data = data.reverse();
  // }

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            tickFormatter={xTickFormat}
          />
          <YAxis datakey={y} stroke={theme.palette.text.secondary} tickFormatter={yTickFormat} >
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              {yAxisLabel}
            </Label>
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey={y} stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}