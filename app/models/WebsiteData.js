const mongoose = require('mongoose');

const websiteDataSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: true,
    default: '/default-logo.svg',
  },
  navLinks: [
    {
      href: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('WebsiteData', websiteDataSchema);
