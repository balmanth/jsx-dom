"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
const component_1 = require("../attachments/component");
const engine_1 = require("../engine");
/**
 * Style class.
 */
class StyleSheet extends component_1.Component {
    /**
     * Render contents.
     */
    render() {
        const { media } = this.attributes;
        return (engine_1.create("style", { type: "text/css", media: media }, this.children));
    }
}
exports.StyleSheet = StyleSheet;
//# sourceMappingURL=stylesheet.js.map