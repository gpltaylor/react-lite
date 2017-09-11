# Select option

There is an issue in IE where the option is not being selected based on the Select element.

## util.js - setProps
There is an issue with the setProps. as React-Lite build all the element on their own, the option is not being pushed with the "selected=true" prop 
when creating the DOM node element.

# virtual-dom.js
initVelem is not working in IE
document.createElement(type)

the option is not added with the "selected" set. This works on the command line.

this might need it's own custom action for IE
node = new Option(name, value, default, selected)

might be that in IE, selected needs to be a string "selected" and not a boolean