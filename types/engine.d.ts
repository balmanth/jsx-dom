/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
/// <reference path="core/jsx.d.ts" />
import * as Core from '@balmanth/jsx-core';
import { Node } from './node';
/**
 * Parent element type.
 */
declare type ParentElement = globalThis.ShadowRoot | globalThis.Element;
/**
 * Create a new node from the specified markup.
 * @param source Markup source.
 * @param attributes Initial attributes.
 * @param children Initial children.
 * @returns Returns the node instance.
 */
export declare function create<T extends Core.Types>(source: T, attributes: Core.PickAttributes<T> | null, ...children: Core.AttachmentChild[]): Node<Core.PickAttributes<T>>;
/**
 * Render the specified node and insert it in the given parent.
 * @param node Node instance.
 * @param parent HTML element or Shadow root.
 * @throws Throws an error when the given node isn't valid.
 */
export declare function render(node: JSX.Element, parent: ParentElement): void;
/**
 * Set the maximum renderings per second (RPS).
 * @param rps New RPS value.
 * @throws Throw an error when the RPS value isn't between 20 and 100.
 */
export declare function interval(rps: number): void;
/**
 * Initialize the auto-renderer.
 * @param rps Maximum renderings per second (RPS)
 * @throws Throw an error when the renderer is already initialized.
 */
export declare function initialize(rps?: number): void;
/**
 * Terminate the auto-renderer.
 * @throws Throws an error when there's no initialized renderer.
 */
export declare function terminate(): void;
export {};
