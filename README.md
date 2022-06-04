## What does this app do?
This is an API that provide you with data about your favorites movies and series episodes.

## Requirements

* Node 14
* Git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone git@github.com:Lancerider/valhalla-challenge.git
cd valhalla-challenge
```

```bash
npm install
```

## Updating Database

Although we use the IMDB Open API, this doesn't deliver the information the way we need. So we implemented node-json-db to gather the data we need and then process it.

:warning: **Be careful!!** IMDB only let us do 100 calls a day.
We don't recommend updating the database until we have a payed suscription to IMDB.

```node
npm run db:update
```
## Running a local environment

To start the express server, run the following

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.

## Run tests

We implement Jest and Supertest as testing tool. To run tests:

```bash
npm test
```

## Deploy to Heroku

Deploying to Heroku requires added as a collaborator on the heroku app.

Open [Heroku](https://dashboard.heroku.com/apps/penta-valhalla) and see if you have access.

In this page you could learn how to install and login to [Heroku](https://devcenter.heroku.com/articles/heroku-cli), remember that you have to connect your git remote to the heroku app. 

```bash
heroku git:remote -a penta-valhalla
```

Once you have access, and everything is ready, you can deploy to heroku with the next terminal command.

```bash
git push heroku master
```

If you want to deploy a different branch
```node
git push heroku <branch-name>:master
```

To fire the deployment without commiting
```bash
git push heroku <branch-name>:main
```

You can see de API on [this link](https://penta-valhalla.herokuapp.com/).

# Files Structure

    .
    ├── src             # Contains the Source Code of the app
    │   ├── config       # It contains all the app related configuration files
    │   ├── controllers  # It contains all the controllers for the API's routes
    │   ├── database     # It contains the node-db-json database related files
    │   ├── middlewares  # The auth, errors, validations and others middlewares should live in there.
    │   ├── routes       # There, you can manage the app endpoints, they should trigger the controllers to handle the requests.
    │   ├── services     # We used as the business layer. There you should make your externals Https requests and manage the data. 
    │   ├── utils        # Here, we manage the utilities files. All the reusable code should leave here, and all kind of helpers functions. 
    │   ├── app.js       # Contains the main app of the server API.
    │   └── index.js     # It starts the main server app, connects the database and others services required by the main app.
    │
    ├── .editorconfig   # Sets all our IDEs to the same configuration.
    ├── .env.example    # This is an example of the .env file you should have on your local environment
    └── .eslintrc.json  # Configures the eslint to Airbnb's standard.
