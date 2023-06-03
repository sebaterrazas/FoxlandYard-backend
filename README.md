# Backend de Foxland Yard

## Como levantar Backend en local

### Instalar dependencias

En primer lugar hay que correr las dependencias con para que se instalen librerías como sequelize, koa, dotenv, etc. Para esto se hace
```
yarn install
```
### Crear base de datos

Asumiendo que tienen instalado postgresql, lo primero que hay que iniciar el servidor de postgresql. 
```
sudo service postgresql start
```
(Si es que no tienen postgresql, tienen que instalarlo y crear un usuario y una contraseña)

Como ya está instalada la dependencia de sequelize, se puede crear la base de datos con el siguiente comando, donde tienen que reemplazar 'nombre_bdd' por el nombre que quieran ponerle a su base de datos 
```
createdb nombre_bdd
```
### Configurar .env
Para realizar el archivo .env que permitirá la conexión con la bdd, tienen que configurar las siguientes variables de entorno.

```
DB_USERNAME = 
DB_PASSWORD = 
DB_NAME = nombre_bdd
DB_HOST = 'localhost'
PORT =
```
DB_USER y DB_PASSWORD son su usuario y contraseña de postgres. PORT es el puerto al que se quiere que el backend escuche (por default es 3000).

### Correr migraciones
Para que se creen las tablas en su base de datos hay que correr la migraciones con el siguiente comando
```
yarn sequelize db:migrate
```
### Levantar el servidor en local
Por último, hay que correr el siguiente comando para que el backend quede funcionando el http://localhost:3000/
```
yarn start 
```

### Crear una migración
```
yarn sequelize-cli model:generate --name <nombre> --attributes <atributo>:<tipo>,<atributo>:<tipo>
```
### Crear una seed
```
yarn sequelize-cli seed:generate --name <nombre>
```
### Correr todo de una
```
yarn sequelize-cli db:migrate:undo:all && yarn sequelize-cli db:migrate && yarn sequelize-cli db:seed:all && yarn dev
```

## Documentación Endpoints

Para la documentación de los endpoints, utilizamos `Swagger`. Esta se puede ver en `/swagger`.
