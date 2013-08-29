subealbus-diff
==============

Archivos necesarios para la aplicación Linea 1, una aplicación de Firefox OS para un sistema de transporte en la ciudad de Lima. Utiliza Builiding Blocks, Zepto.js, OpenLayers y LatLong.

El sistema usa como sistema base los Firefox OS Building Blocks:
* https://github.com/buildingfirefoxos/Building-Blocks

Otras librerías JavaScript usadas en la aplicación:
* Zepto.js
    + http://zeptojs.com/
* OpenLayers
    + https://github.com/openlayers/openlayers/
* Latlong
    + https://github.com/chrisveness/latlong/

Cómo empezar
------------
Los enlaces de descarga son indicados arriba.

1. Descargar Firefox OS Building Blocks y extraer el archivo comprimido.
2. Renombrar la carpeta descomprimida 'Building-Blocks-gh-pages' por un nombre de tu elección, por ejemplo 'MiFirefoxOSApp'.
3. Descargar el archivo http://zeptojs.com/zepto.js y colocarlo en la carpeta 'MiFirefoxOSApp/js'
4. Descargar las demás librerías OpenLayers, latlong.js desde GitHub, extraer su contenido.
5. Mover las carpetas de OpenLayers y latlong.js a 'MiFirefoxOSApp/js', y luego renombrarlas a 'openlayers' y 'latlong' respectivamente (sin la cadena '-master').
6. Finalmente, descargar este repositorio (subealbus-diff), abrir el archivo comprimido, entrar en la carpeta 'subealbus-diff' y extraer sus archivos sobre 'MiFirefoxOSApp'. Como habrá conflicto por archivos que ya existen en Building Blocks, elegir Sobreescribir.

Al concluir estos pasos la aplicación está lista para abrirse:
* Desde Firefox
    + Abrir el archivo 'MiFirefoxOSApp/app.html'
* Firefox OS Simulator (en Firefox, menú Herramientas - Desarrollador web)
    * Add Directory - 'MiFirefoxOSApp/manifest.webapp'

Más información
---------------
Aplicación en el Firefox Marketplace (ligeramente diferente a esta versión)
* https://marketplace.firefox.com/app/subealmetrodelima

Ésta es una aplicación desarrollada por el equipo de Mozilla Perú
* https://www.facebook.com/MozillaPeru
