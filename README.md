# Twitter App

This app was created as a playground to research new NodeJS and JS development practices. As such, it's not aimed to be production ready or polished to the level expected in an interview. 

It's based on a small subset of features from the Twitter platform. Note that the following specs might not match the Twitter ones, or even make full sense from a product perspective, they were done like this to limit the scope of this exercise.

## Specification

Develop a RESTful API for an unknown set of clients that would offer the following functionalities:

- Create a user. Just the username for now.
- Follow a user. Follow another user.
- Create a tweet. This will implictly create the user, if it was not created before.
- Show timeline. Shows the tweets from a user.
- Show wall. Shows the tweets from the followees of a user.
- Like a tweet. A user likes a tweet.
- Get likes from a user. Shows the likes done from a user.

## Architecture

Since I've spent my last professional years focused on RoR, I decided to investigate the latest practices and tools on the NodeJS space. I've read several materials, but the main one was [this](https://github.com/goldbergyoni/nodebestpractices). I've used [this app](https://github.com/sujeet-agrahari/population-comparison) as a starting point and then reduced complexities that were not needed for my use cases.

### Components/microservices

One of the core ideas is that, even if the app is deployed as a monolith, it should be ready to be split out in microservices if needed, e.g. the tweets part of the application needs to scale differently from the social side. Therefore, the application is organized in components that match business domains. Here, I decided to split them in social and tweet components. This desition is related to domain concepts, not to particular REST resources or Mongo documents.

Each component has the following pieces:

- Route: just in charge of matching http calls and sending them to the right controller.
- Controller: manipulates http requests and responses. No business logic is done there.
- Service: where the business logic should be placed. Calls to other component services are done from [here](https://github.com/dmesu/twitter-clone/blob/master/src/components/tweet/tweet.service.js#L17)
- Model: also called DAL objects in NodeJS ecosystem. This is mostly where the schema of the documents contained in Mongo are defined, and other data concerns such as capturing and progagating Mongo exception. All of these is done using Mongoose.
- Validation: Where the semantic validation of the user input is done.
- Middleware: I've included two middlewares that I found in the internet, that are pretty cool to showcase how to reduce duplication when dealing with those controllers, [this](https://github.com/dmesu/twitter-clone/blob/master/src/middlewares/handle-request.js) and [that](https://github.com/dmesu/twitter-clone/blob/master/src/middlewares/handle-validator.js). Thanks to those, the [route handlers](https://github.com/dmesu/twitter-clone/blob/master/src/components/social/social.routes.js#L17) are pretty clean.


### Middlewares

There are some [middlewares](https://github.com/dmesu/twitter-clone/tree/master/src/middlewares) that are dealing with things more general than the ones withing a component.

- Rejecting [invalid json](https://github.com/dmesu/twitter-clone/blob/master/src/middlewares/handle-invalid-json.js) from a structural point of view.
- Providing a [standard error response for missing endpoints](https://github.com/dmesu/twitter-clone/blob/master/src/middlewares/handle-missing-path.js), i.e. doing more than simply returning 404.
- Dealing with [every exception thrown by the app](https://github.com/dmesu/twitter-clone/blob/master/src/middlewares/handle-errors.js). Instead of returning 500 responses showing internal exceptions, the handler wraps those into a standard error response.

These middlewares deal with some ideas:

- Returning the same response format for success and error cases. By doing that, the clients (being the browser or a mobile app) won't have to deal with unexpected formats.
- Capturing every error scenario and trying to give the most focused information as possible (so picking up the right http status code and not simply 400 or 500)
### Config

I don't do a heavy use of configuration on this app, but at least I've experimented how easy would be to provide different Mongo urls, since the app will have to different databases in dev/staging/prod.

## Testing

In this app there are two levels of testing:
- Unit. By unit I mean that no IO external dependency is accessed. In this particular case is Mongo, but it might be a third party rest api or a queue system. There are two ways of mocking Mongo in my tests:
    - Stub. I'm using the library Sinon, it replace the real call to the database with a stubbed response. See [here](https://github.com/dmesu/twitter-clone/blob/master/test/components/social/users.unit.stub.test.js#L31)
    - In-memory. Instead of mocking the dependency at application level, I provide an in-memory mongo db service. No real database is reached, but my test feels more real than the previous one. See [here](https://github.com/dmesu/twitter-clone/blob/master/test/components/social/users.unit.in-memory.test.js#L3)
- e2e. These tests only have a single dependency, being that Docker. Thanks to a library called [testcontainers](https://github.com/dmesu/twitter-clone/blob/master/test/components/social/users.e2e.test.js#L11), mongo can be started and destroyed every time that a test is run. And all of that happens in a Docker container, so the tests don't leave any data in the host machine.

I'm using AvaJS as test runner. The default running mode is in parallel, so the test suite is much faster. As I use Docker and I don't share a single Mongo instance, I can run them safely like that, since I don't share any data between them.

## What to improve

The improvements are categorised in the Roadmap, but here I'll include a non-exhaustive list of the mistakes that the current app has:

- Naming inconsistencies. [These files](https://github.com/dmesu/twitter-clone/tree/ss_sample_project/src/middlewares) vs [these files](https://github.com/dmesu/twitter-clone/tree/ss_sample_project/src/components/social).
- [Dead code](https://github.com/dmesu/twitter-clone/blob/ss_sample_project/src/middlewares/handle-errors.js#L4). 
- REST best practices, for instance [this](https://github.com/dmesu/twitter-clone/tree/ss_sample_project/src/components/social/social.routes.js#L16) should be singular and not plural.
- Creating test fixtures. Otherwise, you have unreadable tests like [this one](https://github.com/dmesu/twitter-clone/tree/ss_sample_project/test/components/tweet/wall.e2e.test.js#L28).
- DRY in the setup of the tests. [This code](https://github.com/dmesu/twitter-clone/tree/ss_sample_project/test/components/tweet/wall.e2e.test.js#L12) is duplicated in every e2e test.
- DRY in the prod code. The API contract is always the same, so [this](https://github.com/dmesu/twitter-clone/tree/ss_sample_project/src/components/social/social.controller.js#L6) could be extracted into another middleware.
- Redundancy. [This](https://github.com/dmesu/twitter-clone/tree/ss_sample_project/src/components/social/model/follower.js#L17) default date thing is performed twice in the models.

## Roadmap

- Cover and implement not happy path scenarios. The app is not that robust at the moment, e.g a user can follow another user that doesn't even exist.
    - Acceptance criteria. 
        - Define proper specs per every supported functionality. As an example, the follow functionality should cover:
            - That the follower or followee doesn't exist
            - Following itself
            - Following someone that is already followed
        - Implement tests and production code for them
- OOP. Current application doesn't have a lot of business logic, since it's pretty slim. However, to scale its complexity, using classes, like RoR does, would make the maintenance much easier. There are already some classes around Mongoose or other third party libraries that the app depends on, but the idea would be introducing javascript classes in the domain.
    - Acceptance criteria 
        - Using a well known and stablished pattern of doing OOP on modern Express apps.
        - Implementing it in a made up example. e.g moderation of tweets, if a user is underage applies some moderation logic such as not allowing gross words, otherwise apply a different moderation policy. 
- Logging. At the moment, the app don't log almost anything, so it's pretty hard to make sense of what's going on by reading the logs. 
    - Acceptance criteria 
        - Execute a test that makes the app to fail and check that the logging includes enough information
- CI. Adding CI, such as CircleCI, to execute the tests for every commit.
    - Acceptance criteria
        - Working CI installation, with some visibility of the current status, such as a badge in the README.
- Redesign the data model. The current documents in the Mongo database should be reviewed to add more constraints if needed, such as unique keys.
    - Acceptance criteria
        - Code still works, but it's more robust, in the sense that the data model will protect us from mistakes.
- Production ready. If the app would have to be promoted to prod, it should have basic things like authentication, so the API is only accessible for valid users.
    - Acceptance criteria
        - The app is made more production ready by adding basic non functional features.                
- API documentation. By using Swagger, or any other tool, allow client developers of this code (browser or mobile apps), to understand the shape of the API, without need to ping the backend devs.
    - Acceptance criteria
        - Easy to use and to write documentation
- API versioning. A versioning model could be set up, e.g. /api/v1..., so clients could update to new api versions when they're ready.
    - Acceptance criteria
        - Old APIs will be still around, but new ones will be available under a different path to whoever is ready to use them.                 

## Running instructions

### Requisites

- Node and Docker installed on your local machine. These versions have been used in a Mac laptop, but it might work with other versions. 

```
node --version
v16.3.0


docker --version
Docker version 20.10.7, build f0df350
```

- Clone this repo
- `npm install`

### Run a local instance

```
> docker run --name mongo-dev -d -p 27017:27017 mongo
> npm run dev
> curl http://localhost:3000/api/social/users
```

When you're done, don't forget to remove the docker container with:

```
> docker rm -f mongo-dev
```
### Run tests

```
> npm run test
```

To run just a subset of them:

```
> npm run test -- -m '*handle*'
```
