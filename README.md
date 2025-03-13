# Job Board Application

A modern job board application built with React, Node.js, and MongoDB.

## Features

- Browse job listings with filters
- Detailed job view with application links
- Job scraping functionality
- Responsive design
- Real-time job updates

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/abhiya492/job-board-app.git
cd JobBoardApp
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

4. Set up environment variables
Create a `.env` file in the backend directory with:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
NODE_ENV=development
SCRAPE_INTERVAL_HOURS=24
```

5. Start the application
```bash
# Start backend (from backend directory)
npm start

# Start frontend (from frontend directory)
npm start
```

## Deployment

- Frontend: Deployed on Vercel
- Backend: Deployed on your preferred hosting platform

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 
