import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: []
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                  ticks: {
                      suggestedMin: 30
                  }
              }]
          }
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            var psi_data = {};
            response.data.items.forEach(item => { 
                var dateObj = new Date(item['timestamp']);
                
                dateObj = dateObj.toString().slice(0,-38);
                this.datacollection.labels.push(dateObj);
                for (var region in item['readings']['psi_twenty_four_hourly']){
                    if (!(region in psi_data)){
                      psi_data[region] = []
                    }
                    psi_data[region].push(item['readings']['psi_twenty_four_hourly'][region])
                }
            })
            var colors = ["#C7CEEA", "#FF9AA2", "#FFB7B2","#FFDAC1","#E2F0CB","#B5EAD7"];
            var counter = 0;
            for (var region in psi_data){
              var current = {};
              current['data'] = psi_data[region];
              current['label'] = region;
              current['fill'] = false;
              current['borderColor'] = colors[counter];
              this.datacollection.datasets.push(current);
              counter++;
            }
        })
        .then(() => {
          this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}