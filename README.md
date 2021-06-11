# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version v12.13.1


# Getting started

- Clone the repository
```
git clone  <git lab template url> <project_name>
```

- Install dependencies
```
cd <project_name>
npm install
```

- Build and run the project

The app depends on Mongo. You can start through an installed binary or with Docker:

```
mongod --config /usr/local/etc/mongod.conf
```

```
docker run --name mongo-dev -p 27017:27017 mongo
```

```
npm run dev
```

- Run tests


````
npm test
```

To run a subset of tests:

```
env NODE_ENV=test npx ava --match='*likes*'
```