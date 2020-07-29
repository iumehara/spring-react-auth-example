# Spring React Auth Example
Sample app with REST authentication using React and Spring Security 

![screenshot](/screenshot.png?raw=true)

Reference for:
- Spring Security:
    - rest login
    - rest logout
    - csrf
    - cors
- Web (React/Typescript): 
    - error handling
    - cookie access
    - localstorage access
    - react-router
    - design: using a common style guide, flex-box

## Stack
#### Server
- Spring Boot
- Kotlin
- Gradle
- Spring Security
- JDBC
- Postgres

#### Web
- create-react-app
- React Hooks
- Typescript
- react-router
- Sass


## Setup (Server)

#### go to the server app
- `cd server`

#### set up database
- create the db (e.g. `createdb <database_name>`)
- update schema using resources/db/schema.sql (e.g. `\i /path/to/repo/server/src/main/resources/db/schema.sql` in psql)
- seed data using resources/db/seed.sql  (e.g. `\i /path/to/repo/server/src/main/resources/db/seed.sql` in psql)
    - seed users passwords are `secreta`, `secretb`, `secretc` for Amy, Bob and Cam, respectively. 

#### install dependencies

`./gradlew build`

#### set environment variables
- add a new `.env` file referencing the `.envTemplate` file
```
export SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/<database_name>"
export CLIENT_URL="http://localhost:3000"
```
- also set `SPRING_DATASOURCE_USERNAME` and `SPRING_DATASOURCE_PASSWORD` if different from login user

## Setup (Web)
#### go to the web app
- `cd web`

#### install dependencies
- `npm install`

#### set environment variables
- add a new `.env` file referencing the `.envTemplate` file
```
export REACT_APP_SERVER_URL="http://localhost:8080"
```

## Run Tests
server
```
cd server
make test
cd -
```
web
```
web
make test
cd -
```

## Start Apps
```
cd server
make start
cd -
```
server should start up on localhost:8080
```
cd web
make start
cd -
```
web app should start up on localhost:3000

## TODO
- `Custom AuthenticationManager`: Replace jdbcAuthentication inside the WebSecurityConfigurerAdapter with custom AuthenticationManager.
This will allow for injection of a repository interface, resolving tight security dependency on JDBC.
Goal is for Spring Security to be dependent on a repo interface, instead of a real database.

- `Login failure message`: Display login failure reason on login page.
    
 
