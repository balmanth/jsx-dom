"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _name, _rules;
Object.defineProperty(exports, "__esModule", { value: true });
/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
const Objects = require("@balmanth/objects");
/**
 * Get the dashed property based on the specified camel-case property.
 * @param property Camel-case property.
 * @returns Returns the dashed property.
 */
function getName(property) {
    return property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}
/**
 * Get an array containing all concatenated rules from the specified rules object.
 * @param rules Rules object.
 * @param prefix Optional rules prefix.
 * @returns Returns the concatenated rules array.
 */
function getRules(rules, prefix) {
    const list = [];
    for (const [property, value] of Object.entries(rules)) {
        const name = getName(property);
        const path = prefix ? `${prefix}-${name}` : name;
        if (Objects.isObject(value)) {
            list.push(...getRules(rules, path));
        }
        else if (value !== void 0) {
            list.push(`${path}:${value}`);
        }
    }
    return list;
}
/**
 * Style class.
 */
class Style {
    /**
     * Constructor.
     * @param name Style name.
     * @param rules Initial rules.
     */
    constructor(name, rules) {
        /**
         * Style name.
         */
        _name.set(this, void 0);
        /**
         * Style rules.
         */
        _rules.set(this, {});
        __classPrivateFieldSet(this, _name, name);
        this.select('', rules !== null && rules !== void 0 ? rules : {});
    }
    /**
     * Determines whether or not the style is empty.
     */
    get empty() {
        return Objects.isEmpty(__classPrivateFieldGet(this, _rules));
    }
    /**
     * Get style name.
     */
    get name() {
        return __classPrivateFieldGet(this, _name);
    }
    /**
     * Add a new nested style to match the specified selector and apply the given rules.
     * @param selector Nested selector.
     * @param rules Nested rules.
     * @returns Returns the generated nested style.
     * @throws Throws an error when the nested selector already exists.
     */
    select(selector, rules) {
        const path = `.${__classPrivateFieldGet(this, _name)}${selector}`;
        if (__classPrivateFieldGet(this, _rules)[path] !== void 0) {
            throw new TypeError(`Nested selector '${selector}' already exists.`);
        }
        __classPrivateFieldGet(this, _rules)[path] = rules;
        return this;
    }
    /**
     * Get the string representation of this style object.
     */
    toString() {
        const styles = [];
        for (const [selector, rules] of Object.entries(__classPrivateFieldGet(this, _rules))) {
            if (!Objects.isEmpty(rules)) {
                styles.push(`${selector}{${getRules(rules).join(';')}}`);
            }
        }
        return styles.join('\n');
    }
}
exports.Style = Style;
_name = new WeakMap(), _rules = new WeakMap();
//# sourceMappingURL=style.js.map