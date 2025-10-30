import Product from '../models/product.model';

export const sampleProducts = [
  {
    name: 'Classic White Tee',
    description: 'Comfortable unisex cotton t-shirt with a classic fit.',
    price: 19.99,
    imageUrl: '/images/product1.svg',
    category: 'Apparel',
    stock: 120,
  },
  {
    name: 'Vintage Denim Jacket',
    description: 'Stylish denim jacket with durable stitching and soft lining.',
    price: 69.99,
    imageUrl: '/images/product2.svg',
    category: 'Apparel',
    stock: 40,
  },
  {
    name: 'Running Sneakers',
    description: 'Lightweight running shoes with breathable mesh upper.',
    price: 89.99,
    imageUrl: '/images/product3.svg',
    category: 'Footwear',
    stock: 75,
  },
  {
    name: 'Leather Wallet',
    description: 'Hand-stitched genuine leather wallet with multiple slots.',
    price: 39.5,
    imageUrl: '/images/product4.svg',
    category: 'Accessories',
    stock: 200,
  },
  {
    name: 'Wireless Headphones',
    description: 'Noise-cancelling over-ear headphones with long battery life.',
    price: 129.99,
    imageUrl: '/images/product5.svg',
    category: 'Electronics',
    stock: 30,
  },
  {
    name: 'Stainless Water Bottle',
    description: 'Insulated bottle keeps drinks cold for 24 hours.',
    price: 24.0,
    imageUrl: '/images/product6.svg',
    category: 'Home',
    stock: 150,
  },
  {
    name: 'Minimalist Watch',
    description: 'Thin profile watch with leather strap and quartz movement.',
    price: 149.99,
    imageUrl: '/images/product7.svg',
    category: 'Accessories',
    stock: 20,
  },
  {
    name: 'Backpack 20L',
    description: 'Durable daily backpack with laptop sleeve and water-resistant fabric.',
    price: 59.99,
    imageUrl: '/images/product8.svg',
    category: 'Bags',
    stock: 90,
  },
  {
    name: 'Ceramic Mug Set',
    description: 'Set of 4 minimalist ceramic mugs, dishwasher safe.',
    price: 34.99,
    imageUrl: '/images/product9.svg',
    category: 'Home',
    stock: 60,
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with ergonomic cushioning.',
    price: 29.99,
    imageUrl: '/images/product10.svg',
    category: 'Sports',
    stock: 85,
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with rich bass and 10-hour battery.',
    price: 49.99,
    imageUrl: '/images/product11.svg',
    category: 'Electronics',
    stock: 55,
  },
  {
    name: 'Scented Candle – Lavender',
    description: 'Hand-poured soy candle, approx. 40 hours burn time.',
    price: 14.99,
    imageUrl: '/images/product12.svg',
    category: 'Home',
    stock: 180,
  }
];

export const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      console.log(`Seed skipped: ${count} products already exist.`);
      return;
    }
    await Product.insertMany(sampleProducts);
    console.log(`Seed complete: inserted ${sampleProducts.length} products.`);
  } catch (err) {
    console.error('Error seeding products:', err);
  }
};
