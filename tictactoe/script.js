let turn="X";
let win=false;
let boxes = document.getElementsByClassName('b1');
let turntext = document.querySelector('.turntext');
let reset = document.querySelector('.reset');
let audioTurn =new  Audio("ting.mp3");
let gameover = new Audio("gameover.mp3")
let music = new Audio("music.mp3")

function changeturn() {
    if(turn =='X'){
        turntext.innerText= 'O turn';

    }else{
        turntext.innerText= 'X turn';
    }
    return turn = turn=='X'?'O':'X';
}
function checkwins(){
    let boxtexts = document.getElementsByClassName('boxtext');
    const wins =[[0,1,2,3,5.5,0],[3,4,5,3,17,0],[6,7,8,3,29.25,0],[0,3,6,-9,18,90],[1,4,7,2.65,18,90],[2,5,8,14.5,18,90],[0,4,8,-1,19,45,40],[2,4,6,-2,17,-45,40]];
    wins.forEach(e =>{
        if((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText)&&(boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) && (boxtexts[e[0]].innerText !== '') && !win){
             
            let text = turn=='X'?'O':'X';
            turntext.innerText= text+" "+ "win";
            win =true;
            document.querySelector(".imgbox").getElementsByTagName('img')[0].style.width="56px";
            document.querySelector(".line").style.display="block";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
            if(e[5] == 45 || e[5] == -45){
                document.querySelector(".line").style.width="40vw";
            }else{
                document.querySelector(".line").style.width="30vw";
            }
        }
    })
}
Array.from(boxes).forEach(e =>{
    let boxtext = e.querySelector('.boxtext');
    e.addEventListener('click',()=>{
        if(boxtext.innerText === '' && !win){
            boxtext.innerText =turn;
            changeturn();
            audioTurn.play();
            checkwins();
            if(win){
                gameover.play();
            }
        }
    })
})

reset.addEventListener('click',()=>{
    Array.from(boxes).forEach(e =>{
        let boxtext = e.querySelector('.boxtext');
        boxtext.innerText='';
        e.style.backgroundColor="white";
        
    });
    turn='X';
    turntext.innerText='X Turn';
    win = false;
    document.querySelector(".imgbox").getElementsByTagName('img')[0].style.width="0px";
    document.querySelector(".line").style.display="none";
})