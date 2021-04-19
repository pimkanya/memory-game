document.addEventListener('DOMContentLoaded',createGameBoard); //สร้าง event ให้กับตัว document ถ้า content ของ dom element load เสดแล้วให้เขียน boardgame

const cardArray = [
    {
        name: "condemn",
        image: "images/condemn.png" },
    {
        name: "condemn",
        image: "images/condemn.png" },
    {
        name: "flurry",
        image: "images/flurry.png" },
    {
        name: "flurry",
        image: "images/flurry.png" },
    {
        name: "kindling",
        image: "images/kindling.png" },
    {
        name: "kindling",
        image: "images/kindling.png" },
    {
        name: "pride",
        image: "images/pride.png" },
    {
        name: "pride",
        image: "images/pride.png" },
    {
        name: "sunwell",
        image: "images/sunwell.png" },
    {
        name: "sunwell",
        image: "images/sunwell.png" },
    {
        name: "tavish",
        image: "images/tavish.png" },
    {
        name: "tavish",
        image: "images/tavish.png" }
]


function createGameBoard() {
    let gameboard = document.getElementById('gameBoard')

    let gridContainer = document.createElement('div');
    gridContainer.className = 'grid';

    for(let i=0;i <12; i++){ // for loop เพื่อให้สร้าง card 12 card
        let item = document.createElement('div');
        item.className = 'item';

        let card = document.createElement('img');
        card.setAttribute('src','images/card_back.png');
        card.setAttribute('id',i);
        //card.setAttribute('onclick','flipCard()');
        card.addEventListener('click',flipCard); // เพราะ onclick เป็น event

        item.appendChild(card);
        gridContainer.appendChild(item);
    }
    gameboard.appendChild(gridContainer);

    //cardArray.sort(() => 0.5 - Math.random) // คำสั่งเรียงลำดับแบบสุ่ม
}
 //createGameBoard(); หา element ที่ชื่อว่า gameboard ไม่เจอ เพราะ html ไล่ทีละบรรทัด
 

// function flipCard(){ **ใช้ function นี้ เมื่อเป็นแบบ index.html**
//     let cardId = event.srcElement.getAttribute('id') //บอกว่า cardid = event ที่เมื่อ clik card นั้น element อะไร getattribute id ออกมา
//     event.srcElement.setAttribute('src','images/condemn.png') // เมื่อ click card ให้ setattribute เปลี่ยนรูป
//     alert("Flip Card!!" + cardId);
// }

let cardChoosen = [] //array เก็บค่า card ที่เลือก
let cardChoosenId = []
let score=0

function flipCard() {
    let cardId = this.getAttribute('id'); // this = card ที่ถูกกด คือ card อะไร
    this.setAttribute('src',cardArray[cardId].image);
    cardChoosen.push(cardArray[cardId]);
    cardChoosenId.push(cardId); 
    if(cardChoosen.length === 2){ 
        document.getElementById('gameConsole').textContent = "Checking...";
        setTimeout(checkForMatch,500); // set time ให้เรียกใช้คำสั่งนี้เมื่อผ่านไป 500 milisec
    }
}

function checkForMatch() { //== check แค่ value เท่ากัน ex: 5=='5' true, ส่วน === type ต้องเหมือนกัน(number,bulean)ถึงจะ true ex: 5==='5' false
    const cards = document.querySelectorAll('img');

    let selectedCardOne = cardChoosenId[0];
    let selectedCardTwo = cardChoosenId[1];

    let consoleMessage = "";
    
    if(cardChoosen[0].name == cardChoosen[1].name){ //จากที่เก็บใน array cardChoosen ให้เอา array ตำแหน่งที่ 0 เทียบกับ ตำแหน่งที่ 1
        cards[selectedCardTwo].setAttribute('src','images/white.png');
        cards[selectedCardOne].setAttribute('src','images/white.png');
        score = score + 1;
        consoleMessage = "Your found a match";
    }else{
        cards[selectedCardTwo].setAttribute('src','images/card_back.png');
        cards[selectedCardOne].setAttribute('src','images/card_back.png');
        consoleMessage = "Sorry, try again...:(";
    }

    document.getElementById('gameScore').textContent = score;
    document.getElementById('gameConsole').textContent = consoleMessage;

    cardChoosen = [];
    cardChoosenId = [];

    if (score === cardArray.length / 2) { //ถ้า score = 6 แต้มก็ชนะแล้ว
        document.getElementById('gameConsole').textContent = "Congratulations!"
    }
}