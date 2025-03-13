const mongoose = require('mongoose');
const Job = require('../models/Job');
require('dotenv').config();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    populateJobs();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const jobs = [
  // Tech Jobs
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    experience: "5-8 years",
    description: "Looking for an experienced Full Stack Developer proficient in React, Node.js, and MongoDB. Must have experience with microservices architecture and cloud platforms.",
    applicationLink: "https://techcorp.com/careers/senior-fullstack",
    source: "linkedin",
    postedDate: new Date('2024-03-10')
  },
  {
    title: "Machine Learning Engineer",
    company: "AI Innovations",
    location: "Boston, MA",
    experience: "3-5 years",
    description: "Join our AI team to develop cutting-edge machine learning models. Experience with PyTorch or TensorFlow required.",
    applicationLink: "https://aiinnovations.com/careers/ml-engineer",
    source: "linkedin",
    postedDate: new Date('2024-03-11')
  },
  {
    title: "DevOps Engineer",
    company: "Cloud Systems Inc",
    location: "Seattle, WA",
    experience: "4-6 years",
    description: "Looking for a DevOps engineer with strong experience in AWS, Docker, and Kubernetes. CI/CD pipeline expertise required.",
    applicationLink: "https://cloudsystems.com/careers/devops",
    source: "naukri",
    postedDate: new Date('2024-03-12')
  },
  // Frontend Focused
  {
    title: "Senior React Developer",
    company: "WebFront Technologies",
    location: "Austin, TX",
    experience: "4-7 years",
    description: "Seeking an experienced React developer with strong TypeScript skills and state management experience.",
    applicationLink: "https://webfront.com/careers/react-dev",
    source: "linkedin",
    postedDate: new Date('2024-03-09')
  },
  {
    title: "UI/UX Designer",
    company: "Design Masters",
    location: "New York, NY",
    experience: "3-5 years",
    description: "Join our creative team to design beautiful and intuitive user interfaces. Figma and Adobe Creative Suite expertise required.",
    applicationLink: "https://designmasters.com/careers/uiux",
    source: "other",
    postedDate: new Date('2024-03-08')
  },
  // Backend Focused
  {
    title: "Java Backend Developer",
    company: "Enterprise Solutions",
    location: "Chicago, IL",
    experience: "4-6 years",
    description: "Looking for a Java developer with Spring Boot experience. Knowledge of microservices architecture required.",
    applicationLink: "https://enterprise.com/careers/java-dev",
    source: "naukri",
    postedDate: new Date('2024-03-13')
  },
  {
    title: "Python Backend Engineer",
    company: "Data Systems Corp",
    location: "Denver, CO",
    experience: "2-4 years",
    description: "Join our backend team working with Django and FastAPI. Experience with SQL and NoSQL databases required.",
    applicationLink: "https://datasystems.com/careers/python-dev",
    source: "linkedin",
    postedDate: new Date('2024-03-12')
  },
  // Data Roles
  {
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Remote",
    experience: "3-5 years",
    description: "Looking for a data scientist with strong statistical background and experience with Python data stack.",
    applicationLink: "https://analyticspro.com/careers/data-scientist",
    source: "linkedin",
    postedDate: new Date('2024-03-11')
  },
  {
    title: "Data Engineer",
    company: "Big Data Solutions",
    location: "San Jose, CA",
    experience: "4-6 years",
    description: "Seeking a data engineer with experience in building data pipelines. Spark and Airflow experience required.",
    applicationLink: "https://bigdata.com/careers/data-engineer",
    source: "naukri",
    postedDate: new Date('2024-03-10')
  },
  // Mobile Development
  {
    title: "iOS Developer",
    company: "Mobile Apps Inc",
    location: "Los Angeles, CA",
    experience: "3-5 years",
    description: "Looking for an iOS developer with Swift experience. Knowledge of SwiftUI and UIKit required.",
    applicationLink: "https://mobileapps.com/careers/ios-dev",
    source: "other",
    postedDate: new Date('2024-03-09')
  },
  {
    title: "Android Developer",
    company: "App Masters",
    location: "Portland, OR",
    experience: "4-6 years",
    description: "Seeking an Android developer with Kotlin experience. Knowledge of Jetpack Compose preferred.",
    applicationLink: "https://appmasters.com/careers/android-dev",
    source: "linkedin",
    postedDate: new Date('2024-03-08')
  },
  // Cloud & Infrastructure
  {
    title: "Cloud Architect",
    company: "Cloud Nine Solutions",
    location: "Miami, FL",
    experience: "8-10 years",
    description: "Looking for an experienced cloud architect with multi-cloud expertise (AWS, Azure, GCP).",
    applicationLink: "https://cloudnine.com/careers/architect",
    source: "naukri",
    postedDate: new Date('2024-03-13')
  },
  {
    title: "Site Reliability Engineer",
    company: "Uptime Corp",
    location: "Atlanta, GA",
    experience: "5-7 years",
    description: "Join our SRE team to maintain and improve our infrastructure. Experience with monitoring tools required.",
    applicationLink: "https://uptime.com/careers/sre",
    source: "linkedin",
    postedDate: new Date('2024-03-12')
  },
  // Security
  {
    title: "Security Engineer",
    company: "SecureNet",
    location: "Washington, DC",
    experience: "6-8 years",
    description: "Looking for a security engineer with experience in penetration testing and security audits.",
    applicationLink: "https://securenet.com/careers/security-eng",
    source: "other",
    postedDate: new Date('2024-03-11')
  },
  {
    title: "Information Security Analyst",
    company: "CyberGuard",
    location: "Remote",
    experience: "4-6 years",
    description: "Join our security team to protect our infrastructure and applications. CISSP certification preferred.",
    applicationLink: "https://cyberguard.com/careers/security-analyst",
    source: "linkedin",
    postedDate: new Date('2024-03-10')
  },
  // Management & Leadership
  {
    title: "Engineering Manager",
    company: "Tech Leaders Inc",
    location: "San Diego, CA",
    experience: "8-10 years",
    description: "Looking for an engineering manager to lead our frontend team. Strong people management skills required.",
    applicationLink: "https://techleaders.com/careers/eng-manager",
    source: "naukri",
    postedDate: new Date('2024-03-09')
  },
  {
    title: "Technical Product Manager",
    company: "Product Pioneers",
    location: "Nashville, TN",
    experience: "6-8 years",
    description: "Seeking a technical product manager with strong engineering background. Agile certification preferred.",
    applicationLink: "https://productpioneers.com/careers/tpm",
    source: "linkedin",
    postedDate: new Date('2024-03-08')
  },
  // Quality Assurance
  {
    title: "QA Automation Engineer",
    company: "Quality First",
    location: "Phoenix, AZ",
    experience: "3-5 years",
    description: "Looking for a QA engineer with strong automation skills. Experience with Selenium and Cypress required.",
    applicationLink: "https://qualityfirst.com/careers/qa-automation",
    source: "other",
    postedDate: new Date('2024-03-13')
  },
  {
    title: "Performance Test Engineer",
    company: "Load Testing Pro",
    location: "Houston, TX",
    experience: "4-6 years",
    description: "Join our performance testing team. Experience with JMeter and K6 required.",
    applicationLink: "https://loadtesting.com/careers/perf-engineer",
    source: "naukri",
    postedDate: new Date('2024-03-12')
  },
  // Emerging Tech
  {
    title: "Blockchain Developer",
    company: "Chain Technology",
    location: "Miami, FL",
    experience: "3-5 years",
    description: "Looking for a blockchain developer with Solidity experience. Knowledge of DeFi protocols preferred.",
    applicationLink: "https://chaintech.com/careers/blockchain-dev",
    source: "linkedin",
    postedDate: new Date('2024-03-11')
  },
  {
    title: "AR/VR Developer",
    company: "Virtual Worlds",
    location: "Los Angeles, CA",
    experience: "2-4 years",
    description: "Join our team to develop immersive AR/VR experiences. Unity or Unreal Engine experience required.",
    applicationLink: "https://virtualworlds.com/careers/arvr-dev",
    source: "other",
    postedDate: new Date('2024-03-10')
  },
  // Entry Level
  {
    title: "Junior Frontend Developer",
    company: "Web Starter",
    location: "Remote",
    experience: "0-2 years",
    description: "Great opportunity for a junior developer to learn and grow. Knowledge of HTML, CSS, and JavaScript required.",
    applicationLink: "https://webstarter.com/careers/junior-frontend",
    source: "linkedin",
    postedDate: new Date('2024-03-09')
  },
  {
    title: "Graduate Software Engineer",
    company: "Tech Academy",
    location: "Multiple Locations",
    experience: "0-1 year",
    description: "Join our graduate program to kickstart your software engineering career. All training provided.",
    applicationLink: "https://techacademy.com/careers/graduate",
    source: "naukri",
    postedDate: new Date('2024-03-08')
  },
  // Specialized Roles
  {
    title: "Embedded Systems Engineer",
    company: "IoT Solutions",
    location: "San Jose, CA",
    experience: "5-7 years",
    description: "Looking for an embedded systems engineer with experience in C/C++ and RTOS.",
    applicationLink: "https://iotsolutions.com/careers/embedded",
    source: "linkedin",
    postedDate: new Date('2024-03-13')
  },
  {
    title: "Game Developer",
    company: "Game Studios",
    location: "Seattle, WA",
    experience: "3-5 years",
    description: "Join our game development team. Experience with Unity and C# required.",
    applicationLink: "https://gamestudios.com/careers/game-dev",
    source: "other",
    postedDate: new Date('2024-03-12')
  },
  // Contract Roles
  {
    title: "Contract Full Stack Developer",
    company: "Tech Contractors",
    location: "Remote",
    experience: "4-6 years",
    description: "6-month contract role for a full stack developer. MERN stack experience required.",
    applicationLink: "https://techcontractors.com/careers/contract-fullstack",
    source: "naukri",
    postedDate: new Date('2024-03-11')
  },
  {
    title: "Freelance UI Designer",
    company: "Design Agency",
    location: "Remote",
    experience: "3-5 years",
    description: "Flexible freelance position for an experienced UI designer. Portfolio required.",
    applicationLink: "https://designagency.com/careers/freelance-ui",
    source: "linkedin",
    postedDate: new Date('2024-03-10')
  },
  // Internships
  {
    title: "Software Engineering Intern",
    company: "Tech Internships",
    location: "Multiple Locations",
    experience: "Student",
    description: "Summer internship opportunity for computer science students. Strong coding skills required.",
    applicationLink: "https://techinternships.com/careers/software-intern",
    source: "other",
    postedDate: new Date('2024-03-09')
  },
  {
    title: "Data Science Intern",
    company: "Data Learning Corp",
    location: "Remote",
    experience: "Student",
    description: "3-month internship in data science. Knowledge of Python and statistics required.",
    applicationLink: "https://datalearning.com/careers/ds-intern",
    source: "linkedin",
    postedDate: new Date('2024-03-08')
  }
];

const populateJobs = async () => {
  try {
    // Clear existing jobs
    await Job.deleteMany({});
    
    // Insert new jobs
    await Job.insertMany(jobs);
    
    console.log('Successfully populated the database with 30 job listings!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating jobs:', error);
    process.exit(1);
  }
};

populateJobs(); 