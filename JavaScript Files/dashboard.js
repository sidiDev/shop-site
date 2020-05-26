// get chart-line canvas id
let chartLine = document.getElementById('chart-line').getContext('2d');

// use Chart js library in chartLine
let lineChart = new Chart(chartLine, {
    type: 'line',
    data: {
        labels: ['America','Rusia','China','France','Island'],
        datasets: [{
            label: 'Sales',
            data: [950,570,400,600,200,250],
            backgroundColor: '#4169e1'
        }]
    }
})

// get chart-circel canvas id
let chartCircel = document.getElementById('chart-circel').getContext('2d');

// use Chart js library in chartCircel
let circelChart = new Chart(chartCircel, {
    type: 'doughnut',
    data: {
        labels: ['America','Egypt','Tunis','Island','France','Rusia','China'],
        datasets: [{
            label: 'Email Subscriptions',
            data: [1000,120,90,2509,1200,1200,500],
            backgroundColor: ['#4169e1','#008b8b','#e53935','#663399','#ff69b4','#2400CE','#41CE44']
        }]
    }
})


// get seles total
let salesTotal = lineChart.data.datasets[0].data.reduce((acc,val) => acc + val,0);

// put sales total in span element
document.querySelector('.e-shop-statics-line span')
.textContent = `Sales Total: ${salesTotal}`;

// get Email total
let emailTotal = circelChart.data.datasets[0].data.reduce((acc,val) => acc + val,0);

// put Email total in span element
document.querySelector('.e-shop-statics-circel span')
.textContent = `Email Total: ${emailTotal}`;

let navigationLinks = document.querySelector('.navigation-links');

function openClaoseMenu () {

    navigationLinks.classList.toggle('open-and-close-menu')

}

// when click show search form
function showSearch () {

    document.querySelector('.search-container-in-small-devices')
    .classList.add('show-search-form');

    // Get hidden button class // when click hide search form
    document.querySelector('.search-container-in-small-devices-container img')
    .addEventListener('click' , () => {

        document.querySelector('.search-container-in-small-devices')
        .classList.remove('show-search-form');
    })
}