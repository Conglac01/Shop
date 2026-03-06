// Category Images
import men from "./product_8.png";
import women from "./product_9.png";
import kids from "./product_15.png";
import footwear from "./product_23.png";
import winterwear from "./product_27.png";
import sportswear from "./product_36.png";

// Product Images (1-38)
import product_1 from "./product_1.png";
import product_2 from "./product_2.png";
import product_3 from "./product_3.png";
import product_4 from "./product_4.png";
import product_5 from "./product_5.png";
import product_6 from "./product_6.png";
import product_7 from "./product_7.png";
import product_8 from "./product_8.png";
import product_9 from "./product_9.png";
import product_10 from "./product_10.png";
import product_11 from "./product_11.png";
import product_12 from "./product_12.png";
import product_13 from "./product_13.png";
import product_14 from "./product_14.png";
import product_15 from "./product_15.png";
import product_16 from "./product_16.png";
import product_17 from "./product_17.png";
import product_18 from "./product_18.png";
import product_19 from "./product_19.png";
import product_20 from "./product_20.png";
import product_21 from "./product_21.png";
import product_22 from "./product_22.png";
import product_23 from "./product_23.png";
import product_24 from "./product_24.png";
import product_25 from "./product_25.png";
import product_26 from "./product_26.png";
import product_27 from "./product_27.png";
import product_28 from "./product_28.png";
import product_29 from "./product_29.png";
import product_30 from "./product_30.png";
import product_31 from "./product_31.png";
import product_32 from "./product_32.png";
import product_33 from "./product_33.png";
import product_34 from "./product_34.png";
import product_35 from "./product_35.png";
import product_36 from "./product_36.png";
import product_37 from "./product_37.png";
import product_38 from "./product_38.png";

// Blog Images
import blog1 from "./blogs/blog1.png";
import blog2 from "./blogs/blog2.png";
import blog3 from "./blogs/blog3.png";
import blog4 from "./blogs/blog4.png";

// ==================== CATEGORIES ====================
export const categories = [
  { id: 1, name: "Men", image: men },
  { id: 2, name: "Women", image: women },
  { id: 3, name: "Kids", image: kids },
  { id: 4, name: "Footwear", image: footwear },
  { id: 5, name: "Winterwear", image: winterwear },
  { id: 6, name: "Sportswear", image: sportswear },
];

