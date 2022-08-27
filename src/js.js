import cardsDataBLUE from "./index.js";
import cardsDataBROWN from "./index copy.js";
import cardsDataGREEN from "./index copy 2.js";
import ancientsData from "./ancients.js";

let changeCard = document.querySelector(".changeCard");
// let card = document.querySelector(".card");
let cardImg = document.querySelector(".card__img");
let shuffle = document.querySelector(".shuffle__button");

let objBLUE = [];
let objBROWN = [];
let objGREEN = [];
let stage = [];

let stagesArrayCards = [[], [], []];

let firstStageCards = [];
let secondStageCards = [];
let thirdStageCards = [];

function severalRandom(min, max, num) {
  let i,
    arr = [],
    res = [];

  for (i = min; i <= max; i++) arr.push(i);

  for (i = 0; i < num; i++)
    res.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);

  return res;
}

const shaffleCard = () => {
  objBLUE = severalRandom(0, cardsDataBLUE.length - 1, 2).map((i) => {
    return cardsDataBLUE[i];
  });

  objBROWN = severalRandom(0, cardsDataBROWN.length - 1, 9).map((i) => {
    return cardsDataBROWN[i];
  });

  objGREEN = severalRandom(0, cardsDataGREEN.length - 1, 5).map((i) => {
    return cardsDataGREEN[i];
  });

  cardsStage(ancientsData, "firstStage", firstStageCards);
  cardsStage(ancientsData, "secondStage", secondStageCards);
  cardsStage(ancientsData, "thirdStage", thirdStageCards);

  stagesArrayCards = [firstStageCards, secondStageCards, thirdStageCards];
};

const cardsStage = (ancientsData, Stage, stagecards) => {
  for (let i = 0; i < ancientsData[0][Stage].greenCards; i++) {
    stage.push(objGREEN[0]);
    stagecards.push(objGREEN[0]);
    objGREEN.shift(0);
  }
  for (let i = 0; i < ancientsData[0][Stage].brownCards; i++) {
    stage.push(objBROWN[0]);
    stagecards.push(objBROWN[0]);
    objBROWN.shift(0);
  }
  for (let i = 0; i < ancientsData[0][Stage].blueCards; i++) {
    stage.push(objBLUE[0]);
    stagecards.push(objBLUE[0]);
    objBLUE.shift(0);
  }
};

let numberPictureOut = 0;
let numberStageOut = 0;
let numberArrStage = [];

function changeCards(stageOder, numberPicture, numberStage) {
  //  console.log(numberArrStage.length)

  if (numberArrStage.length === 0) {
    numberArrStage = severalRandom(
      0,
      stageOder[numberStage].length - 1,
      stageOder[numberStage].length
    );
  }
  console.log(
    "#PICT=",
    numberPicture,
    "  #stageOder[numberStage].length=",
    stageOder[numberStage].length
  );
  if (numberPicture > stageOder[numberStage].length - 1) {
    cardImg.src = "assets/mythicCardBackground.png";
    document.querySelector(
      `.nameStage${numberStage}`
    ).innerHTML = `закончилась стадия - ${numberStage + 1}`;
    numberArrStage = [];
    numberPictureOut = 0;
    numberStageOut++;

    if (numberStageOut >= stageOder.length) {
      cardImg.src = "assets/mythicCardBackground.png";
     
      changeCard.style.display = "none";
      numberStageOut = 0;
      stagesArrayCards = [];
      firstStageCards = [];
      secondStageCards = [];
      thirdStageCards = [];
      numberArrStage=[]
    }
  } else {
    cardImg.src =
      stageOder[numberStage][numberArrStage[numberPicture]].cardFace;
    numberPictureOut++;
  }
}

function removeValues() {
  
  for (let i = 0; i < 3; i++) {
    document.querySelector(`.nameStage${i}`).innerHTML = ``;
  }
}

shuffle.addEventListener("click", () => {
  // document.querySelector('.nameStage').remove()
removeValues();

  shaffleCard();
  changeCard.style.display = "block";

  

  // console.log(numberArrStage);
  // console.log(numberStageOut);
  // console.log(numberPictureOut);
  // console.log(stagesArrayCards);
  // console.log(firstStageCards);
  // console.log(secondStageCards);
  // console.log(thirdStageCards);

});
 changeCard.addEventListener("click", () => {
    
    changeCards(stagesArrayCards, numberPictureOut, numberStageOut);
  });
// ancientsData.forEach((i,index)=>{
//   if(i.id=='shubNiggurath'){
//     return console.log(index)
//   }
// })
