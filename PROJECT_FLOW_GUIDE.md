# ProShop — دليل المستخدم الكامل
> مشروع تخرج | متجر إلكتروني متكامل

---

## 1. نقطة البداية

```
المتصفح يفتح http://localhost:3000
         │
         ▼
frontend/src/index.js          ← يلف التطبيق في Redux <Provider>
         │
         ▼
frontend/src/App.js            ← يحمّل Router + كل المسارات
         │
         ▼
frontend/src/components/Header.js   ← شريط التنقل (دائم في كل الصفحات)
         │
         ▼
frontend/src/screens/HomeScreen.js  ← الصفحة الرئيسية
```

**السيرفر:**
```
backend/server.js              ← نقطة دخول Express على PORT 5000
    ├── /api/products          ← backend/routes/productRoutes.js
    ├── /api/users             ← backend/routes/userRoutes.js
    ├── /api/orders            ← backend/routes/orderRoutes.js
    ├── /api/wishlist          ← backend/routes/wishlistRoutes.js
    ├── /api/upload            ← backend/routes/uploadRoutes.js
    ├── /api/newsletter        ← backend/routes/newsletterRoutes.js
    └── /api/config/paypal     ← يرجع PayPal Client ID
```

---

## 2. خريطة الصفحات

```
/ (HomeScreen)
├── /product/:id  (ProductScreen)
│   └── /cart/:id?qty=N  (CartScreen)
│       └── /login?redirect=shipping  (LoginScreen)
│           └── /shipping  (ShippingScreen)
│               └── /payment  (PaymentScreen)
│                   └── /placeorder  (PlaceOrderScreen)
│                       └── /order/:id  (OrderScreen)
├── /login  (LoginScreen)
├── /register  (RegisterScreen)
├── /profile  (ProfileScreen)
├── /wishlist  (WishlistScreen)
├── /compare  (CompareScreen)
├── /search/:keyword  (HomeScreen مع فلتر)
├── /page/:pageNumber  (HomeScreen صفحة معينة)
│
└── [Admin Only]
    ├── /admin/productlist  (ProductListScreen)
    │   └── /admin/product/:id/edit  (ProductEditScreen)
    ├── /admin/userlist  (UserListScreen)
    │   └── /admin/user/:id/edit  (UserEditScreen)
    └── /admin/orderlist  (OrderListScreen)
```

---

## 3. الفيتشر 1: تصفح المنتجات والبحث

### أين يبدأ:
`frontend/src/screens/HomeScreen.js`

### ما يعرضه:
- **ProductCarousel** (كاروسيل أعلى 3 منتجات تقييماً)
- **FilterSidebar** (تصنيف، ماركة، نطاق سعر، تقييم)
- **SortOptions** (ترتيب حسب: أحدث، سعر، تقييم، اسم)
- **شبكة المنتجات** — كل بطاقة من مكون `Product.js`
- **FeaturedDeals** (منتجات بتقييم ≥ 4.5)
- **RecentlyViewed** (آخر منتجات تم رؤيتها)
- **Newsletter** (اشتراك بالإيميل)
- **Paginate** (تقسيم الصفحات — 12 منتج/صفحة)

### تدفق البحث:
```
المستخدم يكتب في SearchBox (في Header)
    │
    ▼ history.push('/search/كلمة البحث')
    │
    ▼ HomeScreen يقرأ match.params.keyword
    │
    ▼ dispatch(listProducts(keyword, pageNumber, filters))
    │
    ▼ GET /api/products?keyword=...&pageNumber=...
    │
    ▼ backend/controllers/productController.js → getProducts()
    │  يبني query: { name: { $regex: keyword, $options: 'i' } }
    │
    ▼ MongoDB → Product.find(filters).limit(12)
    │
    ▼ { products, page, pages } → Redux Store → HomeScreen يعرض النتائج
```

### تدفق الفلاتر:
```
المستخدم يختار تصنيف/ماركة/سعر/تقييم في FilterSidebar
    │
    ▼ setFilters(newFilters) في HomeScreen
    │
    ▼ useEffect يشتغل → dispatch(listProducts(keyword, page, filters))
    │
    ▼ GET /api/products?category=...&brand=...&minPrice=...&maxPrice=...&rating=...
    │
    ▼ backend يبني الـ query ويرد بالمنتجات الملائمة
```

