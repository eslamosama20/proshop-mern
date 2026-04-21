# ProShop MERN — التوثيق التقني الكامل (Technical Documentation)

---

## 1. نظرة عامة على المشروع (Project Overview)

**ProShop** هو متجر إلكتروني كامل (Full-Stack E-Commerce) مبني بـ **MERN Stack**:

| التقنية | الاستخدام |
|---------|-----------|
| **MongoDB** | قاعدة البيانات (NoSQL) |
| **Express.js** | إطار عمل السيرفر |
| **React.js 16** | واجهة المستخدم (SPA) |
| **Node.js** | بيئة تشغيل السيرفر |

**تقنيات إضافية:**

| التقنية | الاستخدام |
|---------|-----------|
| Redux + Redux Thunk | إدارة الحالة (State Management) |
| React Router v5 | التنقل بين الصفحات |
| React Bootstrap | تصميم الواجهة |
| JWT (jsonwebtoken) | المصادقة (Authentication) |
| bcryptjs | تشفير كلمات المرور |
| Mongoose 5 | ODM للتعامل مع MongoDB |
| Multer | رفع الملفات/الصور |
| PayPal SDK | بوابة الدفع |
| Axios | طلبات HTTP من الفرونت |
| Morgan | تسجيل طلبات HTTP (logging) |
| Nodemon | إعادة تشغيل السيرفر تلقائياً |
| Concurrently | تشغيل الباك والفرونت معاً |
| React Helmet | إدارة meta tags لـ SEO |

---

## 2. هيكل المشروع (Project Structure)

