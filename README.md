# Fluency Assessment - User Metrics Dashboard

A modern, responsive user metrics dashboard built for creator-focused platforms. This project showcases data visualization capabilities with interactive charts designed specifically for influencer and creator analytics.

## 🎯 Project Overview

This assessment project demonstrates the ability to create compelling data visualizations for the creator economy. Built with modern web technologies and following mobile-first design principles, it displays user engagement metrics in an intuitive, visually appealing format.

### Features

- **Interactive Charts**: Two distinct chart types displaying user metrics
  - New Users trend over 10 days (Area Chart)
  - Users Gained/Lost over 10 days (Bar Chart)
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Modern UI/UX**: Creator-native design with smooth animations and transitions
- **Real-time Insights**: Dynamic calculation of key metrics and trends

## 🎨 Design Philosophy

This dashboard is designed with the creator economy in mind:

- **Creator-Native**: UI patterns familiar to influencers and content creators
- **Trend-Aware**: Modern design inspired by popular social media platforms
- **Performance-First**: Optimized for fast loading and smooth interactions
- **Mobile-Responsive**: Looks great on all devices, from mobile to desktop

## 🎭 Features Showcase

### Summary Cards

- **Total New Users**: Sum of last 10 days of new user data
- **Net User Change**: Sum of last 10 days of gained/lost data with gain/loss indicators
- **Average Daily Growth**: Mean of new users over the last 10 days

### Quick Insights

- **Peak Day**: Highest new user acquisition day within the last 10 days
- **Growth Trend**: Overall trend analysis based on net change over last 10 days
- All metrics calculated from the same 10-day period as the charts

## 🌟 Key Highlights

- **Smooth Animations**: Page elements fade in with staggered timing
- **Interactive Tooltips**: Hover over chart elements for detailed data
- **Gradient Backgrounds**: Modern visual appeal with subtle gradients
- **Icon Integration**: Contextual icons from Lucide React
- **TypeScript Ready**: Easy migration to TypeScript if needed

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## 🎯 Assessment Requirements Met

✅ **Two Chart Types**: Area chart and bar chart implemented  
✅ **ApexCharts Integration**: Using react-apexcharts library  
✅ **Responsive Container**: Mobile-first design principles  
✅ **Data Visualization**: Both datasets accurately represented  
✅ **Modern UI/UX**: Creator-focused design aesthetic  
✅ **Performance Optimized**: Fast loading with smooth animations

## 🔮 Future Enhancements

- Real-time data integration
- Additional chart types (pie, donut, scatter)
- Date range selection
- Export functionality
- Dark/light mode toggle
- Advanced filtering options

---

## 🚀 Tech Stack

- **Frontend**: React 19 with Vite
- **Charts**: ApexCharts with React integration
- **Styling**: Tailwind CSS v4 with utility-first approach
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds

## 📊 Chart Details

### New Users Chart

- **Type**: Area chart with gradient fill
- **Full Dataset**: `[3,5,1,0,2,7,1,9,13,3,5,6,1,0]` (14 days)
- **Displayed Data**: Last 10 days `[2,7,1,9,13,3,5,6,1,0]`
- **Features**: Smooth curves, hover tooltips, animated rendering

### Users Gained/Lost Chart

- **Type**: Bar chart with conditional coloring
- **Full Dataset**: `[2,-3,5,1,-1,0,-2,4,1,-2,5,7,-3,0,1,-1]` (16 days)
- **Displayed Data**: Last 10 days `[-1,0,-2,4,1,-2,5,7,-3,0]`
- **Features**: Color-coded gains (green) and losses (red), zero values visible and hoverable

## 🛠️ Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fluency-assessment

# Install dependencies
npm install
```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development Server

The development server runs on `http://localhost:5173` with hot module replacement enabled.

## 📄 Project Structure

```
src/
├── components/
│   └── UserMetrics.jsx    # Main dashboard component
├── assets/
│   └── fluency-logo.png   # Brand logo
├── App.jsx                # Root component
├── main.jsx              # Application entry point
└── index.css             # Global styles
```

## 📞 Contact

Built as part of the Fluency Web Designer/Frontend Developer assessment.

_This project demonstrates expertise in modern React development, data visualization, and creator-focused UI/UX design._
