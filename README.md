# Filtro Dinámico de Productos

Este proyecto consiste en una página web que muestra productos y permite filtrarlos en tiempo real por nombre y categoría usando JavaScript.

Los productos se cargan desde FakeStore API usando fetch. También agregué un arreglo local como respaldo por si el API no responde.

El filtro funciona con:

* un input de búsqueda
* un select de categorías

Cuando el usuario escribe o cambia una categoría, se ejecuta una función que usa filter() para encontrar los productos que coinciden y después vuelve a mostrarlos en pantalla dinámicamente sin recargar la página.

Si no hay coincidencias, aparece un mensaje indicando que no se encontraron productos.

## Archivos

* index.html → estructura de la página
* styles.css → diseño y estilos
* app.js → lógica del proyecto y filtros

## Uso de IA
Usé IA como apoyo para mejorar la organización del código JS y separar mejor las funciones de filtrado, renderizado y carga de datos. También ayudó a simplificar algunas partes del manejo del DOM.