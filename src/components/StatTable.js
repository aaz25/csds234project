import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { format, min, mean, median, max, quantile } from 'd3';
import Title from './Title';

const form = format(',.2r');

export default function StatTable({ data }) {
  return (
    <>
      <Title>Statistics</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Statistic</TableCell>
            <TableCell>Minimum</TableCell>
            <TableCell>Q1</TableCell>
            <TableCell>Median</TableCell>
            <TableCell>Mean</TableCell>
            <TableCell>Q3</TableCell>
            <TableCell>Maximum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody align='right'>
          <TableRow>
            <TableCell align='left'>New cases</TableCell>
            <TableCell>{form(min(data, d => d.new_cases))}</TableCell>
            <TableCell>{form(quantile(data.map(d => d.new_cases), 0.25))}</TableCell>
            <TableCell>{form(median(data, d => d.new_cases))}</TableCell>
            <TableCell>{form(mean(data, d => d.new_cases))}</TableCell>
            <TableCell>{form(quantile(data.map(d => d.new_cases), 0.75))}</TableCell>
            <TableCell>{form(max(data, d => d.new_cases))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left'>New cases per million people</TableCell>
            <TableCell>{form(min(data, d => d.new_cases_per_million))}</TableCell>
            <TableCell>{form(quantile(data.map(d => d.new_cases_per_million), 0.25))}</TableCell>
            <TableCell>{form(median(data, d => d.new_cases_per_million))}</TableCell>
            <TableCell>{form(mean(data, d => d.new_cases_per_million))}</TableCell>
            <TableCell>{form(quantile(data.map(d => d.new_cases_per_million), 0.75))}</TableCell>
            <TableCell>{form(max(data, d => d.new_cases_per_million))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left'>Total cases</TableCell>
            <TableCell>{form(min(data, d => d.total_cases))}</TableCell>
            <TableCell>{form(quantile(data.map(d => d.total_cases), 0.25))}</TableCell>
            <TableCell>{form(median(data, d => d.total_cases))}</TableCell>
            <TableCell>{form(mean(data, d => d.total_cases))}</TableCell>
            <TableCell>{form(quantile(data.map(d => d.total_cases), 0.75))}</TableCell>
            <TableCell>{form(max(data, d => d.total_cases))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left'>Total cases per million people</TableCell>
            <TableCell>{form(min(data, d => d.total_cases_per_million))}</TableCell>
            <TableCell>{form(quantile(data.map(d => d.total_cases_per_million), 0.25))}</TableCell>
            <TableCell>{form(median(data, d => d.total_cases_per_million))}</TableCell>
            <TableCell>{form(mean(data, d => d.total_cases_per_million))}</TableCell>
            <TableCell>{form(quantile(data.map(d => d.total_cases_per_million), 0.75))}</TableCell>
            <TableCell>{form(max(data, d => d.total_cases_per_million))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left'>New deaths</TableCell>
            <TableCell>{form(min(data, d => d.new_deaths))}</TableCell>
            <TableCell>{form(quantile(data.map(d => d.new_deaths), 0.25))}</TableCell>
            <TableCell>{form(median(data, d => d.new_deaths))}</TableCell>
            <TableCell>{form(mean(data, d => d.new_deaths))}</TableCell>
            <TableCell>{form(quantile(data.map(d => d.new_deaths), 0.75))}</TableCell>
            <TableCell>{form(max(data, d => d.new_deaths))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='left'>New deaths per million people</TableCell>
            <TableCell>{form(min(data, d => d.new_deaths_per_million))}</TableCell>
            <TableCell>{form(quantile(data.map(d => d.new_deaths_per_million), 0.25))}</TableCell>
            <TableCell>{form(median(data, d => d.new_deaths_per_million))}</TableCell>
            <TableCell>{form(mean(data, d => d.new_deaths_per_million))}</TableCell>
            <TableCell>{form(quantile(data.map(d => d.new_deaths_per_million), 0.75))}</TableCell>
            <TableCell>{form(max(data, d => d.new_deaths_per_million))}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
};