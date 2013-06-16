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
			this.elem = elem;
			this.$elem = $(elem);
			this.$win = $(window);
			this.elemTop = parseInt(this.$elem.css('margin-top'));

			this.settings = $.extend({}, $.jScroll.defaults, options);

			this._default();
		},

		_default: function() {
			var self = this,
				opts;

			this.$win.on('scroll', function() {
				opts = window.scrollY >= self.elemTop ? window.scrollY + self.settings.margin : self.elemTop;

				self.$elem.stop().animate({
					"margin-top": opts
				});
			});
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
			easing: 'swing',
			speed: 600,
			margin: 50
		}
	}
	
})(jQuery, window, document);