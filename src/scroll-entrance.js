
(function() {

      //Create the object for the entrance plugin
      entrance = {};

      //Set up defaults
      entrance.duration = "1000";
      entrance.distance = "200";
      entrance.heightOffset = 200;

      entrance.isElemInView = function(elem) {

          var rect = elem.getBoundingClientRect();
          var heightOffset = elem.getAttribute('data-height-offset') - 0 || entrance.heightOffset;
          //Return true if any of the following conditions are met:
          return(
            // The top is in view: the top is more than 0 and less than the window height (the top of the element is in view)
            ( (rect.top + heightOffset) >= 0 && (rect.top + heightOffset) <= window.innerHeight ) || 
            // The bottom is in view: bottom position is greater than 0 and greater than the window height
            ( (rect.bottom + heightOffset) >= 0 && (rect.bottom + heightOffset) <= window.innerHeight ) ||
            // The top is above the viewport and the bottom is below the viewport
            ( (rect.top + heightOffset) < 0 && (rect.bottom + heightOffset) > window.innerHeight )
          )

      }

      entrance.setInitialStyles = function(elem){

        //Required style on the body to stop horizontal scrollbars
        document.body.style.overflowX = "hidden";


        var anim = elem.getAttribute("data-entrance");
        var delay = elem.getAttribute("data-entrance-delay");
        var distance = elem.getAttribute("data-distance") - 0 || entrance.distance;
        var duration = elem.getAttribute("data-duration") - 0 || entrance.duration;

        elem.style.transition = "all " + (duration / 1000) + "s ease";

        // Add a delay is required
        if (delay) {
          elem.style.transitionDelay = (delay / 1000) + 's';
        }

        // Set up transition types

        if (anim == "fade") {
          elem.style.opacity = "0";
        }

        if (anim == "from-left") {
          elem.style.opacity = "0";
          elem.style.transform = "translate(-" + distance + "px, 0)";
        }

        if (anim == "from-right") {
          elem.style.opacity = "0";
          elem.style.transform = "translate(" + distance + "px, 0)";
        }

        if (anim == "from-top") {
          elem.style.opacity = "0";
          elem.style.transform = "translate(0, -" + distance + "px)";
        }

        if (anim == "from-bottom") {
          elem.style.opacity = "0";
          elem.style.transform = "translate(0, " + distance + "px)";
        }     

      }


      entrance.enter = function(elem){

        elem.style.visibility = "visible";
        elem.style.opacity = "1";
        elem.style.transform = "translate(0, 0)";

        elem.className += " has-entered";

      }


      entrance.viewportChange = function(){

        Array.prototype.map.call(entrance.elements, function(item) {

          if ( entrance.isElemInView(item) ){

            var hasEntered = item.classList.contains("has-entered");

            if (!hasEntered){
              entrance.enter(item);
            }

          }

        });
        
      }

      entrance.init = function(){
        
        //Store the elements to be animated
        entrance.elements = document.querySelectorAll('[data-entrance]');

        // Set up the initial styles on each element, and check if they schould be visible
        Array.prototype.map.call(entrance.elements, function(item) {

          entrance.setInitialStyles( item );

          if (entrance.isElemInView(item) ){

            // If the elements are in view when loaded, animate in after load
            addEventListener('load', function(){
              entrance.enter( item );
            }, false );
            
          }

        });

      }

      // Initialise the plugin when the DOM is loaded
      addEventListener('DOMContentLoaded', entrance.init, false );

      // Add event liseners for scroll events
      addEventListener('scroll', entrance.viewportChange, false); 
      addEventListener('resize', entrance.viewportChange, false); 

}());