🐾 Pet Adoption Platform

A modern, responsive web application for discovering, managing, and publishing pet adoption profiles.

🚀 About the Project

Pet Adoption Platform is a frontend-focused application designed to simplify the process of finding and managing pets for adoption.

It allows individual users and shelters to create and manage pet listings, while providing a clean and intuitive interface for browsing, filtering, and saving pets.

This project demonstrates real-world frontend architecture including authentication flows, form handling, protected routes, and responsive UI design.

✨ Key Features

🔐 Authentication & Security

User registration and login
JWT-based authentication
Protected routes and actions

👤 User Management

Role-based accounts (Individual / Shelter)
Profile editing
Change email & password

🐶 Pet Management

Create, edit, deactivate, and delete pet profiles
Multi-step form with validation
Image upload support

🔎 Discovery & Interaction

Public pet catalog
Search, filters, and sorting
Detailed pet pages
Favorites system

📱 Responsive Design

Fully optimized for mobile and desktop
Sticky header + mobile navigation
🛠 Tech Stack

Frontend:

⚛️ React
🟦 TypeScript
🧭 React Router
🧾 React Hook Form + Zod
🎨 Tailwind CSS / SCSS
🧩 shadcn/ui

Other:

🌐 Axios / Fetch API
🔑 JWT Authentication
🧱 Project Structure
src/
  components/   # reusable UI components
  pages/        # route-based pages
  hooks/        # custom React hooks
  api/          # API logic
  utils/        # helper functions
⚙️ Getting Started
📦 Installation
npm install
▶️ Run locally
npm run dev
🏗 Build project
npm run build
npm run preview
🧪 Available Scripts
npm run dev
npm run build
npm run preview
npm run lint
npm run lint:check
🔗 Backend

This project is frontend-only and requires a separate backend.

🔌 Expected API:

http://127.0.0.1:8001
/api
/media
Backend запуск

Without Docker:

pip install -r requirements.txt
python manage.py runserver

With Docker:

docker-compose up --build
🌍 Environment Variables

Frontend:

Uses default Vite config
import.meta.env.BASE_URL

Backend:

.env file required
Example: .env.sample
🎯 What This Project Demonstrates
Clean component-based architecture
Scalable folder structure
Advanced form handling (React Hook Form + Zod)
Authentication & protected routes
API integration patterns
Responsive UI/UX thinking
📈 Future Improvements
🔔 Notifications system
🧠 Smarter filtering & recommendations
🛠 Admin dashboard
🌍 Deployment & CI/CD
🤝 Contributing

Feel free to fork the project and submit pull requests 🙌

👨‍💻 Team

Frontend Developers
GitHub: https://github.com/ViktorStupin
https://www.linkedin.com/in/artem-yakhno-2b9305258

Backend Developer
GitHub: https://github.com/toomuchtearz

QA Engineer
https://www.linkedin.com/in/olena-ryhun-qa-mateacademy?utm_source=share_via&utm_content=profile&utm_medium=member_ios
