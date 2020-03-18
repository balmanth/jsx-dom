/**
 * Rule type.
 */
export declare type Rules = {
    /**
     * Generic property.
     */
    [property: string]: Rules | string | number | undefined;
};
/**
 * Rules map.
 */
export declare type RulesMap = {
    /**
     * Generic rule.
     */
    [selector: string]: Rules;
};
/**
 * Style class.
 */
export declare class Style {
    #private;
    /**
     * Constructor.
     * @param name Style name.
     * @param rules Initial rules.
     */
    constructor(name: string, rules?: Rules);
    /**
     * Determines whether or not the style is empty.
     */
    get empty(): boolean;
    /**
     * Get style name.
     */
    get name(): string;
    /**
     * Add a new nested style to match the specified selector and apply the given rules.
     * @param selector Nested selector.
     * @param rules Nested rules.
     * @returns Returns the generated nested style.
     * @throws Throws an error when the nested selector already exists.
     */
    select(selector: string, rules: Rules): Style;
    /**
     * Get the string representation of this style object.
     */
    toString(): string;
}
