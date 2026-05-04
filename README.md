# Varino Travels - Advanced Travel Agency CRM System 🛫

A comprehensive, fully automated Travel Agency Management System with advanced features for quotation building, hotel management, payment tracking, and complete client automation.

## 🎯 Features

### ✨ Dashboard
- **Real-time Statistics**: Total clients, active trips, revenue, pending quotations
- **Today's Follow-ups (ONE CLICK)**: See all follow-ups for today instantly with priority levels
- **Upcoming Trips Alerts**: Automatic reminders for trips in the next 7 days
- **Revenue Analytics**: Charts and trends visualization

### 👥 Client Management
- Complete client database with CRUD operations
- Client profiles with contact information
- Trip history tracking
- Total spending tracking per client

### 📄 Advanced Quotation Builder (3-Step Wizard)
**Step 1: Template Selection**
- 👑 Luxury Package
- 💰 Budget Package
- 🎒 Adventure Package
- 💑 Romantic Package
- 👨‍👩‍👧‍👦 Family Package

**Step 2: Hotel & Room Selection**
- Browse hotel database by city/destination
- Select room types (Single, Double, Suite, Deluxe)
- Specify quantity and number of nights

**Step 3: Extra Features & Pricing**
- Add features: Breakfast, Airport Transfer, Spa, Dinner, Tours, Concierge
- **AUTOMATED PRICE CALCULATOR** with real-time calculation
- Discount support with percentage/fixed amount
- Export to PDF
- Send via Email

### 🏨 Hotel Management
- Complete hotel inventory database
- Search and filter by destination
- Room types with pricing
- Amenities display

### 💳 Payment Management
- Track payments (Pending, Completed, Failed, Refunded)
- Multiple payment methods (Credit Card, Bank Transfer, UPI, Cash)
- Revenue dashboard
- Payment due date reminders

### 🔔 Full Automation Features
- **Auto-Reminders**: Automatic notifications for trips next week
- **Daily Follow-ups**: One-click dashboard for today's follow-ups
- **Email Integration**: Automated quotation delivery
- **SMS Integration**: Twilio-based SMS notifications (configurable)
- **Google Sheets Sync**: Automatic data backup and synchronization
- **Scheduled Tasks**: Cron jobs for automation

### ⚙️ Settings & Customization
- Company information setup
- Currency and tax configuration
- Notification preferences
- Google Sheets API integration
- Twilio SMS setup
- Quotation template customization
- Theme customization

### 📊 Reporting & Analytics
- Revenue reports by month/quarter/year
- Client acquisition reports
- Trip destination analytics
- Payment status reports
- Export data to CSV

### 💻 Desktop Application
- **Cross-platform support**: Mac (`.dmg`), Windows (`.exe`), Linux (`.AppImage`)
- Standalone executable/installer
- Local database with offline support
- System notifications
- Auto-update capability

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/ankits0325-cloud/Varino-travels-application-crm.git
cd Varino-travels-application-crm

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Build desktop app for Mac
npm run build-mac

# 5. Build desktop app for Windows
npm run build-windows

