/**
 * DOM Property Operations
 */

import {
    properties,
    isCustomAttribute,
    VALID_ATTRIBUTE_NAME_REGEX
} from './DOMConfig'
import * as _ from './util'
/**
 * Sets the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 * @param {*} value
 */
export function setPropValue(node, name, value) {
    let propInfo = properties.hasOwnProperty(name) && properties[name]
    if (propInfo) {
        // If we are select element and value is array then don't set value
        if(node.localName == "select" && _.isArr(value)) {
            node.multiple = true
            node.value = null
            let selectedValue = {}
            // Key the selected values
            for (let i = 0; i < value.length; i++) {
                // Prefix to avoid chaos with special keys.
                selectedValue['$' + value[i]] = true                
            }

            // Find option in selected key
            for (let i = 0; i < node.options.length; i++) {
                node.options[i].selected = selectedValue.hasOwnProperty('$' + node.options[i].value)
            }

            return
        }

        // should delete value from dom
        if (value == null ||
            (propInfo.hasBooleanValue && !value) ||
            (propInfo.hasNumericValue && isNaN(value)) ||
            (propInfo.hasPositiveNumericValue && (value < 1)) ||
            (propInfo.hasOverloadedBooleanValue && value === false)) {
            removePropValue(node, name)
        } else if (propInfo.mustUseProperty) {
            let propName = propInfo.propertyName;
            // dom.value has side effect
            if (propName !== 'value' || '' + node[propName] !== '' + value) {
                node[propName] = value
            }
        } else {
            let attributeName = propInfo.attributeName
            let namespace = propInfo.attributeNamespace

            // `setAttribute` with objects becomes only `[object]` in IE8/9,
            // ('' + value) makes it output the correct toString()-value.
            if (namespace) {
                node.setAttributeNS(namespace, attributeName, '' + value)
            } else if (propInfo.hasBooleanValue || (propInfo.hasOverloadedBooleanValue && value === true)) {
                node.setAttribute(attributeName, '')
            } else {
                node.setAttribute(attributeName, '' + value)
            }
        }
    } else if (isCustomAttribute(name) && VALID_ATTRIBUTE_NAME_REGEX.test(name)) {
        if (value == null) {
            node.removeAttribute(name)
        } else {
            node.setAttribute(name, '' + value)
        }
    }
}

/**
 * Deletes the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 */
export function removePropValue(node, name) {
    let propInfo = properties.hasOwnProperty(name) && properties[name]
    if (propInfo) {
        if (propInfo.mustUseProperty) {
            let propName = propInfo.propertyName;
            if (propInfo.hasBooleanValue) {
                node[propName] = false
            } else {
                // dom.value accept string value has side effect
                if (propName !== 'value' || '' + node[propName] !== '') {
                    node[propName] = ''
                }
            }
        } else {
            node.removeAttribute(propInfo.attributeName)
        }
    } else if (isCustomAttribute(name)) {
        node.removeAttribute(name)
    }
}