# Sistema de Búsqueda y Recomendación de Libros y Películas
Este proyecto consiste en el desarrollo de un sistema web para la búsqueda y recomendación personalizada de libros y películas, implementado con Spring Boot.

## Descripción del proyecto
Este sistema tiene como objetivo ofrecer a los usuarios una plataforma para descubrir y recibir recomendaciones de libros y películas adaptadas a sus gustos y preferencias. La aplicación implementa un sistema de autenticación robusto y gestión de privilegios de usuario, sentando las bases para la posterior incorporación de algoritmos de recomendación avanzados y funcionalidades adicionales.

  
# Práctica 1

## Estado actual del proyecto
### Fase 1: Implemetada ✅
* Sistema de autenticación y login
* Gestión de usuarios con diferentes niveles de privilegios
* Estructura base del proyecto

### Próximas Fases Planificadas 🚧
* Fase 2: Implementación del catálogo y búsqueda de libros y películas
* Fase 3: Desarrollo del motor de recomendaciones
* Fase 4: Implementación de características sociales y de personalización
* Fase 5: Optimización y escalabilidad

## 🚀 Características
### Implementadas
* Sistema de autenticación seguro con Spring Security
* Gestión de usuarios con diferentes roles y privilegios
* Interfaz de login intuitiva desarrollada con Thymeleaf
* Persistencia de datos de usuario con JPA

### Planificadas
* #### Catálogo extenso de libros y películas con información detallada
* #### Búsqueda avanzada por título, autor, género, año, valoración, etc.
* #### Sistema de recomendaciones personalizadas basado en:
  * Historial de visualización
  * Valoraciones y reseñas
  * Preferencias de género
  * Comportamiento de usuarios similares
* #### Perfil de usuario personalizable con:
  * Lista de favoritos
  * Historial de visualización
  * Valoraciones y reseñas
* #### Funcionalidades sociales:
  * Compartir recomendaciones
  * Ver actividad de amigos
  * Crear y unirse a grupos de lectura/cine

## 🛠️ Tecnologías Utilizadas
### Backend
* Java 21 - Lenguaje de programación principal
* Spring Boot 3.4.2 - Framework para desarrollo de aplicaciones
* Spring Security - Marco de autenticación y control de acceso
* Spring Data JPA - Simplificación del acceso a datos con JPA
* BCrypt - Algoritmo de hash para encriptación de contraseñas

### Base de datos
* MySQL - Base de datos principal

### Frontend
* Thymeleaf - Motor de plantillas del lado del servidor
* HTML5/CSS3 - Estructura y estilos de la interfaz de usuario
* JavaScript - Interactividad del lado del cliente
* Thymeleaf extras para Spring Security - Integración entre Thymeleaf y Spring Security

### Herramientas de Desarrollo y despliegue
* Maven - Gestión de dependencias y construcción del proyecto
* Spring DevTools - Herramientas para desarrollo ágil y recarga en caliente
* Docker - Containerización de la aplicación y servicios
* Docker Compose - Orquestación de contenedores para desarrollo y producción

## 📦 Instalación y Configuración
### Requisitos Previos
* Java Development Kit (JDK) 21 (para desarrollo local)
* Maven 3.6+ (para desarrollo local)
* Docker y Docker Compose (para ejecución en contenedores)
* IDE recomendado: IntelliJ IDEA, Eclipse o Spring Tool Suite (para desarrollo)

### Instalación y Ejecución con Docker (Recomendado)
 #### 1. Clonar el repositorio
```bash
git clone https://github.com/Jaime-Gabriel-Hernandez-Garcia/Proyecto-individual.git
cd Proyecto-individual
```
 #### 2. Iniciar la aplicación con Docker Compose
```bash
docker-compose up 
```
Este comando:

* Construirá la imagen Docker de la aplicación
* Iniciará un contenedor MySQL con la base de datos
* Iniciará la aplicación conectada a la base de datos
* Mapeará el puerto 8080 de tu máquina al puerto 8081 del contenedor

 #### 3. Acceder a la aplicación
* Abrir un navegador y visitar http://localhost:8080

