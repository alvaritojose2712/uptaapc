
import React, {Component} from 'react';

export const Headestudiante = prop => (
	<div className="container-fluid">
		<div className="row mb-2">
			<div className="col-md-auto">
				<img title={prop.estudiante.id} src={`${prop.loc}/${prop.estudiante.file_foto}`} alt="Foto de perfil" className="img-lg" />
			</div>
			<div className="col align-items-center d-flex">
				<div className="">
					<span className="">{ prop.estudiante.cedula }</span>
					<h2 className="">
						{ prop.estudiante.nombre } { prop.estudiante.apellido }
					</h2>
					<h3><span className="badge badge-secondary">{prop.estudiante.nombrecarrera?prop.estudiante.nombrecarrera.nombre:"Sin carrera"}</span></h3>
					{prop.estudiante.verificado
						?<h5 className=" badge-success badge">Verificado</h5>
						:<h5 className=" badge-primary badge">Pendiente de verificación</h5>
					}
				</div>
			</div>
		</div>
	</div>
)

export const Generalestudiante = props => {
	let {loc,modo,estudiante} = props
	let {
			// Globals	
			nombre,
			apellido,
			cedula, 
			nacionalidad,//->Foreign
			genero,//->Foreign
			estado_civil,//->Foreign
			direccion,  
			fecha_nacimiento,
			telefono_1,
			telefono_2,
			correo,
			cuenta_bancaria,
			observacion,
			n_carnet,
			calzado,
			gorra,
			camisa,
			pantalon,
			file_cedula,
			file_foto,

			// Estudiante
			trabaja,  
			file_notas,
			file_fondo_negro,

			// Trabajador
			categoria,//->Foreign
			cargo,//->Foreign
			dedicacion,//->Foreign
			estado,//->Foreign
			estatus,//->Foreign
			grado_instruccion,//->Foreign
			fecha_ingreso,
			caja_ahorro,  
			antiguedad_otros_ieu,
			hrs_nocturnas, 
			hrs_feriadas, 
			hrs_diurnas, 
			hrs_feriadas_nocturnas, 
			profesion,//->Foreign
			departamento_adscrito,//->Foreign
			cargo_departamento,//->Foreign
			// file_const_traba,
			file_sintesis,
			// file_pago,

			hijos,
		} = estudiante
	return (
		<div className="container-fluid">
		<div className="row">
			<div className="col">
				<table className="table">
					<tbody>

						<tr className="head-division-estudiante">
							<td colSpan="2" className="text-center tr-separate-sections-table">
								<span className="">Datos personales</span>
							</td>
						</tr>

						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Nombres</td>
							<td className="">
								{nombre} 
							</td>
						</tr>
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Apellidos</td>
							<td className="">
								{apellido} 
							</td>
						</tr>
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Cédula de Identidad</td>
							<td className="">
								{cedula} 
							</td>
						</tr>
						
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">N° Carnet de la Patria</td>
							<td className="">
								{n_carnet} 
							</td>
						</tr>

						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Nacionalidad</td>
							<td className="">
								{nacionalidad}
							</td>
						</tr>

						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Género</td>
							<td className="">
								{genero}
							</td>
						</tr>
						
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Fecha de Nacimiento</td>
							<td className="">
								{fecha_nacimiento} 
							</td>
						</tr>

						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Estado Civil</td>
							<td className="">
								{estado_civil}
							</td>
						</tr>

						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Cuenta Bancaria</td>
							<td className="">
								{cuenta_bancaria} 
							</td>
						</tr>
						
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Obeservación</td>
							<td>
								{observacion}
							</td>
						</tr>
						
						{modo==="estudiante"?
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">¿Trabaja?</td>
							<td className="">
								{trabaja?"Sí":"No"}
							</td>
						</tr>
						:null}
						
					

						

						<tr className="head-division-estudiante">
							<td colSpan="2" className="text-center tr-separate-sections-table">
								<span className="">Contacto</span>
							</td>
						</tr>
						
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Dirección</td>
							<td>
								{direccion}
							</td>
						</tr>
						
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold"><i className="fa fa-phone"></i> Teléfono 1</td>
							<td>
								{telefono_1} 
							</td>
						</tr>
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold"><i className="fa fa-phone"></i> Teléfono 2</td>
							<td>
								{telefono_2} 
							</td>
						</tr>
						
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold"><i className="fa fa-envelope"></i> Correo Electrónico</td>
							<td>
								{correo} 
							</td>
						</tr>
						
						{modo==="trabajador"?
						<React.Fragment>
							<tr className="head-division-estudiante">
								<td colSpan="2" className="text-center tr-separate-sections-table">
									<span className="">Datos institucionales</span>
								</td>
							</tr>
							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Categoría</td>
								<td className="">
									{categoria}
								</td>
							</tr>

							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Cargo</td>
								<td className="">
									{cargo}
								</td>
							</tr>

							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Dedicación</td>
								<td className="">
									{dedicacion}
								</td>
							</tr>


							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Estado</td>
								<td className="">
									{estado}
								</td>
							</tr>
							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Estatus</td>
								<td className="">
									{estatus}
								</td>
							</tr>
							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Grado de Instrucción</td>
								<td className="">
									{grado_instruccion}
								</td>
							</tr>


							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Departamento Adscrito</td>
								<td className="">
									{departamento_adscrito}
								</td>
							</tr>
							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Cargo desempeñado en el departamento</td>
								<td className="">
									{cargo_departamento}
								</td>
							</tr>
							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Profesión</td>
								<td className="">
									{profesion}
								</td>
							</tr>

							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">¿Aplica Caja de Ahorro?</td>
								<td className="">
									{caja_ahorro?"Sí":"No"}
								</td>
							</tr>

							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Fecha de Ingreso</td>
								<td className="">
									{fecha_ingreso} 
								</td>
							</tr>

							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Años en otros (IEU)</td>
								<td>
									{antiguedad_otros_ieu} 
								</td>
							</tr>

							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Horas Nocturnas</td>
								<td>
									{hrs_nocturnas} 
								</td>
							</tr>
							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Horas Feriadas</td>
								<td>
									{hrs_feriadas} 
								</td>
							</tr>
							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Horas Diurnas</td>
								<td>
									{hrs_diurnas} 
								</td>
							</tr>
							<tr>
								<td className="cabezera-tabla-vertical text-right font-weight-bold">Horas Feriadas nocturnas</td>
								<td>
									{hrs_feriadas_nocturnas} 
								</td>
							</tr>

						</React.Fragment>
						:null}

						<tr className="head-division-estudiante">
							<td colSpan="2" className="text-center tr-separate-sections-table">
								<span className="">Tallas</span>
							</td>
						</tr>
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Camisa</td>
							<td>
								{camisa} 
							</td>
						</tr>
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Pantalón</td>
							<td>
								{pantalon} 
							</td>
						</tr>
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Gorra</td>
							<td>
								{gorra} 
							</td>
						</tr>
						<tr>
							<td className="cabezera-tabla-vertical text-right font-weight-bold">Calzado</td>
							<td>
								{calzado} 
							</td>
						</tr>
						
						{modo==="trabajador"?
							<React.Fragment>
								<tr className="head-division-estudiante">
									<td colSpan="2" className="text-center tr-separate-sections-table">
										<span>Familiares <i className="fa fa-plus hover" onClick={()=>this.updateMode("hijos",null,null,"addNew")}></i></span>
									</td>
								</tr>
								<tr>
									<td colSpan="2">
										<table className="table">
											<thead>
												<tr>
													<th>Parentesco</th>
													<th>Nombres</th>
													<th>Apellidos</th>
													<th>Género</th>
													<th>Fecha de nacimiento</th>
													<th>Cédula</th>
													<th>Correo Electrónico</th>
													<th>Teléfono</th>
													<th>¿Discapacidad?</th>
													<th>¿Estudia?</th>
												</tr>
											</thead>
											<tbody>
												{hijos.map((fa,ifa)=>
													<tr key={ifa} className={(fa.type==="delete"?"opacity-md":"")}>
														<td>
															<select className="form-control" disabled={!fa.type||fa.type==="delete"?true:false} value={fa.parentesco} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","parentesco")}>
																<option value="Hijo/a">Hijo/a</option>
																<option value="Madre">Madre</option>
																<option value="Padre">Padre</option>
														  </select>
														</td>
														<td>
															<input placeholder="Nombres" type="text" disabled={!fa.type||fa.type==="delete"?true:false} className="form-control" value={fa.nombre} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","nombre")}/>
														</td>
														<td>
															<input placeholder="Apellidos" type="text" disabled={!fa.type||fa.type==="delete"?true:false} className="form-control" value={fa.apellido} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","apellido")}/>
														</td>
														<td>
															<select className="form-control" disabled={!fa.type||fa.type==="delete"?true:false} value={fa.genero} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","genero")}>
																<option value="Masculino">Masculino</option>
																<option value="Femenino">Femenino</option>

														   </select>
														</td>
														<td>
															<input type="date" disabled={!fa.type||fa.type==="delete"?true:false} className="form-control" value={fa.fecha_nacimiento} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","fecha_nacimiento")}/>
														</td>
														<td>
															<input placeholder="Cédula" type="text" disabled={!fa.type||fa.type==="delete"?true:false} className="form-control" value={fa.cedula} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","cedula")}/>
														</td>
														<td>
															<input placeholder="Correo Electrónico" type="text" disabled={!fa.type||fa.type==="delete"?true:false} className="form-control" value={fa.correo} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","correo")}/>
														</td>
														<td>
															<input placeholder="Teléfono de Contacto" type="text" disabled={!fa.type||fa.type==="delete"?true:false} className="form-control" value={fa.telefono_1} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","telefono_1")}/>
														</td>
														<td>
															<select className="form-control" disabled={!fa.type||fa.type==="delete"?true:false} value={fa.discapacidad} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","genero")}>
																<option value="1">Sí</option>
																<option value="0">No</option>

														   </select>
														</td>
														<td>
															<select className="form-control" disabled={!fa.type||fa.type==="delete"?true:false} value={fa.estudia} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","genero")}>
																<option value="1">Sí</option>
																<option value="0">No</option>

														   </select>
														</td>

														<td>
														  <div className="input-group-append">
																{!fa.type?
																	<div>
																			<button className="btn btn-warning" onClick={()=>this.updateMode("hijos",null,ifa,"update")}><i className="fa fa-pencil"></i></button>
																			<button className="btn btn-danger" onClick={()=>this.updateMode("hijos",null,ifa,"delMode")}><i className="fa fa-trash"></i></button>
																	</div>
																	:null}
																{fa.type==="new"?
																	<button className="btn btn-danger" onClick={()=>this.updateMode("hijos",null,ifa,"delNew")}><i className="fa fa-times"></i></button>
																	:null}
																{fa.type==="update"?
																	<button className="btn btn-warning" onClick={()=>this.updateMode("hijos",null,ifa,"delModeUpdateDelete")}><i className="fa fa-times"></i></button>
																:null}
																{fa.type==="delete"?
																	<button className="btn btn-danger" onClick={()=>this.updateMode("hijos",null,ifa,"delModeUpdateDelete")}><i className="fa fa-arrow-left"></i></button>
																:null}
														  </div>
														</td>

													</tr>
												)}
												
											</tbody>
										</table>
									</td>
								</tr>
							</React.Fragment>
						:null}

						<tr className="head-division-estudiante">
								<td colSpan="2" className="text-center tr-separate-sections-table">
									<span className="">Documentos</span>
								</td>
							</tr>

							<tr>
								<td colSpan="2">
									
									<a href={loc+"/"+file_foto} className="btn btn-block m-1" target="blank">Foto <i className="fa fa-send"></i></a>
									<a href={loc+"/"+file_cedula} className="btn btn-block m-1" target="blank">Cédula escaneada<i className="fa fa-send"></i></a>

									{modo==="estudiante"?
										<React.Fragment>
												<a href={loc+"/"+file_fondo_negro} className="btn btn-block m-1" target="blank">Fondo negro <i className="fa fa-send"></i></a>
												<a href={loc+"/"+file_notas} className="btn btn-block m-1" target="blank">Notas <i className="fa fa-send"></i></a>
										</React.Fragment>
									:null}

									{modo==="trabajador"?
											<a href={loc+"/"+file_sintesis} className="btn btn-block m-1" target="blank">Síntesis Curricular <i className="fa fa-send"></i></a>
									:null}
								</td>
							</tr>

					</tbody>
				</table>
			</div>
		</div>
		</div>
	)
}

Generalestudiante.defaultProps = {
	modo:"estudiante"
}