"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _events, _style;
Object.defineProperty(exports, "__esModule", { value: true });
/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
const Core = require("@balmanth/jsx-core");
const style_1 = require("./components/style");
/**
 * Managed attributes.
 */
const managedAttributes = new Set(['style']);
/**
 * Managed events.
 */
const managedEvents = new Set(['attach', 'detach']);
/**
 * Set an attribute in the specified element.
 * @param element HTML element.
 * @param events Map of events.
 * @param name Attribute name.
 * @param value Lower-case attribute value.
 */
function setAttribute(element, events, name, value) {
    if (name.startsWith('on') && name.length > 2) {
        const eventName = name.substr(2);
        const eventValue = events.get(eventName);
        element.removeEventListener(eventName, eventValue);
        if (!(value instanceof Function)) {
            throw new TypeError(`Attribute '${eventName}' supports only functions.`);
        }
        else {
            element.addEventListener(eventName, value);
            events.set(eventName, value);
        }
    }
    else {
        if (value === true) {
            element.setAttribute(name, '');
        }
        else {
            element.setAttribute(name, value);
        }
    }
}
/**
 * Remove an attribute from the specified element.
 * @param element HTML element.
 * @param events Map of events.
 * @param name Lower-case attribute name.
 */
function removeAttribute(element, events, name) {
    if (name.startsWith('on') && name.length > 2) {
        const eventName = name.substr(2);
        const eventValue = events.get(eventName);
        element.removeEventListener(eventName, eventValue);
    }
    else {
        element.removeAttribute(name);
    }
}
/**
 * Update all attributes in the specified element.
 * @param element HTML element.
 * @param attributes Attributes object.
 * @param events Map of events.
 * @param style Element style.
 */
function updateAttribute(element, attributes, events, style) {
    for (const [attribute, value] of Object.entries(attributes)) {
        const name = attribute.toLowerCase();
        if (!managedEvents.has(name) && !managedAttributes.has(name)) {
            if (value !== void 0 && value !== null && value !== false) {
                setAttribute(element, events, name, value);
            }
            else {
                removeAttribute(element, events, name);
            }
        }
        else if (name === 'style') {
            if (style !== void 0) {
                element.classList.remove(style.name);
            }
            if (value !== void 0) {
                if (!(value instanceof style_1.Style)) {
                    throw new TypeError(`Attribute '${name}' supports only Style objects.`);
                }
                else {
                    element.classList.add(value.name);
                }
            }
        }
    }
}
/**
 * Get the corresponding node reference from the specified node instance.
 * @param node Node instance.
 * @returns Returns the reference or undefined when no references were found.
 */
function getReference(node) {
    if (!node.reference) {
        const lastIndex = node.nodes.length - 1;
        const lastNode = node.nodes[lastIndex];
        return getReference(lastNode);
    }
    return node.reference;
}
/**
 * Insert the specified node in the given element.
 * @param element HTML element.
 * @param node Child node.
 * @param previous Previous node in which child is inserted.
 */
function insertChild(element, node, previous) {
    if (!node.reference) {
        for (const current of node.nodes) {
            insertChild(element, current, previous);
            previous = current;
        }
    }
    else {
        const attachEvent = node.attributes.onAttach;
        if (previous) {
            const reference = getReference(previous);
            if (!reference) {
                throw new TypeError(`Previous reference doesn't found.`);
            }
            else {
                element.insertBefore(node.reference, reference.nextSibling);
            }
        }
        else {
            element.insertBefore(node.reference, element.firstChild);
        }
        if (attachEvent !== void 0) {
            attachEvent(node.reference);
        }
    }
}
/**
 * Remove the specified node from the given element.
 * @param element HTML element.
 * @param node Child node.
 */
function removeChild(element, node) {
    if (!node.reference) {
        for (const current of node.nodes) {
            removeChild(element, current);
        }
    }
    else {
        const detachEvent = node.attributes.onDetach;
        element.removeChild(node.reference);
        if (detachEvent !== void 0) {
            detachEvent(node.reference);
        }
    }
}
/**
 * Node class.
 */
class Node extends Core.Node {
    constructor() {
        super(...arguments);
        /**
         * Node events.
         */
        _events.set(this, new Map());
        /**
         * Node style.
         */
        _style.set(this, void 0);
    }
    /**
     * Construct the node.
     */
    construct() {
        super.construct();
        if (this.type === 2 /* Element */) {
            updateAttribute(this.reference, this.attributes, __classPrivateFieldGet(this, _events), __classPrivateFieldGet(this, _style));
            __classPrivateFieldSet(this, _style, this.attributes.style);
        }
    }
    /**
     * Insert the child node.
     * @param node Node instance.
     * @param previous Previous node in which child is inserted.
     * @returns Returns the child node.
     */
    insert(node, previous) {
        super.insert(node, previous);
        if (this.type === 2 /* Element */) {
            insertChild(this.reference, node, previous);
        }
        return node;
    }
    /**
     * Remove the child node.
     * @param node Node instance.
     * @returns Returns the child node.
     */
    remove(node) {
        if (this.type === 2 /* Element */) {
            removeChild(this.reference, node);
        }
        super.remove(node);
        return node;
    }
    /**
     * Destruct the node.
     */
    destruct() {
        if (this.type === 2 /* Element */) {
            for (const [event, value] of __classPrivateFieldGet(this, _events)) {
                this.reference.removeEventListener(event, value);
                __classPrivateFieldGet(this, _events).delete(event);
            }
        }
        super.destruct();
    }
    /**
     * Refresh node attributes.
     * @param attributes New attributes.
     */
    refresh(attributes) {
        if (this.type === 2 /* Element */) {
            updateAttribute(this.reference, attributes, __classPrivateFieldGet(this, _events), __classPrivateFieldGet(this, _style));
            super.refresh(attributes);
            __classPrivateFieldSet(this, _style, this.attributes.style);
        }
        else {
            super.refresh(attributes);
        }
    }
}
exports.Node = Node;
_events = new WeakMap(), _style = new WeakMap();
//# sourceMappingURL=node.js.map