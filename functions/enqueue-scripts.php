<?php
/**
 * Enqueue theme scripts.
 */
function enqueue_docpress_scripts() {
    wp_enqueue_script(
        'docpress-js',
        DOCS_URI . '/assets/script.js',
        array(),     // No dependencies
        '1.0',
        true         // Load in footer
    );
}
add_action( 'wp_enqueue_scripts', 'enqueue_docpress_scripts' );