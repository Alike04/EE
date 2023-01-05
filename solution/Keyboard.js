class Keyboard {
  constructor(stringLayout) {
    this.stringLayout = stringLayout;

  }

  calculateFitness(dataset) {
    let totalDistance = 0
    dataset.split(" ").forEach((element) => {
      totalDistance += getDistance(element, this.stringLayout)
    })
    this.fitness = totalDistance;

    function getDistance(word, stringLayout) {
      const fingers = [
        new Finger(10, [0, 10, 20], "left-pinky"),
        new Finger(11, [1, 11, 21], "left-ring"),
        new Finger(12, [2, 12, 22], "left-middle"),
        new Finger(13, [3, 4, 13, 14, 23, 24], "left-point"),
        new Finger(16, [5, 6, 15, 16, 25, 26], "right-point"),
        new Finger(17, [7, 17, 27], "right-middle"),
        new Finger(18, [8, 18, 28], "right-ring"),
        new Finger(19, [9, 19, 29], "right-pinky"),
      ]
      let distance = 0;

      for (let i = 0; i < word.length; i++) {
        const key = stringLayout.indexOf(word[i].toLowerCase());
        if (key === -1) continue;
        fingers.forEach((element) => {
          if (element.isResponsible(key)) {
            const value = element.getMoveWeight(key);
            distance += value;
          }
        })
      }
      return distance;
    }
  }
}

class Finger {
  taps = [
    new Vector(3, 4, 1),
    new Vector(13, 14, 1),
    new Vector(23, 24, 1),
    new Vector(5, 6, 1),
    new Vector(15, 16, 1),
    new Vector(25, 26, 1),
    new Vector(0, 10, 1.032),
    new Vector(1, 11, 1.032),
    new Vector(2, 12, 1.032),
    new Vector(3, 13, 1.032),
    new Vector(4, 14, 1.032),
    new Vector(5, 15, 1.032),
    new Vector(6, 16, 1.032),
    new Vector(7, 17, 1.032),
    new Vector(8, 18, 1.032),
    new Vector(9, 19, 1.032),
    new Vector(10, 20, 1.118),
    new Vector(11, 21, 1.118),
    new Vector(12, 22, 1.118),
    new Vector(13, 23, 1.118),
    new Vector(14, 24, 1.118),
    new Vector(15, 25, 1.118),
    new Vector(16, 26, 1.118),
    new Vector(17, 27, 1.118),
    new Vector(18, 28, 1.118),
    new Vector(19, 29, 1.118),
    new Vector(16, 25, 1.118),
    new Vector(14, 23, 1.118),
    new Vector(0, 20, 2.138),
    new Vector(1, 21, 2.138),
    new Vector(2, 22, 2.138),
    new Vector(3, 23, 2.138),
    new Vector(4, 24, 2.138),
    new Vector(5, 25, 2.138),
    new Vector(6, 26, 2.138),
    new Vector(7, 27, 2.138),
    new Vector(8, 28, 2.138),
    new Vector(9, 29, 2.138),
    new Vector(4, 13, 1.247),
    new Vector(6, 15, 1.247),
    new Vector(3, 14, 1.605),
    new Vector(5, 16, 1.605),
    new Vector(5, 26, 2.661),
    new Vector(3, 24, 2.661),
    new Vector(6, 25, 2.015),
    new Vector(4, 23, 2.015),
    new Vector(13, 24, 1.803),
    new Vector(15, 16, 1.803),
  ]
  constructor(pivot, possiblePositions, name) {
    this.currentPosition = pivot;
    this.possiblePositions = possiblePositions
    this.name = name;
  }
  isResponsible(key) {
    return this.possiblePositions.includes(key);
  }
  getMoveWeight(key) {
    for (const element of this.taps) {
      if (element.compare(this.currentPosition, key)) {
        // console.log(`from ${this.currentPosition} to ${key} for ${element.getWeight()} by ${this.name}`);
        this.currentPosition = key;
        return element.getWeight();
      }
    }
    return 0;
  }
}

class Vector {
  constructor(from, to, weight) {
    this.from = from;
    this.to = to;
    this.weight = weight
  }
  compare(from, to) {
    return ((from === this.from && to === this.to) || (from === this.to && to === this.from))
  }
  getWeight() {
    return this.weight;
  }
}

module.exports = Keyboard 