```
proshop_mern-master/
│
├── .env                              # متغيرات البيئة (بورت، قاعدة بيانات، مفاتيح)
├── package.json                      # المكتبات + سكريبتات التشغيل
├── Procfile                          # ملف النشر على Heroku
│
├── backend/                          # ── الباك إند ──
│   ├── server.js                     # نقطة دخول السيرفر (Express app)
│   ├── seeder.js                     # سكريبت تعبئة/حذف بيانات تجريبية
│   │
│   ├── config/
│   │   └── db.js                     # الاتصال بقاعدة البيانات MongoDB
│   │
│   ├── models/                       # نماذج البيانات (Mongoose Schemas)
│   │   ├── userModel.js              # نموذج المستخدم
│   │   ├── productModel.js           # نموذج المنتج (+ المراجعات كـ sub-document)
│   │   ├── orderModel.js             # نموذج الطلب
│   │   ├── wishlistModel.js          # نموذج قائمة الأمنيات
│   │   └── newsletterModel.js        # نموذج الاشتراك في النشرة
│   │
│   ├── controllers/                  # منطق الأعمال (Business Logic)
│   │   ├── userController.js         # عمليات المستخدمين (8 functions)
│   │   ├── productController.js      # عمليات المنتجات (9 functions)
│   │   ├── orderController.js        # عمليات الطلبات (6 functions)
│   │   ├── wishlistController.js     # عمليات قائمة الأمنيات (3 functions)
│   │   └── newsletterController.js   # عمليات النشرة (3 functions)
│   │
│   ├── routes/                       # تعريف المسارات (API endpoints)
│   │   ├── userRoutes.js             # /api/users/*
│   │   ├── productRoutes.js          # /api/products/*
│   │   ├── orderRoutes.js            # /api/orders/*
│   │   ├── uploadRoutes.js           # /api/upload
│   │   ├── wishlistRoutes.js         # /api/wishlist/*
│   │   └── newsletterRoutes.js       # /api/newsletter
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js         # حماية JWT + فحص الأدمن
│   │   └── errorMiddleware.js        # معالج 404 + معالج الأخطاء العام
│   │
│   ├── utils/
│   │   └── generateToken.js          # مولد JWT tokens
│   │
│   └── data/                         # بيانات تجريبية (Seed Data)
│       ├── users.js                  # 3 مستخدمين
│       └── products.js               # 41 منتج
│
├── frontend/                         # ── الفرونت إند ──
│   ├── package.json
│   ├── public/                       # ملفات ثابتة
│   └── src/
│       ├── index.js                  # نقطة الدخول + Redux Provider
│       ├── App.js                    # React Router (كل المسارات)
│       ├── store.js                  # Redux Store (22 reducer)
│       │
│       ├── constants/                # أنواع الـ Actions
│       │   ├── productConstants.js
│       │   ├── userConstants.js
│       │   ├── cartConstants.js
│       │   └── orderConstants.js
│       │
│       ├── actions/                  # Action Creators (async مع Thunk)
│       │   ├── productActions.js
│       │   ├── userActions.js
│       │   ├── cartActions.js
│       │   └── orderActions.js
│       │
│       ├── reducers/                 # Reducers
│       │   ├── productReducers.js
│       │   ├── userReducers.js
│       │   ├── cartReducers.js
│       │   └── orderReducers.js
│       │
│       ├── screens/                  # صفحات التطبيق (17 صفحة)
│       │   ├── HomeScreen.js
│       │   ├── ProductScreen.js
│       │   ├── CartScreen.js
│       │   ├── LoginScreen.js
│       │   ├── RegisterScreen.js
│       │   ├── ProfileScreen.js
│       │   ├── ShippingScreen.js
│       │   ├── PaymentScreen.js
│       │   ├── PlaceOrderScreen.js
│       │   ├── OrderScreen.js
│       │   ├── WishlistScreen.js
│       │   ├── CompareScreen.js
│       │   ├── UserListScreen.js      # أدمن
│       │   ├── UserEditScreen.js      # أدمن
│       │   ├── ProductListScreen.js   # أدمن
│       │   ├── ProductEditScreen.js   # أدمن
│       │   └── OrderListScreen.js     # أدمن
│       │
│       └── components/               # مكونات مشتركة (16 مكون)
│           ├── Header.js
│           ├── Footer.js
│           ├── Product.js
│           ├── Rating.js
│           ├── Loader.js
│           ├── Message.js
│           ├── Meta.js
│           ├── SearchBox.js
│           ├── Paginate.js
│           ├── ProductCarousel.js
│           ├── FilterSidebar.js
│           ├── SortOptions.js
│           ├── QuickView.js
│           ├── CompareProducts.js
│           ├── FeaturedDeals.js
│           ├── RecentlyViewed.js
│           ├── Newsletter.js
│           ├── FormContainer.js
│           └── CheckoutSteps.js
│
└── uploads/                          # مجلد الصور المرفوعة

```

---

## 3. الباك إند بالتفصيل (Backend Deep Dive)

### 3.1 نقطة دخول السيرفر (`server.js`)

**الخطوات بالترتيب:**
1. يحمّل `.env` عبر `dotenv`
2. يتصل بـ MongoDB عبر `connectDB()`
3. يفعّل Morgan logging في وضع التطوير
4. يفعّل `express.json()` لقراءة JSON body
5. يركب 6 مجموعات routes:
   - `/api/products` → productRoutes
   - `/api/users` → userRoutes
   - `/api/orders` → orderRoutes
   - `/api/upload` → uploadRoutes
   - `/api/wishlist` → wishlistRoutes
   - `/api/newsletter` → newsletterRoutes
6. يقدم PayPal Client ID على `GET /api/config/paypal`
7. يقدم مجلد `/uploads` كملفات ثابتة
8. في الـ Production: يقدم React build كملفات ثابتة
9. يطبق error middleware (404 + error handler)
10. يستمع على `PORT` (افتراضي 5000)

**متغيرات البيئة (`.env`):**

