/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
/// <reference path="../types/core/jsx.d.ts" />

export { create, render, interval, initialize, terminate } from './engine';

// General.
import * as Core from '@balmanth/jsx-core';
export import Attachment = Core.Attachment;
export import json = Core.json;

// Fragments.
import * as Fragments from './attachments/fragment';
import Fragment = Fragments.Fragment;
export { Fragment };

// Components.
import * as Components from './attachments/component';
import Component = Components.Component;
import ComponentState = Components.State;
import ComponentAttributes = Components.Attributes;
export { Component, ComponentState, ComponentAttributes };

// Elements.
import * as Elements from './attachments/element';
import Element = Elements.Element;
export { Element };

// Text.
import * as Texts from './attachments/text';
import Text = Texts.Text;
export { Text };

// Nodes.
import * as Nodes from './node';
import Node = Nodes.Node;
import NodeTypes = Nodes.Types;
export { Node, NodeTypes };

// Styles.
import * as Styles from './components/style';
import Style = Styles.Style;
import StyleRules = Styles.Rules;
export { Style, StyleRules };

// StyleSheets.
import * as StyleSheets from './components/stylesheet';
import StyleSheet = StyleSheets.StyleSheet;
export { StyleSheet };
