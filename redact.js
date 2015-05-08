/**
 * Redact.js
 * Author: Michael Bonds
 * Version: 1.0.0
 */

 (function ( $ ) {

   $.fn.pop = [].pop;

   $.fn.redact = function ( options ) {
     var settings, // The Settings object
     style; // The style to set on each letter



     // Build the settings
     settings = $.extend({
       color: '#000000',
       textColor: '#0000000',
       replace: false,
       replaceText: 'x'
     }, options);



     // build the style for the element
     style = 'background-color: ' + settings.color + '; '
      + 'color: ' + settings.textColor + '; position: relative;';



     // Wrap every character in the node
     function wrapNode ( words ) {
        var letter, // Index in loop
          newWords = '', // The words replacement
          string = words.nodeValue; // The actual text of the node

        // Loop through letters, wrapping and redacting
       for (letter = 0; letter < string.length; letter++) {

         // Build out wrapper
         newWords += '<span style="' + style + '">' +

            // To replace, or not to replace
            (settings.replace ? settings.replaceText : string[letter]) +

          '</span>';
       }

       // return the replacement
       return $(words).replaceWith(newWords);
     }



     // Grab the elements contents and loop through, replacing text
     return $(this).contents().each(function (index, thing) {

       // Redact every child
       $(thing).redact( options );

       // If the nodeType is a string
       if (thing.nodeType == 3) {

         wrapNode(thing);

       }

     });
   }
 }( jQuery ));
