/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import * as Core from '@balmanth/jsx-core';
/**
 * Component state.
 */
export declare type State = Core.ComponentState;
/**
 * Component attributes.
 */
export declare type Attributes = Core.ComponentAttributes;
/**
 * Component attachment.
 */
export declare class Component<T extends Attributes = any, U extends State = any> extends Core.Component<T, U> {
}
