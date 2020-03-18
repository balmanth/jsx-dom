/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
/// <reference path="../types/core/jsx.d.ts" />

import * as Core from '@balmanth/jsx-core';
import * as Objects from '@balmanth/objects';

import { Component, State } from './attachments/component';
import { Element } from './attachments/element';
import { Text } from './attachments/text';
import { Node } from './node';

/**
 * Parent element type.
 */
type ParentElement = globalThis.ShadowRoot | globalThis.Element;

/**
 * Class models.
 */
const classModels = { Element, Text, Node };

/**
 * Pending nodes for rendering.
 */
const renderNodes = new Map<Node, State>();

/**
 * Original update method for rendering.
 */
const renderUpdate = Component.prototype.update;

/**
 * Last rendering timestamp.
 */
var renderTimestamp: number;

/**
 * Rendering internal.
 */
var renderInternal: number;

/**
 * Rendering Id;
 */
var renderId: number;

/**
 * Update the current component state and try to recycle it.
 * @param this Attachment instance.
 * @param node Node instance.
 * @param state New state.
 * @param recycle Determines whether or not the component will be recycled.
 */
function newUpdate<T>(this: Component<T>, node: Node<T>, state: T, recycle?: boolean): void {
  const currentState = this.state;
  renderUpdate.call(this, state, recycle);
  if (!Objects.areEqual(currentState, this.state)) {
    const lastState = renderNodes.get(node);
    if (!Objects.areEqual(lastState, this.state)) {
      if (recycle !== false) {
        renderNodes.set(node, currentState);
      }
    } else {
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
export function create<T extends Core.Types>(
  source: T,
  attributes: Core.PickAttributes<T> | null,
  ...children: Core.AttachmentChild[]
): Node<Core.PickAttributes<T>> {
  const node = <Node<Core.PickAttributes<T>>>Core.create(classModels, source, attributes, children);
  if (Node.isComponentType(source)) {
    const attachment = <Component<Core.PickAttributes<T>>>node.attachment;
    Object.defineProperties(attachment, {
      update: {
        value: newUpdate.bind(attachment, node)
      }
    });
  }
  return node;
}

/**
 * Render the specified node and insert it in the given parent.
 * @param node Node instance.
 * @param parent HTML element or Shadow root.
 * @throws Throws an error when the given node isn't valid.
 */
export function render(node: JSX.Element, parent: ParentElement): void {
  if (!(node instanceof Node)) {
    throw new TypeError(`Node instance isn't valid.`);
  } else {
    if (!node.ready) {
      node.construct();
    }
    if (node.reference) {
      parent.appendChild(node.reference);
    } else {
      for (const current of node.nodes) {
        render(current, parent);
      }
    }
  }
}

/**
 * Set the maximum renderings per second (RPS).
 * @param rps New RPS value.
 * @throws Throw an error when the RPS value isn't between 20 and 100.
 */
export function interval(rps: number): void {
  if (rps < 20 || rps > 100) {
    throw new TypeError(`The RPS value must be between 20 and 100.`);
  }
  renderInternal = 1000 / rps;
  renderTimestamp = Date.now();
}

/**
 * Initialize the auto-renderer.
 * @param rps Maximum renderings per second (RPS)
 * @throws Throw an error when the renderer is already initialized.
 */
export function initialize(rps?: number): void {
  if (renderId !== void 0) {
    throw new Error(`Renderer is already initialized.`);
  }
  interval(rps ?? 30);
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

/**
 * Terminate the auto-renderer.
 * @throws Throws an error when there's no initialized renderer.
 */
export function terminate(): void {
  if (renderId === void 0) {
    throw new Error(`There's no initialized renderer.`);
  }
  window.cancelAnimationFrame(renderId);
}
