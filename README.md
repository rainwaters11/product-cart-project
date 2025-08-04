# Frontend Mentor - Product List with Cart Solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d), built as part of the **Lisk Summer Bootcamp** in collaboration with **Dev3Pak**. It features a dynamic product list, a fully functional shopping cart, interactive product cards, advanced search and filtering capabilities, and a suite of professional animations to enhance the user experience.

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [Key Features & Enhancements](#key-features--enhancements)
  - [Future Improvements](#future-improvements)
- [How to Deploy](#how-to-deploy)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## Overview

### The Challenge

Users should be able to:
- Add items to the cart and remove them.
- Increase/decrease the number of items in the cart.
- See an order confirmation modal when they click "Confirm Order."
- Reset their selections when they click "Start New Order."
- **Enhancement**: Filter products by category with dynamic filter buttons.
- **Enhancement**: Search products by name or category in real-time.
- **Enhancement**: Interact with quantity controls directly on product cards.
- **Enhancement**: Experience persistent cart storage across sessions.
- View the optimal layout for the interface depending on their device's screen size.
- See hover and focus states for all interactive elements on the page.

### Screenshot

![Product List with Cart Homepage](./Dessert_cart.png)
*Main interface showing the enhanced product list with search, filters, and interactive cart*

![Adding Items to Cart](./dessert_addcart.png)
*Interactive product cards with quantity selectors and real-time cart updates*

![Order Confirmation](./checkout-dessert.png)
*Order confirmation modal with complete order summary*

### Links

- **Solution URL:** [Link to your GitHub repository]
- **Live Site URL:** [Link to your live site]

---

## My Process

### Built With

- Semantic HTML5 markup with accessibility considerations
- CSS custom properties, Keyframe Animations, Flexbox, and Grid
- **Vanilla JavaScript ES6+** for all dynamic functionality
- **JSON** for product data management
- **localStorage API** for cart persistence
- Mobile-first responsive design workflow
- Modern CSS features (aspect-ratio, CSS custom properties, advanced selectors)

### ✨ Key Features & Enhancements

This project was significantly enhanced beyond the original requirements with a focus on creating a polished, modern, and feature-rich e-commerce experience.

#### 🛒 Interactive Product Cards

- **Dynamic Button Transformation**: "Add to Cart" buttons transform into quantity selectors after first item addition
- **Direct Quantity Management**: Users can adjust quantities directly on product cards without navigating to cart
- **Smart State Management**: Quantity selectors automatically appear/disappear based on cart contents
- **Seamless Integration**: All changes sync instantly between product cards and cart sidebar

#### 🔍 Advanced Search & Filtering

- **Real-time Search**: Live search functionality across product names and categories
- **Dynamic Category Filters**: Auto-generated filter buttons from product data
- **Smart Result Display**: Clear feedback showing filtered results count
- **Combined Filtering**: Search and category filters work together seamlessly
- **Clear Search**: One-click search clearing with visual feedback

#### 💾 Cart Persistence & State Management

- **localStorage Integration**: Cart contents persist across browser sessions
- **Automatic State Restoration**: Product cards restore quantity selectors on page reload
- **Smart Data Synchronization**: All UI elements stay in sync with cart data
- **Session Recovery**: Users never lose their cart contents

#### ✨ Advanced Animations & Visual Feedback

- **`fadeInSlide`**: New cart items elegantly slide in from above with subtle scale effects
- **`fadeOutSlide`**: Removed items smoothly slide out with fade transition
- **`bounceIn`**: Cart total bounces when updated for clear visual feedback
- **`gentlePulse`**: Confirm Order button pulses with subtle glow when cart has items
- **Micro-interactions**: Button scaling, hover effects, and loading states throughout

#### 🎨 Enhanced UI/UX Design

- **Prominent Call-to-Action**: Confirm Order button features glowing animation and enhanced styling
- **Responsive Image Handling**: Optimized images for desktop, tablet, and mobile using `<picture>` elements
- **Touch-Friendly Design**: Minimum 44px touch targets for mobile accessibility
- **Visual Hierarchy**: Clear typography scaling and spacing system
- **Error Handling**: Graceful fallbacks for network issues and missing data

#### 🚀 Performance & Accessibility

- **Optimized DOM Manipulation**: Efficient updates with minimal reflows
- **Keyboard Navigation**: Full keyboard support with escape key handling
- **Screen Reader Support**: Proper ARIA labels and semantic markup
- **Loading States**: Visual feedback during data fetching
- **Error Boundaries**: Graceful error handling with user feedback

#### 🔧 Technical Improvements

- **Modular JavaScript**: Well-organized functions with single responsibilities
- **Event Delegation**: Efficient event handling for dynamic content
- **Smart Animation Timing**: Coordinated animations that don't interfere with user interactions
- **CSS Custom Properties**: Maintainable theming system with consistent spacing and colors
- **Mobile-First Responsive**: Optimized for all screen sizes with breakpoints at 768px and 480px

### Future Improvements

- **Unit Testing**: Implement Jest test suite for cart functionality and state management
- **Progressive Web App**: Add service worker for offline functionality
- **Advanced Filtering**: Price ranges, dietary restrictions, and sorting options
- **User Accounts**: Login system with saved preferences and order history
- **Accessibility Audit**: Full WCAG 2.1 compliance testing and improvements
- **Performance Optimization**: Image lazy loading and code splitting

---

## How to Deploy

This project can be deployed using any static hosting service. Here are instructions for **Vercel**:

1. Push your code to a new GitHub repository
2. Sign up for a free account on [Vercel](https://vercel.com)
3. Click "Add New..." > "Project" and connect your GitHub account
4. Import the repository you created. Vercel will automatically detect it's a static site
5. Click **"Deploy"**. Your site will be live in seconds!

### Local Development

To run locally:
```bash
# Clone the repository
git clone [your-repo-url]
cd product-list-with-cart

# Start a local server (Python 3)
python -m http.server 8000

# Or use Node.js
npx serve .

# Open http://localhost:8000 in your browser
```

---

## Author

- **Misty Waters**
- Frontend Mentor - [@rainwaters11](https://www.frontendmentor.io/profile/rainwaters11)
- GitHub - [@rainwaters11](https://github.com/yourusername)

## Acknowledgments

A special thank you to the organizers and mentors of the **Lisk Summer Bootcamp** and **Dev3Pak** for making this learning opportunity possible. This project demonstrates the power of vanilla JavaScript and modern CSS in creating sophisticated web applications without external frameworks.

## Where to find everything

Your task is to build out the project to the designs inside the `/design` folder. You will find both a mobile and a desktop version of the design. 

The designs are in JPG static format. Using JPGs will mean that you'll need to use your best judgment for styles such as `font-size`, `padding` and `margin`. 

If you would like the Figma design file to gain experience using professional tools and build more accurate projects faster, you can [subscribe as a PRO member](https://www.frontendmentor.io/pro).

All the required assets for this project are in the `/assets` folder. The images are already exported for the correct screen size and optimized.

We also include variable and static font files for the required fonts for this project. You can choose to either link to Google Fonts or use the local font files to host the fonts yourself. Note that we've removed the static font files for the font weights that aren't needed for this project.

There is also a `style-guide.md` file containing the information you'll need, such as color palette and fonts.

## Building your project

Feel free to use any workflow that you feel comfortable with. Below is a suggested process, but do not feel like you need to follow these steps:

1. Initialize your project as a public repository on [GitHub](https://github.com/). Creating a repo will make it easier to share your code with the community if you need help. If you're not sure how to do this, [have a read-through of this Try Git resource](https://try.github.io/).
2. Configure your repository to publish your code to a web address. This will also be useful if you need some help during a challenge as you can share the URL for your project with your repo URL. There are a number of ways to do this, and we provide some recommendations below.
3. Look through the designs to start planning out how you'll tackle the project. This step is crucial to help you think ahead for CSS classes to create reusable styles.
4. Before adding any styles, structure your content with HTML. Writing your HTML first can help focus your attention on creating well-structured content.
5. Write out the base styles for your project, including general content styles, such as `font-family` and `font-size`.
6. Start adding styles to the top of the page and work down. Only move on to the next section once you're happy you've completed the area you're working on.

## Deploying your project

As mentioned above, there are many ways to host your project for free. Our recommend hosts are:

- [GitHub Pages](https://pages.github.com/)
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

You can host your site using one of these solutions or any of our other trusted providers. [Read more about our recommended and trusted hosts](https://medium.com/frontend-mentor/frontend-mentor-trusted-hosting-providers-bf000dfebe).

## Create a custom `README.md`

We strongly recommend overwriting this `README.md` with a custom one. We've provided a template inside the [`README-template.md`](./README-template.md) file in this starter code.

The template provides a guide for what to add. A custom `README` will help you explain your project and reflect on your learnings. Please feel free to edit our template as much as you like.

Once you've added your information to the template, delete this file and rename the `README-template.md` file to `README.md`. That will make it show up as your repository's README file.

## Submitting your solution

Submit your solution on the platform for the rest of the community to see. Follow our ["Complete guide to submitting solutions"](https://medium.com/frontend-mentor/a-complete-guide-to-submitting-solutions-on-frontend-mentor-ac6384162248) for tips on how to do this.

Remember, if you're looking for feedback on your solution, be sure to ask questions when submitting it. The more specific and detailed you are with your questions, the higher the chance you'll get valuable feedback from the community.

## Sharing your solution

There are multiple places you can share your solution:

1. Share your solution page in the **#finished-projects** channel of our [community](https://www.frontendmentor.io/community). 
2. Tweet [@frontendmentor](https://twitter.com/frontendmentor) and mention **@frontendmentor**, including the repo and live URLs in the tweet. We'd love to take a look at what you've built and help share it around.
3. Share your solution on other social channels like LinkedIn.
4. Blog about your experience building your project. Writing about your workflow, technical choices, and talking through your code is a brilliant way to reinforce what you've learned. Great platforms to write on are [dev.to](https://dev.to/), [Hashnode](https://hashnode.com/), and [CodeNewbie](https://community.codenewbie.org/).

We provide templates to help you share your solution once you've submitted it on the platform. Please do edit them and include specific questions when you're looking for feedback. 

The more specific you are with your questions the more likely it is that another member of the community will give you feedback.

## Got feedback for us?

We love receiving feedback! We're always looking to improve our challenges and our platform. So if you have anything you'd like to mention, please email hi[at]frontendmentor[dot]io.

This challenge is completely free. Please share it with anyone who will find it useful for practice.

**Have fun building!** 🚀
