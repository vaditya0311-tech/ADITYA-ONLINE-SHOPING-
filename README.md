# ADITYA ONLINE SWEET SHOPING WESITE 
🍬 SugarCrafter: Local Sweet Shop Online Delivery Prototype
# Sugar & Crumb – Online Sweet Shop

A responsive frontend e-commerce website for a neighborhood bakery, built using HTML, CSS, and vanilla JavaScript. Customers can explore bakery products, filter categories, add products to a shopping basket, manage quantities, save their profile details locally, and enter delivery information.

---

## 1. Project Overview

**Sugar & Crumb** is an online sweet shop storefront designed to provide customers with a simple and attractive shopping experience.

The website displays cakes, pastries, cookies, and other bakery treats. Customers can browse the menu, add products to their basket, update quantities, and provide delivery details through the checkout interface.

The project focuses on frontend development, DOM manipulation, browser storage, responsive web design, and browser geolocation.

## 2. Problem Statement

Traditional local sweet shops may depend on customers visiting the store or contacting the shop directly to explore available products.

This project demonstrates how a local bakery can present its products through an online storefront, allowing customers to browse a digital menu, calculate their basket subtotal, and enter delivery details through a web interface.

## 3. Project Objectives

- Develop a responsive online sweet shop interface.
- Display bakery products with prices and descriptions.
- Implement product category filtering.
- Provide interactive shopping basket functionality.
- Allow customers to increase, decrease, and remove basket items.
- Store basket and profile information using browser local storage.
- Demonstrate delivery-location detection using browser geolocation.
- Display a delivery map using OpenStreetMap.
- Create a simple checkout demonstration.

## 4. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure and content |
| CSS3 | Styling, layout, animations, and responsiveness |
| JavaScript | Application logic and interactive functionality |
| DOM API | Dynamic product and basket rendering |
| Local Storage API | Saving basket and profile information |
| Geolocation API | Retrieving the customer's current coordinates |
| OpenStreetMap | Displaying the delivery location on a map |
| Google Fonts | DM Sans and Playfair Display typography |

No frontend framework or backend framework is used in the current implementation.

## 5. Project Structure

The HTML file references the CSS and JavaScript files using the paths `css/style.css` and `js/main.js`.

Organize the project as follows:

```text
sugar-and-crumb/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── main.js
│
└── README.md
```

## 6. Website Modules

### 6.1 Home Page

The home page introduces the Sugar & Crumb bakery.

It includes:
- Bakery branding and navigation.
- Hero section with promotional content.
- Product-shopping navigation.
- Bakery highlights and service promises.
- Responsive navigation menu.

### 6.2 Product Catalog

The product catalog is generated dynamically using JavaScript.

The current product data contains eight products:

| Product | Category | Price |
|---|---|---:|
| Berry cloud cake | Cakes | ₹520 |
| Midnight chocolate cake | Cakes | ₹580 |
| Butter croissant | Pastries | ₹120 |
| Strawberry tart | Pastries | ₹190 |
| Choc chip cookies | Cookies | ₹160 |
| Vanilla buttercream cupcake | Cakes | ₹150 |
| Cinnamon morning roll | Pastries | ₹180 |
| Pastel macarons | Cookies | ₹280 |

Product information is maintained in a JavaScript array containing product IDs, categories, names, descriptions, prices, badges, and display properties.

### 6.3 Category Filtering

Customers can filter the product catalog using category buttons:

- Everything
- Cakes
- Pastries
- Cookies & more

The `renderProducts()` function filters the product array and dynamically updates the product grid.

### 6.4 Shopping Basket

The basket allows customers to manage selected products.

Implemented functionality:
- Add products to the basket.
- Increase product quantity.
- Decrease product quantity.
- Remove products completely.
- Display the total number of selected items.
- Calculate the basket subtotal.
- Display an empty-basket message when no products are selected.

The `renderCart()` function updates the basket interface and calculates the subtotal using product prices and quantities.

### 6.5 Profile and Sign-In Demonstration

The website provides a sign-in dialog where customers can enter:

- Email address
- Delivery address

The profile is stored in browser local storage using the key `sugarCrumbProfile`.

This is a local demonstration, not an authenticated account system. There is no password verification or server-side user authentication.

### 6.6 Delivery Location

The website uses the browser Geolocation API to request the customer's current coordinates.

The `requestLocation()` function:
1. Checks whether geolocation is supported.
2. Requests the customer's current location.
3. Handles permission denial and location errors.
4. Stores latitude and longitude in JavaScript.
5. Updates the delivery map when location is available.

OpenStreetMap is embedded through an iframe to display the selected coordinates.

Customers must still enter their complete delivery address.

### 6.7 Checkout Demonstration

The checkout interface collects:

- Customer name
- Email address
- Full delivery address

HTML form validation checks required fields and email format.

When the checkout form is submitted:
1. The form is validated.
2. The application checks whether the basket contains products.
3. Customer profile information is updated when necessary.
4. A confirmation message is displayed.
5. The basket is cleared.

