<?php
function rewrite_projects_permalinks() {
    global $wp;
    $wp->add_query_var('codigo');
    add_rewrite_rule( '(.?.+?)/codigo/([^/]*)/?$', 'index.php?pagename=$matches[1]&codigo=$matches[2]', 'top' );
}
add_action( 'init', 'rewrite_projects_permalinks' );
?>