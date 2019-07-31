heroku addons:create heroku-postgresql:hobby-dev
heroku run sequelize db:migrate
heroku pg:psql < db/load/load_users.sql
heroku pg:psql < db/load/load_videos.sql
heroku pg:psql < db/load/load_categories.sql
