# Node.js Internals – Theory

## 1. Node.js Architecture

Node.js follows a single-threaded, event-driven, non-blocking architecture that allows it to handle multiple requests efficiently.

### Key Points
- Uses JavaScript as the programming language
- Runs on the V8 JavaScript engine
- Uses an event loop to handle asynchronous operations
- Offloads heavy tasks to libuv and background threads
- Best suited for I/O-intensive applications

### Main Components
- V8 JavaScript Engine
- Node.js Core APIs
- Native Bindings
- Event Loop
- libuv
- Thread Pool

---

## 2. JavaScript Engine (V8)

### What is V8?
- V8 is a high-performance JavaScript engine developed by Google
- Written in C++
- Converts JavaScript code into machine-level code

### Role of V8 in Node.js
- Executes JavaScript code
- Performs memory management and garbage collection
- Optimizes execution using Just-In-Time (JIT) compilation

### Importance of V8
- Makes Node.js fast
- Allows JavaScript to run outside the browser

---

## 3. Node.js Core APIs

### What are Core APIs?
- Built-in modules provided by Node.js
- Implemented using JavaScript and C++

### Examples
- fs – File system operations
- http – Creating web servers
- path – File and directory paths
- crypto – Encryption and decryption
- os – Operating system information

### Purpose
- Provide access to system-level features
- Simplify complex operations for developers

---

## 4. Native Bindings

### What are Native Bindings?
- A bridge between JavaScript and C/C++ code
- Allow JavaScript to communicate with low-level system functions

### Why Native Bindings are Needed
- JavaScript cannot directly access OS features
- Native bindings connect JavaScript with libuv and Node.js core

### Example Flow
- fs.readFile() → JavaScript → Native Binding → libuv → Operating System

---

## 5. Event Loop

### What is the Event Loop?
- A mechanism that continuously checks and executes pending tasks
- Core part of Node.js asynchronous behavior

### Responsibilities
- Executes callback functions
- Handles timers
- Manages I/O operations
- Ensures non-blocking execution

### Importance
- Allows Node.js to handle many requests using a single thread

---

## 6. libuv

### What is libuv?
- A multi-platform C library used by Node.js
- Handles asynchronous input/output operations

### Why Node.js Needs libuv
- JavaScript is single-threaded
- libuv manages OS-level asynchronous tasks
- Ensures cross-platform compatibility

### Responsibilities of libuv
- Event loop implementation
- File system operations
- Network handling
- Timer management
- Thread pool management

---

## 7. Thread Pool

### What is a Thread Pool?
- A collection of background threads
- Managed internally by libuv

### Why Node.js Uses a Thread Pool
- To prevent blocking the event loop
- To execute heavy or blocking operations efficiently

### Operations Handled by Thread Pool
- File system operations
- Cryptographic functions
- Compression tasks
- DNS resolution

---

## 8. Worker Threads

### What are Worker Threads?
- Independent JavaScript execution threads
- Used for CPU-intensive tasks

### Why Worker Threads are Needed
- Heavy computations block the event loop
- Worker threads allow parallel execution
- Improve application performance

### Difference Between Thread Pool and Worker Threads

| Thread Pool | Worker Threads |
|------------|----------------|
| Managed by libuv | Managed by Node.js |
| Executes native C/C++ code | Executes JavaScript code |
| Used internally by Node.js | Used by developers |
| Fixed number of threads | Flexible number of threads |

---

## 9. Event Loop Queues

## Macro Task Queue

### Description
- Contains tasks scheduled for later execution

### Examples
- setTimeout()
- setInterval()
- setImmediate()
- I/O callbacks

---

## Micro Task Queue

### Description
- Contains high-priority tasks
- Executed immediately after the current execution

### Examples
- Promise.then()
- Promise.catch()
- queueMicrotask()
- process.nextTick()

---

## Execution Priority

### Order of Execution
1. Current JavaScript execution
2. Micro Task Queue
3. Macro Task Queue

### Important Note
- Micro tasks are always executed before macro tasks

---

## Summary

- Node.js uses a single-threaded event loop
- libuv handles asynchronous and system-level operations
- Thread pool manages blocking tasks
- Worker threads handle CPU-intensive JavaScript
- Proper task scheduling ensures high performance