#### 4. Para detener los contenedores
```bash
docker-compose down
```
## Configuración de Docker
El proyecto incluye los siguientes archivos para la configuración de Docker:
### docker-compose.yml
```yml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8081"
    depends_on:
      db:
        condition: service_healthy
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/tarea2?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
      - SPRING_DATASOURCE_USERNAME=admin
      - SPRING_DATASOURCE_PASSWORD=admin
    networks:
      - app-network
    restart: always

  db:
    image: mysql:8.0
    ports:
      - "3308:3306"
    environment:
      - MYSQL_DATABASE=tarea2
      - MYSQL_USER=admin
      - MYSQL_PASSWORD=admin
      - MYSQL_ROOT_PASSWORD=220504
    volumes:
      - mysql-data:/var/lib/mysql
      - ./bd.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - app-network
    restart: always
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      retries: 5
      start_period: 10s

networks:
  app-network:
    driver: bridge

volumes:
  mysql-data:
```

### Dockerfile (Ejemplo Recomendado)
```Dockerfile
FROM maven:3.9-amazoncorretto-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:21-alpine
WORKDIR /app
COPY --from=build /app/target/Recomendaciones-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
```
> **Nota:** Asegúrate de crear este archivo Dockerfile en la raíz de tu proyecto.

## Instalación Local (Sin Docker)

### 📥 Clonar el repositorio:
```bash
git clone https://github.com/Jaime-Gabriel-Hernandez-Garcia/Proyecto-individual.git
cd Proyecto-individual
```
## 🛠️ Configurar la base de datos:

### Crear una base de datos en MySQL:

```sql
CREATE DATABASE recomendaciones_db;
```

### O en PostgreSQL:

```sql
CREATE DATABASE recomendaciones_db;
```
### ⚙️ Configurar las credenciales en `src/main/resources/application.properties`:

```properties
# Para MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/recomendaciones_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Para PostgreSQL (comentar la configuración de MySQL y descomentar estas líneas)
# spring.datasource.url=jdbc:postgresql://localhost:5432/recomendaciones_db
# spring.datasource.username=tu_usuario
# spring.datasource.password=tu_contraseña
# spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```
### 🏗️ Compilar y empaquetar la aplicación:

```bash
mvn clean package
```

### 🚀 Ejecutar la aplicación:

```bash
java -jar target/Recomendaciones-0.0.1-SNAPSHOT.jar
```

### O utilizando Maven:

```bash
mvn spring-boot:run
```

### 🌐 Acceder a la aplicación:

