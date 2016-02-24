(function(){
  'use strict';
  
  var html = '<div class="profile-box"><div class="cover-photo"></div><div class="user-info"><div class="profile-photo"></div><h1>Ali El Zoheiry </h1><p>Entrepreneur, Developer, Geek, Fast Learner and Javascript ninja.</p><h2>Front-End developer @ <a href="http://www.elvesapp.com" target="_blank">Elves</a></h2><ul><li><a href="http://www.facebook.com/zoheiry7" target="_blank" class="fa fa-facebook-square"></a></li><li><a href="http://www.stackoverflow.com/users/3481932/zoheiry" target="_blank" class="fa fa-stack-overflow"></a></li><li><a href="http://www.github.com/zoheiry" target="_blank" class="fa fa-github"></a></li><li><a href="http://www.instagram.com/alizoh" target="_blank" class="fa fa-instagram"></a></li></ul><div class="personal-info"><a href="tel:+201143351050">+201143351050</a><a href="mailto:ali.elzoheiry@gmail.com">ali.elzoheiry@gmail.com</a></div></div></div>';
  var css = 'body, html {height: 100%;margin: 0;padding: 0;}body {font-family: "raleway";background: linear-gradient( rgba(255,255,255, 0.1), rgba(255,255,255, 0.1) ), url("images/cover-photo.jpg");background-repeat: no-repeat;background-size: cover;background-position: 50% 50%;}.profile-box {position: absolute;width: 320px;height: 410px;background-color: #FFF;border-radius: 10px;top: 0;bottom: 0;left: 0;right: 0;margin: auto;box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.5); }.profile-box .cover-photo {width: 100%;height: 33%;background-image: url("images/cover-photo.jpg");background-size: cover;border-top-left-radius: 10px;border-top-right-radius: 10px;background-position: 50% 50%;background-repeat: no-repeat;}.profile-box .profile-photo {width: 110px;height: 110px;background-image: url("images/self2.jpg");background-size: cover;background-repeat: no-repeat;border-radius: 50%;margin: 0 auto;margin-top: -20%;border: solid 5px #FFF;}.profile-box .user-info {text-align: center;}.profile-box .user-info h1 {margin-top: 5px;margin-bottom: 5px;font-size: 24px;}.profile-box .user-info p {font-size: 14px;width: 95%;margin: 5px auto;color: rgba(0,0,0,0.8);}.profile-box .user-info h2 {font-size: 16px;font-weight: 600;margin: 5px auto;color: rgba(0,0,0,0.8);}.profile-box .user-info h2 a {color: #00A2BB;text-decoration: underline;}.profile-box .user-info ul {padding: 0;list-style: none;margin: 15px;}.profile-box .user-info ul li {display: inline-block;margin-right: 10px;}.profile-box .user-info ul li:last-child {margin-right: 10px;}.profile-box .user-info ul li a {font-size: 28px;text-decoration: none;color: rgba(0,0,0,0.7);}.profile-box .personal-info {border-top: solid 1px #d5d5d5;padding-top: 10px;}.profile-box .personal-info a {display: block;color: #00A2BB;font-size: 14px;margin-top: 10px;text-decoration: none;}.profile-box .personal-info a:first-child {margin-top: 0;}';
  var cssLines;
  var htmlLines;
  var htmlA;
  var cssA;
  var finalTags = [];
  var readableHtml;
  var cssBlocks = [];
  var globalDelay = 25;
  var cssArea;
  var firstScriptRun = true;

  $(document).ready(function(){
    $("#write-speed-slider").val(100 - globalDelay);
    start();
  });

  document.getElementById('write-speed-slider').addEventListener('change', function(){
    globalDelay = 100 - parseInt(this.value);
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
    cssLines.forEach(function(l, i){
      cssLines[i] += '}';
    });
    generateCssBlocks();
    readyIDE();
    writeHtml(0);
    injectHtml(0);
  }

  var firstHtmlLine = true;
  var counter = 0;
  function writeHtml(index){
    if(counter == readableHtml[index].length) {
      typeCallback(index);
      return;
    }
    document.getElementsByClassName('html-line')[index].insertAdjacentHTML('beforeend', readableHtml[index][counter]);
    // start scrolling after 20 lines
    if(index > 20){
      if(firstHtmlLine || $("#typingHtml")[0].scrollHeight - $("#typingHtml").scrollTop() - $("#typingHtml").height() <= 50){
        firstHtmlLine = false;
        $(htmlArea).scrollTop(htmlArea.scrollHeight);
      }
    }
    counter++;
    setTimeout(function(){
      writeHtml(index);
    }, globalDelay);  
  }

  function injectHtml(index) {
    if(index == html.length){
      // finished injecting Html.
      document.getElementById('typingHtml').insertAdjacentHTML('beforeend', '<div id="typingCss"></div>');
      cssArea = document.getElementById('typingCss');
      document.getElementById('typingCss').style.fontSize = '14px';
      injectCss();
      return;
    }
    try {
      $(".container").html(html.substring(0, index));
    }
    catch(e) {

    }
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
    writeHtml(index);
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
    // cssBlocks.forEach(function(b, i){
    //   var cssArea = document.getElementById('typingCss');
    //   cssArea.insertAdjacentHTML('beforeend', '<span class="css-line level-0"></span>');
    //   b.declarations.forEach(function(d, i){
    //     cssArea.insertAdjacentHTML('beforeend', '<span class="css-line level-1"></span>');
    //   });
    //   cssArea.insertAdjacentHTML('beforeend', '<span class="css-line level-0"></span>');
    // });
  }

  function generateCssBlocks() {
    cssLines.forEach(function(l, i){
      var selector = l.split('{')[0];
      selector = selector.trim();
      console.log(i);
      var rest = l.split('{')[1].replace('}', '');
      rest = rest.split(';');
      rest.splice(rest.length-1, 1);
      var declarationArray = [];
      rest.forEach(function(d, i){
        var chunks = d.split(':');
        var c1 = chunks[0];
        var c2 = chunks[1]
        if(chunks[2]) {
          c2 += ':' + chunks[2];
        }
        declarationArray.push(new Declaration(c1, c2));
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
  var injectSelector = true;
  var injectProperty = true;
  var injectVal = true;
  var selectorCount = 0;
  var propertyCount = 0;
  var valCount = 0;
  var htmlArea = document.getElementById('typingHtml');
  var firstCssLine = true;
  function injectCss() {
    if(blockCount >= cssBlocks.length) {
      //finished injecting css
      setTimeout(function(){
      $("#typingArea").slideUp();
      }, 1000);
      return;
    }
    // console.log($("#typingHtml")[0].scrollHeight - $("#typingHtml").scrollTop() - $("#typingHtml").height());
    if(firstCssLine || $("#typingHtml")[0].scrollHeight - $("#typingHtml").scrollTop() - $("#typingHtml").height() <= 50){
      firstCssLine = false;
      $(htmlArea).scrollTop(htmlArea.scrollHeight);
    }
    if(mode == 'selector') {
      if(injectSelector){
        injectSelector = false;
        cssArea.insertAdjacentHTML('beforeend', '<div class="css-line level-0 selector" id="selector-' + selectorCount + '"></div>');
      }
      currentSelector += cssBlocks[blockCount].selector[letterCount];
      document.getElementById('selector-' + selectorCount).insertAdjacentHTML('beforeend', cssBlocks[blockCount].selector[letterCount]);
      letterCount++;

      if(letterCount >= cssBlocks[blockCount].selector.length) {
        injectSelector = true;
        document.getElementById('selector-' + selectorCount).insertAdjacentHTML('beforeend', ' {');
        selectorCount++;
        mode = 'property';
        letterCount = 0;
      }
    }
    else if(mode == 'property') {
      if(injectProperty){
        injectProperty = false;
        cssArea.insertAdjacentHTML('beforeend', '<span class="css-line level-1 property" id="property-' + propertyCount + '"></span>');
      }
      currentProperty += cssBlocks[blockCount].declarations[declarationCount].property[letterCount];
      document.getElementById('property-' + propertyCount).insertAdjacentHTML('beforeend', cssBlocks[blockCount].declarations[declarationCount].property[letterCount]);
      letterCount++;
      if(letterCount >= cssBlocks[blockCount].declarations[declarationCount].property.length) {
        injectProperty = true;
        document.getElementById('property-' + propertyCount).insertAdjacentHTML('beforeend', ': ');
        propertyCount++;
        mode = 'val';
        letterCount = 0;
      }
    }
    else if(mode == 'val') {
      if(injectVal){
        injectVal = false;
        cssArea.insertAdjacentHTML('beforeend', '<span class="css-line val level-1" id="val-' + valCount + '"></span>');
      }
      currentVal += cssBlocks[blockCount].declarations[declarationCount].val[letterCount];
      document.getElementById('val-' + valCount).insertAdjacentHTML('beforeend', cssBlocks[blockCount].declarations[declarationCount].val[letterCount]);
      letterCount++;
      if(letterCount >= cssBlocks[blockCount].declarations[declarationCount].val.length) {
        $(currentSelector.trim()).css(currentProperty.trim(), currentVal.trim());
        console.log("$('" + currentSelector.trim() + "').css(" + currentProperty.trim() + ", " + currentVal.trim() + ");");
        injectVal = true;
        document.getElementById('val-' + valCount).insertAdjacentHTML('beforeend', ';');
        document.getElementById('val-' + valCount).insertAdjacentHTML('beforeend', '<br>');
        valCount++;
        mode = 'property';
        currentProperty = '';
        currentVal = '';
        letterCount = 0;
        declarationCount++;
        if(declarationCount >= cssBlocks[blockCount].declarations.length) {
          console.log('count = ' + valCount);
          cssArea.insertAdjacentHTML('beforeend', '<span class="selector">}</span>');
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

  $(document).on('click', '#typingMinimizeIcon', function(){
    $("#typingArea").slideUp();
  });

  $(document).on('click', '#typingMaximizeIcon', function(){
    $("#typingArea").slideDown();
  });
})();