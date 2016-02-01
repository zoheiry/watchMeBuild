var html = '<div class="profile-card"><div class="cover-photo"></div><div class="profile-pic"></div><h2>Ali El Zoheiry</h2><p>Lorem ipsum dolor sit amet</p><p><span>Co founder @ </span><a href="#">Takeoff Apps</a></p></div><div class="sibling"></div>';
var css = 'body {  background-image: url(stream-cloud.jpg);  background-repeat: no-repeat;  background-size: cover;  margin: 0;  padding: 0;}.profile-card {  width: 320px;  height: 410px;  background-color: #FFF;  margin-left: auto;  margin-right: auto;  margin-top: 110px;  border-radius: 10px;  box-shadow: 0px 0px 12px 0px #000;}.cover-photo {  width: 100%;  height: 100px;  background-image: url(cover-photo.png);  background-size: cover;  background-position: 50% 50%;}.profile-pic {  background-image: url(self2.jpg);  background-size: cover;  background-repeat: no-repeat;  width: 110px;  height: 110px;  border-radius: 100px;  margin-left: auto;  margin-right: auto;  margin-top: -50px;  border: solid 5px white;}h2 {  text-align: center;  margin: 0;}p {  text-align: center;  margin-top: 5px;  margin-bottom: 5px;}a {  color: #000;  text-decoration: underline;  font-weight: bold;}'
var cssLines;
var htmlLines;
var htmlA;
var cssA;
var finalTags = [];
var readableHtml;

var Tag = function(content, innerTags){
  this.content = content;
  this.innerTags = innerTags || new Array();
}

var CssRule = function(selector, declaration) {
  this.selector = selector;
  this.declaration = declaration || new Declaration();
}

var Declaration = function(property, val) {
  this.property = property;
  this.val = val;
}


function start() {
  htmlA = html.split('');
  cssLines = css.split('}');
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
  // var stack = [];
  // var content = '';
  // var ending = false;
  // htmlA.forEach(function(c, i){
  //   content += c;
  //   if(c == '>'){
  //     // console.log(stack);
  //     if(ending) {
  //       ending = false;
  //       // console.log(content);
  //       var tmpTag = stack.pop();
  //       var newContent = tmpTag.content + content;
  //       tmpTag.content = newContent;
  //       if(stack.length > 0) {
  //         stack[stack.length - 1].innerTags.push(tmpTag);
  //       }
  //       else {
  //         tmpTag.content = newContent;
  //         finalTags.push(tmpTag);
  //       }
  //     }
  //     else {
  //       stack.push(new Tag(content));
  //     }
  //     content = '';
  //   }
  //   if(c + htmlA[i+1] == '</') {
  //     ending = true;
  //   }
  // });
  console.log(finalTags);
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
  }, 20);  
}

function injectHtml(index) {
  if(index == html.length)
    return;
  $(".container").html(html.substring(0, index));
  index++;
  setTimeout(function(){
    injectHtml(index);
  }, 50);
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

function writeCss() {

}