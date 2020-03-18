"use strict";
/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
/// <reference path="../types/core/jsx.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Core = require("@balmanth/jsx-core");
const Objects = require("@balmanth/objects");
const component_1 = require("./attachments/component");
const element_1 = require("./attachments/element");
const text_1 = require("./attachments/text");
const node_1 = require("./node");
/**
 * Class models.
 */
const classModels = { Element: element_1.Element, Text: text_1.Text, Node: node_1.Node };
/**
 * Pending nodes for rendering.
 */
const renderNodes = new Map();
/**
 * Original update method for rendering.
 */
const renderUpdate = component_1.Component.prototype.update;
/**
 * Last rendering timestamp.
 */
var renderTimestamp;
/**
 * Rendering internal.
 */
var renderInternal;
/**
 * Rendering Id;
 */
var renderId;
/**
 * Update the current component state and try to recycle it.
 * @param this Attachment instance.
 * @param node Node instance.
 * @param state New state.
 * @param recycle Determines whether or not the component will be recycled.
 */
function newUpdate(node, state, recycle) {
    const currentState = this.state;
    renderUpdate.call(this, state, recycle);
    if (!Objects.areEqual(currentState, this.state)) {
        const lastState = renderNodes.get(node);
        if (!Objects.areEqual(lastState, this.state)) {
            if (recycle !== false) {
                renderNodes.set(node, currentState);
            }
        }
        else {
            renderNodes.delete(node);
        }
    }
}
/**
 * Create a new node from the specified markup.
 * @param source Markup source.
 * @param attributes Initial attributes.
 * @param children Initial children.
 * @returns Returns the node instance.
 */
function create(source, attributes, ...children) {
    const node = Core.create(classModels, source, attributes, children);
    if (node_1.Node.isComponentType(source)) {
        const attachment = node.attachment;
        Object.defineProperties(attachment, {
            update: {
                value: newUpdate.bind(attachment, node)
            }
        });
    }
    return node;
}
exports.create = create;
/**
 * Render the specified node and insert it in the given parent.
 * @param node Node instance.
 * @param parent HTML element or Shadow root.
 * @throws Throws an error when the given node isn't valid.
 */
function render(node, parent) {
    if (!(node instanceof node_1.Node)) {
        throw new TypeError(`Node instance isn't valid.`);
    }
    else {
        if (!node.ready) {
            node.construct();
        }
        if (node.reference) {
            parent.appendChild(node.reference);
        }
        else {
            for (const current of node.nodes) {
                render(current, parent);
            }
        }
    }
}
exports.render = render;
/**
 * Set the maximum renderings per second (RPS).
 * @param rps New RPS value.
 * @throws Throw an error when the RPS value isn't between 20 and 100.
 */
function interval(rps) {
    if (rps < 20 || rps > 100) {
        throw new TypeError(`The RPS value must be between 20 and 100.`);
    }
    renderInternal = 1000 / rps;
    renderTimestamp = Date.now();
}
exports.interval = interval;
/**
 * Initialize the auto-renderer.
 * @param rps Maximum renderings per second (RPS)
 * @throws Throw an error when the renderer is already initialized.
 */
function initialize(rps) {
    if (renderId !== void 0) {
        throw new Error(`Renderer is already initialized.`);
    }
    interval(rps !== null && rps !== void 0 ? rps : 30);
    (function render() {
        renderId = window.requestAnimationFrame(render);
        const timestamp = Date.now();
        const elapsed = timestamp - renderTimestamp;
        if (elapsed > renderInternal) {
            renderTimestamp = timestamp - (elapsed % renderInternal);
            for (const [node] of renderNodes) {
                renderNodes.delete(node);
                node.update();
            }
        }
    })();
}
exports.initialize = initialize;
/**
 * Terminate the auto-renderer.
 * @throws Throws an error when there's no initialized renderer.
 */
function terminate() {
    if (renderId === void 0) {
        throw new Error(`There's no initialized renderer.`);
    }
    window.cancelAnimationFrame(renderId);
}
exports.terminate = terminate;
//# sourceMappingURL=engine.js.map