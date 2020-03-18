/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import * as Core from '@balmanth/jsx-core';
/**
 * Text attributes.
 */
export declare type Attributes = Core.TextAttributes;
/**
 * Text attachment.
 */
export declare class Text<T extends Attributes = any> extends Core.Text<T> {
    /**
     * Text renderer.
     */
    render(): Node;
}
