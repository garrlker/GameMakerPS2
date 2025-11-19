/**
 * PS2Renderer - Uses the Draw API to render directly to the screen
 * instead of software rasterization. Replaces the edge-based rasterizer.
 * 
 * Requires the Draw API and Color API to be available globally:
 * 
 * Draw API:
 * - Draw.point(x, y, color)
 * - Draw.rect(x, y, width, height, color)
 * - Draw.line(x, y, x2, y2, color)
 * - Draw.circle(x, y, radius, color, filled)
 * - Draw.triangle(x, y, x2, y2, x3, y3, color, color2, color3)
 * - Draw.quad(x, y, x2, y2, x3, y3, x4, y4, color, color2, color3, color4)
 * 
 * Color API:
 * - Color.new(r, g, b, a) - Creates a color object
 * - Color.getR(col), Color.getG(col), Color.getB(col), Color.getA(col) - Get components
 * - Color.setR(col, r), Color.setG(col, g), Color.setB(col, b), Color.setA(col, a) - Set components
 */

/**
 * PS2Renderer - Renders drawing commands directly using the Draw API.
 * This replaces the edge-based rasterization system.
 */
function PS2Renderer() {
    // No state needed - Draw API handles rendering directly
}

/**
 * Draws a point/pixel.
 * @param {number} x  X coordinate.
 * @param {number} y  Y coordinate.
 * @param {number} color  32-bit RGBA color.
 */
PS2Renderer.prototype.drawPoint = function(x, y, color) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return;
    }
    
    Draw.point(Math.round(x), Math.round(y), color);
};

/**
 * Draws a rectangle.
 * @param {number} x  X coordinate.
 * @param {number} y  Y coordinate.
 * @param {number} width  Width.
 * @param {number} height  Height.
 * @param {number} color  32-bit RGBA color.
 */
PS2Renderer.prototype.drawRect = function(x, y, width, height, color) {
    if (!Number.isFinite(x) || !Number.isFinite(y) ||
        !Number.isFinite(width) || !Number.isFinite(height) ||
        !width || !height) {
        return;
    }
    
    Draw.rect(
        Math.round(x),
        Math.round(y),
        Math.round(width),
        Math.round(height),
        color
    );
};

/**
 * Draws a line.
 * @param {number} x1  Start X coordinate.
 * @param {number} y1  Start Y coordinate.
 * @param {number} x2  End X coordinate.
 * @param {number} y2  End Y coordinate.
 * @param {number} color  32-bit RGBA color.
 * @param {number} [lineWidth]  Width of the line in pixels. Default is 1.
 */
PS2Renderer.prototype.drawLine = function(x1, y1, x2, y2, color, lineWidth = 1) {
    if (!Number.isFinite(x1) || !Number.isFinite(y1) ||
        !Number.isFinite(x2) || !Number.isFinite(y2)) {
        return;
    }
        
    if (lineWidth === 1) {
        // Thin line - use Draw.line directly
        Draw.line(
            Math.round(x1),
            Math.round(y1),
            Math.round(x2),
            Math.round(y2),
            color
        );
        return;
    }
    
    // Thick line - use Draw.triangle to simulate line width
    // Calculate line vector
    var dx = x2 - x1;
    var dy = y2 - y1;
    var length = Math.sqrt(dx * dx + dy * dy);
    
    // if (length < 0.0001) {
    //     // Zero-length line, draw a square
    //     var halfWidth = lineWidth / 2;
    //     Draw.rect(
    //         Math.round(x1 - halfWidth),
    //         Math.round(y1 - halfWidth),
    //         Math.round(lineWidth),
    //         Math.round(lineWidth),
    //         color
    //     );
    //     return;
    // }
    
    // Normalize direction vector
    var nx = dx / length;
    var ny = dy / length;
    
    // Perpendicular vector (rotated 90 degrees counter-clockwise)
    var perpX = -ny;
    var perpY = nx;
    
    // Offset by half line width in perpendicular direction
    var halfWidth = lineWidth / 2;
    var offsetX = perpX * halfWidth;
    var offsetY = perpY * halfWidth;
    
    // Calculate the 4 corners of the rectangle
    // The rectangle spans the line and is lineWidth pixels wide
    var x1a = x1 + offsetX;
    var y1a = y1 + offsetY;
    var x1b = x1 - offsetX;
    var y1b = y1 - offsetY;
    var x2a = x2 + offsetX;
    var y2a = y2 + offsetY;
    var x2b = x2 - offsetX;
    var y2b = y2 - offsetY;
    
    // Draw the quad as two triangles
    // Triangle 1: (x1a, y1a), (x1b, y1b), (x2a, y2a)
    // Triangle 2: (x1b, y1b), (x2a, y2a), (x2b, y2b)
    var c = color;
    Draw.triangle(
        Math.round(x1a), Math.round(y1a),
        Math.round(x1b), Math.round(y1b),
        Math.round(x2a), Math.round(y2a),
        c, c, c
    );
    Draw.triangle(
        Math.round(x1b), Math.round(y1b),
        Math.round(x2a), Math.round(y2a),
        Math.round(x2b), Math.round(y2b),
        c, c, c
    );
};

