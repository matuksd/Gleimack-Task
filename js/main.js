const api_url = 'https://blumlinge2.herokuapp.com/api/smallbouquet/?format=json';
const proxyurl = "https://cors-anywhere.herokuapp.com/";

let data = {};
let filteredData = {};

let sortedList = true;

let graphData = [0,0,0,0,0,0,0,0,0,0];

async function init() {
    const response = await fetch(proxyurl + api_url);

    data = await response.json();

    filteredData = data;

    filteredData.forEach(x => {
        graphData[x.price]++;
    });

    sortList();
    drawGraph(graphData);
}

async function filterList() {
    const checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');

    const maxValue = $('#second-value').val();
    const minValue = $('#first-value').val() -1;

    graphData = graphData.map(x => x = 0);

    let checkedTypes = [];
    
    checkedBoxes.forEach(x => { checkedTypes.push(x.name) });

    filteredData =  data.filter(x => checkedTypes.includes(x.type) && (x.price < maxValue && x.price > minValue));

    filteredData.forEach(x => { graphData[x.price]++; });

    drawFlowers(filteredData);
    drawGraph(graphData);
}

function sortList() {
    sortedList = !sortedList;

    $('.price-symbol').html(sortedList ? '∧' : '∨');

    filteredData.sort((a,b) => sortedList ? (a.price - b.price) : (b.price - a.price));

    drawFlowers(filteredData);
}

function drawFlowers(array) {
    html = "";

    array.forEach(x => {
        html += '<div class="col-5 ml-5 mb-5 border p-3 flower-box px-0">';
        html += '<div class="flower-details '+x.color+'">';
        html += '<h1 class="flower-type ml-3">' + x.type + '</h1>';
        html += '<h1 class="flower-name ml-3">' + x.name + '</h1>';
        html += '</div>';
        html += '<div class="text-center">';
        html += '<img src="./images/' + x.picture + '" alt="A Flower Bouquet" width="150px" !important; height="150px" !important; />';
        html += '</div>';
        html += '<div class="mt-2 ml-3">';
        html += '<span class="price-tag">Price</span>';
        html += '<p class="flower-price font-weight-bold">$ ' + x.price + '</p>';
        html += '</div>';
        html += '</div>';
    });

    $('.flower-list').html(html);
}

$(document).ready(function() {
    $(document).foundation();
    init();
 });

function drawGraph(data) {
    html = "";

    data.forEach(x => {
        html += '<span class="bar size-'+(x > 9 ? 'max' : x)+'"></span>';
    });
    
    $('.graph').html(html);
}