| المتغير | الغرض | مثال |
|---------|-------|------|
| `NODE_ENV` | وضع التشغيل | `development` |
| `PORT` | بورت السيرفر | `5000` |
| `MONGO_URI` | رابط MongoDB | `mongodb://localhost:27017/proshop` |
| `JWT_SECRET` | المفتاح السري لتوقيع JWT | `abc123` |
| `PAYPAL_CLIENT_ID` | معرف PayPal | `AYnN...` |

### 3.2 الاتصال بقاعدة البيانات (`config/db.js`)

```
MongoDB ← Mongoose.connect(MONGO_URI) مع options:
  - useUnifiedTopology: true
  - useNewUrlParser: true
  - useCreateIndex: true

عند النجاح: يطبع "MongoDB Connected: {host}"
عند الفشل: يطبع الخطأ ويوقف العملية (process.exit(1))
```

### 3.3 نماذج البيانات (Data Models)

#### 3.3.1 User Model

```
User {
  name:      String  (مطلوب)
  email:     String  (مطلوب، فريد)
  password:  String  (مطلوب، مشفر بـ bcrypt)
  isAdmin:   Boolean (افتراضي: false)
  timestamps: true   (createdAt, updatedAt)
}

Methods:
  - matchPassword(enteredPassword) → يقارن الباسورد المدخل بالمشفر
  
Pre-save Hook:
  - لو الباسورد اتعدل → يشفره بـ bcrypt (salt rounds: 10) قبل الحفظ
```

#### 3.3.2 Product Model

```
Product {
  user:          ObjectId → User  (مين اللي أنشأ المنتج)
  name:          String  (مطلوب)
  image:         String  (مطلوب)
  brand:         String  (مطلوب)
  category:      String  (مطلوب)
  description:   String  (مطلوب)
  reviews:       [Review] (مستند فرعي مضمن)
  rating:        Number  (افتراضي: 0)
  numReviews:    Number  (افتراضي: 0)
  price:         Number  (افتراضي: 0)
  countInStock:  Number  (افتراضي: 0)
  timestamps:    true
}

Review (Sub-document) {
  name:    String  (مطلوب)
  rating:  Number  (مطلوب)
  comment: String  (مطلوب)
  user:    ObjectId → User
  timestamps: true
}
```

#### 3.3.3 Order Model

```
Order {
  user:            ObjectId → User  (مين اللي طلب)
  orderItems: [{
    name:    String
    qty:     Number
    image:   String
    price:   Number
    product: ObjectId → Product
  }]
  shippingAddress: {
    address:    String
    city:       String
    postalCode: String
    country:    String
  }
  paymentMethod:   String
  paymentResult: {
    id:            String
    status:        String
    update_time:   String
    email_address: String
  }
  taxPrice:        Number  (افتراضي: 0.0)
  shippingPrice:   Number  (افتراضي: 0.0)
  totalPrice:      Number  (افتراضي: 0.0)
  isPaid:          Boolean (افتراضي: false)
  paidAt:          Date
  isDelivered:     Boolean (افتراضي: false)
  deliveredAt:     Date
  timestamps:      true
}
```

#### 3.3.4 Wishlist Model

```
Wishlist {
  user:     ObjectId → User  (مطلوب)
  products: [ObjectId → Product]
  timestamps: true
}
```

#### 3.3.5 Newsletter Model

```
Newsletter {
  email:      String  (مطلوب، فريد)
  timestamps: true
}
```

#### علاقات النماذج (Entity Relationships)

```
User (1) ──→ (N) Product       المنتجات اللي أنشأها (admin)
User (1) ──→ (N) Order         الطلبات بتاعته
User (1) ──→ (1) Wishlist      قائمة الأمنيات بتاعته
User (1) ──→ (N) Review        المراجعات بتاعته (مضمنة في Product)
Product (1) ──→ (N) Review     المراجعات على المنتج (sub-document)
Product (N) ←── (1) Wishlist   المنتجات في قائمة الأمنيات
Product (N) ←── (N) OrderItem  المنتجات في الطلبات
```

---

