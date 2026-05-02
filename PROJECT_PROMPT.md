# Career Links - Full-Stack Web Application

**A comprehensive platform for students, fresh graduates, and job seekers to discover internships, jobs, online courses, and competitive exams.**

---

## 🎯 Project Overview

Career Links is a modern, responsive web application that aggregates opportunities across four main categories:
- **Internships** - Entry-level opportunities to gain experience
- **Jobs** - Full-time and part-time positions
- **Courses** - Online learning resources for skill development
- **Exams** - Government, private, and entrance exam notifications

---

## 📋 Technology Stack

### Frontend
- **Framework**: React.js (with Vite for fast build)
- **Styling**: Tailwind CSS + Custom CSS animations
- **State Management**: React Context API / Redux
- **HTTP Client**: Axios
- **UI Components**: Custom components + shadcn/ui
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Dark Mode**: next-themes style implementation

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Database**: MongoDB
- **ORM/ODM**: Mongoose
- **Validation**: Joi / Express-validator
- **CORS**: Enabled for frontend
- **Environment**: dotenv

### Database
- **Primary**: MongoDB (Atlas or local)
- **Collections**: Users, Opportunities, Exams, Bookmarks, Admin

---

## 🗂️ Project Folder Structure

```
Career Links/
├── frontend/                    # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── OpportunityCard.jsx
│   │   │   ├── ExamCard.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   ├── NotificationPopup.jsx
│   │   │   └── DarkModeToggle.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Internships.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── Exams.jsx
│   │   │   ├── ExamDetail.jsx
│   │   │   ├── OpportunityDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── NotFound.jsx
│   │   ├── context/            # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── NotificationContext.jsx
│   │   ├── hooks/              # Custom hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useTheme.js
│   │   │   └── useFetch.js
│   │   ├── services/           # API calls
│   │   │   ├── authService.js
│   │   │   ├── opportunityService.js
│   │   │   ├── examService.js
│   │   │   └── bookmarkService.js
│   │   ├── utils/              # Helper functions
│   │   │   ├── constants.js
│   │   │   ├── formatters.js
│   │   │   └── validators.js
│   │   ├── styles/             # Global styles
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                     # Node.js + Express backend
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── env.js              # Environment variables
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   ├── Opportunity.js
│   │   ├── Exam.js
│   │   └── Bookmark.js
│   ├── routes/                 # API routes
│   │   ├── auth.js             # Auth routes
│   │   ├── opportunities.js    # Opportunities CRUD
│   │   ├── exams.js            # Exams CRUD
│   │   ├── bookmarks.js        # Bookmarks
│   │   ├── admin.js            # Admin routes
│   │   └── users.js            # User routes
│   ├── controllers/            # Route handlers
│   │   ├── authController.js
│   │   ├── opportunityController.js
│   │   ├── examController.js
│   │   ├── bookmarkController.js
│   │   ├── adminController.js
│   │   └── userController.js
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js             # JWT verification
│   │   ├── errorHandler.js
│   │   ├── validation.js
│   │   └── adminCheck.js       # Admin authorization
│   ├── utils/                  # Helper utilities
│   │   ├── tokenGenerator.js
│   │   ├── emailService.js     # Email notifications
│   │   └── validators.js
│   ├── .env.example
│   ├── package.json
│   ├── server.js               # Express server entry
│   └── README.md
│
└── docs/                        # Documentation
    ├── API_DOCUMENTATION.md    # API endpoints
    ├── DATABASE_SCHEMA.md      # DB collections
    ├── DEPLOYMENT.md           # Deployment guide
    ├── SETUP.md                # Local setup guide
    └── FEATURES.md             # Feature details

```

---

## 📦 Database Collections Schema

