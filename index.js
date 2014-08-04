var SourceMapConsumer = require('source-map').SourceMapConsumer;
var SourceMapGenerator = require('source-map').SourceMapGenerator;

function addMappingFromConsumer(generator, mapping) {
	generator.addMapping({
		generated: { line: mapping.generatedLine, column: mapping.generatedColumn },
		source: mapping.source,
		original: { line: mapping.originalLine, column: mapping.originalColumn },
		name: mapping.name
	});
}

function compactMappings(map) {
	function shouldCompact(lastMapping, mapping) {
		return mapping.source === lastMapping.source &&
			mapping.originalLine === lastMapping.originalLine &&
			mapping.originalColumn === lastMapping.originalColumn &&
			mapping.generatedLine === lastMapping.generatedLine;
	}

	if (typeof map === 'string' || map instanceof String) {
		map = JSON.parse(map);
	}
	var consumer = new SourceMapConsumer(map);
	var generator = new SourceMapGenerator({ file: map.file, sourceRoot: map.sourceRoot });
	var lastMapping = null;
	consumer.eachMapping(function (mapping) {
		if (!lastMapping || !shouldCompact(lastMapping, mapping))
			addMappingFromConsumer(generator, mapping);
		lastMapping = mapping;
	});
	return generator.toJSON();
}

module.exports = compactMappings;
