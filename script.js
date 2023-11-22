/*var nameArray = ['Marc','sans','David','Celine', 'Hailey','Stephanie','Abram',
                'Catmo','Bitchass','Mr. Rhule','MegaMan','Toby Fox','Abhi','Maisy',
                'Petunia, the gaurdian Pitbull of the Underworld','Cameron','Luka',
                'Helen','Isabella','Osman','Sinnoks','Will Smith','Shit face :)',
                'Rock Man','Paper Boy','Scissors Gal','Telephone Pole','Shoot','That Guy',
                'Ric','Stephen','Everett','Butt Plug','really stupid','Big Guy',
                'irrelevant','Jerma','Hitler','Jesus Christ'];
                
var abilities = ['Really fucking annoying','Ignorant', 'Acoustic','Asthmatic','Gremlin Energy',
                'Geeking Out','Quiet & Mysterious','Badass','Kardashian-esque','Dehumanizer',
                'Flight','Redditor','Brain Rot','Barbie-core','Twitter User','Metal Water Bottle',
                'Looted af', 'Exp Monster'];

var score = 100;
*/

var score = 1000;
updateScore(0);
var yunDoo = 0;

function scoreRe(){
    score = score.toString();
    if(score.length == 3){
       score = "0" + score;
    }
    if(score.length == 2){
        score = "00" + score;
    }
    if(score.length == 1){
        score = "000" + score;
    }
}

function scoreUp(x){
    //setTimeout(shuffleScore, 500);
    
    score = parseInt(score);
    if(number+x >=9999 || number+x <=0){
        if(number+x >=9999){
            score = 9999;
        }
        if(number+x <=0){
            score = 0;
        }
    }else{
        score+=x;
    }
    scoreRe();
}

function shuffleScore(){
    setTimer(randomScore, 25);
}

function randomScore(){
    score = (Math.floor(Math.random()*10)).toString + 
    (Math.floor(Math.random()*10)).toString + 
    (Math.floor(Math.random()*10)).toString + 
    (Math.floor(Math.random()*10)).toString;
}

function logIt(message){
    var content = document.createTextNode(message);
    div.appendChild(content);
    div.appendChild(document.createElement('br'));
}

function newLine(){
    div.appendChild(document.createElement('br'));
}

var rock = document.getElementById("rock");
var paper = document.getElementById("paper");
var scissors = document.getElementById("scissors");
var newMatch = document.getElementById("new");

var div = document.getElementById("console");
div.scrollTop = div.scrollHeight;

var input = null;
var inputDig = null;

logIt("Press '" + newMatch.textContent + "' to begin...");
switchUp();

var rProb;
var pProb;
var sProb;

function generateOdds(){
    rProb = Math.floor(Math.random()*100);
    pProb = Math.floor(Math.random()*(100-rProb));
    sProb = 100-rProb-pProb;
}

/*function getRandom(){
    var num = Math.random(),
        s = 0,
        lastIndex = weights.length - 1;
        
    for(var i = 0; i<lastIndex; i++){
        s+= weights[i];
        if(num<s){
            return results[i];
        }
    }
    
    return results[lastIndex];
}*/

function getRandom(spec){
    var i, sum=0, r=Math.random();
    for(i in spec){
        sum+= spec[i];
        if(r<=sum) return i;
    }
}

function match(){
    generateOdds();
    input = null;
    inputDig = null;
    
    newMatch.disabled = true;
    newLine();
    logIt("Probability of throwing Rock: " + rProb + "%");
    logIt("Probability of throwing Paper: " + pProb + "%");
    logIt("Probability of throwing Scissors: " + sProb + "%");
    logIt("What will you throw?");
    newLine();
    switchUp();
    waitForIt();
}

function getBotOutput(){
    var arr = [rock.textContent, paper.textContent, scissors.textContent];
    
    var randomNum = getRandom({0:rProb/100, 1:pProb/100, 2:sProb/100});
    
    logIt("Bot Chooses: " + arr[randomNum]);
    getWin(inputDig,randomNum);
    newMatch.disabled = false;
}

function switchUp(){
    if(yunDoo%2==0){
        rock.disabled = true;
        paper.disabled = true;
        scissors.disabled = true;
        newMatch.disabled = false;

        rock.classList.remove("ena");
        rock.classList.add("dis");

        paper.classList.remove("ena");
        paper.classList.add("dis");

        scissors.classList.remove("ena");
        scissors.classList.add("dis");

        newMatch.classList.remove("dis");
        newMatch.classList.add("ena");

    }else{
        rock.disabled = false;
        paper.disabled = false;
        scissors.disabled = false;
        newMatch.disabled = true;

        rock.classList.remove("dis");
        rock.classList.add("ena");

        paper.classList.remove("dis");
        paper.classList.add("ena");

        scissors.classList.remove("dis");
        scissors.classList.add("ena");

        newMatch.classList.remove("ena");
        newMatch.classList.add("dis");
    }
    yunDoo++;
}

function waitForIt(){
    if(input == null){
        setTimeout(waitForIt, 300);
    }else{
        switchUp();
        logIt("Input: " + input);
        setTimeout(getBotOutput, 300);
    }
}

function getWin(int, bot){
    var x = null;
    
    if(int == bot){
        logIt("It's a draw!");
        logIt("What will you throw?");
    }
    if((int==0 && bot==1)||(int==1 && bot==2)||(int==2 && bot==0)){
        logIt("You lost! Your score dropped!");
        x = -100;
    }
    if((int==0 && bot==2)||(int==1 && bot==0)||(int==2 && bot==1)){
        logIt("You won! Your score increased!");
        x = 100;
    }
    updateScore(x);
}

function updateScore(x){
    score +=x;
    document.getElementById("score").innerText = "Score: " + score;
}

rock.addEventListener("click", function(){
    input = rock.textContent || rock.innerText;
    inputDig = 0;
});

paper.addEventListener("click", function(){
    input = paper.textContent || paper.innerText;
    inputDig = 1;
});

scissors.addEventListener("click", function(){
    input = scissors.textContent || scissors.innerText;
    inputDig = 2;
});

newMatch.addEventListener("click", function(){
    match();
});