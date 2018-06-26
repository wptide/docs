<?php

add_action( 'wp_enqueue_scripts', function() {
  wp_enqueue_script('docpress-js', DOCS_URI.'/assets/script.js', array(), '1.0', true );
});