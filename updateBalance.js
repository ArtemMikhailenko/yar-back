require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");

async function updateUsers() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Обновляем всех пользователей, у которых нет поля balance
  const result = await User.updateMany(
    { balance: { $exists: false } },
    {
      $set: {
        balance: { ETH: 0, BTC: 0, USDT: 0, ARK: 0 },
      },
    }
  );

  console.log(`✅ Обновлено пользователей: ${result.modifiedCount}`);

  await mongoose.disconnect();
}

updateUsers();
