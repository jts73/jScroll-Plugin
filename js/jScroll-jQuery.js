// Utility
if (Object.create != 'function') {
	Object.create = function( obj ) {
		function jScroll() {};
		jScroll.prototype = obj;

		return new jScroll();
	}
}

(function($, window, document, undefined) {

	var obj = {
		init: function(options, elem) {
			var self = this;

			this.elem = elem;
			this.$elem = $(elem);
			this.$win = $(window);
			this.elemTop = parseInt(this.$elem.css('margin-top'));

			this.settings = $.extend({}, $.jScroll.defaults, options);

			if ( this.settings.effect ) {
				
				this.$win.on('scroll', function() {
					self.effect[self.settings.effect]();
				});

			} else {

				this.$win.on('scroll', function() {
					this._default();
				});

			}
		},

		_default: function() {
			var self = this,
				opts;

			opts = window.scrollY >= self.elemTop ? window.scrollY + self.settings.margin : self.elemTop;

			self.$elem.stop().animate({
				"margin-top": opts
			}, self.settings.speed, self.settings.easing);
		}, 

		effect: {
			punch: function() {
				console.log('punch');
			}
		}
	};

	$.fn.jScroll = function( options ) {

		return this.each(function() {
			var jScroll = Object.create(obj);

			jScroll.init(options, this);
		});

	}

	$.jScroll = {
		defaults: {
			effect: 0,
			easing: 'swing',
			speed: 600,
			margin: 50
		}
	}
	
})(jQuery, window, document);