### تدفق الترتيب:
```
المستخدم يختار ترتيب من SortOptions
    │
    ▼ setSortBy(newSort) في HomeScreen
    │
    ▼ getSortedProducts() — الترتيب يحصل على Client Side
    │  (لا طلب API جديد — الترتيب على البيانات الموجودة)
```

---

## 4. الفيتشر 2: تفاصيل المنتج والمراجعات

### أين يبدأ:
`frontend/src/screens/ProductScreen.js`

### كيف يُفتح:
```
ضغط على اسم/صورة المنتج في HomeScreen
    │
    ▼ history.push('/product/:id')
```

### ما يعرضه:
- صورة المنتج + الاسم + التقييم + السعر + الوصف
- محدد الكمية (Qty Selector)
- زر "Add to Cart"
- قائمة المراجعات الموجودة
- نموذج إرسال مراجعة (للمستخدمين المسجلين فقط)

### تدفق عرض المنتج:
```
ProductScreen يُفتح
    │
    ▼ dispatch(listProductDetails(match.params.id))
    │
    ▼ GET /api/products/:id
    │
    ▼ backend/controllers/productController.js → getProductById()
    │
    ▼ MongoDB → Product.findById(id)
    │
    ▼ بيانات المنتج → Redux (productDetails) → العرض
    │
    ▼ addToRecentlyViewed(product) → localStorage['recentlyViewed']
```

### تدفق إضافة مراجعة:
```
مستخدم مسجل يكتب تقييم + تعليق ويضغط Submit
    │
    ▼ dispatch(createProductReview(productId, { rating, comment }))
    │
    ▼ POST /api/products/:id/reviews
    │  Authorization: Bearer TOKEN
    │
    ▼ backend يتحقق: هل عمل مراجعة من قبل؟
    │  نعم → 400 "Already reviewed"
    │  لا  → يضيف المراجعة ويعيد حساب المتوسط
    │
    ▼ يحفظ المنتج → يرد بـ "Review added"
    │
    ▼ dispatch(listProductDetails) → تحديث العرض
```

### تدفق الإضافة للسلة:
```
المستخدم يختار كمية ويضغط "Add to Cart"
    │
    ▼ history.push('/cart/:id?qty=N')
    │
    ▼ CartScreen يشتغل → dispatch(addToCart(id, qty))
```

---

## 5. الفيتشر 3: السلة

### أين يبدأ:
`frontend/src/screens/CartScreen.js`

### كيف يُفتح:
- من ProductScreen بعد "Add to Cart"
- من Header بالضغط على أيقونة السلة

### ما يعرضه:
- قائمة المنتجات في السلة (صورة، اسم، سعر، كمية قابلة للتعديل، حذف)
- الإجمالي الفرعي
- زر "Proceed to Checkout"

### تدفق إضافة للسلة:
```
CartScreen يُفتح بـ /cart/:productId?qty=N
    │
    ▼ dispatch(addToCart(productId, qty))
    │
    ▼ GET /api/products/:id  ← للتأكد من البيانات والمخزون
    │
    ▼ Redux (cart reducer) يضيف/يحدث العنصر
    │
    ▼ localStorage.setItem('cartItems', JSON.stringify(cartItems))
    │   (تُحفظ السلة وتبقى حتى بعد إغلاق المتصفح)
```

### تدفق الحذف من السلة:
```
ضغط أيقونة الحذف
    │
    ▼ dispatch(removeFromCart(id))
    │
    ▼ Redux يحذف العنصر → localStorage يتحدث
```

### تدفق المتابعة للشراء:
```
زر "Proceed to Checkout"
    │
    ▼ history.push('/login?redirect=shipping')
    │
    ▼ LoginScreen: لو مسجل بالفعل → /shipping مباشرة
    │              لو مش مسجل → نموذج تسجيل الدخول
```

---

## 6. الفيتشر 4: مسار الشراء الكامل

### الخطوة 1 — الشحن:
**الملف:** `frontend/src/screens/ShippingScreen.js`
```
/shipping
    │
    ▼ CheckoutSteps (step1 ✓, step2 ✓)
    │
    ▼ نموذج: address, city, postalCode, country
    │
    ▼ Submit → dispatch(saveShippingAddress(data))
    │          → localStorage['shippingAddress']
    │
    ▼ history.push('/payment')
```

