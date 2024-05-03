---
runme:
  id: 01HWGTXQH73NBMQ2RNHDY5FWNS
  version: v3
---

# PassKeeperAPI

Este proyecto es una API REST construida con Django REST framework que permite a los usuarios de la aplicación Android PassKeeper realizar la compra de la version premium de la misma.

## Empezando

Estas instrucciones te permitirán obtener una copia del proyecto y ejecutarla en tu máquina local para propósitos de desarrollo y prueba.

### Pre-requisitos

Necesitarás Python y `virtualenv` instalado en tu sistema. Si no tienes `virtualenv`, puedes instalarlo con pip:

```bash {"id":"01HWGTXQH73NBMQ2RNGT8Y9C7A"}
pip install virtualenv
```

### Configuración del entorno de desarrollo

1- Primero, clona el repositorio en tu máquina local y navega al directorio clonado:

```bash {"id":"01HWGTXQH73NBMQ2RNGVD5STNS"}
git clone https://github.com/RocketInnovate/integrador_ISP4.git
```

```bash {"id":"01HWGTXQH73NBMQ2RNGXCEBQ8N"}
cd integrador_ISP4/API
```

2- Crea un entorno virtual y actívalo:

```bash {"id":"01HWGTXQH73NBMQ2RNH0Y8458S"}
virtualenv venv
```

Windows:

```bash {"id":"01HWGTXQH73NBMQ2RNH21Q7K6K"}
    venv\Scripts\activate  
```

linux:

```bash {"id":"01HWGTXQH73NBMQ2RNH4HYDXNE"}
    source venv/bin/activate
```

3 -Instala las dependencias del proyecto:

```bash {"id":"01HWGTXQH73NBMQ2RNH71FHJ4B"}
pip install -r requirements.txt
```

4- Realiza las migraciones necesarias para preparar la base de datos:

```bash {"id":"01HWGTXQH73NBMQ2RNH8Z0PTTW"}
python manage.py migrate
```

5- Crea un usuario administrador para acceder a la interfaz de administración de Django:

```bash {"id":"01HWGTXQH73NBMQ2RNHA5W8EC7"}
python manage.py createsuperuser
```

### Ejecución

Inicia el servidor de desarrollo:

```bash {"id":"01HWGTXQH73NBMQ2RNHCY8JAXX"}
python manage.py runserver
```

Puedes acceder a la API en http://localhost:8000/.

