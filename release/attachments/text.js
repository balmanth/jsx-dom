"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**!
 * Copyright (C) 2020 Silas B. Domingos
 * @license MIT
 */
const Core = require("@balmanth/jsx-core");
/**
 * Text attachment.
 */
class Text extends Core.Text {
    /**
     * Text renderer.
     */
    render() {
        return document.createTextNode(this.content);
    }
}
exports.Text = Text;
//# sourceMappingURL=text.js.map