### 3.4 الـ API الكامل (Full API Reference)

#### 3.4.1 Products API (`/api/products`)

| Method | Endpoint | الوصف | الصلاحية | Query Params |
|--------|----------|-------|----------|--------------|
| `GET` | `/api/products` | جلب كل المنتجات مع فلاتر وpagination | Public | `keyword`, `pageNumber`, `category`, `brand`, `minPrice`, `maxPrice`, `rating` |
| `GET` | `/api/products/:id` | جلب منتج واحد بالـ ID | Public | — |
| `POST` | `/api/products` | إنشاء منتج جديد (sample) | Admin | — |
| `PUT` | `/api/products/:id` | تعديل منتج | Admin | — |
| `DELETE` | `/api/products/:id` | حذف منتج | Admin | — |
| `POST` | `/api/products/:id/reviews` | إضافة مراجعة | مسجل دخول | Body: `{rating, comment}` |
| `GET` | `/api/products/top` | أعلى 3 منتجات تقييماً | Public | — |
| `GET` | `/api/products/categories` | كل التصنيفات الفريدة | Public | — |
| `GET` | `/api/products/brands` | كل الماركات الفريدة | Public | — |

**تفاصيل `GET /api/products`:**
- **pageSize**: 12 منتج لكل صفحة
- **البحث**: regex على حقل `name` (case-insensitive)
- **الفلاتر**: category (exact), brand (exact), price range ($gte/$lte), rating ($gte)
- **الترتيب الافتراضي**: `createdAt: -1` (الأحدث أولاً)
- **الاستجابة**: `{ products: [], page: Number, pages: Number }`

**تفاصيل `POST /api/products/:id/reviews`:**
- المستخدم مش يقدر يراجع نفس المنتج مرتين
- بعد إضافة المراجعة: يحسب `numReviews` و `rating` (المتوسط) تلقائياً

#### 3.4.2 Users API (`/api/users`)

| Method | Endpoint | الوصف | الصلاحية |
|--------|----------|-------|----------|
| `POST` | `/api/users/login` | تسجيل الدخول → يرجع JWT | Public |
| `POST` | `/api/users` | تسجيل مستخدم جديد → يرجع JWT | Public |
| `GET` | `/api/users/profile` | جلب بروفايل المستخدم الحالي | مسجل دخول |
| `PUT` | `/api/users/profile` | تعديل البروفايل (اسم/إيميل/باسورد) | مسجل دخول |
| `GET` | `/api/users` | جلب كل المستخدمين | Admin |
| `DELETE` | `/api/users/:id` | حذف مستخدم | Admin |
| `GET` | `/api/users/:id` | جلب مستخدم بالـ ID (بدون الباسورد) | Admin |
| `PUT` | `/api/users/:id` | تعديل مستخدم (اسم/إيميل/أدمن) | Admin |

**تفاصيل المصادقة:**
- عند تسجيل الدخول/التسجيل: يرجع `{_id, name, email, isAdmin, token}`
- الـ token يصلح لمدة **30 يوم**
- الباسورد مشفر بـ bcrypt (10 salt rounds)

#### 3.4.3 Orders API (`/api/orders`)

| Method | Endpoint | الوصف | الصلاحية |
|--------|----------|-------|----------|
| `POST` | `/api/orders` | إنشاء طلب جديد | مسجل دخول |
| `GET` | `/api/orders/myorders` | طلبات المستخدم الحالي | مسجل دخول |
| `GET` | `/api/orders/:id` | جلب طلب بالـ ID (مع بيانات المستخدم) | مسجل دخول |
| `PUT` | `/api/orders/:id/pay` | تحديث حالة الدفع | مسجل دخول |
| `PUT` | `/api/orders/:id/deliver` | تحديث حالة التوصيل | Admin |
| `GET` | `/api/orders` | جلب كل الطلبات (مع بيانات المستخدمين) | Admin |

