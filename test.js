var compact = require('./index');
var SourceMapGenerator = require('source-map').SourceMapGenerator;
var test = require('tape');

test('test', function (t) {
	var inputGen = new SourceMapGenerator({ file: 'output.js '});
	inputGen.addMapping({ generated: { line: 1, column: 0 }, source: 'original.js', original: { line: 1, column: 0 }});
	inputGen.addMapping({ generated: { line: 1, column: 1 }, source: 'original.js', original: { line: 1, column: 0 }});
	inputGen.addMapping({ generated: { line: 1, column: 2 }, source: 'original.js', original: { line: 1, column: 0 }});
	inputGen.addMapping({ generated: { line: 1, column: 3 }, source: 'original.js', original: { line: 1, column: 0 }});
	inputGen.addMapping({ generated: { line: 1, column: 4 }, source: 'original.js', original: { line: 1, column: 4 }});
	inputGen.addMapping({ generated: { line: 1, column: 5 }, source: 'original.js', original: { line: 1, column: 4 }});
	inputGen.addMapping({ generated: { line: 1, column: 6 }, source: 'original.js', original: { line: 1, column: 4 }});
	inputGen.addMapping({ generated: { line: 1, column: 7 }, source: 'original.js', original: { line: 1, column: 4 }});
	inputGen.addMapping({ generated: { line: 2, column: 0 }, source: 'original.js', original: { line: 2, column: 0 }});
	inputGen.addMapping({ generated: { line: 3, column: 0 }, source: 'original.js', original: { line: 2, column: 0 }});
	inputGen.addMapping({ generated: { line: 4, column: 0 }, source: 'original.js', original: { line: 4, column: 0 }});
	inputGen.addMapping({ generated: { line: 4, column: 0 }, source: 'original2.js', original: { line: 4, column: 0 }});

	var expectedGen = new SourceMapGenerator({ file: 'output.js '});
	expectedGen.addMapping({ generated: { line: 1, column: 0 }, source: 'original.js', original: { line: 1, column: 0 }});
	expectedGen.addMapping({ generated: { line: 1, column: 4 }, source: 'original.js', original: { line: 1, column: 4 }});
	expectedGen.addMapping({ generated: { line: 2, column: 0 }, source: 'original.js', original: { line: 2, column: 0 }});
	expectedGen.addMapping({ generated: { line: 3, column: 0 }, source: 'original.js', original: { line: 2, column: 0 }});
	expectedGen.addMapping({ generated: { line: 4, column: 0 }, source: 'original.js', original: { line: 4, column: 0 }});
	expectedGen.addMapping({ generated: { line: 4, column: 0 }, source: 'original2.js', original: { line: 4, column: 0 }});

	var inputMap = inputGen.toJSON();
	var expectedMap = expectedGen.toJSON();
	var outputMap = compact(inputMap);

	t.deepEqual(outputMap, expectedMap);
	t.end();
});
