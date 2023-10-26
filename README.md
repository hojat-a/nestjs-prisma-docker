<a name="readme-top"></a>

<br />
<div align="center">

  <h3 align="center">Nestjs-Prisma-Docker</h3>

  <p align="center">
    A File Sharing Server by Nestjs!
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li>
          <a href="#built-with">Built With</a>
          <ul>
            <li><a href="#technologies">Technologies</a></li>
            <li><a href="#libraries">Libraries</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#using-docker">1.Using Docker (easy way :D)</a></li>
        <li><a href="#normal-way">2.Normal Way (hard way :S)</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This demo showcases my file sharing project, offering the following features:

* input validation using class-validator.
* User Authentication using passport-jwt (Any user can sing up and sign in).
* File Upload using multer (Registered users can share their files with some data).
* Streaming files (All users have access to available files, with the option to download them).
* Users with accounts can conveniently manage their profiles and file information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

#### Technologies
* Node.Js
* Postgres
* Docker

#### Libraries
* Nest.Js
* Prisma
* Class Validator

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

1. Clone the repo
   ```sh
   git clone https://github.com/hojat-a/file-sharing-demo.git
   ```
2. Create a `.env` file, copy `.env.example` contents and set your configs.
  
Then, there are two method you can start the project:

### Using Docker

#### Prerequisites

* Docker Engine
* Docker-compose (optional)

#### Running the app

  In your project repository
   1. build an image
      ```sh
      docker build
      ```
  2. run the image
     ```sh
     docker run --detach 'image_name'
     ```
Or 
  only run docker-compose command
  ```sh
  docker-compose up
  ```

### Normal Way

#### Prerequisites

* npm
* postgres

#### Installation

1. Install NPM packages
   ```sh
   npm install
   ```
2. Read Prisma schema and updates the generated Prisma Client library inside `node_modules/@prisma/client` 
    ```sh
    npx prisma generate
    ```
3. Running the app
    ```sh
    npm run start
    ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Contact

[LinkedIn](https://www.linkedin.com/in/hojat-ataee/) - hojat.a.1991@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>
