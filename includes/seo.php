<?php
// Creacion de Permalinks
function rewrite_projects_permalinks() {
    add_rewrite_rule( '(.?.+?)/codigo/([^/]*)/?$', 'index.php?pagename=$matches[1]&codigo=$matches[2]', 'top' );
}
add_action( 'init', 'rewrite_projects_permalinks' );

// Creacion de parametro de consulta "codigo"
function add_query_codigo() {
    global $wp;
    $wp->add_query_var('codigo');
}
add_action( 'init', 'add_query_codigo' );

// Modificacion del titulo de la pagina "proyecto" por titulo unico de cada proyecto
function filter_project_title_content( $titulo ) {
	$codigo = get_query_var('codigo');
	if ( is_page('Proyecto codigo') ) {
		$titulo = str_replace('codigo', $codigo, $titulo);
	}
    return $titulo;
}
add_filter( 'the_title', 'filter_project_title_content' );

function filter_project_wpyoastseo_title($title) {
    if( is_page('Proyecto codigo') ) {
        $title = get_the_title() . " - Banco de Proyectos - " . get_bloginfo( 'name' );
    }
    return $title;
}
add_filter('wpseo_title', 'filter_project_wpyoastseo_title');

function filter_project_wprankmathseo_title( $title ) {
    if( is_page('Proyecto codigo') ) {
        $title = get_the_title() . " - Banco de Proyectos - " . get_bloginfo( 'name' );
    }
    return $title;
}
add_filter( 'rank_math/frontend/title', 'filter_project_wprankmathseo_title');

function filter_project_title($title) {
	if ( is_page('Proyecto codigo') ) {
		$title = get_the_title() . " - Banco de Proyectos - " . get_bloginfo( 'name' ); 
	}
	return $title;
}
add_filter('pre_get_document_title', 'filter_project_title');
?>