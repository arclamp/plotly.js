var ScatterSmith = require('@src/traces/scattersmith');

describe('Test scattersmith trace defaults:', function() {
    var traceOut;

    function _supply(traceIn, layout) {
        traceOut = {};
        ScatterSmith.supplyDefaults(traceIn, traceOut, '#444', layout || {});
    }

    it('should not truncate *re* when longer than *im*', function() {
        // this is handled at the calc step now via _length.
        _supply({
            re: [1, 2, 3, 4, 5],
            im: [1, 2, 3]
        });

        expect(traceOut.re).toEqual([1, 2, 3, 4, 5]);
        expect(traceOut.im).toEqual([1, 2, 3]);
        expect(traceOut._length).toBe(3);
    });

    it('should not truncate *im* when longer than *re*', function() {
        // this is handled at the calc step now via _length.
        _supply({
            re: [1, 2, 3],
            im: [1, 2, 3, 4, 5]
        });

        expect(traceOut.re).toEqual([1, 2, 3]);
        expect(traceOut.im).toEqual([1, 2, 3, 4, 5]);
        expect(traceOut._length).toBe(3);
    });
});