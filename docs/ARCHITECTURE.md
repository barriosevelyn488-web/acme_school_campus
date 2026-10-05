# Cómo está organizado el código

La interfaz pide un reporte al servidor. El servidor consulta MySQL y devuelve los resultados para mostrarlos en una tabla o descargarlos como HTML.

```text
Interfaz → ruta → controlador → servicio → repositorio → MySQL
```

## Qué hace cada parte

- `public/index.html` contiene la página.
- `public/css/styles.css` define su apariencia.
- `public/js/models/` contiene los modelos `Student`, `Teacher` y `Course`.
- `public/js/services/ApiService.js` solicita los datos al servidor. Si la API no responde, usa los datos de muestra.
- `public/js/ui/UIRenderer.js` dibuja la tabla y actualiza la página.
- `public/js/ui/HtmlExporter.js` genera el archivo HTML que se descarga.
- `src/routes/` declara las rutas de los reportes.
- `src/controllers/` recibe cada solicitud y responde al navegador.
- `src/services/` valida qué reporte se pidió.
- `src/repositories/` contiene las consultas SQL.
- `src/config/database.js` configura la conexión con MySQL.

## Relación con las tablas

Los estudiantes y profesores tienen un tipo de identificación. Cada estudiante también puede tener una ciudad. Los horarios relacionan un curso, un profesor y un aula. Las inscripciones relacionan estudiantes con horarios; así se puede mostrar en qué curso está cada estudiante. Los temas pertenecen a un curso.

## Principios de diseño

El código separa las tareas: las consultas están en el repositorio, la selección del reporte en el servicio y la respuesta HTTP en el controlador. El servidor crea estos objetos y los conecta entre sí, en vez de hacer que cada módulo abra su propia conexión a la base de datos.

Esto refleja principalmente responsabilidad única e inversión de dependencias. Los principios de sustitución de Liskov y segregación de interfaces no se aplican de forma directa: el proyecto no usa jerarquías de clases ni interfaces propias.
