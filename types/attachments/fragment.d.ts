/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import * as Core from '@balmanth/jsx-core';
/**
 * Fragment attributes.
 */
export declare type Attributes = {
    /**
     * Fragment children.
     */
    children: Core.AttachmentChild | Core.AttachmentChild[];
};
/**
 * Fragment attachment.
 */
export declare class Fragment extends Core.Fragment<Attributes> {
}
