/**
 * canvas-renderer
 * https://github.com/dmester/canvas-renderer
 * 
 * Copyright (c) 2017-2018 Daniel Mester Pirttijärvi
 *
 * Permission is hereby granted, free of charge, to any person obtaining 
 * a copy of this software and associated documentation files (the 
 * "Software"), to deal in the Software without restriction, including 
 * without limitation the rights to use, copy, modify, merge, publish, 
 * distribute, sublicense, and/or sell copies of the Software, and to 
 * permit persons to whom the Software is furnished to do so, subject to 
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be 
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import EdgeTable from "./rasterization/edgeTable.js";
import CanvasContext from "./canvasContext.js";
import colorUtils from "./colorUtils.js";

/**
 * Creates a new canvas with the specified dimensions given in pixels.
 * @param {number} width  Canvas width in pixels.
 * @param {number} height  Canvas height in pixels.
 * @constructor
 */
function Canvas(width = 640, height = 448) {
    this.width = width;
    this.height = height;
    this.clientWidth = width;
    this.clientHeight = height;
    this.style = {
      position: "absolute",
      left: "0",
      top: "0",
      width: width + "px",
      height: height + "px",
    }

    // TODO: Once fill works without this, remove it
    this._edges = new EdgeTable(width, height);

    this.getBoundingClientRect = () => {
      return {
          left: 0,
          top: 0,
          right: width,
          bottom: height,
      }
  }
}

/**
 * The width of the canvas in pixels.
 * @type {number}
 */
Canvas.prototype.width = 0;

/**
 * The height of the canvas in pixels.
 * @type {number}
 */
Canvas.prototype.height = 0;

/**
 * Specifies the background color. Default is fully transparent. Allowed values are:
 * - 32 bit integers on the format `0xRRGGBBAA`
 * - strings on the format `"#RGB"`
 * - strings on the format `"#RGBA"`
 * - strings on the format `"#RRGGBB"`
 * - strings on the format `"#RRGGBBAA"`
 * - strings on the format `"rgb(255, 255, 255)"`
 * - strings on the format `"rgb(255, 255, 255, 0.5)"`
 * - strings on the format `"rgb(255, 255, 255, 50%)"`
 * - strings on the format `"rgba(255, 255, 255, 0.5)"`
 * - strings on the format `"rgba(255, 255, 255, 50%)"`
 * - strings on the format `"hsl(134, 50%, 50%)"`
 * - strings on the format `"hsl(134, 50%, 50%, 0.5)"`
 * - strings on the format `"hsl(134, 50%, 50%, 50%)"`
 * - strings on the format `"hsla(134, 50%, 50%, 0.5)"`
 * - strings on the format `"hsla(134, 50%, 50%, 50%)"`
 * - strings on the format `"hwb(134, 50%, 50%)"`
 * - strings on the format `"hwb(134, 50%, 50%, 0.5)"`
 * - strings on the format `"hwb(134, 50%, 50%, 50%)"`
 * @type {string|number}
 */
Canvas.prototype._backColor = Color.new(0, 0, 0, 0);

Object.defineProperty(Canvas.prototype, "backColor", {
  get() {
    console.log("Getting back color", colorUtils.format(this._backColor));
    return this._backColor;
  },
  set(color) {
    console.log("Setting back color", colorUtils.format(color));
    this._backColor = colorUtils.parse(color);
  },
});

/**
 * Gets a context used to draw polygons on this canvas.
 * @returns {CanvasContext}
 */
Canvas.prototype.getContext = function Canvas_getContext() {
    return new CanvasContext(this);
};

export default Canvas;
