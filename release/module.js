"use strict";
/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
/// <reference path="../types/core/jsx.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = require("./engine");
exports.create = engine_1.create;
exports.render = engine_1.render;
exports.interval = engine_1.interval;
exports.initialize = engine_1.initialize;
exports.terminate = engine_1.terminate;
// General.
const Core = require("@balmanth/jsx-core");
exports.Attachment = Core.Attachment;
exports.json = Core.json;
// Fragments.
const Fragments = require("./attachments/fragment");
var Fragment = Fragments.Fragment;
exports.Fragment = Fragment;
// Components.
const Components = require("./attachments/component");
var Component = Components.Component;
exports.Component = Component;
// Elements.
const Elements = require("./attachments/element");
var Element = Elements.Element;
exports.Element = Element;
// Text.
const Texts = require("./attachments/text");
var Text = Texts.Text;
exports.Text = Text;
// Nodes.
const Nodes = require("./node");
var Node = Nodes.Node;
exports.Node = Node;
// Styles.
const Styles = require("./components/style");
var Style = Styles.Style;
exports.Style = Style;
// StyleSheets.
const StyleSheets = require("./components/stylesheet");
var StyleSheet = StyleSheets.StyleSheet;
exports.StyleSheet = StyleSheet;
//# sourceMappingURL=module.js.map