<?php
function js_css_register() {
	// Registro de Scripts
	wp_register_script('datatables-js', esc_url(plugins_url('includes/DataTables/datatables.js', __DIR__)));
	wp_register_script('searchpanes-datatables-js', esc_url(plugins_url('includes/DataTables/dataTables.searchPanes.min.js', __DIR__)));
	wp_register_script('select-datatables-js', esc_url(plugins_url('includes/DataTables/dataTables.select.min.js', __DIR__)));
	wp_register_script('accent-neutralise-js', esc_url(plugins_url('includes/DataTables/accent-neutralise.js', __DIR__)));
	wp_register_script('banco-proyectos-js', esc_url(plugins_url('public/js/banco-proyectos.js', __DIR__)));
	wp_register_script('proyecto-js', esc_url(plugins_url('public/js/proyecto.js', __DIR__)));

	// Registro de Estilos
	wp_register_style('banco-proyectos-css', esc_url(plugins_url('public/css/banco-proyectos.css', __DIR__)));
	wp_register_style('proyecto-css', esc_url(plugins_url('public/css/proyecto.css', __DIR__)));
	wp_register_style('datatables-pb-css', esc_url(plugins_url('includes/DataTables/datatables.css', __DIR__)));
	wp_register_style('searchpanes-datatables-css', esc_url(plugins_url('includes/DataTables/searchPanes.dataTables.min.css', __DIR__)));
	wp_register_style('select-datatables-css', esc_url(plugins_url('includes/DataTables/select.dataTables.min.css', __DIR__)));
	wp_register_style('iconos-css', esc_url(plugins_url('public/css/iconos.css', __DIR__)));
	wp_register_style('admin-backend-css', esc_url(plugins_url('admin/css/admin-backend.css', __DIR__)));
	wp_register_style('font-awesome-5-9-0-pb', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css');
	wp_register_style('fuente-lato', 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
	wp_register_style('material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons');
}
add_action('init', 'js_css_register');

function my_shortcode_styles() {
	// Activacion de Estilos
    global $post;

    if ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'project_bank' ) ) {
		wp_enqueue_style( 'datatables-pb-css' );
		wp_enqueue_style( 'searchpanes-datatables-css' );
		wp_enqueue_style( 'select-datatables-css' );
		wp_enqueue_style( 'banco-proyectos-css' );
		wp_enqueue_style( 'iconos-css' );
		wp_enqueue_style( 'fuente-lato' );
		wp_enqueue_style( 'material-icons' );
	}
	
	if ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'project' ) ) {
		wp_enqueue_style( 'proyecto-css' );
		wp_enqueue_style( 'iconos-css' );
		wp_enqueue_style( 'fuente-lato' );
		wp_enqueue_style( 'font-awesome-5-9-0-pb' );
	}
}
add_action( 'wp_enqueue_scripts', 'my_shortcode_styles' );
?>