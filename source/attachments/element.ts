/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import * as Core from '@balmanth/jsx-core';

/**
 * Element attributes.
 */
export type Attributes = {
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
export class Element<T extends Attributes = any> extends Core.Element<T> {
  /**
   * Element renderer.
   */
  render(): Node {
    const { xmlns, is } = this.attributes;
    if (xmlns !== void 0) {
      return document.createAttributeNS(xmlns, this.name);
    }
    return document.createElement(this.name, { is: is });
  }
}