// ==================== DUMMY PRODUCTS (Chi tiết với nhiều ảnh) ====================
export const dummyProducts = [
  // Men's Products
  {
    _id: "1",
    name: "Classic Striped Button Down Shirt for Formal Office Wear",
    image: [product_1, product_3, product_6, product_7],
    price: 95,
    offerPrice: 45,
    sizes: ["S", "M", "L", "XL"],
    description: "Elevate your formal style with our classic striped shirt. Perfect for business meetings and elegant events. Made from premium cotton for all-day comfort.",
    category: "Men",
    rating: 4.5,
    inStock: true,
     popular: true  
  },
  {
    _id: "2",
    name: "Premium Cotton Casual T-Shirt for Men",
    image: [product_2, product_5, product_8],
    price: 49,
    offerPrice: 29,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Experience ultimate comfort with our premium cotton t-shirt. Soft, breathable, and perfect for everyday casual wear.",
    category: "Men",
    rating: 4.3,
    inStock: true,
     popular: true  
  },
  {
    _id: "3",
    name: "Slim Fit Denim Jeans for Men",
    image: [product_4, product_10, product_12],
    price: 89,
    offerPrice: 59,
    sizes: ["28", "30", "32", "34", "36"],
    description: "Classic slim fit jeans that never go out of style. Durable denim with just the right amount of stretch for maximum comfort.",
    category: "Men",
    rating: 4.6,
    inStock: true,
     popular: true  
  },
  {
    _id: "4",
    name: "Men's Casual Hoodie with Front Pocket",
    image: [product_7, product_11, product_14],
    price: 79,
    offerPrice: 49,
    sizes: ["S", "M", "L", "XL"],
    description: "Stay cozy and stylish with our premium hoodie. Features a comfortable fit, front pocket, and adjustable hood.",
    category: "Men",
    rating: 4.7,
    inStock: true,
     popular: true  
  },
  {
    _id: "5",
    name: "Men's Formal Blazer for Business Meetings",
    image: [product_13, product_17, product_19],
    price: 199,
    offerPrice: 129,
    sizes: ["38", "40", "42", "44"],
    description: "Make a lasting impression with our tailored blazer. Perfect for formal occasions and business meetings.",
    category: "Men",
    rating: 4.8,
    inStock: true,
     popular: true  
  },
  
  // Women's Products
  {
    _id: "6",
    name: "Women's Floral Print Summer Dress",
    image: [product_8, product_16, product_20],
    price: 89,
    offerPrice: 49,
    sizes: ["XS", "S", "M", "L"],
    description: "Embrace the summer vibes with our floral print dress. Lightweight, breathable, and perfect for any occasion.",
    category: "Women",
    rating: 4.6,
    inStock: true,
     popular: true  
  },
  {
    _id: "7",
    name: "Women's High-Waist Skinny Jeans",
    image: [product_12, product_18, product_22],
    price: 79,
    offerPrice: 54,
    sizes: ["26", "28", "30", "32", "34"],
    description: "Flattering high-waist skinny jeans that hug your curves in all the right places. Premium stretch denim for all-day comfort.",
    category: "Women",
    rating: 4.5,
    inStock: true,
     popular: true  
  },
  {
    _id: "8",
    name: "Women's Elegant Evening Gown",
    image: [product_9, product_14, product_21],
    price: 249,
    offerPrice: 179,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Turn heads at any special event with our elegant evening gown. Sophisticated design with luxurious fabric.",
    category: "Women",
    rating: 4.9,
    inStock: true,
     popular: true  
  },
  {
    _id: "9",
    name: "Women's Casual Blouse with Ruffles",
    image: [product_11, product_15, product_19],
    price: 59,
    offerPrice: 39,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Add a touch of femininity to your wardrobe with our ruffled blouse. Perfect for office or casual outings.",
    category: "Women",
    rating: 4.4,
    inStock: true,
     popular: true  
  },
  {
    _id: "10",
    name: "Women's Winter Coat with Faux Fur",
    image: [product_27, product_29, product_31],
    price: 189,
    offerPrice: 129,
    sizes: ["S", "M", "L", "XL"],
    description: "Stay warm and stylish during the cold season with our premium winter coat. Features luxurious faux fur trim.",
    category: "Women",
    rating: 4.7,
    inStock: true,
     popular: true  
  },
  
  // Kids Products
  {
    _id: "11",
    name: "Kids Colorful Cartoon T-Shirt",
    image: [product_15, product_18, product_20],
    price: 29,
    offerPrice: 19,
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y"],
    description: "Make your little one smile with our fun cartoon t-shirt. Soft cotton fabric that's gentle on sensitive skin.",
    category: "Kids",
    rating: 4.5,
    inStock: true,
     popular: true  
  },
  {
    _id: "12",
    name: "Kids Denim Jeans with Elastic Waist",
    image: [product_16, product_19, product_22],
    price: 39,
    offerPrice: 27,
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y"],
    description: "Comfortable denim jeans with elastic waistband for easy dressing. Durable enough for active play.",
    category: "Kids",
    rating: 4.4,
    inStock: true,
     popular: true  
  },
  {
    _id: "13",
    name: "Kids Winter Jacket with Hood",
    image: [product_17, product_25, product_28],
    price: 69,
    offerPrice: 49,
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y"],
    description: "Keep your child warm and cozy with our insulated winter jacket. Features a warm hood and soft lining.",
    category: "Kids",
    rating: 4.6,
    inStock: true,
     popular: true  
  },
  {
    _id: "14",
    name: "Kids Party Dress with Bow",
    image: [product_19, product_21, product_24],
    price: 49,
    offerPrice: 34,
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    description: "Make your little girl feel like a princess with our beautiful party dress. Adorable bow detail and comfortable fit.",
    category: "Kids",
    rating: 4.8,
    inStock: true,
     popular: true  
  },
  {
    _id: "15",
    name: "Kids Sportswear Set (T-Shirt + Shorts)",
    image: [product_33, product_34, product_36],
    price: 44,
    offerPrice: 32,
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y"],
    description: "Perfect for active kids! This sportswear set includes a breathable t-shirt and matching shorts.",
    category: "Kids",
    rating: 4.5,
    inStock: true,
     popular: true  
  },
  
  // Footwear Products
  {
    _id: "16",
    name: "Men's Leather Formal Shoes",
    image: [product_21, product_23, product_25],
    price: 129,
    offerPrice: 89,
    sizes: ["39", "40", "41", "42", "43", "44"],
    description: "Step up your formal game with our premium leather shoes. Classic design with superior comfort for all-day wear.",
    category: "Footwear",
    rating: 4.7,
    inStock: true,
     popular: true  
  },
  {
    _id: "17",
    name: "Women's Casual Sneakers",
    image: [product_22, product_24, product_26],
    price: 79,
    offerPrice: 54,
    sizes: ["36", "37", "38", "39", "40"],
    description: "Stylish and comfortable sneakers for everyday wear. Cushioned insole and durable outsole.",
    category: "Footwear",
    rating: 4.5,
    inStock: true,
     popular: true  
  },
  {
    _id: "18",
    name: "Running Shoes for Men",
    image: [product_21, product_28, product_32],
    price: 99,
    offerPrice: 69,
    sizes: ["39", "40", "41", "42", "43", "44"],
    description: "Enhance your performance with our lightweight running shoes. Breathable mesh and responsive cushioning.",
    category: "Footwear",
    rating: 4.6,
    inStock: true,
     popular: true  
  },
  {
    _id: "19",
    name: "Women's Heeled Sandals",
    image: [product_24, product_26, product_30],
    price: 69,
    offerPrice: 49,
    sizes: ["36", "37", "38", "39", "40"],
    description: "Elevate your style with our elegant heeled sandals. Perfect for parties and special occasions.",
    category: "Footwear",
    rating: 4.4,
    inStock: true,
     popular: true  
  },
  {
    _id: "20",
    name: "Kids School Shoes",
    image: [product_23, product_25, product_27],
    price: 49,
    offerPrice: 34,
    sizes: ["28", "29", "30", "31", "32", "33"],
    description: "Durable and comfortable school shoes for active kids. Easy to clean and long-lasting.",
    category: "Footwear",
    rating: 4.5,
    inStock: true,
     popular: true  
  },
  
  // Winterwear Products
  {
    _id: "21",
    name: "Men's Heavy Duty Winter Parka",
    image: [product_27, product_29, product_31],
    price: 229,
    offerPrice: 169,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Extreme cold? No problem! Our heavy-duty parka will keep you warm even in the harshest winter conditions.",
    category: "Winterwear",
    rating: 4.8,
    inStock: true,
     popular: true  
  },
  {
    _id: "22",
    name: "Women's Wool Blend Coat",
    image: [product_28, product_30, product_32],
    price: 189,
    offerPrice: 139,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Elegant and warm wool blend coat for the modern woman. Perfect for both casual and formal winter outings.",
    category: "Winterwear",
    rating: 4.7,
    inStock: true,
     popular: true  
  },
  {
    _id: "23",
    name: "Unisex Winter Gloves",
    image: [product_30, product_31, product_33],
    price: 29,
    offerPrice: 19,
    sizes: ["S", "M", "L"],
    description: "Keep your hands warm with our thermal gloves. Touchscreen compatible so you can use your phone without removing them.",
    category: "Winterwear",
    rating: 4.4,
    inStock: true,
     popular: true  
  },
  {
    _id: "24",
    name: "Knit Winter Scarf",
    image: [product_31, product_32, product_35],
    price: 34,
    offerPrice: 24,
    sizes: ["One Size"],
    description: "Add a pop of color to your winter outfit with our soft knit scarf. Available in multiple colors.",
    category: "Winterwear",
    rating: 4.5,
    inStock: true,
     popular: true  
  },
  {
    _id: "25",
    name: "Thermal Beanie Hat",
    image: [product_32, product_34, product_37],
    price: 24,
    offerPrice: 17,
    sizes: ["One Size"],
    description: "Stay warm and stylish with our thermal beanie. Perfect for cold weather and outdoor activities.",
    category: "Winterwear",
    rating: 4.4,
    inStock: true,
     popular: true  
  },
  
  // Sportswear Products
  {
    _id: "26",
    name: "Men's Performance Gym T-Shirt",
    image: [product_33, product_35, product_37],
    price: 39,
    offerPrice: 27,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Moisture-wicking fabric keeps you dry during intense workouts. Lightweight and breathable for maximum performance.",
    category: "Sportswear",
    rating: 4.6,
    inStock: true,
     popular: true  
  },
  {
    _id: "27",
    name: "Women's Yoga Leggings",
    image: [product_34, product_36, product_38],
    price: 49,
    offerPrice: 34,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "High-waist, squat-proof leggings for yoga and workouts. Buttery-soft fabric with excellent stretch.",
    category: "Sportswear",
    rating: 4.8,
    inStock: true,
     popular: true  
  },
  {
    _id: "28",
    name: "Men's Running Shorts",
    image: [product_34, product_35, product_36],
    price: 34,
    offerPrice: 24,
    sizes: ["S", "M", "L", "XL"],
    description: "Lightweight running shorts with built-in liner and zippered pocket for your essentials.",
    category: "Sportswear",
    rating: 4.5,
    inStock: true,
     popular: true  
  },
  {
    _id: "29",
    name: "Women's Sports Bra",
    image: [product_35, product_37, product_38],
    price: 29,
    offerPrice: 19,
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Medium-support sports bra for yoga, gym, and running. Comfortable and stylish design.",
    category: "Sportswear",
    rating: 4.5,
    inStock: true,
     popular: true  
  },
  {
    _id: "30",
    name: "Unisex Training Hoodie",
    image: [product_36, product_37, product_38],
    price: 59,
    offerPrice: 44,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Perfect for pre and post-workout. Lightweight, breathable, and comfortable for training sessions.",
    category: "Sportswear",
    rating: 4.6,
    inStock: true,
     popular: true  
  },
  {
    _id: "31",
    name: "Men's Sports Jacket",
    image: [product_37, product_38, product_35],
    price: 79,
    offerPrice: 59,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Water-resistant sports jacket for outdoor training. Lightweight and packable design.",
    category: "Sportswear",
    rating: 4.5,
    inStock: true,
     popular: true  
  },
  {
    _id: "32",
    name: "Women's Athletic Sneakers",
    image: [product_38, product_34, product_36],
    price: 89,
    offerPrice: 64,
    sizes: ["36", "37", "38", "39", "40", "41"],
    description: "Versatile athletic shoes for gym, running, and daily wear. Cushioned sole for maximum comfort.",
    category: "Sportswear",
    rating: 4.7,
    inStock: true,
     popular: true  
  }
];

