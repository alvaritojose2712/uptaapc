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

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .react('resources/js/components/nominaconfig.jsx', 'public/js/nominaconfig.js');

mix.react('resources/js/components/ce.carreras.jsx', 'public/js/ce.carreras.js');
mix.react('resources/js/components/ce.trayecto.jsx', 'public/js/ce.trayecto.js');
mix.react('resources/js/components/ce.estudiantes.jsx', 'public/js/ce.estudiantes.js');
mix.react('resources/js/components/estudiantes.academico.jsx', 'public/js/estudiantes.academico.js');
mix.react('resources/js/components/profesor/profesor.cargarnotas.jsx', 'public/js/profesor.cargarnotas.js');
mix.react('resources/js/components/login.jsx', 'public/js/login.js');
mix.react('resources/js/components/pre-inscripcion.jsx', 'public/js/pre-inscripcion.js');
mix.react('resources/js/components/estudiante.primerainscripcion.jsx', 'public/js/estudiante.primerainscripcion.js');




