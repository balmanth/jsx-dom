"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
const Core = require("@balmanth/jsx-core");
/**
 * Element attachment.
 */
class Element extends Core.Element {
    /**
     * Element renderer.
     */
    render() {
        const { xmlns, is } = this.attributes;
        if (xmlns !== void 0) {
            return document.createAttributeNS(xmlns, this.name);
        }
        return document.createElement(this.name, { is: is });
    }
}
exports.Element = Element;
//# sourceMappingURL=element.js.map