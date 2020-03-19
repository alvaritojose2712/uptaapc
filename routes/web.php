<?php
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});



// Route::get('/seminario/pdf/{id}', "EstudianteController@pdf");
// Route::get('/seminario/items', "EstudianteController@items");
// Route::resource('/seminario', "EstudianteController");


Route::get('iniciar', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('iniciar', 'Auth\LoginController@login');
Route::post('salir', 'Auth\LoginController@logout')->name('logout');

Route::get('registro', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('registro', 'Auth\RegisterController@register');


Route::group(['middleware' => ['admin']], function () {
	Route::get("/admin","AdminController@index")->name("admin");

	//Verificar Cuenta
	Route::get("/verificarCuenta/{t}","AdminController@verificarCuenta")->name("verificarCuenta");
	Route::get("/verificarCuentaItems/{t}","AdminController@verificarCuentaItems")->name("verificarCuenta.items");
	Route::get("/verificarCuentaProcesar/","AdminController@verificarCuentaProcesar")->name("verificarCuenta.procesar");
	Route::get("/verificarCuentaShow/{t}","AdminController@verificarCuentaShow")->name("verificarCuenta.show");
	Route::post("/verificarCuentaDelete","AdminController@verificarCuentaDelete")->name("verificarCuenta.delete");

/*____________________Controller Común___________________________
	Crud Carreras
	Route::get("/carreracreate","CarreraController@create")->name("carrera.create");
	Route::post("/carrerastore","CarreraController@store")->name("carrera.store");
	Route::get("/carrera","CarreraController@index")->name("carrera.index");
	Route::get("/carreraitems","CarreraController@items")->name("carrera.items");
	Route::get("/carreraedit","CarreraController@edit")->name("carrera.edit");
	Route::post("/carreraupdate","CarreraController@update")->name("carrera.update");
	Route::post("/carreradelete","CarreraController@destroy")->name("carrera.destroy");
____________________Controller Común___________________________*/

// ____________________Controller Async___________________________
	
// ____________________Controller Async___________________________

	Route::get("/controlEstudios/profesores","ProfesorController@index");

	// Route::get("/admin/carreras");

	// Asignatura

	Route::get("/controlEstudios/asignatura","AsignaturaController@viewIndex")->name("ce.asignatura.index");
	Route::get("/controlEstudios/asignaturas","AsignaturaController@index");
	Route::post("/controlEstudios/asignaturas","AsignaturaController@store");
	Route::delete("/controlEstudios/asignaturas","AsignaturaController@destroy");


	// Crud Carreras
	Route::resource("/controlEstudios/carreras","CarreraController@viewIndex")->name("ce.carreras.index");



	//Crud Unidad Curricular

	// Recursos Humanos

	Route::get('/rrhh/nomina/{id}/{inicio}/{cierre}/{unique?}', "SnoNominasController@show")->name("runnomina");
	Route::get('/rrhh/nomina/', "SnoNominasController@index")->name("nominas");
	Route::get('/rrhh/nomina/items', "SnoNominasController@items")->name("nominas.items");
	Route::get('/rrhh/nomina/prerunnomina', "SnoNominasController@prerunnomina")->name("nominas.prerunnomina");
	Route::get('/rrhh/nomina/getParametersNomina', "SnoNominasController@getParametersNominajson")->name("nominas.getParametersNomina");
	Route::get('/rrhh/nomina/config/{id_nomina}', "SnoNominasController@configNomina")->name("nominas.configNomina");
	Route::get('/rrhh/nomina/crear', "SnoNominasController@create")->name("nominas.crear");
	Route::post('/rrhh/nomina/crear', "SnoNominasController@store")->name("nominas.store");
	Route::post('/rrhh/nomina/actualizar', "SnoNominasController@update")->name("nominas.update");
	Route::get('/rrhh/nomina/eliminar', "SnoNominasController@destroy")->name("nominas.destroy");
	//Fórmulas RRHH
	Route::resource('/rrhh/formulas', "SnoFormulasController");

	//Sueldos RRHH
	Route::resource('/rrhh/sueldos', "SnoTablasSueldosController");

	//Ut RRHH
	Route::resource('/rrhh/ut', "SnoUnidadTributariaController");

	//Personal RRHH
	Route::resource('/rrhh/personal', "personalController");
	
	//Valores Personal
	Route::resource('/config/valores', "SnoValoresPersonalController");

	//Divisiones Global
	Route::resource('/config/divisiones', "DivisionesGlobalController");
	
	// Route::resource('/rrhh/hijos_personal', "hijos_personal");
	// Route::get('/rrhh/personal', function(){
	//     return view("recursos_humanos.personal.index");
	// });
	// Route::get('/rrhh/infoNomina/{id}', 'infoNominaController@index');

	//PRESUPUESTO
	Route::get('/presupuesto/', function(){
	    return view("presupuesto.index");
	});
	Route::resource('/presupuesto/partidas', "partidasController");
	Route::resource('/presupuesto/acciones_especificas', "Acciones_especificasController");
	Route::resource('/presupuesto/movimientos_presupuestarios', "Movimientos_presupuestariosController");
	Route::resource('/presupuesto/acciones_proyectos', "accionesProyectosController");
	Route::resource('/presupuesto/presupuesto_ordinario', "presupuestoOrdinarioController");
	Route::resource('/presupuesto/credito_adicional', "creditoAdicionalController");
	Route::resource('/global/valores', "SnoValoresPersonalController");


	//
	
	

});
Route::group(['middleware' => ['profesor']], function () {
	Route::get("/profesor","ProfesorController@dashboard")->name("profesor");

	Route::get("/requisitosProfesor","ProfesorController@cargarprofesor")->name("cargarprofesor");
	Route::post("/requisitosProfesor","ProfesorController@cargarprofesorStore")->name("cargarprofesor.store");
	
});
Route::group(['middleware' => ['estudiante']], function () {

	Route::get("/estudiante","EstudianteController@index")->name("estudiante");
	Route::get("/requisitos","EstudianteController@primerainscripcion")->name("primerainscripcion");
	Route::post("/requisitos","EstudianteController@primerainscripcionStore")->name("primerainscripcion.store");

});