/**
 * Draws a circle.
 * @param {number} x  Center X coordinate.
 * @param {number} y  Center Y coordinate.
 * @param {number} radius  Radius.
 * @param {number} color  32-bit RGBA color.
 * @param {boolean} filled  Whether the circle is filled.
 */
PS2Renderer.prototype.drawCircle = function(x, y, radius, color, filled) {
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(radius)) {
        return;
    }
    
    Draw.circle(
        Math.round(x),
        Math.round(y),
        Math.round(radius),
        color,
        filled !== false // Default to filled
    );
};

/**
 * Draws a triangle.
 * @param {number} x1  First point X.
 * @param {number} y1  First point Y.
 * @param {number} x2  Second point X.
 * @param {number} y2  Second point Y.
 * @param {number} x3  Third point X.
 * @param {number} y3  Third point Y.
 * @param {number} color  32-bit RGBA color (applied to all vertices).
 */
PS2Renderer.prototype.drawTriangle = function(x1, y1, x2, y2, x3, y3, color) {
    if (!Number.isFinite(x1) || !Number.isFinite(y1) ||
        !Number.isFinite(x2) || !Number.isFinite(y2) ||
        !Number.isFinite(x3) || !Number.isFinite(y3)) {
        return;
    }
    
    var c = color;
    Draw.triangle(
        Math.round(x1), Math.round(y1),
        Math.round(x2), Math.round(y2),
        Math.round(x3), Math.round(y3),
        c, c, c // Same color for all vertices
    );
};

/**
 * Draws a triangle with per-vertex colors.
 * @param {number} x1  First point X.
 * @param {number} y1  First point Y.
 * @param {number} x2  Second point X.
 * @param {number} y2  Second point Y.
 * @param {number} x3  Third point X.
 * @param {number} y3  Third point Y.
 * @param {number} color1  Color for first vertex.
 * @param {number} color2  Color for second vertex.
 * @param {number} color3  Color for third vertex.
 */
PS2Renderer.prototype.drawTriangleGradient = function(x1, y1, x2, y2, x3, y3, color1, color2, color3) {
    if (!Number.isFinite(x1) || !Number.isFinite(y1) ||
        !Number.isFinite(x2) || !Number.isFinite(y2) ||
        !Number.isFinite(x3) || !Number.isFinite(y3)) {
        return;
    }
    
    Draw.triangle(
        Math.round(x1), Math.round(y1),
        Math.round(x2), Math.round(y2),
        Math.round(x3), Math.round(y3),
        color1,
        color2,
        color3
    );
};

/**
 * Draws a quad (4-sided polygon).
 * @param {number} x1  First point X.
 * @param {number} y1  First point Y.
 * @param {number} x2  Second point X.
 * @param {number} y2  Second point Y.
 * @param {number} x3  Third point X.
 * @param {number} y3  Third point Y.
 * @param {number} x4  Fourth point X.
 * @param {number} y4  Fourth point Y.
 * @param {number} color  32-bit RGBA color (applied to all vertices).
 */
