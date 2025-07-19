const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./Models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const users = await User.find();

  for (let user of users) {
    if (!user.password || user.password.startsWith('$2a$')) continue; // skip if already hashed

    const hashedPassword = await bcrypt.hash(user.role, 10); // using role as password
    user.password = hashedPassword;
    await user.save();
    console.log(`Updated ${user.username} with hashed password`);
  }

  mongoose.disconnect();
});
