'use strict';

// Global variables

let maxNumberOfRounds = 25;
let currentRound = 0;

let productArr = [];
let indexArr = [];

// DOM elements

let imageSection = document.querySelector('#image-section');
let image1 = document.querySelector('#image-section img:first-child');
let image2 = document.querySelector('#image-section img:nth-child(2)');
let image3 = document.querySelector('#image-section img:nth-child(3)');
let button = document.querySelector('section div');
let resultsList = document.querySelector('#results-list');


// constructors

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
}

// functions

function selectRandomProduct() {
  return Math.floor(Math.random() * productArr.length);
}

function renderProducts() {
  while (indexArr.length < 6) {
    let ranNum = selectRandomProduct();
    if (!indexArr.includes(ranNum)) {
      indexArr.push(ranNum);
    }
  }
  let product1 = indexArr.shift();
  let product2 = indexArr.shift();
  let product3 = indexArr.shift();
  // while (product1 === product2 || product1 === product3 || product2 === product3) {
  //   product2 = selectRandomProduct();
  //   product3 = selectRandomProduct();
  // }
  image1.src = productArr[product1].src;
  image2.src = productArr[product2].src;
  image3.src = productArr[product3].src;
  image1.alt = productArr[product1].name;
  image2.alt = productArr[product2].name;
  image3.alt = productArr[product3].name;
  productArr[product1].views++;
  productArr[product2].views++;
  productArr[product3].views++;
}

function handleProductClick(event) {
  console.log(event);
  currentRound++;
  let clickedProduct = event.target.alt;
  for (let i = 0; i < productArr.length; i++) {
    if (clickedProduct === productArr[i].name) {
      productArr[i].votes++;
      break;
    }
  }
  if (maxNumberOfRounds === currentRound) {
    imageSection.removeEventListener('click', handleProductClick);
    button.className = 'clicks-allowed';
    button.addEventListener('click', renderResults);
  } else {
    renderProducts();
  }
}

function renderResults() {
  renderList();
  renderChart();
}

function renderList() {
  console.log('results');
  for (let i = 0; i < productArr.length; i++) {
    let resultListItem = document.createElement('li');
    resultListItem.textContent=`${productArr[i].name} had ${productArr[i].votes} votes, and was seen ${productArr[i].views} times`;
    resultsList.appendChild(resultListItem);
  }
}

function renderChart() {
  let productLabelsNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < productArr.length; i++) {
    productLabelsNames.push(productArr[i].name);
    productVotes.push(productArr[i].votes);
    productViews.push(productArr[i].views);
  }


  const ctx = document.getElementById('myChart');
  const config = {
    type: 'bar',
    data: {
      labels: productLabelsNames,
      datasets: [
        {
          label: 'Number of Views',
          data: productViews,
          borderWidth: 2,
          backgroundColor: '#FEDA2A',
          borderColor: '#0B52FF',
          barThickness: 'flex',
          hoverBackgroundColor: '#0B52FF',
        },
        {
          label: 'Number of Votes',
          data: productVotes,
          borderWidth: 2,
          backgroundColor: '#FFA000',
          borderColor: '#0B52FF',
          barThickness: 'flex',
          hoverBackgroundColor: '#0B52FF',
        }
      ]
    },
    options: {
      scales: {
        y: {
          ticks: {
            color: 'black',
            beginAtZero: true
          }
        },
        x: {
          ticks: {
            color: 'black',
            beginAtZero: true
          }
        }
      }
    }
  };
  new Chart(ctx,config);
}

// executable code

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product ('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');

productArr.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderProducts();

// event listeners

imageSection.addEventListener('click', handleProductClick);

// Chart.js code
