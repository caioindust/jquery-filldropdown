# jQuery FillDropdown [![Build Status](https://travis-ci.org/caioindust/jquery-filldropdown.svg?branch=master)](https://travis-ci.org/caioindust/jquery-filldropdown)

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="src/jquery-filldropdown.js"></script>
	```

3. Create your code:
	```html
	<select id="estado" data-urlaction="/home/getCidade" data-target="#cidade">
		<option value="">--Select-</option>
		<option value="1">SP</option>
		<option value="2">RJ</option>
	</select>

	<select id="cidade">
		<option value="">--Select-</option>
	</select>
	```
	
4. Call the plugin:

	```javascript
	$("#estado").filldropdown();
	```
	
## Attributes

| Name           | Type           | Description   |
| -------------- | -------------- | ------------- |
| urlaction      | string         |               |
| paramiters     | string/function|               |
| target         | string         |               |
| valuefield     | string         |               |
| firstitemtext  | string         |               |
| waittext       | string         |               |
| onsuccessafter | function       |               |
| onsuccess      | function       |               |
| onerrorafter   | function       |               |
| onerror        | function       |               |


	
## License

[MIT License](https://raw.githubusercontent.com/caioindust/jquery-filldropdown/master/LICENSE) © Caio Humberto Francisco
	
