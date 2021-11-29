import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, CartesianGrid, Line, XAxis, YAxis, Label, Tooltip, ResponsiveContainer } from 'recharts';
import { timeFormat } from 'd3';
import Title from './Title';

const xTickFormat = timeFormat('%m/%d');

export default function RateChart({ title, data, y, yAxisLabel = 'Rate (per 100,000)' }) {
  const theme = useTheme();

  for (let i = 0; i < data.length; i++) {
    data[i].date = xTickFormat(data[i].date);
  }

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
            // tickFormatter={xTickFormat}
          />
          <YAxis datakey={y} stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              {yAxisLabel}
            </Label>
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="rate" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}