### الخطوة 2 — الدفع:
**الملف:** `frontend/src/screens/PaymentScreen.js`
```
/payment
    │
    ▼ تحقق: لو مفيش shippingAddress → يرجع لـ /shipping
    │
    ▼ CheckoutSteps (step1 ✓, step2 ✓, step3 ✓)
    │
    ▼ اختيار طريقة الدفع (PayPal)
    │
    ▼ Submit → dispatch(savePaymentMethod('PayPal'))
    │          → localStorage['paymentMethod']
    │
    ▼ history.push('/placeorder')
```

### الخطوة 3 — مراجعة وتأكيد الطلب:
**الملف:** `frontend/src/screens/PlaceOrderScreen.js`
```
/placeorder
    │
    ▼ تحقق: لو مفيش shippingAddress → /shipping
    │        لو مفيش paymentMethod  → /payment
    │
    ▼ حساب الأسعار:
    │   itemsPrice  = Σ (price × qty)
    │   shippingPrice = itemsPrice > 100 ? $0 : $100
    │   taxPrice    = itemsPrice × 15%
    │   totalPrice  = items + shipping + tax
    │
    ▼ عرض ملخص الطلب
    │
    ▼ زر "Place Order" → dispatch(createOrder({...}))
    │
    ▼ POST /api/orders  (Authorization: Bearer TOKEN)
    │
    ▼ backend/controllers/orderController.js → addOrderItems()
    │  يحفظ الطلب في MongoDB
    │
    ▼ يرجع الطلب المُنشأ → history.push('/order/:id')
    │  السلة تُفرَّغ تلقائياً
```

### الخطوة 4 — صفحة الطلب والدفع:
**الملف:** `frontend/src/screens/OrderScreen.js`
```
/order/:id
    │
    ▼ تحقق: لو مش مسجل → /login
    │
    ▼ dispatch(getOrderDetails(orderId))
    │   GET /api/orders/:id
    │
    ▼ لو الطلب مش مدفوع:
    │   GET /api/config/paypal → يحمّل PayPal SDK
    │   يعرض <PayPalButton>
    │
    ▼ المستخدم يدفع بـ PayPal
    │   successPaymentHandler(paymentResult)
    │   dispatch(payOrder(orderId, paymentResult))
    │   PUT /api/orders/:id/pay
    │   backend يحدث isPaid=true, paidAt=now()
    │
    ▼ [أدمن فقط] زر "Mark as Delivered"
    │   dispatch(deliverOrder(order))
    │   PUT /api/orders/:id/deliver
    │   backend يحدث isDelivered=true, deliveredAt=now()
```

---

## 7. الفيتشر 5: المصادقة

### تسجيل الدخول:
**الملف:** `frontend/src/screens/LoginScreen.js`
```
/login
    │
    ▼ نموذج: email + password
    │
    ▼ dispatch(login(email, password))
    │
    ▼ POST /api/users/login
    │
    ▼ backend/controllers/userController.js → authUser()
    │   1. User.findOne({ email })
    │   2. user.matchPassword(password)  ← bcrypt compare
    │   3. لو صح → generateToken(user._id)  ← JWT
    │
    ▼ يرجع: { _id, name, email, isAdmin, token }
    │
    ▼ Redux (userLogin) → localStorage['userInfo']
    │
    ▼ history.push(redirect || '/')
```

### التسجيل:
**الملف:** `frontend/src/screens/RegisterScreen.js`
```
/register
    │
    ▼ نموذج: name + email + password + confirmPassword
    │
    ▼ تحقق client-side: password === confirmPassword
    │
    ▼ dispatch(register(name, email, password))
    │
    ▼ POST /api/users
    │
    ▼ backend يتحقق: هل الإيميل موجود مسبقاً؟
    │   نعم → 400 "User already exists"
    │   لا  → يشفر الباسورد (bcrypt, 10 rounds) ويحفظ المستخدم
    │
    ▼ يرجع token → دخول تلقائي → history.push('/')
```

### تسجيل الخروج:
**الملف:** `frontend/src/components/Header.js`
```
زر Logout في القائمة المنسدلة
    │
    ▼ dispatch(logout())
    │
    ▼ frontend/src/actions/userActions.js → logout()
    │   localStorage.removeItem('userInfo')
    │   localStorage.removeItem('cartItems')
    │   localStorage.removeItem('shippingAddress')
    │   localStorage.removeItem('paymentMethod')
    │   Redux: يمسح userLogin, userDetails, cartItems
    │
    ▼ history.push('/login')  (إعادة توجيه قوية)
```

