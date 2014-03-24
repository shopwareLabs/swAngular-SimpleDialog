Shopware AngularJs -- swAngular Simple Dialog
=====================================

This is an Shopware-AngularJs Component, it can be installed via Bower.

## Installation

Via [bower](http://bower.io):

	bower install sw-angular-simple-dialog

## How to Use the Component


###Show Simple Message without Options
To Show a message you can prefix an HTML-Element like this:

	<div simple-dialog="Hallo"></div>

The Value of "simple-dialog" will be the Message.


###Show Message with Options
To Show an Dialog with Options you need some HTML: 
	
	<div simple-dialog="" ng-model="exampleData" sw-options="options"></div>

The Options are defined in the Angular-Js Controller. 
This is how they look: 

	{
  		"heading": "jeah, cooles heading",
  		"showHeader": true,
  		"showFooter": true,
  		"buttons": {
    		"0": {
      			"label": "Ok",
      			"closing": true,
      			"classes": "btn-success",
      			"callback": "function () {alert('jeah')}"
    		},
    		"1": {
      			"label": "Nope"
    		}
  		}
	}

###Examples

Here are some [Examples](http://swangular.shopware.de.cloud2-vm153.de-nserver.de/#/simpleDialog) 