(function( $ ) {
  $.fn.elementCollapse = function(options) {


    var defaults = {
      'cursor':           'pointer',
      'action_elements':  'div',
      'show':             'slideDown',
      'hide':             'slideUp',
      'relation':         'sibling',
      'show_all':         false,
      'valid_rel':        ['children', 'sibling', 'next']
    };
    
    
    var settings = $.extend( {}, defaults, options );
    var all_elms = [];

    // VALIDATE RELATIONSHIP
    if ( !validate_relationship() ) {
      jQuery.error( settings.relation + ' is not a valid relationship, specify either ' + defaults.valid_rel.join(', ') );
      return;
    }

    // ASSIGN ITEM A CURSOR TYPE
    $(this).css('cursor', settings.cursor);


    // DO ACTION
    this.on('click', function(event) {

      event.preventDefault ? event.preventDefault() : (event.returnValue = false);
      
      var victim_elm;

      if (settings.relation == 'sibling') {
        victim_elm = $(this).nextAll(settings.action_elements);
      } else if (settings.relation == 'next') {
        victim_elm = $(this).nextAll(settings.action_elements)[0];
      } else if (settings.relation == 'children') {
        victim_elm = $(this).children(settings.action_elements);
      }

      // RECORD INCASE SHOW ALL IS REQUIRED
      if(settings.show_all != false) { all_elms.push(victim_elm); }



      if ( $(victim_elm).is(':visible') ) {
        action_victim(settings.hide, victim_elm);
      } else {
        action_victim(settings.show, victim_elm);
      }

    });
    
    $(settings.show_all).on('click', function(event) {
      
      event.preventDefault ? event.preventDefault() : (event.returnValue = false);

      // DOES NOTHING IF NO SHOW ALL IS SET
      if(!settings.show_all) { return true; }

      $.each(all_elms, function(key, elm) {
        $(elm).show();
      });
      
    });


    function validate_relationship() {
      var valid = false;

      $.each(settings.valid_rel, function(key, item) {
        if(settings.relation == item) { valid = true; }
      });

      return valid;

    }

    function action_victim(action, elm) {
      
      // ADD NEW ACTIONS HERE
      switch (action) {
        case 'show':
          $(elm).show();
          break;
        case 'hide':
          $(elm).hide();
          break;
        case 'slideUp':
          $(elm).slideUp();
          break;
        case 'slideDown':
          $(elm).slideDown();
          break;
        case 'fadeIn':
          $(elm).fadeIn();
          break;
        case 'fadeOut':
          $(elm).fadeOut();
          break;
      }

    }

  }


}( jQuery ));
