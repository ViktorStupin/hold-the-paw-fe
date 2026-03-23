# Pet Adoption Platform

A responsive web application for publishing, managing, and discovering pet profiles for adoption or help.

## Overview

Pet Adoption Platform is a frontend web application that helps shelters, companies, and individual users create pet profiles, manage their own listings, and help people find animals through search and filters.

The app includes authentication, personal account management, pet profile creation, editing flows, and a public catalog with detailed pet pages.

## Features

- User registration and login
- Role-based accounts: Individual or Company / Shelter
- Personal profile management
- Change email and password
- Create, edit, deactivate, and delete pet profiles
- Multi-step pet creation form
- Pet catalog with search, filters, and sorting
- Favorites functionality
- Responsive layout for mobile and desktop
- Protected actions for authorized users only

## Tech Stack

- React
- TypeScript
- React Router
- React Hook Form
- Zod
- shadcn
- Tailwind CSS / SCSS
- Axios or Fetch API
- JWT Authentication

## Pages

- Home / Catalog
- Login / Registration modal
- User Profile
- My Pets
- Create Pet Profile
- Edit Pet Profile
- Pet Details
- Favorites

## Main Functionality

### Authentication

Users can sign up and log in through modal windows. The system supports access and refresh token flow, password recovery, and protected access to private pages and actions.

### User Profile

Authorized users can manage their personal information depending on their role. They can also update contact data, email, and password.

### Pet Management

Users can create pet profiles through a multi-step form, upload photos, edit existing profiles, deactivate them, or mark them as helped.

### Catalog

The platform provides a public pet catalog with search, filtering, sorting, and navigation to detailed pet pages.

## Responsive Design

The application is fully responsive and optimized for both desktop and mobile devices. It includes a sticky header and mobile tab bar navigation.

