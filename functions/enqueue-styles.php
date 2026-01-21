<?php
/**
 * Enqueue theme styles.
 */
function enqueue_docpress_styles() {
    wp_enqueue_style(
        'docpress-style',
        DOCS_URI . '/assets/style.css',
        array(),       // No dependencies
        '1.0',
        'all'
    );
}
add_action( 'wp_enqueue_scripts', 'enqueue_docpress_styles' );