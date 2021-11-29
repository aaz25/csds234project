import moment from 'moment'

const exporter = function (){
const url = 'https://covid.ourworldindata.org/data/owid-covid-data.json';

fetch(url).then(response => {
  response.json().then(json => {
    console.log(json);
    console.log(json.ABW)
   // console.log(new Date().toISOString().slice(0, 10))
  //  console.log(new Date(json.ABW.data[0].date).toISOString().slice(0, 10))
    const date1 = new Date().toISOString().slice(0, 10)
    var arr = []
    for (const property in json){
       // console.log(json[property].data)
        for(let j = 0 ; j < json[property].data.length; j++){
        var date2 = new Date(json[property].data[j].date).toISOString().slice(0, 10);
        console.log(date2)
        var a = moment(date1,'YYYY-MM-DD');
        var b = moment(date2,'YYYY-MM-DD');
        var diffDay = b.diff(a, 'days');
        if (diffDay <=0 && diffDay > -8){
            arr.push(json[property].data[j])
        }
    }
}
    console.log(arr)

  });
})};

export default exporter;

