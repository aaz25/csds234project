const url = 'https://covid.ourworldindata.org/data/owid-covid-data.json';

fetch(url).then(response => {
  response.json().then(json => {
    const json = json;
  });
});