**Important:** The current checkout does not transmit an order to a bakery, create a server-side order record, or process a payment. It is a frontend demonstration.

## 7. JavaScript Architecture

The application uses vanilla JavaScript and a function-based structure.

| Function / Component | Responsibility |
|---|---|
| `products` | Stores the bakery product catalog |
| `money()` | Formats amounts in Indian Rupees |
| `saveCart()` | Saves basket data in local storage |
| `renderProducts()` | Displays products and applies category filters |
| `renderCart()` | Displays basket items and calculates subtotal |
| `setProfile()` | Updates and saves customer profile information |
| `updateMap()` | Creates an OpenStreetMap iframe |
| `requestLocation()` | Requests browser geolocation |
| `openLogin()` | Opens the sign-in dialog |
| `init()` | Initializes the website and registers event listeners |

The application initializes after the browser fires the `DOMContentLoaded` event.

Event delegation is used for product and basket interactions, allowing dynamically generated buttons to be handled by their parent containers.

## 8. Data Storage

The project uses the browser's Local Storage API.

| Storage Key | Stored Information |
|---|---|
| `sugarCrumbCart` | Selected products and their quantities |
| `sugarCrumbProfile` | Customer email and delivery address |

Local storage allows these values to remain available when the customer refreshes the page in the same browser.

The current project does not use a database or server-side data storage.

## 9. Responsive Web Design

The CSS uses responsive layouts and media queries to support different screen sizes.

Implemented techniques include:
- CSS Grid for product and page layouts.
- Flexbox for navigation and component alignment.
- Responsive product grids.
- Mobile navigation menu.
- Responsive typography.
- Hover transitions.
- Reduced-motion accessibility support.

The stylesheet includes responsive breakpoints at 900px and 680px.

## 10. Website Workflow

```text
Customer opens website
        |
        v
Browse bakery products
        |
        v
Filter products by category
        |
        v
Add products to basket
        |
        v
Update product quantities
        |
        v
Calculate basket subtotal
        |
        v
Enter delivery details
        |
        v
Optional: Share current location
        |
        v
Validate checkout form
        |
        v
Display demo confirmation
        |
        v
Clear basket
```

## 11. Installation and Execution

### Prerequisites

- A modern web browser.
- A code editor such as Visual Studio Code.
- Visual Studio Code Live Server extension (recommended).

### Step 1: Create the project folders

Create the following structure:

```text
sugar-and-crumb/
├── index.html
├── css/
│   └── style.css
└── js/
    └── main.js
```

### Step 2: Place the source files

- Put `index.html` in the main project folder.
- Put `style.css` inside the `css` folder.
- Put `main.js` inside the `js` folder.

### Step 3: Run the website

Open the project in Visual Studio Code.

Right-click `index.html` and select **Open with Live Server**.

The website will open in your default browser.

Alternatively, open `index.html` directly in a browser to explore the basic storefront. A local development server is recommended for browser features such as geolocation.

## 12. Current Features and Limitations

### Implemented Features

- Responsive bakery storefront.
- Dynamic product catalog.
- Product category filtering.
- Add-to-basket functionality.
- Basket quantity management.
- Subtotal calculation.
- Browser-based profile storage.
- Browser-based basket persistence.
- Geolocation request and error handling.
- OpenStreetMap location display.
- Checkout form validation.
- Mobile navigation menu.

### Current Limitations

- No backend server.
- No database integration.
- No real user authentication.
- No online payment integration.
- No actual order submission to a bakery.
- No order tracking system.
- No inventory management.
- No server-side customer or order records.

## 13. Future Enhancements

The following features could be added to turn the demonstration into a complete e-commerce application:

1. **Backend integration:** Develop a backend using Node.js and Express.
2. **Database:** Store customer accounts, products, and orders using MongoDB or MySQL.
3. **Authentication:** Implement secure registration and login.
4. **Payment gateway:** Integrate a payment provider for online transactions.
5. **Order management:** Save orders and provide order IDs.
6. **Order tracking:** Allow customers to check order status.
7. **Admin dashboard:** Allow bakery staff to manage products, prices, and orders.
8. **Inventory management:** Track product availability.
9. **Delivery management:** Add delivery status and order assignment.
10. **Security:** Add server-side validation and secure handling of customer information.

## 14. Conclusion

Sugar & Crumb demonstrates the frontend development of a local bakery e-commerce storefront using HTML5, CSS3, and vanilla JavaScript.

The project combines responsive user interface design, dynamic DOM rendering, product filtering, shopping basket management, local storage, browser geolocation, and a checkout demonstration.

It provides a foundation for developing a complete online sweet shop application by adding backend services, database integration, authentication, payment processing, and order management in future versions.

---

**Project Name:** Sugar & Crumb – Online Sweet Shop  
**Project Type:** Frontend Web Development  
**Languages:** HTML, CSS, JavaScript  
**Architecture:** Client-side web application  
**Current Status:** Frontend demonstration
