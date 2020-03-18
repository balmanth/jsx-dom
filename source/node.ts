/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import * as Core from '@balmanth/jsx-core';

import { Style } from './components/style';

// Node types.
import Types = Core.NodeTypes;
export { Types };

/**
 * Node attributes.
 */
export type Attributes = Core.NodeAttributes;

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
function setAttribute(element: HTMLElement, events: Map<string, EventListener>, name: string, value: any): void {
  if (name.startsWith('on') && name.length > 2) {
    const eventName = name.substr(2);
    const eventValue = events.get(eventName)!;
    element.removeEventListener(eventName, eventValue);
    if (!(value instanceof Function)) {
      throw new TypeError(`Attribute '${eventName}' supports only functions.`);
    } else {
      element.addEventListener(eventName, value);
      events.set(eventName, value);
    }
  } else {
    if (value === true) {
      element.setAttribute(name, '');
    } else {
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
function removeAttribute(element: HTMLElement, events: Map<string, EventListener>, name: string): void {
  if (name.startsWith('on') && name.length > 2) {
    const eventName = name.substr(2);
    const eventValue = events.get(eventName)!;
    element.removeEventListener(eventName, eventValue);
  } else {
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
function updateAttribute<T extends JSX.ElementClassAttributes>(
  element: HTMLElement,
  attributes: T,
  events: Map<string, EventListener>,
  style: Style | undefined
): void {
  for (const [attribute, value] of Object.entries(attributes)) {
    const name = attribute.toLowerCase();
    if (!managedEvents.has(name) && !managedAttributes.has(name)) {
      if (value !== void 0 && value !== null && value !== false) {
        setAttribute(element, events, name, value);
      } else {
        removeAttribute(element, events, name);
      }
    } else if (name === 'style') {
      if (style !== void 0) {
        element.classList.remove(style.name);
      }
      if (value !== void 0) {
        if (!(value instanceof Style)) {
          throw new TypeError(`Attribute '${name}' supports only Style objects.`);
        } else {
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
function getReference(node: Node): globalThis.Node {
  if (!node.reference) {
    const lastIndex = node.nodes.length - 1;
    const lastNode = <Node>node.nodes[lastIndex];
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
function insertChild(element: HTMLElement, node: Node, previous?: Node): void {
  if (!node.reference) {
    for (const current of <Node[]>node.nodes) {
      insertChild(element, current, previous);
      previous = current;
    }
  } else {
    const attachEvent = node.attributes.onAttach;
    if (previous) {
      const reference = getReference(previous);
      if (!reference) {
        throw new TypeError(`Previous reference doesn't found.`);
      } else {
        element.insertBefore(node.reference, reference.nextSibling);
      }
    } else {
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
function removeChild(element: HTMLElement, node: Node): void {
  if (!node.reference) {
    for (const current of <Node[]>node.nodes) {
      removeChild(element, current);
    }
  } else {
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
export class Node<T extends Attributes = any> extends Core.Node<T> {
  /**
   * Node events.
   */
  #events = new Map<string, EventListener>();

  /**
   * Node style.
   */
  #style?: Style;

  /**
   * Construct the node.
   */
  construct(): void {
    super.construct();
    if (this.type === Types.Element) {
      updateAttribute(this.reference, this.attributes, this.#events, this.#style);
      this.#style = this.attributes.style;
    }
  }

  /**
   * Insert the child node.
   * @param node Node instance.
   * @param previous Previous node in which child is inserted.
   * @returns Returns the child node.
   */
  insert<T>(node: Node<T>, previous?: Node): Node<T> {
    super.insert(node, previous);
    if (this.type === Types.Element) {
      insertChild(this.reference, node, previous);
    }
    return node;
  }

  /**
   * Remove the child node.
   * @param node Node instance.
   * @returns Returns the child node.
   */
  remove<T>(node: Node<T>): Node<T> {
    if (this.type === Types.Element) {
      removeChild(this.reference, node);
    }
    super.remove(node);
    return node;
  }

  /**
   * Destruct the node.
   */
  destruct(): void {
    if (this.type === Types.Element) {
      for (const [event, value] of this.#events) {
        this.reference.removeEventListener(event, value);
        this.#events.delete(event);
      }
    }
    super.destruct();
  }

  /**
   * Refresh node attributes.
   * @param attributes New attributes.
   */
  refresh(attributes: Partial<T>): void {
    if (this.type === Types.Element) {
      updateAttribute(this.reference, attributes, this.#events, this.#style);
      super.refresh(attributes);
      this.#style = this.attributes.style;
    } else {
      super.refresh(attributes);
    }
  }
}
