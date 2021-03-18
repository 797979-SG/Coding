var wordBank1 = ["pizza", "pie", "cookie", "candy", "salad", "chicken", "pork", "burger", "fries"];
var wordBank2 = ["chemistry", "algebra", "history", "programming", "spanish", "english", "honors"];
var wordBank3 = ["sudan", "brazil", "poland", "france", "colombia", "norway", "nigeria", "uganda"];
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var activate = true;
var randomChosenWord;
var lettersChosen = [];
var buttons = [];
var topicButton = new Button(480,450,"s");
var topics = ["Food","Classes","Countries"];
var index = 0;
var mistakes = 0;
function setup() {
  var cnv = createCanvas(800, 800);
  cnv.position((windowWidth-width)/2, 30);
  randomChosenWord = wordBank1[round(random(wordBank1.length))].split('');
  //testSize(30);
  for(i = 0;i < 9; i++){
    buttons.push(new Button(130 + (i * 30), 325, letters[i], 20))
    buttons.push(new Button(130 + (i * 30), 350, letters[9 + i], 20))
    buttons.push(new Button(130 + (i * 30), 375, letters[18 + i], 20))
  }
  buttons.splice(-1,1);
  textAlign(CENTER);
  rectMode(CENTER);
  for(i=0;i<randomChosenWord.length;i++){
    lettersChosen.push("-");
  }
}

//  The draw function is called @ 30 fps
function draw(){
  background(255);
  if(randomChosenWord.join(' ')==lettersChosen.join(' ')){
    text("Nice! Try another topic!", width/2,50)
    activate = false;
  }
  for(i=0;i<lettersChosen.length-1;i++){
    text(lettersChosen[i],130+(30*i),300)
  }
  for(i=0;i<buttons.length;i++){
    buttons[i].show();
  }
  text("Topic: " + topics[index],width/2,height-50)
  hanger();
  stick_figure();
  topicButton.show();
}

function mousePressed(){
  for(i = 0; i < buttons.length; i++){
    buttons[i].click();
  }
  topicButton.checkTopic();
}

function hanger(){
  stroke(0);
  strokeWeight(4);
  line(width / 2, 100, width / 2 , 250 );
  line(width / 2 - 50, 250, width / 2 + 50, 250);
  line(width / 2, 100, width / 2 + 50, 100);
  line(width / 2 + 50, 100, width / 2 + 50, 125);
}

function stick_figure(){
  fill(0);
  stroke(0);
  if(mistakes >= 1){
    ellipse(width / 2 + 50 , 140, 30);
  }
  if(mistakes >= 2){
    line(width / 2 + 50, 155, width / 2 + 50, 200);
  }
  if(mistakes >= 3){
    line(width / 2 + 50, 160, width / 2 + 75, 175);
  }
  if(mistakes >= 4){
    line(width / 2 + 50, 160, width / 2 + 25, 175);
  }
  if(mistakes >= 5){
    line(width / 2 + 50, 200, width / 2 + 25, 225);
  }
  if(mistakes >= 6){
    line(width / 2 + 50, 200, width / 2 + 75, 225);
    strokeWeight(.5);
    textSize(15);
    text("Game Over, the word was \n" + randomChosenWord.join(''), width/2, 50);
    noLoop();
  }
}

function Button(x,y,letter){
  this.x = x;
  this.y = y;

  this.r = 50;
  this.g = 50;
  this.b = 50;
  this.letter = letter;
  this.size = 20;

  this.show = function(){
    noStroke();
    fill(this.r,this.g,this.b,30);
    rect(this.x,this.y,this.size,this.size);

    fill(0);
    textSize(20);
    text(this.letter,this.x,this.y + 7);
  }
  this.checkTopic = function(){
    if(mouseX > topicButton.x - 10 && mouseX < topicButton.x + 10 && mouseY > topicButton.y - 10 && mouseY < topicButton.y + 10){
      index++;
      activate = true;
      if(index == 1){
        mistakes = 0;
        randomChosenWord = wordBank2[round(random(wordBank2.length-1))].split('');
        lettersChosen = [];
        for(i=0;i<randomChosenWord.length;i++){
          lettersChosen.push("+");
        }
        for(i=0;i<buttons.length;i++){
          buttons[i].r = 50;
          buttons[i].g = 50;
          buttons[i].b = 50;
        }
      }
      else if(index == 2){
        mistakes = 0;
        randomChosenWord = wordBank3[round(random(wordBank3.length-1))].split('');
        lettersChosen = []
      }
      for(i = 0; i < randomChosenWord.length;i++){
        lettersChosen.push("+");
      }
      for(i = 0;i < buttons.length;i++){
        buttons[i].r = 50;
        buttons[i].g = 50;
        buttons[i].b = 50;
      }
    }
    else{
      mistakes = 0;
      randomChosenWord = wordBank1[round(random(wordBank1.length-1))].split('');
      lettersChosen = [];
      for(i = 0;i<randomChosenWord.length;i++){
        lettersChosen.push("+");
      }
      for(i=0;i<buttons.length;i++){
        buttons[i].r = 50;
        buttons[i].g = 50;
        buttons[i].b = 50;
      }
    }
    if(index == topics.length){
      index = 0;
    }
  }
}

this.click = function(){
  if(activate){
    if(mouseX > this.x - 10 && mouseX < this.x + 10 && mouseY > this.y - 10 && mouseY < this.y + 10){
      if(randomChosenWord.includes(this.letter)){
        for(var i = 0; i< randomChosenWord.length;i++){
          if(randomChosenWord[i] === this.letter){
            lettersChosen.splice(i,1,this.letter);
          }
        }
      }
      else{
        mistakes++;
        this.r = 255;
        this.g = 0;
        this.b = 0;

        console.log(mistakes);
      }
    }
  }
}
