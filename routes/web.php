<?php
use Illuminate\Http\Request;

Route::group(['middleware' => ['guest']], function () {
	Route::get('/sinapsis', "Auth\LoginController@showLoginForm");
	Route::get('/', function(){
		return redirect("/blog/");
	})->name("home");


} );

	Route::get('/getCensoEstatus', 'Auth\LoginController@getCenso');


// Route::get('/seminario/pdf/{id}', "EstudianteController@pdf");
// Route::get('/seminario/items', "EstudianteController@items");
// Route::resource('/seminario', "EstudianteController");


Route::get('iniciar', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('iniciar', 'Auth\LoginController@login');
Route::post('salir', 'Auth\LoginController@logout')->name('logout');

Route::get('registro', 'EstudianteController@preInscripcionForm')->name('register');
Route::post('registro', 'EstudianteController@preInscripcion');

Route::get("/controlEstudios/carreras","CarreraController@index");
Route::post('/getAuthId', 'Auth\LoginController@getAuthId');

//Valores Personal
Route::resource('/config/valores', "SnoValoresPersonalController");

Route::get("createadmin",function()
{
    	DB::table('personals')->insert([
						'nombre' => "admin",
						'apellido' => "ospino",
						'cedula' => 23232323,
						'nacionalidad' => "V",
						'genero' => "Masculino",
						'fecha_nacimiento' => "2020-07-07",
						"estado_civil"=>NULL,
						'telefono_1' => "02409940789",
						'telefono_2' => NULL,
						'grado_instruccion' => NULL,
						"direccion"=>NULL,
						'fecha_ingreso' => NULL,
						'antiguedad_otros_ieu' => NULL,
						'correo' => "admin@gmail.com",
						'categoria' => NULL,
						'cargo' => NULL,
						'dedicacion' => NULL,
						'estado' => NULL,
						'estatus' => NULL,
						'caja_ahorro' => '0',
						'cuenta_bancaria' => '001750090232323',
						'hrs_nocturnas' => '0',
						'hrs_feriadas' => '0',
						'hrs_diurnas' => '0',
						'hrs_feriadas_nocturnas' => '0',
						'profesion' => 'Informático',
						'departamento_adscrito' => 'PNFI',
						'cargo_departamento' => 'Coordinador',
						"password"=>Hash::make("12345678"),

						"nameFolder"=>"public/docsEstudiante/ 2020-03-27 1585268890",
		                "file_cedula"=>"storage/docsEstudiante/ 2020-03-27 1585268890/file_cedula.jpeg",
		                "file_fondo_negro"=>"storage/docsEstudiante/ 2020-03-27 1585268890/file_fondo_negro.jpeg",
		                "file_notas"=>"storage/docsEstudiante/ 2020-03-27 1585268890/file_notas.jpeg",
		                
		                "role" => 1,
					]);
});




Route::group(['middleware' => ['admin']], function () {
	Route::get("/admin","AdminController@index")->name("admin");

	//Verificar Cuenta
	Route::get("/gestionar/estudiante","AdminController@verificarCuenta")->name("gestionar.estudiante");
	// Route::get("/verificarCuentaItems/{t}","AdminController@verificarCuentaItems")->name("verificarCuenta.items");
	# Route::get("/verificarCuentaProcesar/","AdminController@verificarCuentaProcesar")->name("verificarCuenta.procesar");
	// Route::get("/verificarCuentaShow/{t}","AdminController@verificarCuentaShow")->name("verificarCuenta.show");
	// Route::post("/verificarCuentaDelete","AdminController@verificarCuentaDelete")->name("verificarCuenta.delete");

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

	// Route::get("/admin/carreras");


	// Crud Carreras
	Route::get("/controlEstudios/carrera","CarreraController@viewIndex")->name("ce.carreras.index");
	// Route::get("/controlEstudios/carreras","CarreraController@index"); LINEA 24
	Route::post("/controlEstudios/carrera","CarreraController@store");
	Route::delete("/controlEstudios/carrera","CarreraController@destroy");
	Route::put("/controlEstudios/carrera","CarreraController@update");	

	Route::post("/controlEstudios/carrera/categorias","CategoriaController@store");
	Route::delete("/controlEstudios/carrera/categorias","CategoriaController@destroy");
	Route::put("/controlEstudios/carrera/categorias","CategoriaController@update");


	Route::get("/controlEstudios/carreras/uc","UcController@index");
	Route::post("/controlEstudios/carrera/uc","UcController@store");
	Route::delete("/controlEstudios/carrera/uc","UcController@destroy");
	Route::put("/controlEstudios/carrera/uc","UcController@update");


	Route::get("/controlEstudios/carrera/secciones","SeccionController@index");
	Route::post("/controlEstudios/carrera/seccion","SeccionController@store");
	Route::delete("/controlEstudios/carrera/seccion","SeccionController@destroy");
	Route::put("/controlEstudios/carrera/seccion","SeccionController@update");

	
	Route::post("/controlEstudios/carrera/prela","PrelacionesUcController@store");
	Route::delete("/controlEstudios/carrera/prela","PrelacionesUcController@destroy");



	Route::get("/controlEstudios/trayecto","TrayectoController@viewIndex")->name("ce.trayecto.index");
	Route::get("/controlEstudios/trayectos","TrayectoController@index");
	Route::post("/controlEstudios/trayectos","TrayectoController@store");

	Route::get("/controlEstudios/estudiante","EstudianteController@viewIndex")->name("ce.estudiantes.index");
	Route::get("/controlEstudios/estudiantes","EstudianteController@index");
	Route::post("/controlEstudios/estudiantes/verificar","EstudianteController@verificar");
	
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
	Route::get('/rrhh/administrar/personal/', "personalController@view")->name("rrhh.personal");
	Route::resource('/rrhh/personal', "personalController");
	
	

	//Divisiones Global
	Route::resource('/config/divisiones', "DivisionesGlobalController");
	
	// Route::resource('/rrhh/hijos_personal', "hijos_personal");
	// Route::get('/rrhh/personal', function(){
	//     return view("recursos_humanos.personal.index");
	// });
	// Route::get('/rrhh/infoNomina/{id}', 'infoNominaController@index');

	//PRESUPUESTO
	
	
	Route::get('/presupuesto', "presupuestoController@index")->name("presupuesto.index");
	Route::get('/presupuesto/cruds', "presupuestoController@cruds");
	Route::resource('/presupuesto/partidas', "partidasController");
	Route::resource('/presupuesto/acciones_especificas', "Acciones_especificasController");
	Route::resource('/presupuesto/movimientos_presupuestarios', "Movimientos_presupuestariosController");
	Route::resource('/presupuesto/acciones_proyectos', "accionesProyectosController");
	Route::resource('/presupuesto/presupuesto_ordinario', "presupuestoOrdinarioController");
	// Route::resource('/presupuesto/credito_adicional', "creditoAdicionalController");
	Route::resource('/global/valores', "SnoValoresPersonalController");


	//
	
	

});
Route::group(['middleware' => ['profesor']], function () {
	Route::get("/profesor","ProfesorController@dashboard")->name("profesor");
	Route::get("/profesor/cargar/notas","ProfesorController@cargarnotas")->name("profesor.cargarnotas");
	Route::post("/profesor/cargar/notas","ProfesorController@nota");
	Route::get("/profesor/academico","ProfesorController@academico");


	
	
});
Route::group(['middleware' => ['estudiante']], function () {

	Route::get("/estudiante","EstudianteController@dashboard")->name("estudiante");

	Route::get("/requisitos","EstudianteController@primerainscripcion")->name("primerainscripcion");
	Route::post("/requisitos","EstudianteController@primerainscripcionStore")->name("primerainscripcion.store");

	Route::get("/estudiante/academico","EstudianteController@academicoIndex")->name("estudiantes.academico");
	Route::get("/estudiante/academicos","EstudianteController@academico");
	
	Route::put("/estudiante/academicos","EstudianteController@inscribir");


});