**تفاصيل `POST /api/orders`:**
- Body: `{orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice}`
- لازم يبعت `orderItems` مع محتوى (مفيش طلب فاضي)

**تفاصيل `PUT /api/orders/:id/pay`:**
- بييجي من PayPal SDK بعد الدفع
- يحفظ: `{id, status, update_time, payer.email_address}`

#### 3.4.4 Wishlist API (`/api/wishlist`)

| Method | Endpoint | الوصف | الصلاحية |
|--------|----------|-------|----------|
| `GET` | `/api/wishlist` | جلب قائمة الأمنيات (مع populate للمنتجات) | مسجل دخول |
| `POST` | `/api/wishlist/:id` | إضافة منتج لقائمة الأمنيات | مسجل دخول |
| `DELETE` | `/api/wishlist/:id` | حذف منتج من قائمة الأمنيات | مسجل دخول |

**تفاصيل:**
- لو المستخدم مش عنده wishlist → بتتعمل تلقائياً (فاضية)
- لو المنتج موجود أصلاً → يرجع error 400
- بتعمل `populate('products')` عشان ترجع بيانات المنتجات كاملة

#### 3.4.5 Newsletter API (`/api/newsletter`)

| Method | Endpoint | الوصف | الصلاحية |
|--------|----------|-------|----------|
| `POST` | `/api/newsletter` | الاشتراك في النشرة | Public |
| `DELETE` | `/api/newsletter` | إلغاء الاشتراك | Public |
| `GET` | `/api/newsletter` | جلب كل المشتركين | Admin |

#### 3.4.6 Upload API (`/api/upload`)

| Method | Endpoint | الوصف | الصلاحية |
|--------|----------|-------|----------|
| `POST` | `/api/upload` | رفع صورة منتج | — |

**تفاصيل:**
- يستخدم Multer مع disk storage
- اسم الملف: `{fieldname}-{timestamp}.{extension}`
- الأنواع المسموحة: `jpg`, `jpeg`, `png` فقط
- يتحقق من الامتداد + MIME type
- يحفظ في مجلد `uploads/`

#### 3.4.7 PayPal Config

| Method | Endpoint | الوصف |
|--------|----------|-------|
| `GET` | `/api/config/paypal` | يرجع PayPal Client ID |

---

### 3.5 نظام المصادقة (Authentication System)

```
تدفق المصادقة:
═══════════════

1. التسجيل/الدخول
   Client → POST /api/users أو /api/users/login
   Server → يتحقق من البيانات → يولد JWT token → يرجع {user + token}

2. حماية المسارات (protect middleware)
   Client → يبعت Header: "Authorization: Bearer {token}"
   Server → يفك الـ token → يجلب المستخدم من DB → يحطه في req.user → next()
   لو الـ token مش موجود أو فاشل → 401 Unauthorized

3. صلاحيات الأدمن (admin middleware)
   بعد protect → يتحقق req.user.isAdmin === true
   لو مش أدمن → 401 Not authorized as an admin

JWT Token:
  - Payload: { id: user._id }
  - Secret: process.env.JWT_SECRET
  - Expiry: 30 يوم
```

### 3.6 نظام معالجة الأخطاء (Error Handling)

```
1. notFound middleware:
   - أي route مش موجود → 404 + "Not Found - {url}"

2. errorHandler middleware:
   - لو الـ statusCode = 200 → يغيره لـ 500
   - يرجع JSON: { message, stack }
   - في الـ production: مش بيرجع الـ stack trace

3. express-async-handler:
   - بيلف كل controller function
   - بيمسك الأخطاء async ويبعتها لـ error middleware
```

---

## 4. الفرونت إند بالتفصيل (Frontend Deep Dive)

### 4.1 نقطة الدخول والتوجيه

**`index.js`**: بيلف `<App>` بـ `<Provider store={store}>` لتوفير Redux لكل الكومبوننتس

