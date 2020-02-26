<?php

function url_origin(){
    $ssl      = ( ! empty( $_SERVER['HTTPS'] ) && 'on' === $_SERVER['HTTPS'] );
    $sp       = strtolower( $_SERVER['SERVER_PROTOCOL'] );
    $protocol = substr( $sp, 0, strpos( $sp, '/' ) ) . ( ( $ssl ) ? 's' : '' );
    $port     = $_SERVER['SERVER_PORT'];
    $port     = ( ( ! $ssl && '80' === $port ) || ( $ssl && '443' === $port ) ) ? '' : ':'.$port;
    $host     = isset( $_SERVER['HTTP_HOST'] ) ? $_SERVER['HTTP_HOST'] : $_SERVER['SERVER_NAME'] . $port;
    return $protocol . '://' . $host;
}

function get_current_url() {
    return url_origin() . $_SERVER['REQUEST_URI'];
}
