/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import * as Core from '@balmanth/jsx-core';
/**
 * Element attributes.
 */
export declare type Attributes = {
    /**
     * Generic attributes.
     */
    [attribute: string]: any;
    /**
     * XML Namespace.
     */
    xmlns: string;
    /**
     * HTML5 'is' attribute.
     */
    is: string;
};
/**
 * Element attachment.
 */
export declare class Element<T extends Attributes = any> extends Core.Element<T> {
    /**
     * Element renderer.
     */
    render(): Node;
}
