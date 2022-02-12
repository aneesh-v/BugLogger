const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
	text: {
		type: String,
		trim: true,
		required: [true, 'Log text is required by MongoDB'],
	},
	priority: {
		type: String,
		default: 'low',
		enum: ['low', 'moderate', 'high'],
	},
	user: {
		type: String,
		trim: true,
		required: [true, 'User name is required by MongoDB'],
	},
	created: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Log', LogSchema);