### 1. **Users Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  avatar: String (URL),
  role: String (user/admin),
  createdAt: Date,
  updatedAt: Date,
  bookmarkedOpportunities: [ObjectId],
  bookmarkedExams: [ObjectId],
  notifications: [
    {
      type: String,
      message: String,
      read: Boolean,
      createdAt: Date
    }
  ]
}
```

### 2. **Opportunities Collection**
```javascript
{
  _id: ObjectId,
  title: String,
  company: String,
  type: String (Job/Internship/Course),
  category: String (IT/Management/Finance/E-commerce/Government/English),
  description: String,
  eligibility: String,
  stipend: String,
  duration: String,
  workType: String (Full-time/Part-time/Remote),
  applyLink: String (URL),
  deadline: Date,
  isPaid: Boolean,
  postedDate: Date,
  createdAt: Date,
  updatedAt: Date,
  isHighlighted: Boolean,
  views: Number
}
```

### 3. **Exams Collection**
```javascript
{
  _id: ObjectId,
  examTitle: String,
  organization: String,
  category: String (Government/SSC/UPSC/Banking/Railways/State-PSC/Defence/Teaching/Entrance/Private),
  description: String,
  eligibility: String,
  examPattern: String,
  syllabusLink: String (URL),
  applyLink: String (URL),
  notificationLink: String (URL),
  registrationStartDate: Date,
  registrationLastDate: Date,
  examDate: Date,
  admitCardDate: Date,
  resultDate: Date,
  status: String (Active/Upcoming/Closed),
  notification: String (Active-Form/Closing-Soon/Upcoming/New-Today),
  isNew: Boolean,
  createdAt: Date,
  updatedAt: Date,
  views: Number
}
```

### 4. **Bookmarks Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  opportunityId: ObjectId (reference to Opportunity),
  examId: ObjectId (reference to Exam),
  itemType: String (opportunity/exam),
  createdAt: Date
}
```

---

## 🛣️ API Endpoints

### Authentication Routes (/api/auth)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `POST /refresh-token` - Refresh JWT token
- `GET /profile` - Get user profile (protected)

### Opportunities Routes (/api/opportunities)
- `GET /` - Get all opportunities with filters & pagination
- `GET /:id` - Get single opportunity
- `POST /` - Create opportunity (admin only)
- `PUT /:id` - Update opportunity (admin only)
- `DELETE /:id` - Delete opportunity (admin only)
- `GET /search?q=keyword` - Search opportunities

### Exams Routes (/api/exams)
- `GET /` - Get all exams with filters
- `GET /:id` - Get single exam
- `GET /category/:category` - Get exams by category
- `POST /` - Create exam (admin only)
- `PUT /:id` - Update exam (admin only)
- `DELETE /:id` - Delete exam (admin only)
- `GET /active/all` - Get active exams
- `GET /upcoming/all` - Get upcoming exams

### Bookmarks Routes (/api/bookmarks)
- `GET /` - Get user's bookmarks (protected)
- `POST /add` - Add bookmark (protected)
- `DELETE /:id` - Remove bookmark (protected)
- `GET /check/:itemId` - Check if bookmarked (protected)

### Users Routes (/api/users)
- `GET /profile` - Get user profile (protected)
- `PUT /profile` - Update profile (protected)
- `GET /notifications` - Get notifications (protected)

### Admin Routes (/api/admin)
- `GET /dashboard` - Get dashboard stats (admin only)
- `POST /opportunities` - Add opportunity (admin only)
- `POST /exams` - Add exam (admin only)
- `GET /users` - Get all users (admin only)
- `DELETE /users/:id` - Delete user (admin only)

---

## 🎨 UI/UX Components

### Core Components
1. **Navbar** - Navigation with dark mode toggle
2. **Hero Section** - Eye-catching landing section
3. **Filter Bar** - Multi-filter search interface
4. **Opportunity Card** - Card for displaying jobs/internships/courses
5. **Exam Card** - Specialized card for exams with countdown
6. **Pagination** - Navigate through pages
7. **Loading Skeleton** - Loading states
8. **Notification Popup** - Real-time notifications
9. **Footer** - Social links and contact
10. **Modal Dialogs** - For forms and confirmations