// ==================== BLOGS ====================
export const blogs = [
  {
    id: 1,
    title: "Summer Fashion Trends 2024: What's Hot This Year",
    image: blog1,
    date: "2024-05-15",
    author: "Sarah Johnson",
    excerpt: "Discover the hottest summer fashion trends that will dominate the season. From vibrant colors to sustainable fabrics.",
    category: "Fashion Tips"
  },
  {
    id: 2,
    title: "How to Style Winter Wear: Stay Warm and Chic",
    image: blog2,
    date: "2024-05-10",
    author: "Michael Chen",
    excerpt: "Expert tips on layering and accessorizing to look stylish while staying warm during the cold season.",
    category: "Style Guide"
  },
  {
    id: 3,
    title: "Ultimate Footwear Care Guide: Make Your Shoes Last",
    image: blog3,
    date: "2024-05-05",
    author: "Emma Wilson",
    excerpt: "Learn professional techniques to clean, maintain, and extend the life of your favorite footwear.",
    category: "Care Tips"
  },
  {
    id: 4,
    title: "Sustainable Fashion: Why It Matters and How to Join",
    image: blog4,
    date: "2024-04-28",
    author: "David Lee",
    excerpt: "Explore the world of sustainable fashion and discover how small changes can make a big impact.",
    category: "Sustainability"
  }
];

