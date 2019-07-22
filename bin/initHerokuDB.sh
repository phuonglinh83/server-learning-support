heroku addons:create heroku-postgresql:hobby-dev
heroku run sequelize db:drop
heroku run sequelize db:migrate
heroku run sequelize db:create
heroku pg:psql < db/load/load_users.sql
heroku pg:psql < db/load/load_videos.sql
heroku pg:psql < db/load/load_categories.sql
