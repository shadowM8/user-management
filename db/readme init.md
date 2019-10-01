init database

sequelize db:create --config=db/datasource/postgresql/migration.js

drop

sequelize db:drop --config=db/datasource/postgresql/migration.js

migration

sequelize db:migrate --migrations-path=db/migrations --config=db/datasource/postgresql/migration.js

seed

sequelize db:seed:all --seeders-path=db/seeds --config=db/datasource/postgresql/migration.js