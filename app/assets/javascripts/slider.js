(function( $ ) {
  $.fn.slider = function(options) {

    var defaults = {
      auto : false,
      interval : 6000
    };

    var options = $.extend({}, defaults, options)

    function Slider(element, options) {

      this.template = '{{current}} de {{total}}';
      this.$el = element;
      this.$config = {
        active: 0,
        totalItems: 0
      };

      this.options = options;
      this.init();
    }

    Slider.prototype = {

      init: function() {
        this.$config.totalItems = this.$el.find('.images > img').length;
        self = this;

        this.createArrows();
        this.createCount();
        this.bindEvents();
        this.checkInterval();
        this.showContent();
        this.windowResize();

        // Time to render image
        setTimeout(function() {
          self.updateSize();
        },1000);
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
       * Create the count
       */
      createCount: function() {
        var span = jQuery(document.createElement("span"));
        span.attr('class', 'count');
        span.attr('id', 'count');
        this.$el.append(span);
        this.updateCount();
      },

      /**
       * Update the count
       */
      updateCount: function() {
        template = this.getTemplate();
        this.$el.find('#count').html(template);
      },

      /**
       * Get template of count
       * @returns {string|*}
       */
      getTemplate: function() {
        template = this.template.replace('{{current}}', this.$config.active + 1);
        template = template.replace('{{total}}', this.$config.totalItems);
        return template;
      },

      /**
       * If has interval, create
       */
      checkInterval: function() {
        var self = this;

        if(this.options.auto) {
          setInterval(function() {
            self.next();
          }, this.options.interval);
        }

      },

      /**
       * Add events in arrows
       */
      bindEvents: function() {
        self = this;
        this.$el.find('.arrow-left').click(function() {
          self.previous();
        });

        this.$el.find('.arrow-right').click(function() {
          self.next();
        });
      },

      /**
       * Go to prev slide
       */
      previous: function() {
        if(this.$config.active == 0)
          return;

        this.$config.active = this.$config.active > 0
          ? this.$config.active - 1
          : 0;

        this.showContent();
        this.updateCount();
      },

      /**
       * Go to next slide
       */
      next: function() {
        if(this.$config.active == this.$config.totalItems -1)
          return;

        this.$config.active = this.$config.active < this.$config.totalItems -1
          ? this.$config.active + 1
          : this.$config.totalItems - 1;

        this.showContent();
        this.updateCount();
      },

      /**
       * Update slide change the position
       */
      showContent: function() {
          for(i = 0; i < this.$config.totalItems; i++) {
            image = this.$el.find('.images > img').eq(i);
            speed = 250;

            if(i == this.$config.active) {
              image.animate({ opacity: 1, left: '50%'}, speed);
              image.addClass('active');
            } else if(i < this.$config.active) {
              image.animate({ opacity: 0, left: '-200%'}, speed);
              image.removeClass('active');
            } else {
              image.animate({ opacity: 0, left: '200%'}, speed);
              image.removeClass('active');
            }
          }
      },

      windowResize: function() {
        self = this;
        jQuery(window).resize(function() {
          self.updateSize();
        });
      },

      updateSize: function() {
        self = this;
        max_width = self.$el.width();
        images = self.$el.find('.images > img');

        margin_left = (self.$el.find('.images > img:first-child').width() / 2) * -1;
        div_height = self.$el.find('.images > img:first-child').height();

        this.$el.find('.images').css('height', div_height);
        images.each(function() {
          $(this).css('margin-left', margin_left);
        });
      }
    };

    $(this).each(function() {
      return new Slider($(this), options);
    });
  };
})( jQuery );