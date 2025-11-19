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
 
import Edge from "./rasterization/edge.js";
import colorUtils from "./colorUtils.js";
import Matrix from "./matrix.js";
import canvasState from "./canvasState.js";
import PS2Renderer from "./rasterization/ps2renderer.js";

/**
 * Creates a new canvas with the specified dimensions given in pixels.
 */
function CanvasContext(canvas) {
    this.canvas = canvas;

    // Use PS2Renderer for direct drawing instead of edge-based rasterization
    this._renderer = new PS2Renderer();
    
    // Keep edge table for backward compatibility if needed, but prefer renderer
    this._edges = canvas._edges;
    this._paths = [];

    // Immediate-Mode - Sacrifices accuracy for performance
    this.immediate = false;
    this._lastX = 0;
    this._lastY = 0;

    this._font = new Font("default");

    this._savedStates = [];
    this.resetTransform();
}

CanvasContext.prototype.webkitBackingStorePixelRatio = 1;
CanvasContext.prototype.mozBackingStorePixelRatio = 1;
CanvasContext.prototype.msBackingStorePixelRatio = 1;
CanvasContext.prototype.oBackingStorePixelRatio = 1;
CanvasContext.prototype.backingStorePixelRatio = 1;


// Cache stroke/fill colors 
const colorCache = new Map();

/**
 * Specifies the fill color that is used when the fill method is called. Allowed values are:
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
CanvasContext.prototype._fillStyle = Color.new(0, 0, 0, 255);
Object.defineProperty(CanvasContext.prototype, "fillStyle", {
    get() {
      return this._fillStyle;
    },
  
    set(color) {
      if (colorCache.has(color)) {
        // this._fillStyle = colorCache.get(color);
      } else {
        // this._fillStyle = colorUtils.parse(color);
        // colorCache.set(color, this._fillStyle);
      }
    },
  });

/**
 * Specifies the stroke color that is used when the stroke method is called. Allowed values are:
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
CanvasContext.prototype._strokeStyle = Color.new(0, 0, 0, 255);
Object.defineProperty(CanvasContext.prototype, "strokeStyle", {
  get() {
    return this._strokeStyle;
  },

  set(color) {
    if (colorCache.has(color)) {
      this._strokeStyle = colorCache.get(color);
    } else {
      this._strokeStyle = colorUtils.parse(color);
      colorCache.set(color, this._strokeStyle);
    }
  },
});

CanvasContext.prototype._tempColor = Color.new(0, 0, 0, 255);
Object.defineProperty(CanvasContext.prototype, "tempColor", {
  get() {
    return this._tempColor;
  },

  set(color) {
    if (colorCache.has(color)) {
      this._tempColor = colorCache.get(color);
    } else {
      this._tempColor = colorUtils.parse(color);
      colorCache.set(color, this._tempColor);
    }
  },
});

CanvasContext.prototype._globalAlpha = Color.new(255, 255, 255, 128);
Object.defineProperty(CanvasContext.prototype, "globalAlpha", {
  get() {
    // return Color.getA(this._globalAlpha);
    return 1;
  },

  set(alpha) {
    // if (colorCache.has(color)) {
    //   this._globalAlpha = colorCache.get(color);
    // } else {
    //   this._globalAlpha = colorUtils.parse(color);
    //   colorCache.set(color, this._globalAlpha);
    // }
    // Color.setA(this._globalAlpha, alpha);
  },
});

CanvasContext.prototype._lineWidth = 1;
Object.defineProperty(CanvasContext.prototype, "lineWidth", {
  get() {
    return this._lineWidth;
  },

  set(newWidth) {
    this._lineWidth = newWidth;
  },
});

CanvasContext.prototype.drawImage = function CanvasContext_drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    // (_pTPE.texture, _pTPE.x, _pTPE.y, _pTPE.w, _pTPE.h, Math.floor(_x) + _pTPE.XOffset, Math.floor(_y) + _pTPE.YOffset, _pTPE.CropWidth, _pTPE.CropHeight);
    const imagePos = this.__transform.multiplyPoint(dx, dy);
    const scale = this.__transform.multiplyPoint(dWidth, dHeight);
    // debug("drawImage ", imagePos.x, imagePos.y, dWidth, dHeight, sx, sy, sWidth, sHeight)
    // image.color = this._globalAlpha;

    image.width = dWidth * this.__transform._a || image.width;
    image.height = dHeight * this.__transform._d || image.height;
    image.startx = sx || image.startx;
    image.starty = sy || image.starty;
    image.endx = sx + sWidth || image.width;
    image.endy = sy + sHeight || image.height;
    // debug("--------------------------------drawImage--------------------------------", JSON.stringify(image), image.draw);
    image.draw(imagePos.x, imagePos.y);
};

/**
 * Saves the current drawing state to a stack. The state can later be restored by calling `CanvasContext.restore()`.
 * 
 * The following state is included when being saved to the stack:
 * - Current transformation matrix
 * - Current fill style
 */
