const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const price = Math.floor(Math.random() * 20) + 10;
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: "620a9b63ee0282b7bec5785f",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident accusantium doloremque reiciendis sint laboriosam. Officiis, dignissimos fugit eos explicabo rerum vel facilis quisquam veniam deserunt libero quis numquam, error aut?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/akbar010202/image/upload/v1645075560/YelpCamp/l6bllm3myksiha3ntzus.png",
          filename: "YelpCamp/l6bllm3myksiha3ntzus",
        },
        {
          url: "https://res.cloudinary.com/akbar010202/image/upload/v1645075561/YelpCamp/bzew9vvztmkknddbwqdg.png",
          filename: "YelpCamp/bzew9vvztmkknddbwqdg",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
