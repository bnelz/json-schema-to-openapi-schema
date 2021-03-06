'use strict';

const convert = require('../');
const should = require('should');

it('type array', async () => {
	const schema = {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: ['string', 'null']
	};

	const result = await convert(schema);

	const expected = {
		type: 'string',
		nullable: true
	};

	should(result).deepEqual(expected);
});

it('properties', async () => {
	const schema = {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		required: ['bar'],
		properties: {
			foo: {
				type: 'string',
			},
			bar: {
				type: ['string', 'null']
			}
		}
	};

	const result = await convert(schema);

	const expected = {
		type: 'object',
		required: ['bar'],
		properties: {
			foo: {
				type: 'string',
			},
			bar: {
				type: 'string',
				nullable: true
			}
		}
	};

	should(result).deepEqual(expected);
});

it('addionalProperties is false', async () => {
	const schema = {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			foo: {
				type: 'string',
			}
		},
		additionalProperties: false
	};

	const result = await convert(schema);

	const expected = {
		type: 'object',
		properties: {
			foo: {
				type: 'string',
			}
		},
		additionalProperties: false
	};

	should(result).deepEqual(expected, 'properties converted');
});

it('addionalProperties is true', async () => {
	const schema = {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			foo: {
				type: 'string',
			}
		},
		additionalProperties: true
	};

	const result = await convert(schema);

	const expected = {
		type: 'object',
		properties: {
			foo: {
				type: 'string',
			}
		},
		additionalProperties: true
	};

	should(result).deepEqual(expected);
});

it('addionalProperties is an object', async () => {
	const schema = {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			foo: {
				type: 'string',
			}
		},
		additionalProperties: {
			type: 'object',
			properties: {
				foo: {
					type: 'string',
					format: 'date-time'
				}
			}
		}
	};

	const result = await convert(schema);

	const expected = {
		type: 'object',
		properties: {
			foo: {
				type: 'string'
			}
		},
		additionalProperties: {
			type: 'object',
			properties: {
				foo: {
					type: 'string',
					format: 'date-time'
				}
			}
		}
	};

	should(result).deepEqual(expected, 'properties and additionalProperties converted');
});