Abrir un navegador y visitar: [http://localhost:8080](http://localhost:8080)

## 🔧 Estructura del Proyecto
```
src/
├── main/
│   ├── java/
│   │   └── mx/
│   │       └── ipn/
│   │           └── escom/
│   │               └── Recomendaciones/
│   │                   ├── auth/                    # Autenticación y seguridad
│   │                   │   ├── config/              # Configuración de seguridad
│   │                   │   ├── model/               # Modelos para autenticación
│   │                   │   └── RecomendacionesApplication.java    # Clase principal
│   │                   ├── controller/              # Controladores MVC
│   │                   │   └── AuthController.java  # Controlador de autenticación
│   │                   ├── model/                   # Entidades y modelos
│   │                   │   ├── User.java            # Modelo de usuario
│   │                   │   └── Role.java            # Roles y privilegios
│   │                   ├── repository/              # Repositorios JPA
│   │                   │   └── UserRepository.java  # Repositorio de usuarios
│   │                   └── service/                 # Lógica de negocio
│   │                       └── UserService.java     # Servicio de usuarios
│   └── resources/
│       ├── static/                      # Recursos estáticos (CSS, JS)
│       ├── templates/                   # Plantillas Thymeleaf
│       │   ├── auth/                    # Plantillas de autenticación
│       │   │   ├── login.html           # Página de inicio de sesión
│       │   │   └── register.html        # Página de registro
│       │   ├── fragments/               # Fragmentos reutilizables
│       │   └── index.html               # Página principal
│       └── application.properties       # Configuración de la aplicación
├── docker-compose.yml                   # Configuración de Docker Compose
├── Dockerfile                           # Configuración para imagen Docker
├── bd.sql                               # Script de inicialización de BD
└── test/                                # Pruebas unitarias e integración
```

## 🌍 Gestión del Entorno

### 🔧 Variables de Entorno

Las variables de entorno se configuran en el archivo `docker-compose.yml` y se pueden modificar según las necesidades.

#### 🔹 Para la aplicación:

- **`SPRING_DATASOURCE_URL`**: URL de conexión a la base de datos  
- **`SPRING_DATASOURCE_USERNAME`**: Usuario de la base de datos  
- **`SPRING_DATASOURCE_PASSWORD`**: Contraseña de la base de datos  

#### 🔹 Para la base de datos:

- **`MYSQL_DATABASE`**: Nombre de la base de datos  
- **`MYSQL_USER`**: Usuario para la base de datos  
- **`MYSQL_PASSWORD`**: Contraseña para el usuario  
- **`MYSQL_ROOT_PASSWORD`**: Contraseña para el usuario root  


## 📝 Guía de Desarrollo

### 📌 Para Añadir Nuevas Entidades

1. Crear la clase de modelo en el paquete `model`.  
2. Crear el repositorio en el paquete `repository`.  
3. Implementar el servicio en el paquete `service`.  
4. Crear el controlador en el paquete `controller`.  
5. Desarrollar las plantillas **Thymeleaf** en el directorio `templates`.  

### 🔐 Para Gestionar la Seguridad

- Configurar roles y permisos en `SecurityConfig.java`.  
- Usar anotaciones `@PreAuthorize` para controlar acceso a nivel de método.  
- En plantillas **Thymeleaf**, utilizar `sec:authorize` para mostrar/ocultar elementos según los roles.  

### 🛠️ Para Gestionar la Configuración Docker

- Modificar el archivo `docker-compose.yml` para ajustar puertos, volúmenes o variables de entorno.  
- Actualizar el `Dockerfile` si se requieren cambios en la construcción de la imagen.  

### 🚀 Para entornos de producción, considerar:

- Separar la configuración en archivos `docker-compose.dev.yml` y `docker-compose.prod.yml`.  
- Implementar redes Docker más seguras.  
- Configurar **HTTPS** con certificados.  

## 📺Pantallas Ejemplos
### Login
![image](https://github.com/user-attachments/assets/7019052d-4b54-47ca-9442-c7b071d93237)

### Registor
![image](https://github.com/user-attachments/assets/c7be381a-f10d-436d-ac7b-cc44f4375fa5)

### Inicio
![image](https://github.com/user-attachments/assets/14355cdc-3527-4317-82f5-72845b3221f4)

### Admin
![image](https://github.com/user-attachments/assets/603416c7-f3b7-4e67-8dcb-5458f19708d7)


# Práctica 2

## Glosario de Términos

- API: Interfaz de Programación de Aplicaciones, permite obtener datos de fuentes externas.

- ETL: Proceso de Extracción, Transformación y Carga de datos.

- Recomendación Multimodal: Sugerencias que abarcan diferentes tipos de contenido (libros, series, videojuegos, anime).

- Almacén de datos: Sistema para el almacenamiento centralizado de información con fines analíticos.

## Descripción de los Usuarios del Sistema
- Usuario Registrado: Persona que se registra en la plataforma para acceder a recomendaciones personalizadas.
- Administrador: Encargado de gestionar contenido, usuarios, configuración del sistema y monitoreo de logs.

## Restricciones y Suposiciones
- Se asume disponibilidad de conexión a internet para consumir APIs externas.
- Las APIs públicas podrían tener límites de uso por día.
- El sistema requerirá procesos programados para cargar datos ETL a intervalos regulares.

## Casos de uso
### Actores:
- Usuario Registrado
- Administrador

### Casos de Uso Identificados:
- Registrarse en el sistema
- Iniciar sesión
- Ver perfil de usuario
- Editar perfil
- Cambiar tema claro/oscuro
- Buscar contenido
- Ver recomendaciones personalizadas
- Ver detalles de un contenido
- Guardar contenido como favorito
- Ver historial de búsquedas
- Reportar contenido incorrecto
- Configurar preferencias de usuario
- Agregar API de terceros (admin)
- Ejecutar procesos ETL (admin)
- Ver reportes analíticos (admin)
- Gestionar usuarios (admin)

## 📋 Especificación de casos de uso

### **CU01 - Registrarse en el sistema**  

| **Campo**            | **Detalle**                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| **ID**               | CU01                                                                       |
| **Nombre**           | Registrarse en el sistema                                                  |
| **Actor**            | Usuario                                                                    |
| **Descripción**      | Permite al usuario registrarse para usar el sistema y obtener recomendaciones personalizadas. |                                 
| **Precondiciones**   | No haber iniciado sesión.                                                  |
| **Postcondiciones**  | Usuario registrado y sesión iniciada.                                      |

#### **Flujo Principal**:  
1. Usuario accede a la página de registro.  
2. Llena los campos obligatorios (nombre, email, contraseña).  
3. El sistema valida y crea la cuenta.  

#### **Flujos Alternativos**:  
- **FA1**: Email ya registrado → El sistema muestra mensaje de error.  

#### **Requisitos Especiales**:  
- Validación de email y contraseña segura (mínimo 8 caracteres, mayúsculas, números).  

---

### **CU02 - Iniciar sesión**

| Campo             | Descripción                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **ID**            | CU02                                                                       |
| **Nombre**        | Iniciar sesión                                                             |
| **Actor**         | Usuario                                                                    |
| **Descripción**   | Permite al usuario acceder a su cuenta.                                    |
| **Precondición**  | Tener una cuenta registrada.                                               |
| **Postcondición** | Sesión iniciada y acceso a funcionalidades.                                |

#### **Flujo Principal**:  
1. Usuario ingresa email y contraseña.
2. El sistema valida las credenciales.
3. Acceso concedido.

#### **Flujos Alternativos**:  
- FA1: Credenciales incorrectas → Mensaje de error.
- FA2: Cuenta no existe → Redirigir a registro.

----
### **CU03 -  Ver perfil de usuario**

| Campo             | Descripción                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **ID**            | CU03                                                                       |
| **Nombre**        | Ver perfil de usuario                                                      |
| **Actor**         | Usuario                                                                    |
| **Descripción**   | Visualizar información personal y actividad.                                |
| **Precondición**  | Sesión iniciada.                                                           |
| **Postcondición** | Perfil mostrado.                                                           |

#### **Flujo Principal**:
1. Usuario navega a "Mi perfil".
2. El sistema muestra datos (nombre, email, favoritos, historial).

---

### **CU04 -  Editar perfil**

| Campo             | Descripción                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **ID**            | CU04                                                                       |
| **Nombre**        | Editar perfil                                                              |
| **Actor**         | Usuario                                                                    |
| **Descripción**   | Modificar información personal.                                            |
| **Precondición**  | Sesión iniciada.                                                           |
| **Postcondición** | Datos actualizados.                                                        |

**Flujo Principal**:
1. Usuario edita campos (ej: nombre, foto).
2. Guarda cambios.
3. Sistema valida y actualiza.

**Flujos Alternativos**:
- FA1: Campos inválidos → Error.
---
### **CU05 -  Cambiar tema**

| Campo             | Descripción                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **ID**            | CU05                                                                       |
| **Nombre**        | Cambiar tema                                                               |
| **Actor**         | Usuario                                                                    |
| **Descripción**   | Alternar entre modos de visualización.                                     |
| **Precondición**  | Sesión iniciada.                                                           |
| **Postcondición** | Tema aplicado en la interfaz.                                              |

**Flujo Principal**:
1. Usuario selecciona "Tema oscuro/claro" en configuración.
2. Sistema aplica el cambio.

---
### **CU06 - Buscar contenido**
| Campo             | Descripción                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **ID**            | CU06                                                                       |
| **Nombre**        | Buscar contenido                                                           |
| **Actor**         | Usuario                                                                    |
| **Descripción**   | Encontrar contenido por palabras clave.                                    |
| **Precondición**  | Ninguna.                                                                   |
| **Postcondición** | Resultados mostrados.                                                      |

**Flujo Principal**:
1. Usuario ingresa término de búsqueda.
2. Sistema muestra resultados relevantes.

**Flujos Alternativos**:
- FA1: Sin resultados → Mensaje "No encontrado".
---
### **CU07 - Ver recomendaciones personalizadas**

| Campo             | Descripción                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **ID**            | CU07                                                                       |
| **Nombre**        | Ver recomendaciones personalizadas                                         |
| **Actor**         | Usuario                                                                    |
| **Descripción**   | Muestra contenido recomendado basado en preferencias y actividad del usuario. |
| **Precondición**  | Sesión iniciada y preferencias configuradas.                               |
| **Postcondición** | Lista de recomendaciones generada.                                         |

**Flujo Principal**:
1. Usuario accede a la sección "Recomendaciones".
2. El sistema filtra contenido según historial y preferencias.
3. Muestra cards con títulos relevantes.

**Flujos Alternativos**:
- FA1: Sin datos suficientes → Recomendaciones genéricas.
---
### **CU08 - Ver detalles de un contenido**
| Campo             | Descripción                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **ID**            | CU08                                                                       |
| **Nombre**        | Ver detalles de contenido                                                  |
| **Actor**         | Usuario                                                                    |
| **Descripción**   | Muestra información extendida (sinopsis, rating, etc.) de un item.         |
| **Precondición**  | Contenido existente en el sistema.                                         |
| **Postcondición** | Detalles cargados en pantalla.                                             |

**Flujo Principal**:
1. Usuario selecciona un contenido.
2. Sistema despliega metadata + botones (favorito, reportar).
---
### **CU09 - Guardar contenido como favorito**
| Campo             | Descripción                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **ID**            | CU09                                                                       |
| **Nombre**        | Guardar favorito                                                           |
| **Actor**         | Usuario                                                                    |
| **Descripción**   | Añade un contenido a la lista "Favoritos".                                 |
| **Precondición**  | Sesión iniciada y contenido visto.                                         |
| **Postcondición** | Item almacenado en favoritos.                                              |

**Flujo Principal**:
1. Usuario hace clic en "❤️ Guardar".
2. Sistema actualiza la lista.

**Flujos Alternativos**:
- FA1: Ya está en favoritos → Opción para remover.
---
### **CU10 - Ver historial de búsquedas**
| Campo             | Descripción                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **ID**            | CU10                                                                       |
| **Nombre**        | Ver historial                                                              |
| **Actor**         | Usuario                                                                    |
| **Descripción**   | Muestra términos buscados previamente.                                     |
| **Precondición**  | Tener búsquedas realizadas.                                                |
| **Postcondición** | Historial cargado.                                                         |

**Flujo Principal**:
1. Usuario navega a "Historial".
2. Sistema lista búsquedas ordenadas por fecha.

**Requisitos Especiales**:
- Opción para borrar historial.
---
### **CU11 - Reportar contenido incorrecto**
| Campo             | Descripción                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **ID**            | CU11                                                                       |
| **Nombre**        | Reportar contenido                                                         |
| **Actor**         | Usuario                                                                    |
| **Descripción**   | Envía una alerta sobre contenido inapropiado/erróneo.                      |
| **Precondición**  | Contenido visible.                                                         |
| **Postcondición** | Reporte enviado a admin.                                                   |

**Flujo Principal**:
1. Usuario hace clic en "Reportar".
2. Selecciona motivo (ej: "Información falsa").
3. Sistema notifica al admin.
---
### **CU12 - Configurar preferencias de usuario**
| Campo             | Descripción                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **ID**            | CU12                                                                       |
| **Nombre**        | Configurar preferencias                                                    |
| **Actor**         | Usuario                                                                    |
| **Descripción**   | Personaliza categorías de interés (ej: géneros, idiomas).                  |
| **Precondición**  | Sesión iniciada.                                                           |
| **Postcondición** | Preferencias guardadas.                                                    |

**Flujo Principal**:
1. Usuario edita preferencias en "Ajustes".
2. Sistema aplica cambios a recomendaciones.

## Priorización del Caso de Uso Principal

### Caso de uso principal elegido: CU-03: Buscar contenido (películas y libros)

**Justificación:**
- Valor para el usuario: Es la función base del sistema, la puerta de entrada a todas las recomendaciones.
- Complejidad técnica: Implica consumo de múltiples APIs, procesamiento, posibles filtros.
- Dependencias: Se relaciona directamente con recomendaciones, favoritos, y registros de búsqueda.
Este caso de uso representa el corazón del sistema, ya que sin él no se puede acceder al resto de funcionalidades clave.

## Diagramas de Casos de Uso 
![image](https://github.com/user-attachments/assets/50609aed-063e-4d69-80cd-917b0d8a7c2e)


## 📬 Contacto

Si tienes dudas, sugerencias o deseas contribuir a este proyecto, puedes contactarme a través de:

- 📧 **Correo Electrónico:** [jaimegabrielhernandezgarcia@hotmail.com](mailto:tucorreo@example.com)
- 🐙 **GitHub:** [Jaime-Gabriel-Hernandez-Garcia](https://github.com/Jaime-Gabriel-Hernandez-Garcia)

¡Estoy abierto a sugerencias y mejoras para este proyecto! 🚀



