import React, { useState, useEffect } from 'react';
import { csv, filter, sum } from 'd3';

const url = 'https://covid.ourworldindata.org/data/owid-covid-data.csv';

function sameDate(d, i) {
  if (d instanceof Date && i instanceof Date) {
    return d.getYear() === i.getYear() && d.getMonth() === i.getMonth() && d.getDate() === i.getDate();
  }
  else {
    return false;
  }
}

export default function useData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {

      const r = {
        date: new Date(Date.UTC(new Date(d.date).getFullYear(), new Date(d.date).getMonth(), new Date(d.date).getDate())),
        total_cases: +d.total_cases,
        new_cases: +d.new_cases,
        new_deaths: +d.new_deaths,
        total_cases_per_million: +d.total_cases_per_million,
        new_cases_per_million: +d.new_cases_per_million,
        new_deaths_per_million: +d.new_deaths_per_million,
        population: +d.population,
        continent: d.continent,
        location: d.location
      };

      if (Math.floor((new Date() - r.date) / (1000 * 60 * 60 * 24)) < 12 &&
          Math.floor((new Date() - r.date) / (1000 * 60 * 60 * 24)) >= 2) {
        return r;
      }
    };

    csv(url, row).then(setData);
  }, []);

  return data;
};