**`App.js`** — كل المسارات (Routes):

| المسار | الصفحة | الوصف |
|--------|-------|-------|
| `/` | HomeScreen | الصفحة الرئيسية |
| `/search/:keyword` | HomeScreen | نتائج البحث |
| `/page/:pageNumber` | HomeScreen | التنقل بين الصفحات |
| `/search/:keyword/page/:pageNumber` | HomeScreen | بحث + صفحات |
| `/product/:id` | ProductScreen | تفاصيل منتج |
| `/cart/:id?` | CartScreen | سلة المشتريات |
| `/login` | LoginScreen | تسجيل الدخول |
| `/register` | RegisterScreen | التسجيل |
| `/profile` | ProfileScreen | البروفايل + طلباتي |
| `/shipping` | ShippingScreen | بيانات الشحن |
| `/payment` | PaymentScreen | اختيار طريقة الدفع |
| `/placeorder` | PlaceOrderScreen | تأكيد الطلب |
| `/order/:id` | OrderScreen | تفاصيل طلب + PayPal |
| `/wishlist` | WishlistScreen | قائمة الأمنيات |
| `/compare` | CompareScreen | مقارنة المنتجات |
| `/admin/userlist` | UserListScreen | إدارة المستخدمين |
| `/admin/user/:id/edit` | UserEditScreen | تعديل مستخدم |
| `/admin/productlist` | ProductListScreen | إدارة المنتجات |
| `/admin/productlist/:pageNumber` | ProductListScreen | إدارة المنتجات + صفحات |
| `/admin/product/:id/edit` | ProductEditScreen | تعديل منتج |
| `/admin/orderlist` | OrderListScreen | إدارة الطلبات |

### 4.2 إدارة الحالة بـ Redux

**Redux Store** فيه 22 reducer:

| Reducer | المصدر | الوظيفة |
|---------|--------|---------|
| `productList` | productReducers | قائمة المنتجات (loading, error, products, page, pages) |
| `productDetails` | productReducers | تفاصيل منتج واحد |
| `productDelete` | productReducers | حذف منتج |
| `productCreate` | productReducers | إنشاء منتج |
| `productUpdate` | productReducers | تعديل منتج |
| `productReviewCreate` | productReducers | إنشاء مراجعة |
| `productTopRated` | productReducers | أعلى المنتجات تقييماً |
| `cart` | cartReducers | السلة (items + shippingAddress + paymentMethod) |
| `userLogin` | userReducers | تسجيل الدخول |
| `userRegister` | userReducers | التسجيل |
| `userDetails` | userReducers | بيانات المستخدم |
| `userUpdateProfile` | userReducers | تعديل البروفايل |
| `userList` | userReducers | قائمة المستخدمين (admin) |
| `userDelete` | userReducers | حذف مستخدم (admin) |
| `userUpdate` | userReducers | تعديل مستخدم (admin) |
| `orderCreate` | orderReducers | إنشاء طلب |
| `orderDetails` | orderReducers | تفاصيل طلب |
| `orderPay` | orderReducers | حالة الدفع |
| `orderDeliver` | orderReducers | حالة التوصيل (admin) |
| `orderListMy` | orderReducers | طلباتي |
| `orderList` | orderReducers | كل الطلبات (admin) |

**Initial State من localStorage:**
- `cartItems` → السلة
- `userInfo` → بيانات تسجيل الدخول
- `shippingAddress` → عنوان الشحن

### 4.3 Actions (Async مع Thunk)

**Product Actions:**
- `listProducts(keyword, pageNumber, filters)` → يبعت query string بالفلاتر
- `listProductDetails(id)` → تفاصيل منتج
- `deleteProduct(id)` → حذف (admin)
- `createProduct()` → إنشاء sample (admin)
- `updateProduct(product)` → تعديل (admin)
- `createProductReview(productId, review)` → إضافة مراجعة
- `listTopProducts()` → أعلى 3 منتجات

