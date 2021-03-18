import { Bar } from 'vue-chartjs'
import database from 'C:/Users/Louisa Tay/bt3103-week-7/src/firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                // label: "Population (millions)",
                backgroundColor: ["#FF9AA2", "#FFB7B2","#FFDAC1","#E2F0CB","#B5EAD7", "#C7CEEA"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                  ticks: {
                      suggestedMin: 0
                  }
              }]
          }
        }
    }
  },
  methods: {
    fetchItems: function () {

      // Add item names to labels
      // database.collection('menu').get().then(querySnapShot => {
      //   querySnapShot.forEach(doc => { 
      //     this.datacollection.labels.push(doc.data().name);
      //   })
      // });

      // database.collection('orders').get().then(querySnapShot => {
      //   querySnapShot.forEach(doc => { 
      //     var ordered = doc.data()['ordered'];
        
      //     for (var item in ordered){
      //       console.log("now: " + item + ordered[item]);
      //       if (!(item in this.datacollection.datasets[0].data)){
      //         this.datacollection.datasets[0].data[item] = 0;
      //       }
      //       this.datacollection.datasets[0].data[item] += ordered[item];
      //       console.log("added:" + item + this.datacollection.datasets[0].data[item]);
      //     }
      //     console.log(this.datacollection.datasets[0].data);
      //     console.log(Object.entries(this.datacollection.datasets[0].data))

      //   });

      var temp = {};
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
          var ordered = doc.data()['ordered'];
        
          for (var item in ordered){
            // console.log("now: " + item + ordered[item]);
            if (!(item in temp)){
              temp[item] = 0;
            }
            temp[item] += ordered[item];
            // console.log("added:" + item + temp[item]);
          }
        })
      })
      .then(() => {
        for (var item in temp){
        this.datacollection.labels.push(item);
        this.datacollection.datasets[0].data.push(temp[item]);
        }

        this.renderChart(this.datacollection, this.options);
      });
    }
  },
  created () {
    this.fetchItems()
  }
}