# 6. Build desktop app for Linux
npm run build-linux
```

### Development Mode
```bash
npm run electron-dev
```
This runs both React dev server and Electron app together.

### Production Build

**For Mac (creates .dmg installer):**
```bash
npm run build-mac
```

**For Windows (creates .exe installer):**
```bash
npm run build-windows
```

**For Linux (creates .AppImage):**
```bash
npm run build-linux
```

## 📋 File Structure

```
Varino-travels-application-crm/
├── public/
│   ├── electron.js          # Electron main process
│   ├── index.html           # HTML entry point
│   └── preload.js           # Electron preload script
├── src/
│   ├── pages/
│   │   ├── Dashboard.js     # Dashboard with follow-ups & trips
│   │   ├── ClientManagement.js
│   │   ├── QuotationBuilder.js  # 3-step quotation wizard
│   │   ├── PaymentManagement.js
│   │   └── HotelManagement.js
│   ├── context/
│   │   └── CRMContext.js    # Global state management
│   ├── utils/
│   │   └── helpers.js       # Utility functions
│   ├── App.js               # Main app component
│   └── index.js             # React entry point
├── package.json
└── README.md
```

## 🎮 How to Use

### Dashboard
1. Open the application
2. Dashboard shows overview of all metrics
3. Click on **"Today's Follow-ups"** to see all follow-ups for today
4. View **"Upcoming Trips"** for trips scheduled next week

### Create a Quotation
1. Navigate to **Quotations** → **Quotation Builder**
2. Step 1: Select a template (Luxury, Budget, etc.)
3. Step 2: Select hotel and add rooms
4. Step 3: Add extra features and set discount
5. Click **"Create Quotation"** or **"Send Via Email"**

### Manage Clients
1. Go to **Clients** section
2. Click **"Add New Client"** to add a new client
3. View, edit, or delete existing clients
4. Track client trip history and spending

### Track Payments
1. Navigate to **Payments**
2. Add payment records with client info and amount
3. Update payment status (Pending/Completed/Failed)
4. View total revenue statistics

## 🔧 Configuration

### Google Sheets Integration
1. Go to Settings
2. Enter your Google API key
3. Select the spreadsheet to sync with
4. Data will auto-sync every hour

### Twilio SMS Setup
1. Go to Settings → SMS Configuration
2. Enter your Twilio Account SID
3. Enter your Twilio Auth Token
4. SMS notifications will auto-activate

### Email Configuration
1. Go to Settings → Email
2. Configure SMTP settings
3. Quotations will be auto-sent via email

## 🌟 Key Automation Features

### 1. Automated Pricing
- Real-time price calculation
- Multi-factor pricing (hotel + rooms + features)
- Automatic discount application
- Automatic tax calculation

### 2. Smart Reminders
- Auto-notifications for upcoming trips
- Payment due reminders
- Follow-up task alerts
- Email & SMS notifications

### 3. Daily Dashboard
- One-click follow-up view
- Prioritized task list
- Quick action buttons
- Status tracking

### 4. Data Integration
- **Google Sheets**: Auto-backup every hour
- **Twilio**: SMS reminders (configurable)
- **Email**: Automated quotation delivery
- **PDF Export**: Professional quotations

## 💾 Data Storage

The application uses:
- **Frontend**: Local Storage for client-side persistence
- **Desktop App**: SQLite database for local storage
- **Cloud Sync**: Optional Google Sheets integration

## 📱 Supported Platforms

- ✅ **Windows**: `.exe` installer
- ✅ **macOS**: `.dmg` installer
- ✅ **Linux**: `.AppImage`
- ✅ **Web Browser**: React web application

## 🔐 Security

- Context isolation in Electron
- No Node integration in renderer
- Secure preload scripts
- Environment variable protection
- JWT authentication ready

## 📝 API Endpoints (If Backend Enabled)

```
POST   /api/clients
GET    /api/clients
GET    /api/clients/:id
PUT    /api/clients/:id
DELETE /api/clients/:id

POST   /api/quotations
GET    /api/quotations
PUT    /api/quotations/:id

POST   /api/payments
GET    /api/payments
PUT    /api/payments/:id

POST   /api/hotels
GET    /api/hotels
```

## 🎯 Automation Scripts

The system includes scheduled tasks for:
- Daily follow-up reminders (9:00 AM)
- Trip notifications (7 days before)
- Payment due reminders (1 day before)
- Weekly revenue reports
- Monthly data backups

## 🤝 Contributing

Feel free to submit issues or pull requests to improve this application!

## 📄 License

MIT License - Free to use and modify for commercial and personal projects.

## 👨‍💼 Support

For issues, questions, or feature requests:
1. Check the GitHub Issues page
2. Create a new issue with details
3. Include screenshots if applicable

---

**Built with ❤️ for Travel Agencies**

Made with React, Electron, Material-UI, and lots of automation! 🚀

### Version: 1.0.0
### Last Updated: 2026-05-04
