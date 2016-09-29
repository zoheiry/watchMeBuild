# watchMeBuild

#[DEMO](http://www.alizoh.com)

This is a simple javascript tool that given any CSS and HTML code, it injects it in the DOM letter by letter and let's you watch your website build itself.
Just open the index.html file and view the Demo.


You can use your own HTML and CSS code but with a few restrictions.

**1-** Put your html in `var html;` and your css in `var css;` in lines 1 & 2 in `main.js`

**2-** Your HTML code must only contain strings inside " " double quotes and not ' ' single quotes.

**3-** Your CSS cannot have any nested elements such as media queries or Sass/Less code.

**4-** You can also inject HTML with script tag inside but keep in mind that a condition must be added inside your script tag to only allow it to run once and cannot manipulate the DOM till code injection is complete.

**5-** HTML tags that don't have closing tags might affect the indentation of the code wrriten.