// ==================== HELPER FUNCTIONS ====================

// Get products by category
export const getProductsByCategory = (categoryName) => {
  return dummyProducts.filter(product => product.category === categoryName);
};

// Get product by ID
export const getProductById = (id) => {
  return dummyProducts.find(product => product._id === id);
};

// Get featured products (first 8 products)
export const getFeaturedProducts = (count = 8) => {
  return dummyProducts.slice(0, count);
};

// Get related products (same category, different ID)
export const getRelatedProducts = (productId, categoryName, count = 4) => {
  return dummyProducts
    .filter(product => product.category === categoryName && product._id !== productId)
    .slice(0, count);
};

// Get products by price range
export const getProductsByPriceRange = (min, max) => {
  return dummyProducts.filter(product => product.offerPrice >= min && product.offerPrice <= max);
};

// Search products by name
export const searchProducts = (query) => {
  return dummyProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase())
  );
};

// Get products on sale (offerPrice < price)
export const getProductsOnSale = () => {
  return dummyProducts.filter(product => product.offerPrice < product.price);
};

////dummyOrders
// Thêm vào cuối file data.js (sau phần products, blogs, helper functions)

export const dummyOrders = [
    {
        _id: "ORD-2025-001",
        items: [
            {
                product: {
                    _id: "3",
                    name: "Slim Fit Denim Jeans for Men",
                    image: [product_4],
                    offerPrice: 59
                },
                quantity: 2,
                size: "32"
            },
            {
                product: {
                    _id: "4",
                    name: "Men's Casual Hoodie with Front Pocket",
                    image: [product_7],
                    offerPrice: 49
                },
                quantity: 1,
                size: "L"
            }
        ],
        isPaid: true,
        paymentMethod: "COD",
        createdAt: "2025-03-15",
        amount: 167,
        status: "Delivered"
    },
    {
        _id: "ORD-2025-002",
        items: [
            {
                product: {
                    _id: "6",
                    name: "Women's Floral Print Summer Dress",
                    image: [product_8],
                    offerPrice: 49
                },
                quantity: 1,
                size: "M"
            },
            {
                product: {
                    _id: "8",
                    name: "Women's Elegant Evening Gown",
                    image: [product_9],
                    offerPrice: 179
                },
                quantity: 1,
                size: "S"
            }
        ],
        isPaid: false,
        paymentMethod: "Stripe",
        createdAt: "2025-03-20",
        amount: 228,
        status: "Processing"
    },
    {
        _id: "ORD-2025-003",
        items: [
            {
                product: {
                    _id: "11",
                    name: "Kids Colorful Cartoon T-Shirt",
                    image: [product_15],
                    offerPrice: 19
                },
                quantity: 3,
                size: "4-5Y"
            },
            {
                product: {
                    _id: "13",
                    name: "Kids Winter Jacket with Hood",
                    image: [product_17],
                    offerPrice: 49
                },
                quantity: 1,
                size: "5-6Y"
            }
        ],
        isPaid: true,
        paymentMethod: "COD",
        createdAt: "2025-03-18",
        amount: 106,
        status: "Shipped"
    }
]