<?php

add_action( 'wp_enqueue_scripts', function() {
  wp_enqueue_style('docpress-style', DOCS_PATH.'/assets/style.css', false, '1.0', 'all');
  wp_enqueue_style('docpress-custom-style', DOCS_PATH.'/style.css', false, '1.0', 'all');
});