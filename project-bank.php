<?php
/*
Plugin Name: Project Bank Gsheet
Plugin URI: https://github.com/JesusRoaP/project_bank
Description: Muestra el banco de proyectos institucional.
Author: Jesus Mauricio Roa Polania
Version: 1.0
Author URI: https://github.com/JesusRoaP
*/

defined('ABSPATH') or die("Acceso Denegado");

define('BP_RUTA', plugin_dir_path(__FILE__));

define('BP_NOMBRE', 'Project Bank');

define('BP_TABLE', 'project');

include(BP_RUTA . 'includes/functions.php');

include(BP_RUTA . 'includes/options.php');

function bp_activar() {

    // Instrucciones para activar el plugin banco de proyectos

}
register_activation_hook(__FILE__,'bp_activar');

function bp_desactivar() {

    // Instrucciones para desactivar el plugin banco de proyectos

}
register_deactivation_hook(__FILE__,'bp_desactivar');