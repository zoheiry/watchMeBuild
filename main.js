var html = '<div class="profile-card"><div class="cover-photo"></div><div class="profile-pic"></div><h2>Ali El Zoheiry</h2><p>Lorem ipsum dolor sit amet</p><p><span>Co founder @ </span><a href="#">Takeoff Apps</a></p></div><div class="sibling"></div>';
var css = 'body {  background-image: url(stream-cloud.jpg);  background-repeat: no-repeat;  background-size: cover;  margin: 0;  padding: 0;}.profile-card {  width: 320px;  height: 410px;  background-color: #FFF;  margin-left: auto;  margin-right: auto;  margin-top: 110px;  border-radius: 10px;  box-shadow: 0px 0px 12px 0px #000;}.cover-photo {  width: 100%;  height: 100px;  background-image: url(cover-photo.png);  background-size: cover;  background-position: 50% 50%;}.profile-pic {  background-image: url(self2.jpg);  background-size: cover;  background-repeat: no-repeat;  width: 110px;  height: 110px;  border-radius: 100px;  margin-left: auto;  margin-right: auto;  margin-top: -50px;  border: solid 5px white;}h2 {  text-align: center;  margin: 0;}p {  text-align: center;  margin-top: 5px;  margin-bottom: 5px;}a {  color: #000;  text-decoration: underline;  font-weight: bold;}'
var cssLines;
var htmlLines;
var htmlA;
var cssA;
var finalTags = [];
var readableHtml;
var cssBlocks = [];
var globalDelay = 20;

$(document).ready(function(){
  start();
});

var Tag = function(content, innerTags){
  this.content = content;
  this.innerTags = innerTags || new Array();
}

var CssBlock = function(selector, declarationArray) {
  this.selector = selector;
  this.declarations = declarationArray || new Array();
}

var Declaration = function(property, val) {
  this.property = property;
  this.val = val;
}


function start() {
  htmlA = html.split('');
  cssLines = css.split('}');
  cssLines.splice(cssLines.length-1, 1);
  cssA = css.split('');
  readableHtml = html.split('><');
  readableHtml.forEach(function(l, i){
    if(i == 0){
      readableHtml[i] = readableHtml[i] + '>';
    }
    else if(i == (readableHtml.length - 1)){
      readableHtml[i] = '<' + readableHtml[i];
    }
    else{
      readableHtml[i] = '<' + readableHtml[i] + '>';
    }
  });
  readyIDE();
  cssLines.forEach(function(l, i){
    cssLines[i] += '}';
  });
  generateCssBlocks();
  document.getElementsByClassName('html-line')[0].insertAdjacentHTML('afterend', '<strong class="cursor">|</strong>')
  writeCode(0);
  injectHtml(0);
}

var counter = 0;
function writeCode(index){
  if(counter == readableHtml[index].length) {
    typeCallback(index);
    return;
  }
  document.getElementsByClassName('html-line')[index].insertAdjacentHTML('beforeend', readableHtml[index][counter]);
  counter++;
  setTimeout(function(){
    writeCode(index);
  }, globalDelay);  
}

function injectHtml(index) {
  if(index == html.length)
    return;
  $(".container").html(html.substring(0, index));
  index++;
  setTimeout(function(){
    injectHtml(index);
  }, globalDelay);
}

function typeCallback(index) {
  counter = 0;
  index++;
  if(index >= readableHtml.length) {
    return;
  }
  document.getElementsByClassName('cursor')[0].parentNode.removeChild(document.getElementsByClassName('cursor')[0]);
  document.getElementsByClassName('html-line')[index].insertAdjacentHTML('afterend', '<strong class="cursor">|</strong>')
  writeCode(index);
}

var level = 0;
function readyIDE() {
  readableHtml.forEach(function(l, i){
    if(i > 0) {
      level++;
      if(l[1] == '/') {
        level--;
        document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '<span class="html-line level-' + level + '" id="html-line-' + i + '"></span>');
        level--;
      }
      else if(l.indexOf('</') >= 0) {
        document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '<span class="html-line level-' + level + '" id="html-line-' + i + '"></span>');
        level--; 
      }
      else {
        document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '<span class="html-line level-' + level + '" id="html-line-' + i + '"></span>');
      }
    }
    else {
      document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '<span class="html-line level-' + level + '" id="html-line-' + i + '"></span>');  
    }
    document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '<br>');
  });
}

function generateCssBlocks() {
  cssLines.forEach(function(l, i){
    var selector = l.split('{')[0];
    selector = selector.replace(/ /g,'');
    var rest = l.split('{')[1].replace('}', '');
    rest = rest.split(';');
    rest.splice(rest.length-1, 1);
    declarationArray = [];
    rest.forEach(function(d, i){
      declarationArray.push(new Declaration(d.split(':')[0], d.split(':')[1]));
    });
    cssBlocks.push(new CssBlock(selector, declarationArray));
  });
}

function writeCss() {
  document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '')
}

var letterCount = 0;
var mode = 'selector';
var letters = '';
var currentSelector = '';
var currentProperty = '';
var currentVal = '';
var declarationCount = 0;
var blockCount = 0;
function injectCss() {
  if(blockCount >= cssBlocks.length) {
    return;
  }
  if(mode == 'selector') {
    currentSelector += cssBlocks[blockCount].selector[letterCount];
    letterCount++;
    if(letterCount >= cssBlocks[blockCount].selector.length) {
      mode = 'property';
      letterCount = 0;
    }
  }
  else if(mode == 'property') {
    currentProperty += cssBlocks[blockCount].declarations[declarationCount].property[letterCount];
    letterCount++;
    if(letterCount >= cssBlocks[blockCount].declarations[declarationCount].property.length) {
      mode = 'val';
      letterCount = 0;
    }
  }
  else if(mode == 'val') {
    currentVal += cssBlocks[blockCount].declarations[declarationCount].val[letterCount];
    letterCount++;
    if(letterCount >= cssBlocks[blockCount].declarations[declarationCount].val.length) {
      $(currentSelector.trim()).css(currentProperty.trim(), currentVal.trim());
      console.log("$('" + currentSelector.trim() + "').css(" + currentProperty.trim() + ", " + currentVal.trim() + ");");
      mode = 'property';
      currentProperty = '';
      currentVal = '';
      letterCount = 0;
      declarationCount++;
      if(declarationCount >= cssBlocks[blockCount].declarations.length) {
        blockCount++;
        declarationCount = 0;
        mode = 'selector';
        currentSelector = '';
        currentVal = '';
        letterCount = 0;
      }
    }
  }
  setTimeout(function(){
    injectCss();
  }, globalDelay);
}