CanvasContext.prototype.save = function CanvasContext_save() {
    this._savedStates.push(canvasState.capture(this));
};

/**
 * Restores the last drawing state that was saved with `CanvasContext.save()`, and then removes it from the state stack.
 */
CanvasContext.prototype.restore = function CanvasContext_restore() {
    if (this._savedStates.length) {
        canvasState.restore(this, this._savedStates.pop());
    }
};

/**
 * Restores the current transformation to the identity matrix.
 */
CanvasContext.prototype.resetTransform = function CanvasContext_resetTransform() {
    this.__transform = new Matrix(1, 0, 0, 1, 0, 0);
};

/**
 * Multiplies the current transformation matrix with the specified values.
 */
CanvasContext.prototype.transform = function CanvasContext_transform(a, b, c, d, e, f) {
    if (!Number.isFinite(a) ||
        !Number.isFinite(b) ||
        !Number.isFinite(c) ||
        !Number.isFinite(d) ||
        !Number.isFinite(e) ||
        !Number.isFinite(f)) {
        return;
    }

    this.__transform = this.__transform.multiply(a, b, c, d, e, f);
};

/**
 * Sets the transformation matrix to the specified matrix.
 */
CanvasContext.prototype.setTransform = function CanvasContext_transform(a, b, c, d, e, f) {
    console.log("In canvas context setTransform", a, b, c, d, e, f)
    if (!Number.isFinite(a) ||
        !Number.isFinite(b) ||
        !Number.isFinite(c) ||
        !Number.isFinite(d) ||
        !Number.isFinite(e) ||
        !Number.isFinite(f)) {

        // throw new Error("a is NaN");
        return;
    }

    this.__transform = new Matrix(a, b, c, d, e, f);
    console.log("new Matrix", this.__transform)
};

/**
 * Applies a translation transformation on top of the current transform.
 * @param {number} x  Distance to move in the horizontal direction in pixels.
 * @param {number} y  Distance to move in the vertical direction in pixels.
 */
CanvasContext.prototype.translate = function CanvasContext_translate(x, y) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return;
    }

    this.__transform = this.__transform.translate(x, y);
};

/**
 * Applies a scale transformation on top of the current transform.
 * @param {number} x  Scale in the horizontal direction. `1` means no horizontal scaling.
 * @param {number} y  Scale in the vertical direction. `1` means no vertical scaling.
 */
CanvasContext.prototype.scale = function CanvasContext_scale(x, y) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return;
    }

    this.__transform = this.__transform.scale(x, y);
};

/**
 * Applies a rotation transformation on top of the current transform around the current canvas origo.
 * @param {number} angle  Angle in radians measured clockwise from the positive x axis.
 */
CanvasContext.prototype.rotate = function CanvasContext_rotate(angle) {
    if (!Number.isFinite(angle)) {
        return;
    }

    this.__transform = this.__transform.rotate(angle);
};

/**
 * Removes all existing subpaths and begins a new path.
 */
CanvasContext.prototype.beginPath = function CanvasContext_beginPath() {
    this._paths.length = 0;
};

/**
 * Starts a new subpath that begins in the same point as the start and end point of the previous one.
 */
CanvasContext.prototype.closePath = function CanvasContext_closePath() {
    if (this._paths.length) {
        var path = this._paths[this._paths.length - 1];
        if (path.length > 2) {
            // Close path
            if (path[0] != path[path.length - 2] ||
                path[1] != path[path.length - 1]) {
                path.push(path[0]);
                path.push(path[1]);
            }

            // Begin a new path
            this._paths.push([path[0], path[1]]);
        }
    }
};

/**
 * Begins a new subpath by moving the cursor to the specified position.
 * @param {number} x  X coordinate.
 * @param {number} y  Y coordinate.
 */
CanvasContext.prototype.moveTo = function CanvasContext_moveTo(x, y) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return;
    }

    if(this.immediate) {
      this._lastX = x;
      this._lastY = y;
      return;
    }

    var p = this.__transform.multiplyPoint(x, y);
    this._paths.push([p.x, p.y]);
};

