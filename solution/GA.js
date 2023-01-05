const Keyboard = require("./Keyboard")

function mutate(keyboard) {
  //taking two random keys 
  const keyOne = Math.floor(Math.random() * 29) + 1;
  const keyTwo = Math.floor(Math.random() * 29) + 1;
  //exchanging values 
  let temp = keyboard[keyOne]
  keyboard[keyOne] = keyboard[keyTwo];
  keyboard[keyTwo] = temp;
  return keyboard;
}
function getNextPopulation(population, elite, mutationRate) {
  let newPopulation = [];
  //sort population by fitness 
  const sorted = population.sort(function (a, b) {
    return a.fitness - b.fitness
  });
  //take first the most successful individuals from population 
  let eliteList = []
  for (let i = 0; i < sorted.length; i++) {
    if (!eliteList.includes(sorted[i].stringLayout)) {
      eliteList.push(sorted[i].stringLayout);
      if (eliteList.length === elite) break;
    }
  }
  //add elite individuals to the next population 
  for (let i = 0; i < elite; i++) {
    newPopulation.push(new Keyboard(eliteList[i]))
  }
  for (let i = 0; i < population.length - elite; i++) {
    const selection = rouletteWheelSelection(sorted, elite);
    let child = crossover(selection.mother, selection.father)
    if (Math.random() <= mutationRate) {
      child = mutate(child)
    }
    newPopulation.push(new Keyboard(child));
  }
  return newPopulation;
}

function rouletteWheelSelection(population) {
  const size = population.length;
  let sum = 0;
  for (let i = 0; i < population.length; i++) {
    sum += (1 - (i * 1 / size));
  }
  mother = null;
  father = null;

  const motherPoint = Math.random() * sum;
  const fatherPoint = Math.random() * sum;
  cumSum = 0;
  for (let j = 0; j < size; j++) {
    const nextCumSum = cumSum + (1 - (j * 1 / size));
    if (nextCumSum > motherPoint && motherPoint > cumSum) {
      mother = population[j];
    }
    if (nextCumSum > fatherPoint && fatherPoint > cumSum) {
      father = population[j];
    }
    cumSum = nextCumSum;
  }
  if (mother === null || father === null) {
    throw new Error(`${sum}, ${motherPoint}, ${fatherPoint}`)
  }
  return { mother, father }
}

function crossover(mother, father) {
  let motherChromosome = "";
  let fatherChromosome = "";
  //inverting chromosomes to the vertical order
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 3; y++) {
      const index = y * 10 + x;
      motherChromosome += mother.stringLayout.charAt(index)
      fatherChromosome += father.stringLayout.charAt(index)
    }
  }
  //finding a random cross point
  const crossPoint = Math.floor(Math.random() * 29);
  //setting first part of chromosomes to the child from mother 
  let crossover = motherChromosome.slice(0, crossPoint);
  fatherChromosome = fatherChromosome.slice(crossPoint) + fatherChromosome.slice(0, crossPoint)
  let a = 0
  //exchanging a chromosomes from father to child 
  for (let i = 0; i < fatherChromosome.length; i++) {
    if (!crossover.includes(fatherChromosome.charAt(i))) {
      crossover += fatherChromosome.charAt(i)
    }
  }
  //inverting a chromosome to the horizontal order 
  let child = ""
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 10; y++) {
      child += crossover.charAt(y * 3 + x);
    }
  }
  return child;
}
function getRandomPopulation(size) {
  const str = "qwertyuiopasdfghjkl:zxcvbnm,.?"
  let population = []
  //mixing a string
  for (let i = 0; i < size; i++) {
    population.push(new Keyboard(str.split('').sort(function () { return 0.5 - Math.random() }).join('')))
  }
  return population;
}
module.exports = { mutate, crossover, getNextPopulation, getRandomPopulation }