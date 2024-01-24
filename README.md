# Academy Core API
> API for management of students from a university or academy

## Table of Contents

- [Academy Core API](#academy-core-api)
  - [Table of Contents](#table-of-contents)
  - [General Information](#general-information)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Setup](#setup)
      - [Testing](#testing)
  - [Usage](#usage)
  - [Project Status](#project-status)
  - [Room for Improvement](#room-for-improvement)
  - [Acknowledgements](#acknowledgements)
  - [Contact](#contact)


## General Information
AcademyCoreAPI is a backend project written in typescript that uses Node.js, Express, Prisma, and SQLite3 (temporarily) to create a RESTful API for a university-like system. The project follows the clean architecture principles and uses TypeScript interfaces, classes, enums, and decorators to implement object-oriented programming concepts.

The project intends to solve the problem of managing the data and operations of a university-like system, such as students, professors, courses, degrees, grades, enrollments, etc. The project aims to provide a secure, scalable, and maintainable API that can handle complex queries and mutations on the data, and that can be easily integrated with different frontend applications or platforms.

The purpose of the project is to demonstrate my skills and knowledge as a backend developer in typescript, and to create a portfolio project that showcases my ability to design and implement a web api using modern technologies and best practices. The project also serves as a learning opportunity for me to explore new concepts and tools in typescript and web development.

I undertook this project because I am passionate about web development and I enjoy working with typescript. I wanted to challenge myself and create a project that is relevant to my field of interest and that can help me improve my coding skills and learn new concepts.


## Technologies Used
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)


## Features
- Creation and management of users


## Setup
To set up the local environment, follow these instructions in order:

```bash
# 1. Clone the repository from GitHub
git clone https://github.com/LZJorge/AcademyCoreAPI.git

# 2. Enter to generated folder
cd AcademyCoreAPI

# 3. Install dependencies
npm install

# 4. Compile TypeScript code
npm run build
```

> 5. You must create a .env file, from the .env.example file included at the root of the project, which has the necessary environment variables that you need to fill/define to run the project. You should store the .env file at the root of your project, at the same level as package.json.

> After all, you can use:

```bash
# 6. Start API server
npm start
```

#### Testing
> You can run api tests with

```bash
# Use this to test api
npm test
```


## Usage
The API is used through HTTP requests to the available endpoints.

`endpoints coming soon`


## Project Status
Project is: _in progress_


## Room for Improvement

- Improvement of documentation
- Add support for other database engines


## Acknowledgements
- This project was inspired by my university management system


## Contact
Created by [@LZJorge](https://github.com/LZJorge) - feel free to contact me!


<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
