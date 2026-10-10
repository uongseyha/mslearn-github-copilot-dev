# Product Requirements Document: Fruit Basket Prototype

## 1. Product Summary

**Product:** Fruit Basket Prototype  
**Purpose:** Demonstrate a simple online storefront where shoppers can browse fruit, manage a shopping cart, and simulate placing an order.  
**Target audience:** Online shoppers interested in ordering fruit.  
**Goals:** Provide a working client-side prototype of the basic shopping flow across the Products, ProductDetails, ShoppingCart, and Checkout pages.

## 2. Problem and Assumptions

The prototype demonstrates the core interactions of an online fruit store without connecting to real services.

- All product and cart data is handled in the browser.
- There are no user accounts, payment processing, backend services, or database.
- Product prices and descriptions are sample data for demonstration.
- **Process Order** simulates an order; it does not submit payment or contact a service.
- Cart contents persist while navigating between pages, but may reset when the app is reloaded.

## 3. Scope

### In Scope

- Four pages: Products, ProductDetails, ShoppingCart, and Checkout.
- A left-side navigation menu.
- A sample dataset of 10 fruit products.
- Product quantity selection, cart updates, product removal, and order simulation.
- Basic styling and layouts that adapt for desktop and phone screens.

### Out of Scope

- Authentication, real payment processing, databases, and backend APIs.
- Inventory management, shipping, and order history.
- A fully polished production design.

## 4. Primary User and Use Cases

**Primary user:** A shopper browsing fruit and preparing a sample order.

1. Browse the product list, choose a quantity, and add a product to the cart.
2. Select a product to view its details, then return to Products.
3. View the cart, update quantities, or remove products.
4. Review the checkout summary and process a simulated order.

## 5. Pages and Navigation

A left-side navigation menu provides access to all four pages. Navigation changes the visible page without losing the current cart during the session.

- **Products:** Show all products with emoji, name, price per unit, quantity input, an Add to Cart action, and a way to open ProductDetails.
- **ProductDetails:** Show the selected product's emoji, name, description, and price per unit. Provide a way to return to Products. If no product is selected, direct the shopper to Products.
- **ShoppingCart:** Show each cart item's name, quantity, and line total. Allow quantity changes and item removal. Provide ways to continue shopping or proceed to Checkout.
- **Checkout:** Show each item's name, quantity, and price, plus the order total and a **Process Order** button. When processed, show an order confirmation; do not request or process payment.
- **Responsive navigation:** When the viewport is narrower than 300 pixels, collapse the left navigation to one- or two-letter page abbreviations. Each abbreviation must remain a usable navigation control.

## 6. Functional Requirements and Acceptance Criteria

- The Products page displays all 10 products and their unit prices.
- A shopper can select a positive whole-number quantity and add that quantity to the cart.
- Selecting a product opens its details.
- The cart displays the correct quantity and line total for each item.
- A shopper can change an item's quantity or remove it. Setting a quantity to zero or entering an invalid value must not create an invalid cart item.
- The checkout summary reflects the current cart. The order total equals the sum of all line totals.
- Processing a non-empty cart displays a confirmation and clears the cart.
- Processing an empty cart is prevented; the page indicates that the cart has no items.
- Navigation works between all four pages, and the cart remains available while navigating.
- At widths below 300 pixels, the navigation displays abbreviated labels and remains usable.

## 7. Sample Product Dataset

Use USD for sample prices. The unit indicates how each product is priced.

| Product | Description | Price per unit | Emoji |
|---|---|---:|:---:|
| Apples | Crisp, sweet apples for snacking. | $1.99 per pound | 🍎 |
| Bananas | Ripe bananas with a naturally sweet flavor. | $0.59 per pound | 🍌 |
| Oranges | Juicy oranges with a bright citrus flavor. | $1.49 per pound | 🍊 |
| Strawberries | Sweet strawberries, sold by the container. | $3.99 per container | 🍓 |
| Grapes | Seedless grapes, sold by the bunch. | $2.99 per bunch | 🍇 |
| Watermelon | Refreshing seedless watermelon, sold individually. | $5.99 each | 🍉 |
| Pineapple | Whole ripe pineapple, sold individually. | $3.49 each | 🍍 |
| Mangoes | Sweet mangoes, sold individually. | $1.25 each | 🥭 |
| Lemons | Fresh lemons for cooking or drinks. | $0.79 each | 🍋 |
| Peaches | Juicy peaches, sold by the pound. | $2.49 per pound | 🍑 |

## 8. Technical Requirements

- Build a static client-side web app using HTML, CSS, and JavaScript.
- Do not use a frontend framework, backend, database, or external service.
- Keep the product dataset in client-side code.
- Maintain cart state while the user navigates between pages; persistence after reload is not required.
- Use emoji as the product images.
- The app should be straightforward to run as a static web app in a modern browser.

## 9. UI and Quality Requirements

- Use basic, visually appealing styling with readable product, cart, and checkout information.
- Adapt the layout so the app remains usable on desktop and phone screens; a fully polished responsive design is not required.
- Keep the left navigation on the left when space permits and collapse it to abbreviated labels below 300 pixels.
- Make navigation and actions usable with mouse, touch, and keyboard.

## 10. Definition of Done

The prototype is complete when a shopper can browse the sample fruit products, view product details, add and manage cart items, see an accurate checkout total, and process a simulated order. Navigation must be available across all four pages, and the app must remain usable on desktop and phone screens, including the specified abbreviated navigation below 300 pixels.

