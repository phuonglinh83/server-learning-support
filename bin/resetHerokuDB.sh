if test "$#" -lt 1; then
    echo "Usage: ./bin/resetHerokuDB.sh <DATABASE_URL>"
    exit
fi
export DATABASE_URL=$1
if [ ! -d "recommendations" ]; then
  git clone https://github.com/phuonglinh83/recommendations.git
fi
cd recommendations
python db_bootstrap.py
