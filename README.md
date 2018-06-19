# NorthCoders News APP

Northcoders News is a social news aggregation, web content rating, and discussion website. It is similar to Reddit in that Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added, but the user is unable to delete another users comments.

This application is hosted online, you can see it in action here: https://northcoders-app.herokuapp.com

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

NodeJS - https://nodejs.org/
Mongo - https://www.mongodb.com/

### Installing

Please clone the repository https://github.com/tfarrelly01/NorthcodersNews.git

`$ git clone https://git.heroku.com/norhtcoders-app.git`

To install all dependencies please enter the following commands into the terminal:-

`$ cd northcoders-app`
`$ npm install`

You will need to seed your database, you can do this by running: ``` npm run dev  ```


After that type the following command to run the application

`$ npm start`

Once webpack has finished transpiling open a browser window. The application is available on http://localhost:9090 via your web browser.

## Running the tests

To run tests on this application please ensure you're connected to Mongod in your terminal.
After you're connected simply run:

```npm test```

which will run the test suite for both the functions and their error handling.
All tests can be found within the spec folder.


## Author

**Vitor Correa** 


