# Shanture Sales Analytics Dashboard

## Project Overview

A comprehensive Sales Analytics Dashboard built for Shanture's Fresher Hiring Challenge. This application demonstrates advanced data processing, visualization, and modern UI development skills using React, TypeScript, and Tailwind CSS.

## Features

- **Interactive Date Range Selection**: Calendar-based filtering for custom reporting periods
- **Real-time Analytics**: Key performance metrics with trend indicators
- **Data Visualization**: Interactive charts including bar charts, pie charts, and line graphs
- **Reports Management**: Generate, save, and download analytics reports
- **Responsive Design**: Mobile-friendly interface with professional styling
- **Performance Metrics**: Revenue tracking, order analysis, and customer insights

## How to edit this code?

There are several ways to modify this application:

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit files directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Technical Stack

This Sales Analytics Dashboard is built with modern web technologies:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **Charts**: Recharts for data visualization
- **Date Handling**: React DatePicker for date range selection
- **State Management**: React hooks and context
- **Routing**: React Router for navigation

## Key Features

### 📊 Analytics Dashboard
- **Real-time Metrics**: Revenue, orders, average order value, customer analytics
- **Interactive Charts**: Bar charts, pie charts, and line graphs using Recharts
- **Date Range Filtering**: Flexible date selection with quick preset options
- **Trend Indicators**: Visual indicators showing performance changes

### 📈 Data Visualization
- **Revenue by Region**: Geographic performance analysis
- **Sales by Category**: Product category breakdown
- **Top Products**: Best-performing products ranking
- **Top Customers**: Highest-value customer analysis

### 📋 Reports Management
- **Generate Reports**: Create analytics reports for specific date ranges
- **Save Reports**: Store reports in application history
- **Download Reports**: Export reports as CSV files
- **Reports History**: View and access previously generated reports

### 🎨 Design System
- **Shanture Branding**: Professional purple and blue gradient theme
- **Responsive Design**: Mobile-first approach, works on all devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: Semantic HTML and proper color contrast

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/ui base components
│   ├── ShantureLogo.tsx # Company branding component
│   ├── MetricCard.tsx   # Key metrics display
│   ├── DateRangePicker.tsx # Date selection component
│   ├── AnalyticsChart.tsx  # Chart visualization component
│   └── ReportsTable.tsx    # Reports management table
├── data/                # Mock data and data utilities
│   └── mockData.ts      # Sample sales data generation
├── pages/               # Application pages
│   ├── Index.tsx        # Main dashboard page
│   └── NotFound.tsx     # 404 error page
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
└── App.tsx             # Main application component
```

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shanture-sales-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application.

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Assignment Compliance

This project fulfills the requirements for **Shanture's MERN Stack Developer Assignment**:

✅ **Frontend Requirements Met:**
- React application with clean, responsive UI design
- Date range picker component with calendar functionality
- Interactive data visualization using modern charting library
- Loading states and error handling implemented
- Professional styling with CSS/styled components

✅ **Technical Implementation:**
- Modern folder structure following best practices
- TypeScript for type safety and better development experience
- Component-based architecture for maintainability
- Responsive design for mobile and desktop compatibility
- Performance optimized with Vite build system

✅ **Data Processing Simulation:**
- Mock data generation for 2+ years of sales history
- Data aggregation algorithms for analytics computation
- Filtering mechanisms for date-based queries
- Multiple data dimensions (regions, categories, customers, products)

## Future Enhancements

For a complete MERN stack implementation, consider adding:

- **Backend API**: Node.js with Express.js server
- **Database**: MongoDB with aggregation pipelines or SQL database
- **Authentication**: User login and access control
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Filtering**: More sophisticated query capabilities
- **Data Export**: Additional export formats (PDF, Excel)
- **Performance Optimization**: Caching and query optimization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is created for Shanture's Fresher Hiring Challenge.

---

**Developed for Shanture Company**  
*Sales Analytics Dashboard - MERN Stack Developer Assignment*