PS2Renderer.prototype.drawQuad = function(x1, y1, x2, y2, x3, y3, x4, y4, color) {
    if (!Number.isFinite(x1) || !Number.isFinite(y1) ||
        !Number.isFinite(x2) || !Number.isFinite(y2) ||
        !Number.isFinite(x3) || !Number.isFinite(y3) ||
        !Number.isFinite(x4) || !Number.isFinite(y4)) {
        return;
    }
    
    var c = color;
    Draw.quad(
        Math.round(x1), Math.round(y1),
        Math.round(x2), Math.round(y2),
        Math.round(x3), Math.round(y3),
        Math.round(x4), Math.round(y4),
        c, c, c, c // Same color for all vertices
    );
};

/**
 * Draws a quad with per-vertex colors.
 * @param {number} x1  First point X.
 * @param {number} y1  First point Y.
 * @param {number} x2  Second point X.
 * @param {number} y2  Second point Y.
 * @param {number} x3  Third point X.
 * @param {number} y3  Third point Y.
 * @param {number} x4  Fourth point X.
 * @param {number} y4  Fourth point Y.
 * @param {number} color1  Color for first vertex.
 * @param {number} color2  Color for second vertex.
 * @param {number} color3  Color for third vertex.
 * @param {number} color4  Color for fourth vertex.
 */
PS2Renderer.prototype.drawQuadGradient = function(x1, y1, x2, y2, x3, y3, x4, y4, color1, color2, color3, color4) {
    if (!Number.isFinite(x1) || !Number.isFinite(y1) ||
        !Number.isFinite(x2) || !Number.isFinite(y2) ||
        !Number.isFinite(x3) || !Number.isFinite(y3) ||
        !Number.isFinite(x4) || !Number.isFinite(y4)) {
        return;
    }
    
    Draw.quad(
        Math.round(x1), Math.round(y1),
        Math.round(x2), Math.round(y2),
        Math.round(x3), Math.round(y3),
        Math.round(x4), Math.round(y4),
        color1,
        color2,
        color3,
        color4
    );
};

/**
 * Triangulates a polygon and draws it using triangles.
 * Used for complex paths that can't be represented as simple quads.
 * @param {Array} points  Array of [x, y, x, y, ...] coordinates.
 * @param {number} color  32-bit RGBA color.
 */
PS2Renderer.prototype.drawPolygon = function(points, color) {
    if (!points || points.length < 6) { // Need at least 3 points (6 values)
        return;
    }
    
    // Simple fan triangulation from first point
    var x0 = points[0];
    var y0 = points[1];
    
    for (var i = 2; i < points.length - 2; i += 2) {
        Draw.triangle(
            Math.round(x0), Math.round(y0),
            Math.round(points[i]), Math.round(points[i + 1]),
            Math.round(points[i + 2]), Math.round(points[i + 3]),
            color, color, color
        );
    }
};

/**
 * Draws a path as a series of lines.
 * @param {Array} points  Array of [x, y, x, y, ...] coordinates.
 * @param {number} color  32-bit RGBA color.
 * @param {boolean} closed  Whether to close the path.
 */
PS2Renderer.prototype.drawPath = function(points, color, closed) {
    if (!points || points.length < 4) { // Need at least 2 points
        return;
    }
    
    var c = color;
    
    // Draw lines between consecutive points
    for (var i = 0; i < points.length - 2; i += 2) {
        Draw.line(
            Math.round(points[i]),
            Math.round(points[i + 1]),
            Math.round(points[i + 2]),
            Math.round(points[i + 3]),
            c
        );
    }
    
    // Close the path if requested
    if (closed && points.length >= 4) {
        Draw.line(
            Math.round(points[points.length - 2]),
            Math.round(points[points.length - 1]),
            Math.round(points[0]),
            Math.round(points[1]),
            c
        );
    }
};

export default PS2Renderer;

