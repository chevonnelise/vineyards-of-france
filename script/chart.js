const options = {
    chart: {
      type: 'line',
      height: "100%"
    },
    series:[
  
    ],
    noData: {
      "text":"Loading..."
    }
  }
  
  // create the chart
  const chart = newApexCharts (document.querySelector('#chart'), options);
  
  // render chart
  chart.render()
  
  window.addEventListener("DOMContentLoaded", async function(){
    const data = await loadData("https://gist.githubusercontent.com/ajubin/d331f3251db4bd239c7a1efd0af54e38/raw/058e1ad07398fc62ab7f3fcc13ef1007a48d01d7/wine-data-set.json");
    const series = transformData(data);
    chart.updateSeries([
      {
        "name":"country",
        "data": series
      }
    ])
  })
  
  const provinceLabels = ["Rhône Valley", "Loire Valley", "Bordeaux", "Burgundy", "Provence", "Alsace", "Champagne","Beaujolais","Southwest France","France Other","Languedoc-Roussillon"];
  
  async function loadData(url){
    const response = await axios.get(url);
    return response.data;
  }
  
  // data parameter 
  function transformData(data){
    const wineries = data.map(function(dataPoint){
      return{
        country: dataPoint.country,
        province: dataPoint.province,
        winery: dataPoint.winery
      }
    })
  }
  
  // filtering
  const shortlisted = wineries.filter(function(dataPoint){
    if(dataPoint.country() == France){
      return true;
    } else {
      return false;
    }
  })
  console.log(shortlisted);
  
  //Grouping
  
  const country = {
    "0": [],
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
    "7": [],
    "8": [],
    "9": [],
    "10": [],
    "11": [],
  }
  
  for (let dataPoint of shortlisted) {
    const countryIndex = dataPoint.getCountry();
    country[countryIndex].push(dataPoint);
  }
  
  const series = [];
  // to go through an object one key at a time, use `for ... in`
  
  // the outer for loop go through one month at a time
  for (let countryKey in country) {
    const dataPoints = country[countryKey];
    let total = 0;
    // the inner for loop calculate the total of all the amount for one month (depending on the value of monthKey)
    for (let d of dataPoints) {
        total = total + d.amount;
    }
    series.push({
        x: provinceLabels[countryKey],
        y: total/100
    })
  }
  
  console.log(series);
  return series;