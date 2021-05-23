<?php
if (! current_user_can ('manage_options')) wp_die (__ ('No tienes suficientes permisos para acceder a esta página.'));

?>

<div class="wrap">
	<h2><?php _e( 'Project Bank', 'project bank' ) ?></h2>
	Bienvenido a la configuración del plugin Project Bank
</div>
<br>
<div class="pb-info">
	<ul>
		<li>Utiliza el siguiente shortcode para mostrar el Banco de Proyectos (Página principal): <input id="shortcode-1" type="text" value="[project_bank]"><button class="button" onclick="copyToClipboard('#shortcode-1')">Copiar Shortcode</button><span class="copy" style="display: none">Copiado!</span></li>
		<li>Utiliza el siguiente shortcode para mostrar los detalles de cada proyecto en una página individual: <input id="shortcode-2" type="text" value="[project]"><button class="button" onclick="copyToClipboard('#shortcode-2')">Copiar Shortcode</button><span class="copy" style="display: none">Copiado!</span>
			<ul>
				<li>Esta página debe tener como página superior la página principal del plugin.</li>
				<li>Esta página debe tener el siguiente slug: <strong>proyecto</strong></li>
				<li>Esta página debe tener el siguiente nombre: <strong>Proyecto codigo</strong></li>
			</ul>
		</li>
	</ul>
</div>

<script>
	function copyToClipboard(elemento) {
		var $temp = jQuery("<input>")
		jQuery("body").append($temp);
		$temp.val(jQuery(elemento).val()).select();
		document.execCommand("copy");
		$temp.remove();
    	setInterval(function(){
        	jQuery(".copy").fadeOut(500);
    	}, 3000);
	}

	jQuery('.pb-info .button').click(function(){
		jQuery(this).next('.copy').fadeIn(500);
	})
</script>