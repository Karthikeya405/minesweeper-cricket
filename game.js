var GridSize = parseInt(prompt("Enter the Grid size for the game(6 or 7): "));
var NumberOfPlayers = parseInt(prompt("Enter the number of players(1 or 2): "));
var Fielders = 11;
var FieldersPlaced = 0;
var mainbody = document.getElementById("ground");
var template = document.createElement("div");
template.classList.add("grid-container");
var ScoreTemplate1 = document.getElementById("ScoreTemplate1");
var ScoreTemplate2 = document.getElementById("ScoreTemplate2");

if(GridSize != 6 && GridSize != 7){
  alert("Invalid input !!");
  window.location.href = "MyGameStart.html";
}

/*Creation of the grid*/
template.style.gridTemplateColumns = "repeat( " + GridSize + " , 1fr)";
template.style.gridTemplateRows = "repeat( " + GridSize + " , 1fr)";

function Home(){
  window.location.href = "MyGameStart.html";
}

if(NumberOfPlayers == 1){
  var score = 0;
  ScoreTemplate1.textContent = "Score: 0";
  /*creating nxn grid*/
  for (var i = 0; i < GridSize*GridSize ; i++) {
  var item = document.createElement("div");
    item.classList.add("grid-item");
    item.style.width = 700 - GridSize*9 / GridSize;
    item.style.height = 700 - GridSize*9 / GridSize;
    item.dataset.index = i;
    item.addEventListener("click", handleClick);
    template.appendChild(item);
  }
  
  mainbody.appendChild(template);

  /*Placing Fielders randomly*/
  while(FieldersPlaced < Fielders) {
    var RandomIndex = Math.floor(Math.random()*GridSize*GridSize);
    var item = template.children[RandomIndex];
    if(!item.dataset.Fielder) {
      item.dataset.Fielder = "true"; /*just to make sure no multiple fielders in a cell*/
      FieldersPlaced++;
    }
  }
  
  /*Distributing runs from 1 to 6*/
  for(var j = 0; j< GridSize*GridSize; j++){
    var item = template.children[j];
    if(!item.dataset.runs && !item.dataset.Fielder) { 
      item.dataset.runs = "true";
      var runs = Math.floor(Math.random()*5+1);
      item.textContent = runs + " Runs";
    } /*cells with fielders should be excluded*/
  }
  
  function EndGame() {
    alert("Game Over!! Your Final Score is " + score);
    var gridItems = document.getElementsByClassName("grid-item");
    for(var b = 0; b < GridSize*GridSize; b++){
      gridItems[b].removeEventListener("click", handleClick);
    }
  }
  
  function handleClick(event) {
    var item = event.target;
    if (item.classList.contains("grid-item") && !item.classList.contains("revealed") && !item.dataset.Fielder) {
      item.classList.add("revealed");
      score=score+parseInt(item.textContent);
    }
    if (item.dataset.Fielder) {
      item.textContent = "Fielder";
      item.classList.add("revealed");
      setTimeout(EndGame,50);
    }
    else {
      ScoreTemplate1.textContent = "Score: "+ score;
    }
    item.removeEventListener("click", handleClick); /*Removing event listener after clicking on a certain block*/
  }
}

else if(NumberOfPlayers == 2){
  var score1 = 0; 
  var score2 = 0;
  ScoreTemplate1.textContent = "Score of player 1: 0";
  ScoreTemplate2.textContent = "Score of player 2: 0";
  for (var i = 0; i < GridSize*GridSize ; i++) {
    var item = document.createElement("div");
      item.classList.add("grid-item");
      item.style.width = 700 - GridSize*9 / GridSize;
      item.style.height = 700 - GridSize*9 / GridSize;
      item.dataset.index = i;
      item.addEventListener("click", handleClick2);
      template.appendChild(item);
    }
    
    mainbody.appendChild(template);
    
    while(FieldersPlaced < Fielders) {
      var RandomIndex = Math.floor(Math.random()*GridSize*GridSize);
      var item = template.children[RandomIndex];
      if(!item.dataset.Fielder) {
        item.dataset.Fielder = "true";
        FieldersPlaced++;
      }
    }
    
    for(var j = 0; j< GridSize*GridSize; j++){
      var item = template.children[j];
      if(!item.dataset.runs && !item.dataset.Fielder) {
        item.dataset.runs = "true";
        var runs = Math.floor(Math.random()*5+1);
        item.textContent = runs + " Runs";
      }
    }

    function handleClick2(event) {
      var item = event.target;
      if (item.classList.contains("grid-item") && !item.classList.contains("revealed") && !item.dataset.Fielder) {
        item.classList.add("revealed");
        score1=score1+parseInt(item.textContent);
      }
      if (item.dataset.Fielder) {
        item.textContent = "Fielder";
        item.classList.add("revealed");
        setTimeout(EndGame2,50);
      }
      else {
        ScoreTemplate1.textContent = "Score of player 1: "+ score1;
      }
      item.removeEventListener("click", handleClick2);
    }

    function EndGame2(){
      alert("Game Over! Score of player 1 is " + score1);

      /*Removing already created grid and recreating it*/
      var DivsToRemove = document.querySelectorAll(".grid-item");
      for( var k = 0; k < DivsToRemove.length; k++){
        DivsToRemove[k].remove();
      }
      
      FieldersPlaced = 0;

      for (var i = 0; i < GridSize*GridSize ; i++) {
        var item = document.createElement("div");
          item.classList.add("grid-item");
          item.style.width = 700 - GridSize*9 / GridSize;
          item.style.height = 700 - GridSize*9 / GridSize;
          item.dataset.index = i;
          item.addEventListener("click", handleClick3);
          template.appendChild(item);
        }
        
        mainbody.appendChild(template);
        
        while(FieldersPlaced < Fielders) {
          var RandomIndex = Math.floor(Math.random()*GridSize*GridSize);
          var item = template.children[RandomIndex];
          if(!item.dataset.Fielder) {
            item.dataset.Fielder = "true";
            FieldersPlaced++;
          }
        }
        
        for(var j = 0; j< GridSize*GridSize; j++){
          var item = template.children[j];
          if(!item.dataset.runs && !item.dataset.Fielder) {
            item.dataset.runs = "true";
            var runs = Math.floor(Math.random()*5+1);
            item.textContent = runs + " Runs";
          }
        }

        function EndGame3(){
          alert("Game Over! Score of Player 2 is "+ score2);
          var gridItems = document.getElementsByClassName("grid-item");
          for(var b = 0; b < GridSize*GridSize; b++){
          gridItems[b].removeEventListener("click", handleClick3);
          }
          if(score1>score2){
            alert("Player 1 Won!!!");
          }
          else if(score1<score2){
            alert("Player 2 Won!!!");
          }
          else{
            alert("Both players got equal scores!!!");
          }
        }

        function handleClick3(event){
          var item = event.target;
          if (item.classList.contains("grid-item") && !item.classList.contains("revealed") && !item.dataset.Fielder) {
          item.classList.add("revealed");
          score2=score2+parseInt(item.textContent);
          }
          if (item.dataset.Fielder) {
            item.textContent = "Fielder";
            item.classList.add("revealed");
            setTimeout(EndGame3,50);
          }
          else {
            ScoreTemplate2.textContent = "Score of player 2: "+ score2;
          }
          item.removeEventListener("click", handleClick3);
        }
    }
}

else{
  alert("Invalid Input !!");
}