<div class="hero">
	<span class="hero__title">Official Documentation</span>
	<svg class="hero__logo" viewBox="0 0 700 233" version="1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<defs>
			<path id="path0_fill" fill-rule="evenodd" d="M0 0h233v70c-49 9-84 27-116 46v49l13-8c31-18 61-34 103-43v119H0v-71c50-9 84-28 117-46V67l-11 7C74 92 44 109 0 117V0z"/>
			<path id="path1_fill" d="M45 0H19v36H0v20h19v82c0 21 10 36 38 36h22v-22H62c-13 0-17-6-17-18V56h35V36H45V0z"/>
			<path id="path2_fill" d="M30 51H4v138h26V51zM17 0C8 0 0 8 0 17s8 17 17 17 17-8 17-17S26 0 17 0z"/>
			<path id="path3_fill" d="M125 0H99v66c-8-11-21-18-39-18-36 0-60 30-60 71 0 42 23 71 59 71 14 0 30-5 40-19v18h26V0zM64 70c20 0 36 16 36 49s-15 49-36 49c-24 0-37-18-37-49s14-49 37-49z"/>
			<path id="path4_fill" d="M64 0C22 0 0 30 0 71c0 40 23 71 65 71 27 0 46-11 58-31l-21-12c-7 12-18 21-36 21-25 0-38-15-39-43h97v-6c0-40-21-71-60-71zm-1 22c20 0 33 12 34 35H27c2-22 15-35 36-35z"/>
		</defs>
		<use xlink:href="#path0_fill" fill="#1526FF"/>
		<use xlink:href="#path1_fill" transform="translate(292 37)"/>
		<use xlink:href="#path2_fill" transform="translate(386 22)"/>
		<use xlink:href="#path3_fill" transform="translate(435 22)"/>
		<use xlink:href="#path4_fill" transform="translate(576 70)"/>
	</svg>
  <canvas class="hero__canvas" id="canvas"></canvas>
</div>

<div class="api-check" data-api-check>
	<div class="api-check__title">Search Plugins & Themes</div>
	<div class="api-check__form">
		<input type="radio" id="api-check__radio--plugins" name="api-check__radio" class="api-check__radio" value="plugin" checked>
		<label class="api-check__label" for="api-check__radio--plugins">
			<svg class="api-check__icon" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
				<path d="M14 2.7L9.8 6.9 7.4 4.4 11.6.2c.4-.4 1.3-.2 2 .5.7.6.8 1.5.4 2zM3.6 5l1.2-1.5 11.7 11.7-1.6 1.1c-.9 1-3.4 1.5-5 1.5H5l-1.6 1.6a2 2 0 0 1-2.7 0 2 2 0 0 1 0-2.7L2.2 15v-5c0-1.5.5-4.2 1.4-5.1zm9.4 5l4.2-4c.5-.4 1.4-.3 2 .4.7.7 1 1.6.5 2l-4.3 4.3L13 10z"/>
			</svg>
			Plugins
		</label>
		<input type="radio" id="api-check__radio--themes" name="api-check__radio" value="theme" class="api-check__radio">
		<label class="api-check__label" for="api-check__radio--themes">
			<svg class="api-check__icon" width="25" height="21" xmlns="http://www.w3.org/2000/svg">
				<path d="M17.6 11.8L8.4 2.6l2-2c.6-.7 3-.6 4.5.4 1.6 1 1.9 1.7 3.8 2.8 1.5.8 3.2 1.6 5.8 1l-7 7zm-1 .9L7.5 3.5 5.1 5.8c-.5.5-.5 1.3 0 1.8L6.5 9c.5.5.5 1.4 0 1.9L3.6 13l-1.3 1c-1.7 2-3 4.4-1.8 5.7 1.3 1.3 3.7 0 5.5-1.8l1-1.3 2.3-2.9c.5-.5 1.3-.5 1.8 0l1.4 1.4c.5.5 1.3.5 1.8 0l2.4-2.3z" />
			</svg>
			Themes
		</label>
		<div class="api-check__textfield">
			<input type="text" class="api-check__searchfield" placeholder="Type name" />
			<button class="api-check__button">
				<svg width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15.8 2.7c3.1 3.2 3.5 8 1.2 11.6l.6.5 1.4 1 1 .8a14.4 14.4 0 0 1 3 3c.5.6.8 1.2 1 1.7.3.6.4 1.2.4 1.7 0 .6-.3 1-.6 1.4a2 2 0 0 1-1.4.6c-.5 0-1.1 0-1.7-.3a11.9 11.9 0 0 1-4.7-4l-.8-1.1a33.1 33.1 0 0 0-1.7-2.2 9.3 9.3 0 1 1 2.3-14.7zm-2.4 10.7A5.9 5.9 0 1 0 5.1 5a5.9 5.9 0 0 0 8.3 8.4z" fill="#383753"/>
				</svg>
			</button>
		</div>
	</div>
</div>

## Vision

> A rising tide lifts all boats. -- United States President, John F. Kennedy (borrowed from the New England Council)

Inspired by the proverb _“A rising tide lifts all boats”_, when we lower the barrier of entry to writing and choosing quality code for enough people, it will lift the quality of code across the whole WordPress ecosystem. Tide’s vision is to make it easy to improve the quality of code throughout the WordPress ecosystem and help WordPress site owners make better choices about plugins and themes.

## Overview

Tide is an automated tool to provide insight into WordPress code and highlight areas to improve the quality of plugins and themes.

Tide services are responsible for the following:

* The Sync Server polls the WordPress.org API's for themes and plugins to process and writes them to a queue.
* The PHPCS Server reads messages from a queue and runs reports against both plugins and themes, then sends the results back to the Tide API.
* The Lighthouse Server reads messages from a queue and runs Google Lighthouse reports against the themes only, then sends the results back to the Tide API.

## Architecture diagram

The following diagram notes the Google Cloud Platform (GCP) components, Tide services components, and pending link with WordPress.org for the PHP Compatibility integration.



