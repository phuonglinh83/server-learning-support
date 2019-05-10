node_modules/.bin/sequelize db:drop
node_modules/.bin/sequelize db:create
node_modules/.bin/sequelize db:migrate
psql -d thesis -a -f db/load/load_users.sql
psql -d thesis -a -f db/load/load_videos.sql
psql -d thesis -a -f db/load/load_categories.sql
psql -d thesis -a -f db/load/grant_permissions.sql
if [ ! -d "recommendations" ]; then
  git clone https://github.com/phuonglinh83/recommendations.git
fi
export DATABASE_URL=postgres://`whoami`@localhost:5432/thesis
cd recommendations
python db_bootstrap.py
