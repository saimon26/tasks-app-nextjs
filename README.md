A simple task management app built using Next.js and React. The app allows users to add, edit, delete, and search tasks. It also includes features like task sorting by priority and completion status, as well as storing tasks locally in the browser.

// Setup Instructions
Prerequisites
Ensure you have the following installed on your system:

Node.js (v12 or higher)
npm (v6 or higher) or yarn (optional)

// Getting Started

Clone the Repository: If you are working from a repository, clone it to your local machine using:

git clone https://github.com/your-username/your-repo.git
cd your-repo

Install Dependencies: Navigate to the project directory and install the required packages:

npm install


Run the Development Server: After installing the dependencies, start the Next.js development server:


npm run dev

Access the App: Once the development server is running, open the app in your browser by navigating to:


http://localhost:3000

// Approach to Sorting Tasks by Priority

In this app, tasks are sorted based on two criteria:

Priority: Tasks can have three levels of priority: high, medium, and low.
Completion Status: Tasks that are marked as completed are displayed at the bottom of the list, while pending tasks are shown at the top.

// Sorting Logic

Priority Levels: Each priority level is assigned a numerical value:

High priority = 3
Medium priority = 2
Low priority = 1

Completion Status: Tasks are also sorted based on their completion status:

Pending tasks (completed: false) are displayed at the top.
Completed tasks (completed: true) are moved to the bottom of the list.

The sorting is done using JavaScript's sort() function, which first sorts tasks by completion status, then by priority.

Completion Status: The first comparison checks whether a task is completed or not, ensuring that completed tasks are moved to the bottom.

Priority: After sorting by completion status, tasks are further sorted by their priority, with high priority tasks appearing first.

This ensures that the task list is always organized with high-priority, pending tasks at the top and completed tasks at the bottom.

// Technologies Used
Next.js: Server-side rendering and React-based framework for building web applications.
React: Frontend library for building user interfaces.
Local Storage: Browser storage for persisting tasks between sessions.

This README.md file should provide a comprehensive overview of the project, its features, setup, and the task-sorting logic.