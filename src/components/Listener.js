import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const url = 'https://covid.ourworldindata.org/data/owid-covid-data.csv';

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
        continent: d.continent,
        location: d.location
      };

      if (Math.floor((new Date().getDate() - r.date) / (1000 * 60 * 60 * 24)) < 7) {
        return r;
      }
    };

    csv(url, row).then(setData);
  }, []);

  return data;
};

// import moment from 'moment';
// import { useState } from 'react';

// const useData = () => {
//   const [data, setData] = useState(null);
//   const url = 'https://covid.ourworldindata.org/data/owid-covid-data.json';

//   fetch(url).then(response => {
//     response.json().then(json => {
//       console.log(json);
//       //console.log(json)
//       // console.log(new Date().toISOString().slice(0, 10))
//       //  console.log(new Date(json.ABW.data[0].date).toISOString().slice(0, 10))
//       const date1 = new Date().toISOString().slice(0, 10)
//       var arr = []
//       for (var property in json) {
//         // console.log(json[property].data)
//         for (let j = 0; j < json[property].data.length; j++) {
//           var date2 = new Date(json[property].data[j].date).toISOString().slice(0, 10);
//           //console.log(date2)
//           var a = moment(date1, 'YYYY-MM-DD');
//           var b = moment(date2, 'YYYY-MM-DD');
//           var diffDay = b.diff(a, 'days');
//           if (diffDay <= 0 && diffDay > -8) {
//             var temp = {}
//             json[property].date = date2
//             temp.date = json[property].date
//             temp.data = json[property].data
//             temp.location = json[property].location
//             temp.continent = json[property].continent
//             arr.push(temp)
//           }
//         }
//       }
//       setData(arr);
//     });
//   })
//   // console.log(data);
//   return data;
// };

// export default useData;

