import React, {Component} from 'react';
const loc = window.location.origin;

export const HeaderPersona = ({persona}) => (
	<div className="container-fluid">
		<div className="row mb-2">
			<div className="col-md-auto">
				<img title={persona.id} src={`${loc}/${persona.file_foto}`} alt="Foto de perfil" className="img-lg" />
			</div>
			<div className="col align-items-center d-flex">
				<div className="">
					<span className="">{ persona.cedula }</span>
					<h2 className="">
						{ persona.nombre } { persona.apellido }
					</h2>
					<h3><span className="badge badge-secondary">{ persona.categoria }</span></h3>
					<h4 className=" badge-success badge">{persona.departamento_adscrito} - {persona.cargo_departamento}</h4>
					
				</div>
			</div>
		</div>
	</div>
)

