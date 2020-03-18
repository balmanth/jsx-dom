/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import { Component } from '../attachments/component';
import { Style } from './style';
/**
 * Style attributes.
 */
export declare type Attributes = {
    /**
     * Media query options.
     */
    media?: string;
    /**
     * Stylesheet children.
     */
    children: Style | Style[];
};
/**
 * Style class.
 */
export declare class StyleSheet extends Component<Attributes> {
    /**
     * Render contents.
     */
    render(): JSX.Element;
}
