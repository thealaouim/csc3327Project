# El Mehdi El Alaoui
	Jan 3, 2021
	Gym Booking System

## Overview

The application is a Gym booking system that has three types of accounts, an admin, a service desk account and a client account. The client will be able to book the different facilities that the Gym has within the maximum limits of the persons allowed. This application will allow the Gym to automate the booking process and organize the clients of the gym as well as collect data about the different clients in order to increase its customer satisfaction. This platform is needed due to the current coronavirus crisis in order to enable the gym facilities to conform to the pandemic safety guidelines by the World Health Organization.
The clients will be able to book sessions that are 1 hour long, and they can book the sessions no earlier than 24 hours before the session time. Each service desk account will be connected to one facility or more. And will be able to see the booked sessions by facility and the individuals who have the sessions by name and other information. On the other hand a client will be able to book a facility for a maximum of 3 sessions per week.

## Requirements

#### Functional requirements


- The members of the gym shall be
  - Able to login to their accounts using the credentials given to them by the service desk
  - Able to view the facilities
  - able to view the sessions of each facility
  - Able to book a session in a facility 
  - Be able to cancel a session
- A service desk employee shall be able to 
  - Login to their specific account
  - Create a new account for the client
  - Update the client’s account information
  - Can view information about the facilities that are connected to the account
  - Create sessions for the different facilities
  - View the bookings of the moment by facility and see the clients information
- An admin shall be able to do the following
  - Login to their account
  - Create desk employee account
  - Update desk employee account
  - Assign desk employees to facilities
  - Create facilities
  - Update facility information

#### Non-functional requirements

- The application shall conform to the Enterprise Level Application standards of: performance, scalability, security and integration
- Performance: the application shall be able to pass google lighthouse test with at least 80%
- Scalability: the system shall keep the performance with increased loads at a reasonable cost
- Security:
  - Confidentiality and integrity of data traffic is a must
  - The application shall keep authenticity of the client and server
  - Users can only access their own accounts and only view and modify the things that are needed by them
- The platform shall have high availability and no single point of failure in the architecture
- The application shallbe multi-tier application and be light client
- The software code should be clean and understandable and spaghetti code is not tolerated
- The application should be ready before the end of the semester

## Technologies 
  
For the implementation of the software, we will use the following technologies:
- Bootstrap: We will use Bootstrap library for css components for its ease of use and adopt simple user interface designs
- React: React will be used as a front-end framework in order to avoid repetitive code by using its components that are reusable and contained. 
- Redux: We will use redux for its redux store functionality such that all of the data of the application will be stored in one place
- NodeJs: We will use NodeJs for the backend in order to use javascript for the whole project. The runtime environment will allow the handling of http requests and responses
- Express: the framework will simplify the handling of the requests and responses and help create a restful api
- JWT: JSON Web Token will be used for authentication of the users along with Bcrypt
- Sequelize: will be used as ORM to abstract the queries to the Postgres database server
- Postgres: We will use it for the storage of data as a relational database




## Physical architecture - Protocols and Software


![](https://i.ibb.co/vk1tCkB/IMG-0082.jpg)


## Physical architecture - Resilient (No SPoF) / Scalable


![](https://i.ibb.co/9HxX17Z/IMG-0083.jpg)








## Software Logical Architecture

![](https://i.ibb.co/dt0qwh9/IMG-0084.jpg)

## Entities Diagram
![](https://i.ibb.co/GRyMjg8/IMG-0085.jpg)


- User
  - Id
  - Email
  - password
- Client
  - userId
  - FullName
  - Week bookings
  - Status
- DeskEmployee
  - userId
  - FullName
- Facility
  - Id
  - Name
  - Maximum capacity
- Session
  - AvailabilityID
  - FacilityID
  - SessionDate
- Booking
  - BookingID
  - ClientID
  - AvailabilityID
  - Status (active, canceled)
- FacilityAssignment
  - AssignmentID
  - DeskEmployeeID
  - FacilityID
- Role
  - Id
  - Name
- User_roles
  - userId
  - RoleId



## Sequence Diagram
![](https://i.ibb.co/nRKVQh6/96-AD6637-1883-4045-B529-23290143-DD26.jpg)

## Implementation
	In this project we only implemented the backend services along with the controllers 
	and we tested the different functionalities using Postman
## Running the program
To start using the program, you should run the following commands:
- Download the repository
- Go to the repository directory using the command line and run these commands:
  - “npm install” to install the dependencies
  - “node server.js” to start the server in port 8080 of local host
