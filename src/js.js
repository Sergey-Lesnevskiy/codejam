import cardsDataBLUE from "./index.js";
import cardsDataBROWN from "./index copy.js";
import cardsDataGREEN from "./index copy 2.js";
import ancientsData from "./ancients.js";

let changeCard = document.querySelector(".changeCard");
// let card = document.querySelector(".card");
let cardImg = document.querySelector(".card__img");
let shuffle = document.querySelector(".shuffle__button");
let ancients = document.querySelector(".ancients");



let objBLUE = [];
let objBROWN = [];
let objGREEN = [];
let stage = [];

let stagesArrayCards = [[], [], []];

let firstStageCards = [];
let secondStageCards = [];
let thirdStageCards = [];


let targetClickId = ''
let dataArray = []

function severalRandom(min, max, num) {
  let i,
    arr = [],
    res = [];

  for (i = min; i <= max; i++) arr.push(i);

  for (i = 0; i < num; i++)
    res.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);

  return res;
}


function dataFromAncients (id){
  ancientsData.forEach((i, index)=>{
    if( i.id ===id){
     dataArray = [index, i.allNumbers]
    }

   })
}

const shaffleCard = (data) => {

  objBLUE = severalRandom(0, cardsDataBLUE.length - 1, data[1].blue).map((i) => {
    return cardsDataBLUE[i];
  });

  objBROWN = severalRandom(0, cardsDataBROWN.length - 1, data[1].brown).map((i) => {
    return cardsDataBROWN[i];
  });

  objGREEN = severalRandom(0, cardsDataGREEN.length - 1, data[1].green).map((i) => {
    return cardsDataGREEN[i];
  });

  cardsStage(ancientsData[data[0]], "firstStage", firstStageCards);
  cardsStage(ancientsData[data[0]], "secondStage", secondStageCards);
  cardsStage(ancientsData[data[0]], "thirdStage", thirdStageCards);

  stagesArrayCards = [firstStageCards, secondStageCards, thirdStageCards];
};

const cardsStage = (ancientsData, Stage, stagecards) => {
  for (let i = 0; i < ancientsData[Stage].greenCards; i++) {
    stage.push(objGREEN[0]);
    stagecards.push(objGREEN[0]);
    objGREEN.shift(0);
  }
  for (let i = 0; i < ancientsData[Stage].brownCards; i++) {
    stage.push(objBROWN[0]);
    stagecards.push(objBROWN[0]);
    objBROWN.shift(0);
  }
  for (let i = 0; i < ancientsData[Stage].blueCards; i++) {
    stage.push(objBLUE[0]);
    stagecards.push(objBLUE[0]);
    objBLUE.shift(0);
  }
};

let numberPictureOut = 0;
let numberStageOut = 0;
let numberArrStage = [];

function changeCards(stageOder, numberPicture, numberStage) {


  if (numberArrStage.length === 0) {
    numberArrStage = severalRandom(
      0,
      stageOder[numberStage].length - 1,
      stageOder[numberStage].length
    );
  }
 
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
      ancients.addEventListener('click',changeAncients)
      shuffle.addEventListener("click", shuffleButtonBlock);
      changeCard.style.display = "none";
      shuffle.style.display = "none";
      numberStageOut = 0;
      stagesArrayCards = [];
      firstStageCards = [];
      secondStageCards = [];
      thirdStageCards = [];
      numberArrStage=[];
      stage = [];
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

function changeAncients(event){
  shuffle.style.display = "block";
  
  if(changeCard.style.display === "block") {
      this.removeEventListener('click',changeAncients);
  }else{
    if(targetClickId){
    document.getElementById(`${targetClickId}`).classList.remove('active')
       targetClickId=event.target.id
      event.target.className += " active"
    }else{
event.target.className += " active"
targetClickId = event.target.id 
    }
  }
    }

    function setSessionStorage(){
      sessionStorage.setItem(`${targetClickId}`,JSON.stringify(stage))
      console.log(sessionStorage.getItem(`${targetClickId}`));
    }

function shuffleButtonBlock(){

  if(changeCard.style.display === "block"){
    this.removeEventListener("click", shuffleButtonBlock);
  }else{
      dataFromAncients(targetClickId)
   removeValues();
   shaffleCard(dataArray);
  changeCard.style.display = "block";
  setSessionStorage()
  }
}


ancients.addEventListener('click',changeAncients)

shuffle.addEventListener("click", shuffleButtonBlock);

 changeCard.addEventListener("click", () => {
    
    changeCards(stagesArrayCards, numberPictureOut, numberStageOut);
  });

 
 



