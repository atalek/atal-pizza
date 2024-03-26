# ATAL-Pizza

![Landing page](https://res.cloudinary.com/dkofkuquf/image/upload/v1705712862/nuxtshop/enyeltcq2s1w3j5trr1r.png)

## Description

This project demonstrates a full-stack food ordering application built with
modern web technologies. It features a user-friendly interface, secure
authentication, seamless payment processing, and image storage capabilities.

## Features

- Full featured shopping cart
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Checkout process (shipping, payment method)
- Stripe payment integration

## Built with

- Nuxt 3
- MongoDB
- Tailwind
- Sidebase nuxt-auth
- AWS S3
- Stripe

![Shopping cart page](https://res.cloudinary.com/dkofkuquf/image/upload/v1705713025/nuxtshop/kcng6aua8u7vytakwfow.png)
![Create a menu item page](https://res.cloudinary.com/dkofkuquf/image/upload/v1705712874/nuxtshop/x6qaumyt841vswd9yphd.png)

## Setup

1. **Clone the repository.**

   ```bash
   git clone https://github.com/atalek/atal-pizza.git

   ```

2. **Navigate to the project directory.**

   ```bash
   cd atal-pizza

   ```

3. **Install dependencies.**

   ```bash
   bun install

   ```

4. **Configure environment variables.**

   - Create a `.env` file in the root of the project.
   - Add the necessary environment variables.

   ```env
   # Mongodb
   MONGODB_URI=your_mongodb_db_uri

   # Nuxt auth
   AUTH_SECRET=your_auth_secret
   AUTH_ORIGIN=url_of_your_site
   API_ROUTE_SECRET=your_api_route_secret

   # AWS S3
   AWS_SECRET_KEY_ID=your_aws_secret_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_URL=your_s3bucket_url

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET_KEY=your_google_client_secret

   # Stripe
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   NODEENV = "development"
   ```

5. **Run the development server.**

   ```bash
   bun dev

   ```

6. **Open your browser and visit http://localhost:3000 to view the Pizza
   webapp.**

## Live Version

[https://atal-pizza.atalek.com/](https://atal-pizza.atalek.com/)

## Author

Github [@atalek](https://github.com/atalek) <br> Linkedin:
[@Aleksandar Atanasovski](https://www.linkedin.com/in/aleksandar-atanasovski-16b123263/)
<br> Portfolio: [https://www.atalek.com/](https://www.atalek.com/)