### حماية المسارات:
```
المستخدم يحاول فتح /profile بدون تسجيل دخول
    │
    ▼ ProfileScreen → useEffect يتحقق: !userInfo
    │
    ▼ history.push('/login')  (لا يوجد token → يُرفض)
    │
backend:
    ▼ كل طلب محمي → middleware/authMiddleware.js → protect()
    │   1. يقرأ Authorization header: "Bearer TOKEN"
    │   2. jwt.verify(token, JWT_SECRET)
    │   3. User.findById(decoded.id).select('-password')
    │   4. req.user = user
    │
    ▼ admin() → يتحقق req.user.isAdmin === true
```

---

## 8. الفيتشر 6: قائمة الأمنيات

### إضافة/حذف من الصفحة الرئيسية:
**الملف:** `frontend/src/screens/HomeScreen.js`
```
ضغط زر القلب ❤ على أي منتج
    │
    ▼ handleWishlistToggle(productId)
    │
    ▼ لو مش مسجل → history.push('/login')
    │
    ▼ لو المنتج في الـ wishlist:
    │   DELETE /api/wishlist/:id  (Bearer TOKEN)
    │   setWishlist(wishlist.filter(...))
    │
    ▼ لو المنتج مش في الـ wishlist:
    │   POST /api/wishlist/:id  (Bearer TOKEN)
    │   setWishlist([...wishlist, productId])
```

### عرض قائمة الأمنيات:
**الملف:** `frontend/src/screens/WishlistScreen.js`
```
/wishlist
    │
    ▼ تحقق: لو مش مسجل → /login
    │
    ▼ GET /api/wishlist  (Bearer TOKEN)
    │
    ▼ backend/controllers/wishlistController.js → getWishlist()
    │   Wishlist.findOne({ user }).populate('products')
    │   لو مفيش → ينشئ wishlist فارغة
    │
    ▼ يعرض المنتجات + زر "View" + زر "Remove"
    │
    ▼ Remove → DELETE /api/wishlist/:id → fetchWishlist()
```

---

## 9. الفيتشر 7: مقارنة المنتجات

### إضافة للمقارنة:
**الملف:** `frontend/src/screens/HomeScreen.js`
```
ضغط زر المقارنة ⚖ على منتج (حد أقصى 4 منتجات)
    │
    ▼ handleCompareToggle(product)
    │
    ▼ إذا كان موجود → يحذفه من المصفوفة
    │  إذا كان غير موجود + العدد < 4 → يضيفه
    │  إذا العدد = 4 → alert "Maximum 4 products"
    │
    ▼ localStorage.setItem('compareProducts', JSON.stringify(updatedCompare))
    │   (لا يحتاج API — كل شيء في localStorage)
```

### صفحة المقارنة:
**الملف:** `frontend/src/screens/CompareScreen.js`
```
/compare
    │
    ▼ يقرأ localStorage['compareProducts']
    │
    ▼ CompareProducts component
    │   يعرض جدول: كل عمود = منتج، كل صف = خاصية
    │   (صورة، سعر، تقييم، ماركة، تصنيف، مخزون، وصف)
    │
    ▼ "Remove" → يحذف منتج واحد
    ▼ "Clear All" → localStorage.removeItem('compareProducts')
    │
    ▼ لو فارغ → رسالة "No products to compare" + زر "Start Shopping"
```

---

## 10. الفيتشر 8: البروفايل

**الملف:** `frontend/src/screens/ProfileScreen.js`
```
/profile  (يحتاج تسجيل دخول)
    │
    ▼ dispatch(getUserDetails('profile'))
    │   GET /api/users/profile  (Bearer TOKEN)
    │
    ▼ dispatch(listMyOrders())
    │   GET /api/orders/myorders  (Bearer TOKEN)
    │
    ▼ تخطيط عمودين:
    │   اليسار: نموذج تحديث (اسم + إيميل + باسورد)
    │   اليمين: جدول الطلبات (ID, تاريخ, إجمالي, مدفوع؟, موصّل؟, رابط)
    │
    ▼ تحديث البروفايل:
    │   dispatch(updateUserProfile({ id, name, email, password }))
    │   PUT /api/users/profile  (Bearer TOKEN)
    │   يرجع بيانات محدثة + token جديد
    │
    ▼ رابط طلب → /order/:id  (OrderScreen)
```

---

## 11. الفيتشر 9: لوحة تحكم الأدمن