**User Actions:**
- `login(email, password)` → تسجيل دخول + حفظ في localStorage
- `logout()` → مسح localStorage + reset كل reducers
- `register(name, email, password)` → تسجيل + حفظ في localStorage
- `getUserDetails(id)` → بيانات المستخدم
- `updateUserProfile(user)` → تعديل البروفايل
- `listUsers()` → كل المستخدمين (admin)
- `deleteUser(id)` → حذف مستخدم (admin)
- `updateUser(user)` → تعديل مستخدم (admin)

**Cart Actions:**
- `addToCart(id, qty)` → إضافة + حفظ في localStorage
- `removeFromCart(id)` → حذف من السلة
- `saveShippingAddress(data)` → حفظ عنوان الشحن
- `savePaymentMethod(data)` → حفظ طريقة الدفع

**Order Actions:**
- `createOrder(order)` → إنشاء طلب + مسح السلة
- `getOrderDetails(id)` → تفاصيل طلب
- `payOrder(orderId, paymentResult)` → تحديث الدفع
- `deliverOrder(order)` → تحديث التوصيل (admin)
- `listMyOrders()` → طلباتي
- `listOrders()` → كل الطلبات (admin)

### 4.4 المكونات بالتفصيل (Components)

#### Header
- Navbar ثابت مع لوجو
- SearchBox (form مع input + زر بحث)
- روابط: Cart (مع badge للعدد), Wishlist, Compare
- لو مسجل دخول: dropdown (Profile, Logout)
- لو أدمن: dropdown إضافي (Users, Products, Orders)

#### Product Card
- صورة المنتج مع lazy loading effect
- Badges: "Out of Stock" (أحمر) أو "Only X left" (أصفر)
- زر Quick View يظهر عند الهوفر
- زر Wishlist (قلب: أحمر لو في القائمة)
- زر Compare (أيقونة ميزان)
- Rating component (نجوم) + عدد المراجعات
- السعر

#### FilterSidebar
- يجلب التصنيفات والماركات من الـ API ديناميكياً
- فلاتر: Category, Brand, Min Price, Max Price, Rating
- أزرار: Apply Filters, Clear All
- Sticky position
- Responsive (يختفي على الشاشات الصغيرة)

#### SortOptions
- Dropdown لترتيب: Latest, Price Low→High, Price High→Low, Top Rated, Name A→Z, Name Z→A
- الترتيب بيحصل في الفرونت (client-side sorting)

#### QuickView
- Modal كبير يظهر بيانات المنتج بدون ما يفتح صفحة جديدة
- يعرض: صورة + اسم + تقييم + سعر + وصف + ماركة + وضع المخزون
- اختيار الكمية + زر Add to Cart

#### CompareProducts
- جدول مقارنة بين حتى 4 منتجات
- الصفوف: صورة + اسم، سعر، تقييم، ماركة، تصنيف، وضع المخزون، وصف
- زر حذف لكل منتج + زر Clear All

#### FeaturedDeals
- يعرض أعلى 3 منتجات (rating >= 4.5 ومتوفرة)
- يعرض "خصم وهمي" (15-30%) للعرض
- كاردز مع حدود حمراء + badge الخصم

#### RecentlyViewed
- يقرأ من localStorage (آخر 4 منتجات مشاهدة)
- يعرض كاردز بسيطة مع صورة + اسم + سعر + تقييم

#### Newsletter
- فورم بسيط (إيميل + زر Subscribe)
- يبعت `POST /api/newsletter` للباك إند
- يعرض رسائل نجاح/تحذير/خطأ

#### ProductCarousel
- Carousel تلقائي لأعلى 3 منتجات تقييماً
- يجلب من `GET /api/products/top`

---

## 5. استخدام localStorage

