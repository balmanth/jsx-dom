/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import { Component } from '../attachments/component';
import { create } from '../engine';
import { Style } from './style';

/**
 * Style attributes.
 */
export type Attributes = {
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
export class StyleSheet extends Component<Attributes> {
  /**
   * Render contents.
   */
  render() {
    const { media } = this.attributes;
    return (
      <style type="text/css" media={media}>
        {this.children}
      </style>
    );
  }
}
