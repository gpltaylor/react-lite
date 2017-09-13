# Select option

## Refs
 * @TODO: Review React usage on value/defaultValue/and multiple selected
 * https://github.com/facebook/react/blob/80411ea9b47a14ed3de6993fd64fba1d79ec605d/src/renderers/dom/fiber/wrappers/ReactDOMFiberSelect.js#L82
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option

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

# initVchildren
When creating the nodes the select node is loosing the options selected values.
The option nodes are created with the selected and added to the select element.
However, at the end when the select element is added to the div, it looses these setting?


# properties - setPropValue
Holds a list of elmements and their allowed properties?
Where is is data coming from?

# Issue
I don't think you can set the select.value to an array in setProps
This is being turned into an empty string

Might have to skip setting the value as I think this forced the DOM to reload this element and it's children

# DOM Node vs vElement
the DOM is not being created correctly. Select element is hitting "setPropValue" without the "mulitple" being set.
this means that it can't set multiple options (The Browser rendering disables this I think).

