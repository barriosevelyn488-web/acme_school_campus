# Cómo ejecutar el proyecto

Necesitas Node.js 20 o superior y MySQL 8.

## 1. Instalar dependencias y preparar la configuración

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
npm.cmd install
Copy-Item .env.example .env
```

Abre `.env` y escribe los datos de conexión de tu MySQL. Importa `docs/DATABASE_SCHEMA.sql` con MySQL Workbench o ejecuta este comando si tienes instalado el cliente `mysql`:

```powershell
cmd.exe /c "mysql -u root -p < docs/DATABASE_SCHEMA.sql"
```

El archivo crea la base `acme_school` y agrega algunos registros de ejemplo.

## 2. Iniciar la aplicación

```powershell
npm.cmd start
```

Entra a <http://localhost:3000>. Para que el servidor se reinicie al editar archivos, usa `npm.cmd run dev`.

Si la aplicación no logra conectarse a la API, muestra los datos de ejemplo de `public/js/mockData.js`.

## GitHub Pages

GitHub Pages puede mostrar la interfaz con datos de ejemplo, pero no ejecuta el servidor Node.js ni conecta con MySQL. Para trabajar con la base real, ejecuta la aplicación en un servidor que soporte Node.js y configura allí la conexión a MySQL.

## Git: crear una rama y guardar los cambios

```powershell
git switch -c feature/reportes-campus
git add .
git commit -m "feat: agregar reportes académicos"
```

## Sobre el esquema SQL

`docs/DATABASE_SCHEMA.sql` se preparó usando como referencia el diagrama compartido. Si tienes el archivo SQL original, revisa los nombres y tipos de las columnas antes de usarlo con esa base.