| المفتاح | المحتوى | أين بيتحط |
|---------|---------|-----------|
| `cartItems` | مصفوفة items السلة | cartActions |
| `userInfo` | بيانات المستخدم + token | userActions (login/register) |
| `shippingAddress` | عنوان الشحن | cartActions |
| `paymentMethod` | طريقة الدفع | cartActions |
| `recentlyViewed` | آخر 8 منتجات اتشافت | ProductScreen |
| `compareProducts` | المنتجات في المقارنة (حتى 4) | HomeScreen |

---

## 6. تدفق البيانات الرئيسي (Data Flow)

### تدفق تسجيل الدخول
```
LoginScreen → dispatch(login(email, password))
  → userActions: POST /api/users/login
  → Server: يتحقق من البيانات → يولد JWT → يرجع user + token
  → Action: USER_LOGIN_SUCCESS → يحفظ في Redux + localStorage
  → الصفحة بتعمل redirect
```

### تدفق عرض المنتجات
```
HomeScreen يتحمل → dispatch(listProducts(keyword, pageNumber, filters))
  → productActions: GET /api/products?keyword=...&pageNumber=...&category=...
  → Server: يبني الفلاتر → يعمل query على MongoDB → يرجع المنتجات + pagination
  → Action: PRODUCT_LIST_SUCCESS → يحدث Redux store
  → HomeScreen بيعرض المنتجات + FilterSidebar + SortOptions + Pagination
```

### تدفق الشراء الكامل
```
1. ProductScreen → Add to Cart → يحفظ في Redux + localStorage
2. CartScreen → Proceed to Checkout → يتأكد إنه مسجل دخول
3. ShippingScreen → يدخل العنوان → يحفظ في localStorage
4. PaymentScreen → يختار PayPal → يحفظ في localStorage
5. PlaceOrderScreen → يعرض الملخص → Place Order
   → dispatch(createOrder(order))
   → POST /api/orders → يرجع الطلب المنشأ
   → redirect لـ OrderScreen
6. OrderScreen → يحمّل PayPal SDK ديناميكياً → المستخدم يدفع
   → PayPal onSuccess → dispatch(payOrder(orderId, paymentResult))
   → PUT /api/orders/:id/pay → يحدث isPaid + paidAt
7. (Admin) OrderScreen → Mark as Delivered
   → PUT /api/orders/:id/deliver → يحدث isDelivered + deliveredAt
```

---

## 7. سكريبتات التشغيل

| الأمر | الوظيفة |
|-------|---------|
| `npm start` | تشغيل السيرفر (production) |
| `npm run server` | تشغيل السيرفر مع nodemon |
| `npm run client` | تشغيل الفرونت إند فقط |
| `npm run dev` | تشغيل الباك والفرونت معاً (concurrently) |
| `npm run data:import` | تعبئة قاعدة البيانات ببيانات تجريبية |
| `npm run data:destroy` | حذف كل البيانات من قاعدة البيانات |

---

## 8. بيانات تجريبية (Seed Data)

**المستخدمين (3):**

| الاسم | الإيميل | الباسورد | أدمن |
|-------|---------|----------|------|
| Admin User | admin@example.com | 123456 | ✅ |
| John Doe | john@example.com | 123456 | ❌ |
| Jane Doe | jane@example.com | 123456 | ❌ |

**المنتجات:** 41 منتج تجريبي في عدة تصنيفات وماركات مختلفة.

---

## 9. الأمان (Security)

- **كلمات المرور**: مشفرة بـ bcrypt (لا تتخزن plain text أبداً)
- **JWT**: كل endpoint حساس محمي بـ token في Header
- **Admin Guard**: المسارات الإدارية محمية بـ `protect` + `admin` middleware
- **File Upload**: يتحقق من نوع الملف (jpg/jpeg/png فقط) بالامتداد + MIME type
- **Error Handling**: في الـ production مش بيرجع stack trace
- **Input Validation**: كل controller بيعمل validation للمدخلات المطلوبة
