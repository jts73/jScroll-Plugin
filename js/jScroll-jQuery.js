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
			var self = this,
				plainEffect,
				effectParams,
				isString,
				isObject;

			this.JQUERY_VERSION = parseFloat($.fn.jquery);

			this.elem = elem;
			this.$elem = $(elem);
			this.$win = $(window);
			this.elemTop = parseInt(this.$elem.css('margin-top'));

			this.settings = $.extend({}, $.jScroll.defaults, options);

			if ( this.settings.effect ) {

				isString = typeof this.settings.effect === 'string';
				isObject = $.isPlainObject(self.settings.effect);

				if ( isString ) {
					this.$win.on('scroll', function() {
						self.effect[self.settings.effect].call(this);
					});
				}

				if ( isObject ) {
					plainEffect = self.settings.effect.name;
					effectParams = self.settings.effect.params || 0;

					self.effect[plainEffect].call(self, effectParams);
				}

			} else {

				this.$win.on('scroll', function() {
					self._default();
				});

			}
		},

		_default: function( params ) {
			var self = this,
				opts;

			opts = window.pageYOffset >= self.elemTop ? window.pageYOffset + self.settings.margin : self.elemTop;

			self.$elem.stop().animate({
				"margin-top": opts
			}, self.settings.speed, self.settings.easing);
		}, 

		effect: {
			hook: function( params ) {

				var self = this,
					fisher = this.$elem,
					fish = params,
					fisherHeight = fisher.outerHeight(),
					hooked,
					opts;

				console.log(fisherHeight);

				if (!fish.selector) {
					fish = $(fish);
				}

				fish.css({
					// 'display': 'none',
					'position': 'fixed',
					'top': -(fisherHeight),
					'left': 0
				});

				function caught() {
					if (fish.css('display') === 'none') {
						fisher.stop().hide(self.settings.speed, self.settings.easing, function() {
							fish.show();
							fish.stop().animate({
								top: 0
							});
						});
					}
				}

				function release() {
					fish.stop().animate({
						top: -(fisherHeight)
					}, function() {
						fish.hide();
					});

					fisher.show(self.settings.speed);
				}
				

				this.$win.on('scroll', function() {
					hooked = window.pageYOffset >= self.elemTop ? true : false;

					hooked ? caught() : release();

				});
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
			speed: 500,
			margin: 50
		}
	}
	
})(jQuery, window, document);