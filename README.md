# Install instructions
## On dev machine
* Install [PostgreSQL](https://www.postgresql.org/download/)
* Install [Node.js](https://nodejs.org/en/download/)
* Clone github
```
 git clone https://github.com/phuonglinh83/server-learning-support.git
 cd server-learning-support
```
* Create database env file
```
touch .env
echo DATABASE_URL=postgres://`whoami`@localhost:5432/<db_name> >> .env
```
* Install required packages
```
npm install
```
* Set up database, and load intial data for cards table:
```
bin/resetDB.sh
```
* Then start the web app:
```
npm run start:dev
```
