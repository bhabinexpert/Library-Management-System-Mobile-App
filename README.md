---

# 📚 Library Management System – Mobile App

<p align="center">  
  <img width="300" alt="App Landing Page" src="https://github.com/user-attachments/assets/19bdfef1-aea8-4538-a770-d4d4e9b3ba63" />  
</p>  

---

## 🚀 Overview

The **Library Management System Mobile App** is a cross-platform mobile application developed as part of a **Summer Enrichment Class Project**.

This project was created to **apply classroom learning to a real-world scenario**. While it is **not intended for production use**, it demonstrates how a library’s day-to-day operations can be digitized using modern mobile app development frameworks.

The app showcases:

* Application of **React Native & Expo** for cross-platform development
* Integration with **MongoDB Atlas** for database handling
* Use of **TailwindCSS (NativeWind)** for responsive and modern UI design
* Practical implementation of **library workflows** like book management, borrowing, and returning

⚠️ **Disclaimer**: This project is for **educational purposes only** and may not cover all security, scalability, and reliability considerations required in production systems.

---

## ✨ Key Features

* 📖 **Book Management** – Add, update, search, and remove books
* 👩‍🎓 **User Management** – Manage library users (students, staff, admins)
* 🔄 **Borrow & Return System** – Issue and return books with proper tracking
* 🔍 **Search & Filter** – Quickly search by title, author, or category
* 🎨 **Modern UI** – Styled with TailwindCSS, responsive across devices
* 🌍 **Cross-Platform Support** – Works on Android, iOS, and Web

---

## 🛠️ Tech Stack

* **Frontend:** React Native (Expo)
* **Styling:** TailwindCSS (NativeWind)
* **Database:** MongoDB / MongoDB Atlas
* **Navigation:** React Navigation
* **Backend APIs:** Custom Node.js/Express (demo integration)
* **Other Libraries:**

  * `react-native-paper` → UI components
  * `axios` → API communication
  * `react-native-async-storage` → Local storage
  * `react-native-webview` → Web view support

---

## 📂 Project Structure

```
Library-Management-System-Mobile-App/
│── backend/                  # Backend API (Node.js/Express + MongoDB)
│
├── LMS/                      # React Native (Expo) app
│   ├── app/                  # Expo Router source folder
│   │   ├── (panels)/         # Role-based panels
│   │   │   ├── admin.jsx     # Admin dashboard
│   │   │   └── user.jsx      # User dashboard
│   │   │
│   │   ├── (tabs)/           # Tab navigation
│   │   │   ├── index.jsx     # Root tab
│   │   │   └── landing.jsx   # Landing page
│   │   │
│   │   ├── auth/             # Authentication screens
│   │   │   ├── login.jsx
│   │   │   ├── signup.jsx
│   │   │   └── protectedRoute.jsx
│   │   │
│   │   └── _layout.jsx       # Root layout (global navigation wrapper)
│   │
│   ├── assets/               # Static assets (images, icons)
│   │   └── images/
│   │       ├── hero.png
│   │       └── logo.png
│   │
│   ├── constants/            # App constants
│   │   └── image.js
│   │
│   ├── node_modules/         # Dependencies
│   │
│   ├── app.json              # Expo app config
│   ├── babel.config.js       # Babel config
│   ├── eslint.config.js      # Linting rules
│   ├── expo-env.d.ts         # Expo env types
│   ├── global.css            # Tailwind base styles
│   ├── metro.config.js       # Metro bundler config
│   ├── nativewind-env.d.ts   # NativeWind typings
│   ├── package.json          # Dependencies & scripts
│   └── package-lock.json

```

---

## ⚡ Installation & Setup

### 1️⃣ Prerequisites

* [Node.js](https://nodejs.org/) (>= 16.x)
* [Expo CLI](https://docs.expo.dev/get-started/installation/)
* Android Studio / Xcode (for emulators)

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/bhabinexpert/Library-Management-System-Mobile-App.git
cd Library-Management-System-Mobile-App
```

### 3️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 4️⃣ Run the App

```bash
# Start Expo
npm start
# Run on Android
npm run android
# Run on iOS
npm run ios
# Run on Web
npm run web
```

---

## 🔑 Environment Setup

If using APIs, create a `.env` file at the root:

```env
API_KEY=your_api_key
MONGO_URI=your_mongodb_connection_string
```

---

## 📸 Screenshots

<p align="center">  
  <img width="260" height="480" src="https://github.com/user-attachments/assets/8c3d7735-bd05-4546-bec8-21932357f26f" alt="Login Screen"/>  
  <img width="260" height="480" src="https://github.com/user-attachments/assets/58e80b41-3341-4b98-ad24-301d24ca3565" alt="Dashboard Screen"/>  
  <img width="260" height="480" src="https://github.com/user-attachments/assets/ee52e5c3-64f0-4852-849a-0397eecb03eb" alt="Book List Screen"/>  
</p>  

* **Login Screen** → Secure login for users and admins
* **Dashboard** → Library overview with navigation
* **Book List** → Searchable and categorized book list

---

## 🧪 Testing

Run tests with:

```bash
npm test
```

---

## 🎯 Educational Value

This project helped demonstrate:

* Applying **frontend + backend integration** in a real-world scenario
* Using **MongoDB Atlas** for cloud-based database management
* Building a **user-friendly interface** with React Native & TailwindCSS
* Understanding **library workflows** (issuing, returning, and searching books)

---

## 📈 Future Improvements (if continued)

* 📷 Barcode/QR code scanning for faster book entry
* 📱 Push notifications for due dates
* 💰 Fine calculation system
* 📶 Offline mode with local sync
* 🧑‍💼 Role-based access (Admin vs Student vs Staff)

---

## 🤝 Contribution

Contributions are welcome! 🎉

1. Fork the repo
2. Create a feature branch (`git checkout -b feature-xyz`)
3. Commit your changes (`git commit -m "Added xyz"`)
4. Push your branch (`git push origin feature-xyz`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---
