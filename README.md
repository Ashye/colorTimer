# Flow Timer

A minimalist sequential timer for managing focus, breaks, and workflows. Create and customize colored timer strips that run one after another.

This application is designed to help you stay focused and manage your time effectively using a visual, sequential timer system. It's perfect for students, professionals, and anyone looking to improve their productivity.

## Features

- **Sequential Timers**: Create a series of timers that run in sequence, perfect for structured work sessions like the Pomodoro Technique.
- **Full Customization**:
    - Set custom durations (minutes and seconds) for each timer.
    - Assign a unique name to each timer for clarity.
    - Choose from a palette of colors to visually distinguish timers.
- **Intuitive Interface**: A clean, modern, and easy-to-use interface.
- **Simple Controls**: Easily start, and reset your timer sequence.
- **Edit Mode**: Add, remove, and modify your timers when the sequence is not running.
- **Responsive Design**: Works seamlessly on desktop and mobile browsers.
- **Multi-language Support**: Toggle between English and Chinese.

## How to Use

1.  When the timer is stopped (in "edit mode"), you can modify existing timers or add new ones.
2.  **Add a Timer**: Click one of the colored plus (+) buttons to add a new timer strip to the end of the list.
3.  **Edit a Timer**: Click on the name or time fields of a timer strip to change its name and duration.
4.  **Remove a Timer**: Click the trash can icon to delete a timer strip.
5.  **Start the Flow**: Press the "Start" button to begin the timer sequence. The active timer will be highlighted.
6.  **Reset**: Press the "Reset" button to stop the timer and return to "edit mode".

## Development Setup

This project is built with React and TypeScript but does not require a complex build setup like Webpack or Vite. It uses modern browser features like ES modules and import maps to run directly in the browser.

### Prerequisites

-   A modern web browser (like Chrome, Firefox, or Edge).
-   A simple local web server.

### Running the Project

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Serve the files:**
    Since there's no build step, you just need to serve the project's root directory with a local web server. Opening `index.html` directly from the file system (`file://...`) may not work correctly due to browser security restrictions on ES modules.

    Here are a few ways to start a simple server:

    *   **Using VS Code's Live Server Extension:**
        If you use Visual Studio Code, you can install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension. Right-click on `index.html` and select "Open with Live Server".

    *   **Using Python:**
        If you have Python installed, you can run a simple HTTP server from the project's root directory:
        ```bash
        # For Python 3
        python -m http.server

        # For Python 2
        python -m SimpleHTTPServer
        ```
        Then, open your browser and go to `http://localhost:8000`.

    *   **Using Node.js:**
        If you have Node.js installed, you can use a package like `http-server`:
        ```bash
        npx http-server .
        ```
        Then, open your browser to the URL it provides.

Once the server is running, you can open the provided local URL in your browser to see the application. Any changes you make to the source files (`.tsx`, `.html`) will be reflected when you refresh the page.
