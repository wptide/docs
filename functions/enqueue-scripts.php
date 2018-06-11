<?php

add_action( 'wp_enqueue_scripts', function() {
  wp_enqueue_script('docpress-js', DOCS_PATH.'/assets/script.js', array(), '1.0', true );
  wp_enqueue_script('docpress-custom-js', DOCS_PATH.'/scripts/scripts.js', array(), '1.0', true );
});