### Pages
- **Home** - Hero + Featured + Recent opportunities
- **Internships** - List with advanced filters
- **Jobs** - List with advanced filters
- **Courses** - List with advanced filters
- **Exams** - Category-wise exam listings
- **Exam Detail** - Full exam information with countdown
- **Login/Register** - Authentication forms
- **Dashboard** - User profile and bookmarks
- **Admin Dashboard** - CRUD operations
- **Contact** - Contact form

---

## 🔐 Security Features

✅ Password hashing with bcryptjs  
✅ JWT token-based authentication  
✅ Protected API routes  
✅ Input validation and sanitization  
✅ Admin-only route protection  
✅ CORS configuration  
✅ Environment variables for secrets  
✅ Secure HTTP headers  

---

## ⚡ Advanced Features

1. **Search + Filter + Sort**
   - Multi-criteria search
   - Filter by category, salary, duration
   - Sort by newest, oldest, trending

2. **Bookmarking System**
   - Save opportunities for later
   - Save exams for reference
   - View bookmarks in dashboard

3. **Notification System**
   - In-app notifications
   - Exam reminders (Active, Closing Soon, New Today)
   - Email notifications (optional)

4. **Countdown Timers**
   - Registration deadline countdown
   - Exam date countdown
   - Visual indicators for closing soon

5. **Smart Highlights**
   - "Closing Today" badges
   - "New Exam" highlights
   - Featured opportunities

6. **Dark/Light Mode**
   - Theme toggle
   - Persistent theme storage
   - Smooth transitions

7. **Responsive Design**
   - Mobile-first approach
   - Tablet optimization
   - Desktop enhancement

8. **Pagination & Performance**
   - Lazy loading
   - Infinite scroll option
   - Loading skeletons

---

## 🚀 Development Phases

### Phase 1: Setup & Foundation (Day 1-2)
- Backend: Node.js + Express setup, MongoDB connection
- Frontend: React + Tailwind setup, folder structure
- Database: Create collections and indexes

### Phase 2: Authentication (Day 2-3)
- Backend: JWT auth, user registration/login
- Frontend: Login/Register pages, auth context
- Middleware: Protected routes

### Phase 3: Core Features (Day 3-5)
- Backend: Opportunities & Exams CRUD APIs
- Frontend: List pages with filters
- Cards: Display components with styling

### Phase 4: Advanced Features (Day 5-6)
- Bookmarks system
- Search functionality
- Exam countdown timers
- Notifications

### Phase 5: Admin Panel (Day 6-7)
- Admin dashboard
- Add/Edit/Delete opportunities
- Add/Edit/Delete exams
- User management

### Phase 6: Polish & Deploy (Day 7-8)
- Error handling
- Performance optimization
- Security review
- Deployment setup

---

## 🎯 Key Metrics & Goals

- **Performance**: Page load < 2 seconds
- **Responsive**: Works on mobile, tablet, desktop
- **SEO**: Optimized meta tags and structure
- **Accessibility**: WCAG 2.1 AA compliance
- **User Experience**: Intuitive navigation, smooth animations
- **Security**: No vulnerabilities, encrypted data

---

## 📝 Next Steps

1. **Backend Setup** - Initialize Node.js project with Express
2. **Database Setup** - Connect to MongoDB and create models
3. **API Development** - Build all REST endpoints
4. **Frontend Setup** - Initialize React with Vite
5. **Component Development** - Build reusable components
6. **Integration** - Connect frontend to backend
7. **Testing** - Functional and integration testing
8. **Deployment** - Deploy to production servers

---

## 🔗 Useful Resources

- **MongoDB Documentation**: https://docs.mongodb.com/
- **Express.js Guide**: https://expressjs.com/
- **React Documentation**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **JWT Guide**: https://jwt.io/

---

**Status**: Ready for implementation  
**Last Updated**: April 30, 2026  
**Version**: 1.0
