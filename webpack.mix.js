const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
.js('resources/js/app.js', 'public/js')
.sass('resources/sass/app.scss', 'public/css')
.react('resources/js/components/administrativo/index.js', 'public/js/administrativo.js')
.react('resources/js/components/administrativo/presupuesto/cruds/index.js', 'public/js/presupuesto.cruds.js')


.react('resources/js/components/academico/ce.carreras.jsx', 'public/js/ce.carreras.js')
.react('resources/js/components/academico/ce.trayecto.jsx', 'public/js/ce.trayecto.js')
.react('resources/js/components/academico/ce.estudiantes.jsx', 'public/js/ce.estudiantes.js')
.react('resources/js/components/academico/estudiantes.academico.jsx', 'public/js/estudiantes.academico.js')
.react('resources/js/components/academico/profesor/profesor.cargarnotas.jsx', 'public/js/profesor.cargarnotas.js')
.react('resources/js/components/academico/login.jsx', 'public/js/login.js')
.react('resources/js/components/academico/pre-inscripcion.jsx', 'public/js/pre-inscripcion.js')
.react('resources/js/components/academico/estudiante.primerainscripcion.jsx', 'public/js/estudiante.primerainscripcion.js');




