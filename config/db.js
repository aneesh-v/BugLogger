const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			'mongodb+srv://ane123:ane123@cluster0.vl58q.mongodb.net/buglogger?retryWrites=true&w=majority',
			{
				useNewUrlParser: true,
				// userCreateContext: true,
				useUnifiedTopology: true,
			}
		);
		console.log('MongoDB Connected.');
	} catch (er) {
		console.log(er);
		process.exit(1);
	}
};

module.exports = connectDB;
