# Tyba Backend Engineer Test

# Ejecución

    npm install or yarn install
    docker-compose up -d
    npm run migrate or yarn migrate
    npm run dev or yarn dev

# Endpoints

## Registro de usuario

    POST - /api/auth/register

### Entrada:

Cuerpo en formato JSON

    {
      "email": "user@undefined.sh",
      "password": "supersecretpassword"
    }

### Salida:

    {
      "message": "Ok!",
      "apiKeyToken": "..."
    }

## Login de usuario

    GET - /api/auth/login

### Entrada:

Inicio de sesión por autenticación de tipo basica

    username: "user@undefined.sh"
    password: "secret"

### Salida:

    {
      "message": "Ok!",
      "apiKeyToken": "..."
    }

## Restaurantes cercanos por sitio \*Post-login

    GET - /api/restaurants/:place

### Entrada:

    /api/restaurants/alcaldia-bogota

Requiere token de tipo Bearer

    Bearer ...

### Salida:

    {
      "message": "Ok!",
      "data": [
        {
          "name": "...",
          "rating": 1,
          "vicinity": "..."
	      }
      ]
    }

## Restaurantes cercanos por coordenadas \*Post-login

    GET - /api/restaurants/

### Entrada:

Parametros de tipo query latitude y longitude

    /api/restaurants/?latitude=your_latitude&longitude=your_longitude

Requiere token de tipo Bearer

    Bearer ...

### Salida:

    {
      "message": "Ok!",
      "data": [
        {
          "name": "...",
          "rating": 1,
          "vicinity": "..."
	      }
      ]
    }

## Historico de transacciones \*Post-login

    GET - /api/transactions/

### Entrada:

    /api/transactions/

Requiere token de tipo Bearer

    Bearer ...

### Salida:

    {
      "message": "Ok!",
      "data": [
        {
          "id": "...",
          "createdAt": "...",
          "content": "my-place",
          "isCoordinate": false,
          "userId": "..."
        }
      ]
    }

## Historico de transacciones por id de usuario \*Post-login

    GET - /api/transactions/:userId

### Entrada:

    /api/transactions/userId

Requiere token de tipo Bearer

    Bearer ...

### Salida:

    {
      "message": "Ok!",
      "data": [
        {
          "id": "...",
          "createdAt": "...",
          "content": "my-place",
          "isCoordinate": false,
          "userId": "..."
        }
      ]
    }

## Logout de usuario

    GET - /api/auth/logout
