# Scroll Entrance

Scroll Entrance is a lightweight JavaScript plugin to animate elements as the are scrolled into view, no jQuery required.

[A demo of the plugin is available here](https://andycaygill.github.io/scroll-entrance/)

## Basic Usage:


#### 1. Include the script in your HTML file

```html
<script src="PATH-TO-SCRIPT/scroll-entrance.js"></script>
```
#### 2. Add required CSS in the ```<head>``` of your page
This is required to make sure the elements are hidden while the JavaScript is loading
```html
<style>
      /* Ensure elements are hidden while ScrollEntrance is loading */
      [data-entrance] { visibility: hidden; }
</style>
```

Note: It is recommended you use detect for JavaScript using Modernizr and add the .js css, this will ensure the elements aren't hidden if JavaScript is disabled. 

```html
<style>
      /* Ensure elements are hidden while ScrollEntrance is loading */
      .js [data-entrance] { visibility: hidden; }
</style>
```

#### 3. Add the 'data-entrance=' attribute to the elements you want to animate

Example:
```html
<div class="panel" data-entrance="fade">
      <p>This will fade the element in</p>
</div>
```

You can use the following preset transitions to animate elements into view.
```html
data-entrance="fade"
data-entrance="from-left"
data-entrance="from-right"
data-entrance="fade-top"
data-entrance="fade-bottom"
```

## Advanced Usage:

#### Delaying a transition
Add the 'data-entrance-delay' attribute to delay a transition, for example:
```html
<div class="panel" data-entrance="from-left" data-entrance-delay="1000">
      <p>This will fade the element in from the left after 1000 milleseconds</p>
</div>
```

#### Defining custom animations

1. Set the 'data-entrance' attribute to the name of your animation
	```html
	<div class="panel" data-entrance="my-custom-animation">
	      <p>This will animate the element in using a custom animation, defined in your css file</p>
	</div>
	```

2. Define the behaviour of your custom animation in your css file
	```css
	/*This is the initial state before animating */
	[data-entrance="my-custom-animation"]{
		transform: rotate(180deg);
	    opacity: 0;
	}
	/*This is the state after animating */
	[data-entrance="my-custom-animation"].has-animated{
		transform: rotate(0deg);
	    opacity: 1;
	}
	```

## Compatibility
Tested in Chrome, Firefox, IE10+, Safari, ios and Andriod

