// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Factory Function

pAequorFactory = (num, dna) => {
  return {
    specimenNum: num,
    dna: dna,
    mutate() {
      const newBase = returnRandBase();
      const randBaseIndex = Math.floor(Math.random() * dna.length);
      if (randBaseIndex !== newBase) {
        dna.splice(randBaseIndex, 1, newBase);
        console.log(newBase);
      }
    },
    compareDNA(pAequor) {
      console.log(`Specimen Number: ${this.specimenNum} DNA: ${this.dna}`);
      console.log(`Specimen Number: ${pAequor.specimenNum} DNA: ${pAequor.dna}`);
      let count = 0;
        for (i = 0; i < pAequor.dna.length; i++) {
          if (pAequor.dna[i] === this.dna[i]) {
            count++;
          }
        }
      console.log(`DNA matches found: ${count}`); 
      console.log(`Percentage: ${Math.floor(100 * count / dna.length)}`);
    },
    willLikelySurvive() {
      let percG = 0;
      let percC = 0;
      this.dna.forEach((element) => {
        if (element === 'G') {
          percG++;
        } else if (element === 'C') {
          percC++;
        }
      })
      /*/↓↓check method to console↓↓\\
      console.log(this.dna); //Print the dna strand being examined
      console.log(`G count: ${percG} Percentage: ${Math.floor(100 * percG / this.dna.length)} Pass/Fail: ${Math.floor(100 * percG / this.dna.length) >= 60 ? true : false}`); //Print outcomes for G matches
      console.log(`C count: ${percC} Percentage: ${Math.floor(100 * percG / this.dna.length)} Pass/Fail: ${Math.floor(100 * percC / this.dna.length) >= 60 ? true : false}`); //Print outcomes for C matches */
      
      if (Math.floor(100 * percG / this.dna.length) >= 60  === true || Math.floor(100 * percC / this.dna.length) >= 60 === true) {
        return true;
      } else {
        return false;
      }
    }
  }
}

let pAequor1 = pAequorFactory(1, mockUpStrand());
let pAequor2 = pAequorFactory(2, mockUpStrand());

const findPassingStrands = () => {
  const passedStrands = [];
  let count = 0;
  let num = 1;
  while(count < 30) {
    let generateStrand = pAequorFactory(num, mockUpStrand());
    if (generateStrand.willLikelySurvive() === true) {
      passedStrands.push(generateStrand);
      count++;
      num++;
    }
  }
  console.log(passedStrands);
}

//↓↓Method Tests↓↓\\
findPassingStrands();
pAequor1.willLikelySurvive();
pAequor1.compareDNA(pAequor2);
console.log(pAequorFactory(1, mockUpStrand()));
console.log(pAequor1.dna);
pAequor1.mutate();
console.log(pAequor1.dna);






