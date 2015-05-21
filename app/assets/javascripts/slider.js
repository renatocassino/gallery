(function( $ ) {
  $.fn.slider = function(options) {

    var defaults = {
      auto : false,
      interval : 11000
    };

    var options = $.extend({}, defaults, options)

    function Slider(element, options) {

      this.$el = element;
      this.$config = {
        active: 0,
        totalItems: 0,
        mrDefault: options.mrDefault
      };

      this.options = options;

      this.init();
    }

    Slider.prototype = {

      init: function() {
        this.$config.totalItems = this.$el.find('.images > img').length;

        this.createArrows();
        this.resetHorizontal();
        this.bindEvents();
        this.checkInterval();
      },

      /**
       * Create right and left arrows
       */
      createArrows: function() {
        this.createArrow('left');
        this.createArrow('right');
      },

      /**
       * Create arrow for a direction
       * @param direction (left|right)
       */
      createArrow: function(direction) {
        var image = jQuery(document.createElement("img"));
        image.attr('class','arrow arrow-' + direction);
        image.attr('src', '/images/arrow_' + direction + '.jpg');
        this.$el.append(image);
      },

      /**
       *
       */
      resetHorizontal: function() {

      },

      checkInterval: function() {

        var self = this;

        if(this.options.auto) {
          $.intervalNext = function() {
            self.next();
          };
          $.timeInterval = self.options.interval;
          $.intervals = setInterval($.intervalNext, $.timeInterval);
        }
      },

      bindEvents: function() {
        self = this;
        this.$el.find('.arrow-left').click(function() {
          self.previous();
        });

        this.$el.find('.arrow-right').click(function() {
          self.next();
        });
      },

      previous: function() {
        this.$config.active = this.$config.active > 0
          ? this.$config.active - 1
          : 0;

        this.showContent();
      },

      next: function() {

        this.$config.active = this.$config.active < this.$config.totalItems -1
          ? this.$config.active + 1
          : this.$config.totalItems - 1;

        this.showContent();
      },

      showContent: function() {
          for(i = 0; i < this.$config.totalItems; i++) {
            image = this.$el.find('.images > img').eq(i);

            if(i == this.$config.active) {
              image.css('left',null);
            } else if(i < this.$config.active) {
              image.css('left', '-100%');
            } else {
              image.css('right', '-100%');
            }
          }
      }
    };

    $(this).each(function() {
      return new Slider($(this), options);
    });
  };

})( jQuery );