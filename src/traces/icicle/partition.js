'use strict';

var d3Hierarchy = require('d3-hierarchy');

module.exports = function partition(entry, size, opts) {
    var flipX = opts.flipX;
    var flipY = opts.flipY;

    var result = d3Hierarchy
        .partition()
        .padding(opts.pad.inner)
        .size(size)(entry);

    if(flipX || flipY) {
        flipTree(result, size, {
            flipX: flipX,
            flipY: flipY
        });
    }
    return result;
};

function flipTree(node, size, opts) {
    var tmp;

    if(opts.flipX) {
        tmp = node.x0;
        node.x0 = size[0] - node.x1;
        node.x1 = size[0] - tmp;
    }

    if(opts.flipY) {
        tmp = node.y0;
        node.y0 = size[1] - node.y1;
        node.y1 = size[1] - tmp;
    }

    var children = node.children;
    if(children) {
        for(var i = 0; i < children.length; i++) {
            flipTree(children[i], size, opts);
        }
    }
}