/**
 * Inserts an edge between the last and specified position.
 * @param {number} x  Target X coordinate.
 * @param {number} y  Target Y coordinate.
 */
CanvasContext.prototype.lineTo = function CanvasContext_lineTo(x, y) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return;
    }

    if(this.immediate) {
      this._renderer.drawLine(this._lastX, this._lastY, x, y, this.strokeStyle, this._lineWidth);
      this._lastX = x;
      this._lastY = y;
      return;
    }

    if (!this._paths.length) {
        this._paths.push([]);
    }

    var p = this.__transform.multiplyPoint(x, y);
    var path = this._paths[this._paths.length - 1];
    path.push(p.x);
    path.push(p.y);
};

/**
 * Adds an arc to the current path.
 * @param {number} x  X coordinate of the center of the arc.
 * @param {number} y  Y coordinate of the center of the arc.
 * @param {number} radius  Radius of the arc.
 * @param {number} startAngle  The angle in radians at which the arc starts, measured clockwise from the positive x axis.
 * @param {number} endAngle  The angle in radians at which the arc end, measured clockwise from the positive x axis.
 * @param {boolean} [anticlockwise]  Specifies whether the arc will be drawn counter clockwise. Default is clockwise.
 */
CanvasContext.prototype.arc = function CanvasContext_arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    if (!Number.isFinite(x) || !Number.isFinite(y) ||
        !Number.isFinite(radius) ||
        !Number.isFinite(startAngle) || !Number.isFinite(endAngle)) {
        return;
    }

    const TARGET_CHORD_LENGTH_PIXELS = 3;
    
    var sectors = Math.floor((Math.PI * radius * 2) / TARGET_CHORD_LENGTH_PIXELS);
    if (sectors < 9) {
        sectors = 9;
    }
    
    var sectorAngle = Math.PI * 2 / sectors;

    if (startAngle === endAngle) {
        return;
    }

    if (anticlockwise) {
        sectorAngle = -sectorAngle;

        if (startAngle - endAngle >= Math.PI * 2) {
            endAngle = startAngle - Math.PI * 2;
        }
        else {
            // Normalize end angle so that the sweep angle is in the range (0, -2PI]
            endAngle += Math.PI * 2 * Math.ceil((startAngle - endAngle) / (Math.PI * 2) - 1);
        }
    }
    else {
        if (endAngle - startAngle >= Math.PI * 2) {
            endAngle = startAngle + Math.PI * 2;
        }
        else {
            // Normalize end angle so that the sweep angle is in the range (0, 2PI]
            endAngle -= Math.PI * 2 * Math.ceil((endAngle - startAngle) / (Math.PI * 2) - 1);
        }
    }
    
    var dx, dy;
    sectors = (endAngle - startAngle) / sectorAngle;

    var angle = startAngle;
    
    for (var i = 0; i < sectors; i++) {
        dx = Math.cos(angle) * radius;
        dy = Math.sin(angle) * radius;
        this.lineTo(x + dx, y + dy);
        angle += sectorAngle;
    }

    dx = Math.cos(endAngle) * radius;
    dy = Math.sin(endAngle) * radius;
    this.lineTo(x + dx, y + dy);
};

/**
 * Fills a specified rectangle with fully transparent black without blending with the background or affecting the current paths.
 * @param {number} x  X coordinate of the left side of the rectangle.
 * @param {number} y  Y coordinate of the top of the rectangle.
 * @param {number} width  Width of the rectangle.
 * @param {number} height  Height of the rectangle.
 */
CanvasContext.prototype.clearRect = function CanvasContext_clearRect(x, y, width, height) {
    var fullCanvas = false;

    if (!this.__transform.hasSkewing()) {
        // Check if the whole canvas is cleared
        var topLeft = this.__transform.multiplyPoint(x, y);
        if (topLeft.x <= 0 && topLeft.y <= 0) {
            var bottomRight = this.__transform.multiplyPoint(x + width, y + height);
            if (bottomRight.x >= this.canvas.width &&
                bottomRight.y >= this.canvas.height
            ) {
                fullCanvas = true;
            }
        }
    }

    if (false) {
        console.log("Clearing full canvas");
        this._edges.clear();
        // Note: Draw API doesn't have a clear screen function, 
        // so we'd need to draw a full-screen rect with background color
        // This is handled at canvas level if needed
        Screen.clear(this.canvas.backColor);
    }
    else {
        // Draw rectangle with background color (transparent/clear)
        this.__fillRect(this.canvas.backColor, x, y, width, height);
    }
};

