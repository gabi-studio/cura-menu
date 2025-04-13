require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MenuItem = require('./models/menuItem');
const Service = require('./models/service');
const AdminUser = require('./models/adminUser');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected for seeding...'))
  .catch(err => console.error(err));

async function seed() {
  try {
    await MenuItem.deleteMany();
    await Service.deleteMany();
    await AdminUser.deleteMany();

    const passwordHash = await bcrypt.hash('admin123', 10);
    await AdminUser.create({ username: 'admin', passwordHash });

    await MenuItem.insertMany([
      {
        name: "Pizza (Mozzarella, Basil, Marinara)",
        description: "Classic Neapolitan pizza with fresh ingredients.",
        imageUrl: "/images/pizza.jpg",
        price: 10.00,
        ingredients: "Mozzarella, Basil, Marinara, ciabatta",
        isAvailableToday: true,
        quantity: 10
      },
      {
        name: "Butter Chicken Sandwich",
        description: "Juicy butter chicken in a toasted bun.",
        imageUrl: "/images/butter-chicken.jpg",
        price: 9.50,
        ingredients: "Butter chicken, bread, herbs, provolone",
        isAvailableToday: false,
        quantity: 8
      },
      {
        name: "Chicken Adobo Sandwich",
        description: "Filipino-style chicken adobo in sandwich form.",
        imageUrl: "/images/adobo.jpg",
        price: 9.00,
        ingredients: "Chicken adobo, bagette, pickled onions, vinegarette",
        isAvailableToday: false,
        quantity: 10
      },
      {
        name: "Mortadella Sandwich",
        description: "Delicious mortadella with pistachios on crusty bread.",
        imageUrl: "/images/mortadella.jpg",
        price: 9.00,
        ingredients: "Mortadella, baguette, burrata, pesto, mustard",
        isAvailableToday: false,
        quantity: 7
      },
      {
        name: "Pulled Meat Sandwich",
        description: "Slow-cooked pulled meat with slaw and sauce.",
        imageUrl: "/images/pulled-meat.jpg",
        price: 11.00,
        ingredients: "Pulled pork/beef, slaw, pomegranate sauce",
        isAvailableToday: false,
        quantity: 6
      }
    ]);

    await Service.insertMany([
      {
        title: "Corporate Catering",
        description: "Buffet-style meals or boxed lunches delivered to your office.",
        imageUrl: "/images/corporate.jpg",
        priceRange: "$200 - $2000",
        isActive: true
      },
      {
        title: "Small Weddings",
        description: "Elegant, intimate catering for small wedding events of up to 40 people.",
        imageUrl: "/images/weddings.jpg",
        priceRange: "Starts at $1,500",
        isActive: true
      }
    ]);

    console.log("Seeding complete");
  } catch (err) {
    console.error("Seeding error", err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
