<?php

/**
 * Get the origin part of the current URL (protocol + host + optional port).
 *
 * @return string The URL origin.
 */
function url_origin() {
	$ssl      = ! empty( $_SERVER['HTTPS'] && 'on' === $_SERVER['HTTPS'] );
	$sp       = strtolower( $_SERVER['SERVER_PROTOCOL'] );
	$protocol = substr( $sp, 0, strpos( $sp, '/' ) ) . ( ( $ssl ) ? 's' : '' );

	// Determine the port, but omit it if it's the default (80 for HTTP, 443 for HTTPS).
	$port = isset( $_SERVER['SERVER_PORT'] ) ? $_SERVER['SERVER_PORT'] : '';
	$port = ( ( ! $ssl && '80' === $port ) || ( $ssl && '443' === $port ) ) ? '' : ':' . $port;

	// Determine the host.
	$host = isset( $_SERVER['HTTP_HOST'] ) ? $_SERVER['HTTP_HOST'] : $_SERVER['SERVER_NAME'] . $port;
	return $protocol . '://' . $host;
}

/**
 * Get the full current URL, including protocol, host, and request URI.
 *
 * @return string The full current URL.
 */
function get_current_url() {
	// Fallback to '/' if REQUEST_URI is not set.
	$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '/';

	return url_origin() . $request_uri;
}
