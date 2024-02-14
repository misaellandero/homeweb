<form id="datosDelUsuario">
							<input type="number" class="form-control" value="<?php echo $datosUsuario[0]['id'] ?>" id="id" name="id"  hidden="true">
							<input type="number" class="form-control" value="0" id="perfil" name="perfil"  hidden="true">
													
							<h4>Datos basicos del usuario</h4>
							<div class="form-group">
								<label for="formGroupExampleInput">Correo Electronico</label>
								<input type="text" class="form-control" value="<?php echo $datosUsuario[0]['email'] ?>" id="email_user" name="correo" placeholder="Example input">
							</div>
							<div class="form-group">
								<label for="formGroupExampleInput2">Nombre</label>
								<input type="text" class="form-control" value="<?php echo $datosUsuario[0]['nombre'] ?>" id="nombre_user" name="nombre" placeholder="Another input">
							</div>
							<div class="form-group">
								<label for="formGroupExampleInput2">Apellido</label>
								<input type="text" class="form-control" value="<?php echo $datosUsuario[0]['apellido'] ?>" id="apellido_user" name="apellidos" placeholder="Another input">
							</div>
							<div class="form-group">
								<label for="formGroupExampleInput2">Numero</label>
								<input type="text" class="form-control"  value="<?php echo $datosUsuario[0]['telefono'] ?>" id="telefono_user" name="telefono" placeholder="Another input">
							</div>
							<div class="form-group">
								<label for="formGroupExampleInput2">Contraseña</label>
								<input type="password" class="form-control"  value="<?php echo $datosUsuario[0]['password'] ?>" id="passwordr_user" name="rclave" placeholder="Another input">
									<label for="formGroupExampleInput2">Valida contraseña</label>
								<input type="password" class="form-control"  value="<?php echo $datosUsuario[0]['password'] ?>" id="password_user" name="clave" placeholder="Another input">
					
                			</div>
                             <h4>Datos fiscales </h4>
                            <div class="form-group">
                                <label for="">Razon Social</label>
								<input type="text" class="form-control"  value="<?php echo $datosUsuario[0]['razon_social'] ?>" id="razon_social_user" name="razon_social" placeholder="Tu nombre o el de tu empresa">
                                <label for="">RFC</label>
								<input type="text" class="form-control"  value="<?php echo $datosUsuario[0]['rfc'] ?>" id="rfc_user" name="rfc" placeholder="Registro Federal de Contribuyentes">
							 
                			</div>
                            
</form>