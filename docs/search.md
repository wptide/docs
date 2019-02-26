# Search Plugins &amp; Themes

The search form makes a `GET` request to the Tide API and responds with a JSON object of an audit by searching for a plugin or theme slug from the wordpress.org repository. For example, you can search for the theme `twentyseventeen` or plugin `jetpack`.

<div class="api-check" data-api-check>
	<div class="api-check__form" data-api-check-form>
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
			<input type="text" class="api-check__searchfield" placeholder="slug" />
			<button class="api-check__button">
				<svg width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15.8 2.7c3.1 3.2 3.5 8 1.2 11.6l.6.5 1.4 1 1 .8a14.4 14.4 0 0 1 3 3c.5.6.8 1.2 1 1.7.3.6.4 1.2.4 1.7 0 .6-.3 1-.6 1.4a2 2 0 0 1-1.4.6c-.5 0-1.1 0-1.7-.3a11.9 11.9 0 0 1-4.7-4l-.8-1.1a33.1 33.1 0 0 0-1.7-2.2 9.3 9.3 0 1 1 2.3-14.7zm-2.4 10.7A5.9 5.9 0 1 0 5.1 5a5.9 5.9 0 0 0 8.3 8.4z" fill="#383753"/>
				</svg>
			</button>
		</div>
	</div>
</div>