### إدارة المنتجات:
```
Header → Admin Menu → Products
    │
    ▼ /admin/productlist  (ProductListScreen)
    │   dispatch(listProducts('', pageNumber))
    │   GET /api/products
    │
    ▼ "Create Product" → dispatch(createProduct())
    │   POST /api/products  (Bearer TOKEN + isAdmin)
    │   ينشئ منتج نموذجي → يفتح /admin/product/:id/edit
    │
    ▼ "Edit" → /admin/product/:id/edit  (ProductEditScreen)
    │   dispatch(listProductDetails(id))
    │   GET /api/products/:id
    │   ← نموذج تعديل (اسم، سعر، صورة، ماركة، تصنيف، مخزون، وصف)
    │
    ▼ رفع صورة:
    │   POST /api/upload  (FormData)
    │   Multer يحفظ في /uploads/
    │   يرجع المسار "/uploads/image-timestamp.jpg"
    │
    ▼ "Save" → dispatch(updateProduct(product))
    │   PUT /api/products/:id  (Bearer TOKEN + isAdmin)
    │   → يرجع لـ /admin/productlist
    │
    ▼ "Delete" → dispatch(deleteProduct(id))
    │   DELETE /api/products/:id  (Bearer TOKEN + isAdmin)
    │   الصفحة تتحدث تلقائياً (successDelete يعيد الـ useEffect)
```

### إدارة المستخدمين:
```
Header → Admin Menu → Users
    │
    ▼ /admin/userlist  (UserListScreen)
    │   GET /api/users  (Bearer TOKEN + isAdmin)
    │
    ▼ "Edit" → /admin/user/:id/edit  (UserEditScreen)
    │   GET /api/users/:id
    │   نموذج: اسم + إيميل + isAdmin (checkbox)
    │   PUT /api/users/:id → يرجع لـ /admin/userlist
    │
    ▼ "Delete" → DELETE /api/users/:id
```

### إدارة الطلبات:
```
Header → Admin Menu → Orders
    │
    ▼ /admin/orderlist  (OrderListScreen)
    │   GET /api/orders  (Bearer TOKEN + isAdmin)
    │   يعرض كل الطلبات: ID, مستخدم, تاريخ, إجمالي, مدفوع؟, موصّل؟
    │
    ▼ "Details" → /order/:id
    │   يعرض تفاصيل الطلب + زر "Mark as Delivered" للأدمن
    │   PUT /api/orders/:id/deliver → isDelivered=true
```

---

## 12. الفيتشر 10: المنتجات المعروضة مؤخراً

**المكون:** `frontend/src/components/RecentlyViewed.js`
```
المستخدم يفتح صفحة أي منتج (ProductScreen)
    │
    ▼ addToRecentlyViewed(product)
    │   يقرأ localStorage['recentlyViewed']
    │   يحذف المنتج لو موجود (تجنب تكرار)
    │   يضيفه في البداية
    │   يحتفظ بآخر 8 منتجات فقط
    │   localStorage.setItem('recentlyViewed', ...)
    │
    ▼ في HomeScreen → مكون RecentlyViewed
    │   يقرأ localStorage['recentlyViewed']
    │   يعرض آخر 4 منتجات تم رؤيتها
    │   كل منتج → رابط لـ /product/:id
    │
    ✅ لا يحتاج API — كل شيء في localStorage
```

---

## 13. الفيتشر 11: النشرة الإخبارية

**المكون:** `frontend/src/components/Newsletter.js`
```
في أسفل الصفحة الرئيسية
    │
    ▼ المستخدم يكتب إيميله ويضغط Subscribe
    │
    ▼ يتحقق: هل الإيميل اشترك مسبقاً؟
    │   يقرأ localStorage['newsletterSubscribers']
    │
    ▼ لو جديد → يضيفه في localStorage
    │
    ✅ لا يحتاج API — Frontend فقط (Client-side)
```

---

## 14. ربط Frontend بـ Backend

