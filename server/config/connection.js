const mongoose = require('mongoose');

// options object no longer required, its default is what we want
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gig-social');
module.exports = mongoose.connection;
