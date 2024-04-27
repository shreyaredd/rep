const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3001;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://gowthamibhukya62:gowthami@cluster0.pba4wns.mongodb.net/feedback', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Create a schema for the feedback data
const feedbackSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: { type: String, unique: true },
  comments: String,
  customerId: { type: Number, default: 0 }
});

// Create a model based on the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Middleware to parse JSON
app.use(express.json());

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-feedback', async (req, res) => {
  try {
    const { name, address, phone, email, comments } = req.body;
    let feedback = await Feedback.findOne({ email: email });

    if (feedback) {
      feedback.name = name;
      feedback.address = address;
      feedback.phone = phone;
      feedback.comments = comments;
      await feedback.save();
      res.status(200).json({ message: `Thank you, ${name}, for resubmitting your feedback. Your record is updated, and your customer ID remains the same: #${feedback.customerId}.` });
    } else {
      const count = await Feedback.countDocuments();
      const newCustomerId = ("00" + (count + 1)).slice(-3);
      feedback = new Feedback({ name, address, phone, email, comments, customerId: newCustomerId });
      await feedback.save();
      res.status(200).json({ message: `Thank you, ${name}, for your feedback! Your customer ID is #${newCustomerId}.` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing your feedback.', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
