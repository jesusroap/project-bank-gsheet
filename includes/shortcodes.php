<?php
function banco_proyectos() {
	wp_enqueue_script('datatables-js');
	wp_enqueue_script('searchpanes-datatables-js');
	wp_enqueue_script('select-datatables-js');
	wp_enqueue_script('accent-neutralise-js');
	wp_enqueue_script('banco-proyectos-js');
	require_once('banco-proyectos.php');
}
add_shortcode('project_bank', 'banco_proyectos');

function proyecto() {
	wp_enqueue_script('proyecto-js');
	require_once('detalles-proyecto.php');
}
add_shortcode('project', 'proyecto');
?>