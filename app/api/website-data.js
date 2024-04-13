import mongoose from 'mongoose';
import connectDB from '../utils/db'; // Replace with your path to db.js

const WebsiteData = mongoose.model('WebsiteData', require('../models/WebsiteData')); // Replace with your path to WebsiteData.js

export default async function handler(req, res) {
  const { method } = req;

  // Connect to MongoDB if not already connected
  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const data = await WebsiteData.findOne();
        if (!data) {
          return res.status(404).json({ message: 'No data found' });
        }
        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
      break;
    case 'PUT':
      try {
        const { logo, navLinks } = req.body;
        if (!logo || !navLinks) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
        const updatedData = await WebsiteData.findOneAndUpdate({}, { logo, navLinks }, { new: true }); // Update and return new data
        if (!updatedData) {
          return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(updatedData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