| الفيتشر | Frontend (Action/Screen) | HTTP Method | Backend Route | Controller Function |
|---------|--------------------------|-------------|---------------|---------------------|
| عرض المنتجات | `listProducts()` | GET | `/api/products` | `getProducts` |
| تفاصيل منتج | `listProductDetails(id)` | GET | `/api/products/:id` | `getProductById` |
| أعلى المنتجات | `listTopProducts()` | GET | `/api/products/top` | `getTopProducts` |
| التصنيفات | axios في FilterSidebar | GET | `/api/products/categories` | `getCategories` |
| الماركات | axios في FilterSidebar | GET | `/api/products/brands` | `getBrands` |
| إضافة مراجعة | `createProductReview()` | POST | `/api/products/:id/reviews` | `createProductReview` |
| تسجيل دخول | `login()` | POST | `/api/users/login` | `authUser` |
| تسجيل جديد | `register()` | POST | `/api/users` | `registerUser` |
| بروفايل | `getUserDetails()` | GET | `/api/users/profile` | `getUserProfile` |
| تحديث بروفايل | `updateUserProfile()` | PUT | `/api/users/profile` | `updateUserProfile` |
| إنشاء طلب | `createOrder()` | POST | `/api/orders` | `addOrderItems` |
| تفاصيل طلب | `getOrderDetails()` | GET | `/api/orders/:id` | `getOrderById` |
| طلباتي | `listMyOrders()` | GET | `/api/orders/myorders` | `getMyOrders` |
| الدفع | `payOrder()` | PUT | `/api/orders/:id/pay` | `updateOrderToPaid` |
| التوصيل | `deliverOrder()` | PUT | `/api/orders/:id/deliver` | `updateOrderToDelivered` |
| Wishlist | axios مباشر | GET/POST/DELETE | `/api/wishlist` | `getWishlist / addToWishlist / removeFromWishlist` |
| إعداد PayPal | axios في OrderScreen | GET | `/api/config/paypal` | مباشر في server.js |
| رفع صورة | axios في ProductEditScreen | POST | `/api/upload` | Multer handler |
| كل المستخدمين | `listUsers()` | GET | `/api/users` | `getUsers` |
| كل الطلبات | `listOrders()` | GET | `/api/orders` | `getOrders` |
| إنشاء منتج | `createProduct()` | POST | `/api/products` | `createProduct` |
| تحديث منتج | `updateProduct()` | PUT | `/api/products/:id` | `updateProduct` |
| حذف منتج | `deleteProduct()` | DELETE | `/api/products/:id` | `deleteProduct` |

---

## 15. حالات المستخدم

### الزائر (غير مسجل):
```
✅ يستطيع:
  - تصفح المنتجات والبحث والفلترة
  - عرض تفاصيل المنتجات
  - إضافة منتجات للسلة
  - مقارنة المنتجات
  - قراءة المراجعات
  - الاشتراك في النشرة الإخبارية

❌ لا يستطيع:
  - الشراء (يُحال لتسجيل الدخول)
  - إضافة للـ Wishlist (يُحال لتسجيل الدخول)
  - كتابة مراجعة (النموذج لا يظهر)
  - الوصول لـ /profile أو /wishlist (يُحال لـ /login)
```

### المستخدم المسجل:
```
✅ كل ما يفعله الزائر +
  - إتمام عملية الشراء الكاملة
  - الدفع بـ PayPal
  - إدارة قائمة الأمنيات
  - كتابة مراجعة (مراجعة واحدة فقط لكل منتج)
  - عرض وتعديل البروفايل
  - عرض سجل الطلبات الخاصة به

❌ لا يستطيع:
  - الوصول لأي صفحة /admin/* (يُحال لـ /login)
```

### الأدمن:
```
✅ كل ما يفعله المستخدم +
  - إنشاء/تعديل/حذف المنتجات
  - رفع صور المنتجات
  - عرض/تعديل/حذف المستخدمين
  - عرض كل الطلبات
  - تعليم الطلبات كـ "تم التوصيل"
```

---

## الملخص البصري الكامل

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER (دائم)                            │
│  Logo → /          SearchBox → /search/:kw                       │
│  Cart (شارة عدد) → /cart      Wishlist → /wishlist               │
│  Compare → /compare            Sign In → /login                  │
│  [مسجل] اسم المستخدم → Profile / Logout                         │
│  [أدمن] Admin Menu → Products / Users / Orders                   │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        [زائر]         [مستخدم مسجل]      [أدمن]
              │               │               │
    ┌─────────┘     ┌─────────┘     ┌─────────┘
    │               │               │
    ▼               ▼               ▼
  تصفح          تصفح + شراء    لوحة التحكم
  بحث           wishlist       إدارة المنتجات
  مقارنة        مراجعات        إدارة المستخدمين
  عرض سريع      بروفايل        إدارة الطلبات
              │
              ▼ مسار الشراء:
          /cart
             ↓
         /shipping
             ↓
          /payment
             ↓
         /placeorder
             ↓
          /order/:id  ← دفع PayPal هنا
```

---

*كل الملفات المذكورة موجودة ومنفذة بالكامل في المشروع.*
