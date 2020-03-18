/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
import * as Objects from '@balmanth/objects';

/**
 * Rule type.
 */
export type Rules = {
  /**
   * Generic property.
   */
  [property: string]: Rules | string | number | undefined;
};

/**
 * Rules map.
 */
export type RulesMap = {
  /**
   * Generic rule.
   */
  [selector: string]: Rules;
};

/**
 * Get the dashed property based on the specified camel-case property.
 * @param property Camel-case property.
 * @returns Returns the dashed property.
 */
function getName(property: string): string {
  return property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

/**
 * Get an array containing all concatenated rules from the specified rules object.
 * @param rules Rules object.
 * @param prefix Optional rules prefix.
 * @returns Returns the concatenated rules array.
 */
function getRules(rules: Rules, prefix?: string): string[] {
  const list = [];
  for (const [property, value] of Object.entries(rules)) {
    const name = getName(property);
    const path = prefix ? `${prefix}-${name}` : name;
    if (Objects.isObject(value)) {
      list.push(...getRules(rules, path));
    } else if (value !== void 0) {
      list.push(`${path}:${value}`);
    }
  }
  return list;
}

/**
 * Style class.
 */
export class Style {
  /**
   * Style name.
   */
  #name: string;

  /**
   * Style rules.
   */
  #rules = <RulesMap>{};

  /**
   * Constructor.
   * @param name Style name.
   * @param rules Initial rules.
   */
  constructor(name: string, rules?: Rules) {
    this.#name = name;
    this.select('', rules ?? {});
  }

  /**
   * Determines whether or not the style is empty.
   */
  get empty(): boolean {
    return Objects.isEmpty(this.#rules);
  }

  /**
   * Get style name.
   */
  get name(): string {
    return this.#name;
  }

  /**
   * Add a new nested style to match the specified selector and apply the given rules.
   * @param selector Nested selector.
   * @param rules Nested rules.
   * @returns Returns the generated nested style.
   * @throws Throws an error when the nested selector already exists.
   */
  select(selector: string, rules: Rules): Style {
    const path = `.${this.#name}${selector}`;
    if (this.#rules[path] !== void 0) {
      throw new TypeError(`Nested selector '${selector}' already exists.`);
    }
    this.#rules[path] = rules;
    return this;
  }

  /**
   * Get the string representation of this style object.
   */
  toString(): string {
    const styles = [];
    for (const [selector, rules] of Object.entries(this.#rules)) {
      if (!Objects.isEmpty(rules)) {
        styles.push(`${selector}{${getRules(rules).join(';')}}`);
      }
    }
    return styles.join('\n');
  }
}
