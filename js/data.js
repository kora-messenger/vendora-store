/* ============================================================
   VENDORA — Product & Menu Data
   ============================================================ */

const PRODUCTS = [
  // ---------- CLOTHES ----------
  { id: "c1", name: "Men's Classic Oxford Shirt", cat: "clothes", price: 12500, oldPrice: 18000, rating: 4.6, sold: 320, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dress_Shirt_%283161023616%29.jpg/960px-Dress_Shirt_%283161023616%29.jpg", desc: "Crisp, breathable cotton oxford with a tailored fit. Office-ready, weekend-friendly." },
  { id: "c2", name: "Women's Ankara Wrap Dress", cat: "clothes", price: 18500, oldPrice: null, rating: 4.8, sold: 210, img: "https://upload.wikimedia.org/wikipedia/commons/d/db/Ankara_dress.jpg", desc: "Vibrant hand-dyed Ankara print in a flattering wrap silhouette. Made in Nigeria." },
  { id: "c3", name: "Premium Cotton Crew T-Shirt", cat: "clothes", price: 7500, oldPrice: 9500, rating: 4.5, sold: 540, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/T-Shirt_folding_skills_%284111373509%29.jpg/960px-T-Shirt_folding_skills_%284111373509%29.jpg", desc: "Heavyweight 100% cotton tee. Pre-shrunk, tagless, and built to last." },
  { id: "c4", name: "Urban Denim Jacket", cat: "clothes", price: 24500, oldPrice: null, rating: 4.7, sold: 130, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Jean_jacket.jpg/960px-Jean_jacket.jpg", desc: "Timeless washed denim with reinforced stitching and brushed lining." },

  // ---------- SHOES ----------
  { id: "s1", name: "Stride Urban Sneakers", cat: "shoes", price: 32000, oldPrice: 45000, rating: 4.9, sold: 412, img: "https://images.unsplash.com/photo-1542291026-5eec69c2b0d6?w=600&q=80", desc: "Cushioned street-style sneakers with premium leather upper and grip soles." },
  { id: "s2", name: "Classic Leather Loafers", cat: "shoes", price: 28000, oldPrice: null, rating: 4.4, sold: 95, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/A_Penny_Loafer.jpg/960px-A_Penny_Loafer.jpg", desc: "Hand-finished genuine leather loafers. Smart comfort for every occasion." },
  { id: "s3", name: "Dash Pro Running Shoes", cat: "shoes", price: 38500, oldPrice: 49000, rating: 4.8, sold: 268, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80", desc: "Responsive foam midsole and breathable mesh. Built for daily miles." },

  // ---------- BAGS ----------
  { id: "b1", name: "Suede City Backpack", cat: "bags", price: 21000, oldPrice: null, rating: 4.6, sold: 178, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", desc: "Water-resistant suede-look backpack with padded 15\" laptop sleeve." },
  { id: "b2", name: "Milano Leather Tote", cat: "bags", price: 26500, oldPrice: 34000, rating: 4.9, sold: 233, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80", desc: "Full-grain leather tote with gold hardware and interior organizer pockets." },
  { id: "b3", name: "Weekender Duffle Bag", cat: "bags", price: 29500, oldPrice: null, rating: 4.5, sold: 88, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Duffel_bags%2C_Interboot_2020%2C_Friedrichshafen_%28IB200172%29.jpg/960px-Duffel_bags%2C_Interboot_2020%2C_Friedrichshafen_%28IB200172%29.jpg", desc: "Cabin-sized travel duffle with detachable shoulder strap and shoe compartment." },

  // ---------- PHONES ----------
  { id: "p1", name: "Aurora X5 Smartphone · 128GB", cat: "phones", price: 245000, oldPrice: null, rating: 4.7, sold: 145, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80", desc: "6.5\" AMOLED display, 108MP triple camera, 5000mAh battery, dual SIM. 1-year warranty." },
  { id: "p2", name: "Nova Lite 5G · 64GB", cat: "phones", price: 132000, oldPrice: 155000, rating: 4.5, sold: 322, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Blackview_A60_Smartphone_Android_mobile_phone_and_folio_case.jpg/960px-Blackview_A60_Smartphone_Android_mobile_phone_and_folio_case.jpg", desc: "5G speed on a budget. 6.2\" HD+ screen, 48MP camera, 4000mAh battery." },
  { id: "p3", name: "Titan Max · 256GB", cat: "phones", price: 415000, oldPrice: null, rating: 4.9, sold: 76, img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80", desc: "Flagship performance, 120Hz display, wireless charging, IP68 water resistance." },

  // ---------- ACCESSORIES ----------
  { id: "a1", name: "Sonic Wireless Headphones", cat: "accessories", price: 18500, oldPrice: 24000, rating: 4.6, sold: 389, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", desc: "Deep bass, 40-hour battery life, and soft memory-foam ear cushions." },
  { id: "a2", name: "Pulse Smart Watch", cat: "accessories", price: 32000, oldPrice: null, rating: 4.5, sold: 201, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Samsung_Gear_S3.jpg/960px-Samsung_Gear_S3.jpg", desc: "Fitness tracking, heart-rate monitor, and 7-day battery. Works with Android & iOS." },
  { id: "a3", name: "Polarized Aviator Sunglasses", cat: "accessories", price: 9800, oldPrice: 13000, rating: 4.7, sold: 264, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Ray-Ban_Clubround_Sunglasses.jpg/960px-Ray-Ban_Clubround_Sunglasses.jpg", desc: "UV400 polarized lenses in a lightweight metal frame. Case included." },
  { id: "a4", name: "Classic Leather Belt", cat: "accessories", price: 6500, oldPrice: null, rating: 4.3, sold: 156, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Belt-clothing.jpg/960px-Belt-clothing.jpg", desc: "Genuine leather belt with a brushed steel buckle. Sizes 30–42." },

  // ---------- GADGETS ----------
  { id: "g1", name: "4K Action Camera", cat: "gadgets", price: 68000, oldPrice: 85000, rating: 4.6, sold: 118, img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80", desc: "4K60 video, 30m waterproof case, image stabilization. 20+ mounting accessories." },
  { id: "g2", name: "Boom Bluetooth Speaker", cat: "gadgets", price: 14500, oldPrice: 18000, rating: 4.5, sold: 342, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/JBL_Flip_3_bluetooth_speaker_%28DSCF2653%29.jpg/960px-JBL_Flip_3_bluetooth_speaker_%28DSCF2653%29.jpg", desc: "Room-filling 360° sound, 24-hour playtime, IPX7 waterproof." },
  { id: "g3", name: "PowerCore 20,000mAh Power Bank", cat: "gadgets", price: 12000, oldPrice: null, rating: 4.8, sold: 467, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/USB_power_bank.jpg/960px-USB_power_bank.jpg", desc: "Fast-charge two devices at once. Charges a phone up to 5 times." },
  { id: "g4", name: "Air Wireless Earbuds", cat: "gadgets", price: 16500, oldPrice: 22000, rating: 4.4, sold: 512, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/AirPods_%28cropped%29.jpg/960px-AirPods_%28cropped%29.jpg", desc: "True wireless earbuds with noise reduction and a 24-hour charging case." },
  { id: "g5", name: "Mechanical RGB Keyboard", cat: "gadgets", price: 22000, oldPrice: null, rating: 4.7, sold: 143, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mechanical_Keyboard.jpg/960px-Mechanical_Keyboard.jpg", desc: "Tactile blue switches, rainbow backlight, and an aluminium frame." },
  { id: "g6", name: "ZenBook 14 Laptop · 16GB / 512GB SSD", cat: "gadgets", price: 485000, oldPrice: 540000, rating: 4.8, sold: 41, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80", desc: "Intel Core i7, 14\" FHD display, backlit keyboard, all-day battery. 2-year warranty." },
];

const FOOD = [
  // ---------- PIZZA ----------
  { id: "f1", name: "Classic Margherita Pizza", cat: "Pizza", price: 6500, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80", desc: "Fresh mozzarella, tomato sauce, and basil on hand-stretched dough. 12\".", rating: 4.8 },
  { id: "f2", name: "Pepperoni Feast Pizza", cat: "Pizza", price: 8500, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Closeup_of_a_pepperoni_pizza.jpg/960px-Closeup_of_a_pepperoni_pizza.jpg", desc: "Double pepperoni, stretchy mozzarella, and our signature tomato base. 12\".", rating: 4.9 },
  { id: "f3", name: "BBQ Chicken Pizza", cat: "Pizza", price: 9500, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80", desc: "Smoked BBQ chicken, red onions, sweetcorn, and cheddar blend. 12\".", rating: 4.7 },
  { id: "f4", name: "Veggie Supreme Pizza", cat: "Pizza", price: 8000, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80", desc: "Bell peppers, mushrooms, onions, olives, and garden herbs. 12\".", rating: 4.6 },
  // ---------- BURGERS & CHICKEN ----------
  { id: "f5", name: "Classic Cheeseburger", cat: "Burgers", price: 4500, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80", desc: "Flame-grilled beef patty, cheddar, lettuce, tomato, house sauce.", rating: 4.7 },
  { id: "f6", name: "Double Deluxe Burger", cat: "Burgers", price: 6500, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/960px-Cheeseburger.jpg", desc: "Two beef patties, double cheese, smoked bacon, crispy onions.", rating: 4.8 },
  { id: "f7", name: "Crispy Chicken Wings (8pc)", cat: "Chicken", price: 5500, img: "https://upload.wikimedia.org/wikipedia/commons/8/81/Homemade_buffalo_wings.jpg", desc: "Golden-fried wings with your choice of spicy, BBQ, or honey-glaze dip.", rating: 4.6 },
  { id: "f8", name: "Jollof Rice & Grilled Chicken", cat: "Chicken", price: 5000, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Ghana_Jollof_Rice_with_Chicken.jpg/960px-Ghana_Jollof_Rice_with_Chicken.jpg", desc: "Smoky party-styled jollof with grilled chicken and fried plantain.", rating: 4.9 },
  // ---------- SIDES & DRINKS ----------
  { id: "f9", name: "Golden French Fries", cat: "Sides", price: 2500, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80", desc: "Twice-cooked crispy fries dusted with our secret seasoning.", rating: 4.5 },
  { id: "f10", name: "Chapman (Large)", cat: "Drinks", price: 2000, img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80", desc: "The classic Nigerian mocktail — citrus, bitters, and a splash of fizz.", rating: 4.7 },
  { id: "f11", name: "Vanilla Milkshake", cat: "Drinks", price: 3500, img: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Milkshake_3.jpg", desc: "Thick, creamy vanilla shake blended with real ice cream.", rating: 4.6 },
  { id: "f12", name: "Fresh Garden Salad", cat: "Sides", price: 3000, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80", desc: "Crisp lettuce, tomato, cucumber, and vinaigrette. Add chicken for ₦1,500.", rating: 4.4 },
];

const CATEGORIES = [
  { key: "all", label: "All Products" },
  { key: "clothes", label: "Clothes" },
  { key: "shoes", label: "Shoes" },
  { key: "bags", label: "Bags" },
  { key: "phones", label: "Phones" },
  { key: "accessories", label: "Accessories" },
  { key: "gadgets", label: "Gadgets" },
];

const TESTIMONIALS = [
  { name: "Amara O.", text: "Ordered a bag and sneakers on Monday, both arrived by Wednesday. Quality is exactly as shown. Vendora is now my default store.", stars: 5 },
  { name: "Tunde A.", text: "The pizza surprised me — hot, fresh, and delivered in under 40 minutes. My go-to for Friday nights with the family.", stars: 5 },
  { name: "Chidinma E.", text: "Bought my phone here. Genuine product, sealed box, and their support answered every question before I paid. Very professional.", stars: 5 },
];
