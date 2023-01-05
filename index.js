const Keyboard = require("./solution/Keyboard.js")
const GA = require("./solution/GA.js")
const fs = require("fs");


const NUMBER_OF_ITERATIONS = 50;
const POPULATION_SIZE = 300;
const ELITE = 30;
const MUTATION_PR = 0.3

let theBest;

var dataset = fs.readFileSync("./dataset.txt", "utf-8");

// dvorak();
const time = qwerty();
console.log(`${(time * NUMBER_OF_ITERATIONS * POPULATION_SIZE) / 1000 / 60} min`);
dvorak();
run();

function qwerty() {
  const start = Date.now();
  test = new Keyboard("qwertyuiopasdfghjkl:zxcvbnm,.?")
  test.calculateFitness(dataset);
  console.log("qwerty", test.fitness);
  return Date.now() - start;
}
function dvorak() {
  const start = Date.now();
  test = new Keyboard("?,.pyfgcrlaoeuidhtns;qjkxbmwvz")
  test.calculateFitness(dataset);
  console.log(test.fitness);
  console.log(`dvorak run for ${Date.now() - start} ms`);
}

function run() {
  const start = Date.now();
  let population = GA.getRandomPopulation(POPULATION_SIZE);
  let allPops = []

  for (let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
    let sum = 0;
    population.map((element) => {
      element.calculateFitness(dataset)
      sum += element.fitness;
      return element.fitness;
    })
    const sorted = population.sort(function (a, b) {
      return a.fitness - b.fitness
    });
    const average = sum / POPULATION_SIZE;
    allPops.push({ fittest: sorted[0], average: average });
    population = GA.getNextPopulation(population, ELITE, MUTATION_PR, POPULATION_SIZE);
  }

  let sum = 0
  population.map((element) => {
    element.calculateFitness(dataset)
    sum += element.fitness;
    return element.fitness;
  })
  const sorted = population.sort(function (a, b) {
    return a.fitness - b.fitness
  });
  const average = sum / POPULATION_SIZE;
  allPops.push({ fittest: sorted[0], average: average });
  let data = JSON.stringify(allPops);
  fs.writeFileSync("data.json", data)
  theBest = sorted[0];
  console.log(sorted[0]);
  console.log(`${Date.now() - start} ms`);
}

