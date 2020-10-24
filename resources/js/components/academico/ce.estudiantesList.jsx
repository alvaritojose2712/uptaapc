import React, {Component} from 'react';
import {formatCedula} from '../../assets/custom.js'
const loc = window.location.origin
function TrEstudiante({estudiante,carrera,onClick,index,selects}){
	return (
	  	<tr data-index={index} data-id={estudiante.id} data-carrera={carrera} onClick={onClick} 
	  	className={(selects.indexOf(estudiante.id)!==-1?"table-success":"")+" hover"}>
				<td>
					<img src={`${loc}/${estudiante.file_foto}`} alt="" className={("mr-1 img-sm border ")+(estudiante.verificado?"border-success":(estudiante.inscrito?"border-warning":"border-danger"))} />
				</td>
				<td className="table-nombre-estudiante">{estudiante.nombre} {estudiante.apellido}</td>
				<td className="table-cedula-estudiante">{formatCedula(estudiante.cedula)}</td>
				<td className="table-cedula-estudiante">{estudiante.nombrecarrera.nombre}</td>
				
	  	</tr>
	)
}
const EstudianteList = ({estudiantes,loc,getIdEstudiante,selects,filtro,busqueda})=>{
	return (
		<div>
			{
				estudiantes.length===undefined
				?
				<div className="tnz-file-tree">
					{Object.entries(estudiantes).map((carrera,indexCarrera)=>
						<label className="tnz-file-tree-item year" key={indexCarrera}>
							<input className="tnz-file-tree-cb" type="checkbox"/>
	        		<span className="tnz-file-tree-label">{carrera[0]} <span className="badge alert-primary">{carrera[1].length}</span></span>
							<div className="tnz-file-tree-branches">
								<label>
									<table className="table table-borderless">
										<tbody>
										{	
											carrera[1].map((estudiante,indexEstudiante)=>
												busqueda===""||
												estudiante.nombre.toString().substr(0,busqueda.length).toLowerCase()===busqueda.toLowerCase()||
												estudiante.apellido.toString().substr(0,busqueda.length).toLowerCase()===busqueda.toLowerCase()||
												estudiante.cedula.toString().substr(0,busqueda.length).toLowerCase()===busqueda.toLowerCase()
												// estudiante.genero.toString().substr(0,busqueda.length).toLowerCase()===busqueda.toLowerCase()
												?
												<React.Fragment key={estudiante.id}>
													{filtro==="todos"?
														<TrEstudiante selects={selects} index={indexEstudiante} estudiante={estudiante} carrera={carrera[0]} onClick={getIdEstudiante}/>
													:null}

													{filtro==="verificados"&&estudiante.verificado==1?
														<TrEstudiante selects={selects} index={indexEstudiante} estudiante={estudiante} carrera={carrera[0]} onClick={getIdEstudiante}/>
													:null}

													{filtro==="porverificar"&&estudiante.verificado==0&&estudiante.inscrito==1?
														<TrEstudiante selects={selects} index={indexEstudiante} estudiante={estudiante} carrera={carrera[0]} onClick={getIdEstudiante}/>
													:null}

													{filtro==="inscripcionpen"&&estudiante.inscrito==0?
														<TrEstudiante selects={selects} index={indexEstudiante} estudiante={estudiante} carrera={carrera[0]} onClick={getIdEstudiante}/>
													:null}
												</React.Fragment>
												:null

											)
										}
										</tbody>
									</table>
								</label>
							</div>
						</label>
					)}
				</div>
				:<table className="table table-borderless">
						<tbody>
						{	
							estudiantes.map((estudiante,indexEstudiante)=>
							<TrEstudiante key={estudiante.id} loc={loc} index={indexEstudiante} estudiante={estudiante} carrera={estudiante.nombrecarrera.nombre} onClick={getIdEstudiante}/>)
						}
						</tbody>
					</table>
			}
		</div>
	)
}
// <div className="form-group">
// 				<input type="text" placeholder="Buscar..." onChange={e=>getApiData(e,"/controlEstudios/estudiantes","estudiantes")} className="form-control"/>
// 			</div>

EstudianteList.defaultProps = {
	selects: [],	
	filtro:"todos",
	busqueda:"",
}

TrEstudiante.defaultProps = {
	selects: [],	
}


export default EstudianteList;