const db = require("../config/connection");
const { User } = require("../models");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.create({
      username: "davepsandy",
      email: "davepsandy@gmail.com",
      password: "123456",
    });

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
});
