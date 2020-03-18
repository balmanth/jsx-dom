/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import * as Core from '@balmanth/jsx-core';
import Types = Core.NodeTypes;
export { Types };
/**
 * Node attributes.
 */
export declare type Attributes = Core.NodeAttributes;
/**
 * Node class.
 */
export declare class Node<T extends Attributes = any> extends Core.Node<T> {
    #private;
    /**
     * Construct the node.
     */
    construct(): void;
    /**
     * Insert the child node.
     * @param node Node instance.
     * @param previous Previous node in which child is inserted.
     * @returns Returns the child node.
     */
    insert<T>(node: Node<T>, previous?: Node): Node<T>;
    /**
     * Remove the child node.
     * @param node Node instance.
     * @returns Returns the child node.
     */
    remove<T>(node: Node<T>): Node<T>;
    /**
     * Destruct the node.
     */
    destruct(): void;
    /**
     * Refresh node attributes.
     * @param attributes New attributes.
     */
    refresh(attributes: Partial<T>): void;
}