/**
 * CanvasContext_fillRect
 * 
 * Fills a specified rectangle without affecting the current paths.
 * @param {number} x  X coordinate of the left side of the rectangle.
 * @param {number} y  Y coordinate of the top of the rectangle.
 * @param {number} width  Width of the rectangle.
 * @param {number} height  Height of the rectangle.
 */
CanvasContext.prototype.fillRect = function CanvasContext_fillRect(x, y, width, height) {
    // debug("In canvas context fillRect", JSON.stringify(this));
    this.__fillRect(this.fillStyle, x, y, width, height);
};

CanvasContext.prototype.__fillRect = function CanvasContext__fillRect(fillColor, x, y, width, height) {
    // console.log("In canvas context __fillRect", fillColor, x, y, width, height);

    if (!Number.isFinite(x) || !Number.isFinite(y) ||
        !Number.isFinite(width) || !Number.isFinite(height) ||
        !width || !height) {
        return;
    }

    // Transform rectangle corners
    var topLeft = this.__transform.multiplyPoint(x, y);
    var topRight = this.__transform.multiplyPoint(x + width, y);
    var bottomRight = this.__transform.multiplyPoint(x + width, y + height);
    var bottomLeft = this.__transform.multiplyPoint(x, y + height);
    
    // Check if transformation is simple (no rotation/skew) - use Draw.rect
    // if (!this.__transform.hasSkewing() && !this.__transform.hasScaling()) {
        // Simple translation only - use optimized rect
        // this._renderer.drawRect(topLeft.x, topLeft.y, width, height, fillColor);
    // } else {
        // Complex transformation - draw with triangles so it looks more accurate

        // Drawing with 2 triangles vs a quad because Draw.quad is broke
        this._renderer.drawTriangle(topLeft.x, topLeft.y, topRight.x, topRight.y, bottomRight.x, bottomRight.y, fillColor, fillColor, fillColor);
        this._renderer.drawTriangle(topLeft.x, topLeft.y, bottomLeft.x, bottomLeft.y, bottomRight.x, bottomRight.y, fillColor, fillColor, fillColor);
    // }
};

CanvasContext.prototype.fillText = function CanvasContext_fillText(text, x, y) {
    // console.log("In canvas context fillText", text, x, y);
    console.log(JSON.stringify(this.__transform));
    var textPosition = this.__transform.multiplyPoint(x, y);
    // console.log("textPosition", JSON.stringify(textPosition));
    this._font.color = this.fillStyle;
    this._font.print(text, textPosition.x, textPosition.y);
};

CanvasContext.prototype.strokeRect = function CanvasContext_strokeRect(x, y, width, height) {
    // this._strokeRect(this.strokeStyle, x, y, width, height);
    console.log("NOT IMPLEMENTED: strokeRect", x, y, width, height);
};

/**
 * Fills the defined paths.
 * Uses hybrid approach: simple shapes use Draw API directly, complex shapes use edge-based rasterization.
 * @param {string} [windingRule]  The winding rule to be used for determining
 *     which areas are covered by the current path. Valid values are "evenodd" and
 *     "nonzero". Default is `"nonzero"`.
 */
CanvasContext.prototype.fill = function CanvasContext_fill(windingRule) {
  // Immediate mode doesn't affect fill, still needs to be called
    var fillColor = this.fillStyle;
        
    for (var p = 0; p < this._paths.length; p++) {
        var points = this._paths[p];

        if (points?.length <= 2) {
            continue;
        }

        // HTML5 canvas fill() automatically closes paths
        var isClosed = (points.length >= 4 && 
          points[0] === points[points.length - 2] &&
          points[1] === points[points.length - 1]);
        
        var pathToFill = points;
        if (!isClosed && points.length >= 4) {
            pathToFill = points.slice();
            pathToFill.push(points[0]);
            pathToFill.push(points[1]);
        }

        this._renderer.drawPolygon(pathToFill, fillColor);
    }
};

CanvasContext.prototype.stroke = function CanvasContext_stroke() {
  // In immediate mode we've already drawn the lines
  if(this.immediate) {
    return;
  }

    this._paths.forEach(path => {
        if (path.length < 4)
            return;

        if (path.length >= 4){
            for (var i = 0; i < path.length - 2; i += 2){
                this._renderer.drawLine(path[i], path[i + 1], path[i + 2], path[i + 3], this.strokeStyle, this._lineWidth);
            }
        }
    });
};


export default CanvasContext;
