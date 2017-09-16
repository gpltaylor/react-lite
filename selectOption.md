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

If we set "selected" on the options, and the select.multiple is set to false, then the DOM/Browser will reset all options and update the last item.
We need to make sure that the "select.multiple" is true before adding the options to the DOM element

# SetProps
The select option was being created without any attributes being set. Child nodes where being added to the element whilst in a "blank" state.
In some cases (like a multi select) the DOM is protected from invalid state, for example, multiple items selected on a "select" element that does not 
support this. In this case the DOM option elements are reset automatically.

Swapping the order, allowing the element attributes to be set before creating the children nodes.

```
_.setProps(node, props, isCustomComponent)
initVchildren(velem, node, parentContext)
```

# Updating state programatically
This was not working when updating using an onClick event.
Required the updateVelement to update the select and child options. This required the 
populating of the elements props to be done before the children.

There was an issue with updating the select.value when using multiple.
The value of select.value can only be a scalar, therefore updating to an array set this to null 
and unselected all the options automatically.

There is an issue at the moment where the DOM can be different from vDOM.
If you don't updating state then selecting an option, then the check for differences will review previous 
props vs current props. There will be no change and therefore the DOM will not be updating. However, the 
DOM will infact, not match the vDOM.

