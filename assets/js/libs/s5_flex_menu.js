var Eventx = {
    addEvent: function(elem, type, func) {
        if (document.addEventListener) {
            elem.addEventListener(type, func, false);
        } else {
            elem.attachEvent('on' + type, func);
        }
    },
    onResizend: function(onResizend) {
        var actionState = 'normal',
            taskPtr = null,
            timeOutTask = function() {
                taskPtr && clearTimeout(taskPtr);
                taskPtr = setTimeout(function() {
                    onResizend && onResizend();
                    actionState = 'normal';
                }, 500)
            };
        this.addEvent(window, 'resize', function() {
            actionState = 'resizing';
            timeOutTask();
        });
    },
    onResizestart: function(onResizestart) {
        var isExecuted = false;
        this.onResizend(function() {
            isExecuted = false;
        });
        this.addEvent(window, 'resize', function() {
            if (!isExecuted) {
                onResizestart && onResizestart();
                isExecuted = true;
            }
        });
    }
};
Array.prototype.every = function(fn, bind) {
    for (var i = 0, l = this.length >>> 0; i < l; i++) {
        if ((i in this) && !fn.call(bind, this[i], i, this)) return false;
    }
    return true;
};
Array.prototype.filter = function(fn, bind) {
    var results = [];
    for (var value, i = 0, l = this.length >>> 0; i < l; i++)
        if (i in this) {
            value = this[i];
            if (fn.call(bind, value, i, this)) results.push(value);
        }
    return results;
};
Array.prototype.indexOf = function(item, from) {
    var length = this.length >>> 0;
    for (var i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++) {
        if (this[i] === item) return i;
    }
    return -1;
};
Array.prototype.map = function(fn, bind) {
    var length = this.length >>> 0,
        results = Array(length);
    for (var i = 0; i < length; i++) {
        if (i in this) results[i] = fn.call(bind, this[i], i, this);
    }
    return results;
};
Array.prototype.some = function(fn, bind) {
    for (var i = 0, l = this.length >>> 0; i < l; i++) {
        if ((i in this) && fn.call(bind, this[i], i, this)) return true;
    }
    return false;
};
Array.prototype.clean = function() {
    return this.filter(function(item) {
        return item != null;
    });
};
Array.prototype.invoke = function(methodName) {
    var args = Array.slice(arguments, 1);
    return this.map(function(item) {
        return item[methodName].apply(item, args);
    });
};
Array.prototype.associate = function(keys) {
    var obj = {},
        length = Math.min(this.length, keys.length);
    for (var i = 0; i < length; i++) obj[keys[i]] = this[i];
    return obj;
};
Array.prototype.link = function(object) {
    var result = {};
    for (var i = 0, l = this.length; i < l; i++) {
        for (var key in object) {
            if (object[key](this[i])) {
                result[key] = this[i];
                delete object[key];
                break;
            }
        }
    }
    return result;
};
Array.prototype.contains = function(item, from) {
    return this.indexOf(item, from) != -1;
};
Array.prototype.append = function(array) {
    this.push.apply(this, array);
    return this;
};
Array.prototype.getLast = function() {
    return (this.length) ? this[this.length - 1] : null;
};
Array.prototype.getRandom = function() {
    return (this.length) ? this[Number.random(0, this.length - 1)] : null;
};
Array.prototype.include = function(item) {
    if (!this.contains(item)) this.push(item);
    return this;
};
Array.prototype.combine = function(array) {
    for (var i = 0, l = array.length; i < l; i++) this.include(array[i]);
    return this;
};
Array.prototype.erase = function(item) {
    for (var i = this.length; i--;) {
        if (this[i] === item) this.splice(i, 1);
    }
    return this;
};
Array.prototype.empty = function() {
    this.length = 0;
    return this;
};
Array.prototype.flatten = function() {
    var array = [];
    for (var i = 0, l = this.length; i < l; i++) {
        var type = typeOf(this[i]);
        if (type == 'null') continue;
        array = array.concat((type == 'array' || type == 'collection' || type == 'arguments' || instanceOf(this[i], Array)) ? Array.flatten(this[i]) : this[i]);
    }
    return array;
};
Array.prototype.pick = function() {
    for (var i = 0, l = this.length; i < l; i++) {
        if (this[i] != null) return this[i];
    }
    return null;
};
Array.prototype.hexToRgb = function(array) {
    if (this.length != 3) return null;
    var rgb = this.map(function(value) {
        if (value.length == 1) value += value;
        return value.toInt(16);
    });
    return (array) ? rgb : 'rgb(' + rgb + ')';
};
Array.prototype.rgbToHex = function(array) {
    if (this.length < 3) return null;
    if (this.length == 4 && this[3] == 0 && !array) return 'transparent';
    var hex = [];
    for (var i = 0; i < 3; i++) {
        var bit = (this[i] - 0).toString(16);
        hex.push((bit.length == 1) ? '0' + bit : bit);
    }
    return (array) ? hex : '#' + hex.join('');
};
if (undefined == Function.prototype.bind) {
    Function.prototype.bind = function(that) {
        var self = this,
            args = arguments.length > 1 ? Array.slice(arguments, 1) : null,
            F = function() {};
        var bound = function() {
            var context = that,
                length = arguments.length;
            if (this instanceof bound) {
                F.prototype = self.prototype;
                context = new F;
            }
            var result = (!args && !length) ? self.call(context) : self.apply(context, args && length ? args.concat(Array.slice(arguments)) : args || arguments);
            return context == that ? result : context;
        };
        return bound;
    }
}(function($) {
    $.fn.getLast = function(n) {
        return $(this).children().last();
    };
    $.fn.getPrevious = $.fn.prev;
    $.fn.getFirst = function(n) {
        return $(this).children().first();
    };
    $.fn.getNext = $.fn.next;
    $.fn.fireEvents = function(n) {
        $(this).each(function(i, d) {
            $(d).trigger(n);
        });
    };
    MenuMatic = window.MenuMatic = function(options) {
        this.options = {
            id: 's5_nav',
            subMenusContainerId: 'subMenusContainer',
            tabletWidth: 800,
            effect: 'slide & fade',
            duration: 600,
            physics: 'easeOutQuad',
            hideDelay: 1000,
            displayDelay: 0,
            stretchMainMenu: false,
            matchWidthMode: false,
            orientation: 'horizontal',
            direction: {
                x: 'right',
                y: 'down'
            },
            olddirection: {
                x: 'right',
                y: 'down'
            },
            tweakInitial: {
                x: 0,
                y: 0
            },
            tweakSubsequent: {
                x: 0,
                y: 0
            },
            center: false,
            opacity: 95,
            mmbFocusedClassName: null,
            mmbClassName: null,
            killDivider: null,
            fullWidth: null,
            fixHasLayoutBug: false,
            onHideAllSubMenusNow_begin: (function() {}),
            onHideAllSubMenusNow_complete: (function() {}),
            onInit_begin: (function() {}),
            onInit_complete: (function() {})
        }, this.hideAllMenusTimeout = null, this.S5DisplayMenusTimeout = null, this.allSubMenus = [], this.subMenuZindex = 1;
        this.initialize(options);
        this.stretch();
        this.killDivider();
        this.center();
        this.fixHasLayoutBug();
    }
    MenuMatic.prototype.initialize = function(options) {
        this.options = $.extend(this.options, options);
        this.options.olddirection.x = this.options.direction.x;
        this.options.olddirection.y = this.options.direction.y;
        if (this.options.opacity > 99) {
            this.options.opacity = 99.9;
        }
        this.options.opacity = this.options.opacity / 100;
        this.options.direction.x = this.options.direction.x.toLowerCase();
        this.options.direction.y = this.options.direction.y.toLowerCase();
        if (this.options.direction.x === 'right') {
            this.options.direction.xInverse = 'left';
        } else if (this.options.direction.x === 'left') {
            this.options.direction.xInverse = 'right';
        }
        if (this.options.direction.y === 'up') {
            this.options.direction.yInverse = 'down';
        } else if (this.options.direction.y === 'down') {
            this.options.direction.yInverse = 'up';
        }
        var links = $('#' + this.options.id + ' li, span.grouped_sub_parent_item');
        var LiParent = new Array();
        $(links).each((function(index, item) {
            $(item).data('parentLinks', $(item).parents('li'));
            if ($(item).children('ul') && $(item).children('ul').length >= 1) {
                var child_Menu = $(item).children('ul');
                LiParent[index] = "";
            } else {
                var child_Menu = null;
            }
            $(item).data('childMenu', child_Menu);
            if (child_Menu) child_Menu.data('parentMenu', $(item));
            theSubMenuType = 'subsequent';
            if ($($(item).parents('ul') || $(item).parents('ol')).attr('id') === this.options.id) {
                theSubMenuType = 'initial';
            }
            $(item).data('subMenuType', theSubMenuType);
            if (theSubMenuType === 'initial' && $($(item).children('ul') || $(item).children('ol'))) {
                $(item).addClass('mainMenuParentBtn');
            } else if ($($(item).children('ul') || $(item).children('ol'))) {
                $(item).addClass('subMenuParentBtn');
            }
        }).bind(this));
        var subMenusContainer = $('<div></div>').attr('id', this.options.subMenusContainerId).appendTo($('body'));
        var existing_index = new Array();
        $('#' + this.options.id + ' ul').each(function(index, item) {
            if ($(item).parents('div[class*=moduletable]').length == 0) {
                if ($(item).parents('span.grouped_sub_parent_item').size() > 0) {
                    var parent_li_index = links.index($(item).parents('span.grouped_sub_parent_item'));
                } else {
                    var parent_li_index = links.index($(item).parent('li'));
                }
                if (false == existing_index.contains(parent_li_index)) {
                    existing_index.include(parent_li_index);
                    if ($(item).parent().data('subMenuType') == 'initial') {
                        var subMenusContainersmOW = $('<div></div>').addClass('s5_sub_wrap').attr('id', 'ul_child_' + parent_li_index).appendTo(subMenusContainer);
                    } else {
                        var subMenusContainersmOW = $('<div></div>').addClass('s5_sub_wrap_lower').attr('id', 'ul_child_' + parent_li_index).appendTo(subMenusContainer);
                    }
                    var subMenusContainerUl = $('<ul></ul>').appendTo(subMenusContainersmOW);
                    var subMenusContainerLI = $('<li></li>').attr('id', 'li_child_' + parent_li_index).appendTo(subMenusContainerUl).append(item);
                } else {
                    if ($('#li_child_' + parent_li_index)) {
                        $('#li_child_' + parent_li_index).append(item);
                    }
                }
            }
        });
        $('a', subMenusContainer).attr('tabindex', '-1');
        links.each((function(index, item) {
            if (!$(item).data('childMenu')) {
                return;
            }
            $(item).data('childMenu', $('#ul_child_' + index));
            $('#ul_child_' + index).data('parentMenu', $(item));
            this.allSubMenus.include($(item).data('childMenu'));
            var tmp = [];
            $(item).data('parentLinks').each(function(index, item2) {
                if ($(item2).data('childMenu')) tmp.include($(item2).data('childMenu')[0]);
                else {
                    tmp.include($(item2).parentsUntil('li').parentsUntil('div').parent()[0]);
                }
            });
            $(item).data('parentSubMenus', $(tmp));
            delete tmp;
            var aSubMenu = new MenuMaticSubMenu();
            jQuery(item).data('subMenuInstance', aSubMenu);
            aSubMenu.initialize(this.options, this, $(item), index);
        }).bind(this));
        var nonParentBtns = $('#' + this.options.id + ' li').filter(function(index, item) {
            return !$(item).data('childMenu');
        });
        nonParentBtns.each((function(index, item) {
            $(item).bind('mouseenter', (function(e) {
                e.preventDefault();
                this.hideAllSubMenusNow();
                if (this.options.mmbClassName && this.options.mmbFocusedClassName) {
                    if (!$(item).data('btnMorph')) $(item).switchClass(this.options.mmbFocusedClassName, '', this.options.duration / 2, this.options.physics);
                    else $(item).data('btnMorph');
                }
            }).bind(this));
            $(item).bind('focus', (function(e) {
                e.preventDefault();
                this.hideAllSubMenusNow();
                if (this.options.mmbClassName && this.options.mmbFocusedClassName) {
                    if (!$(item).data('btnMorph')) $(item).switchClass(this.options.mmbFocusedClassName, '', this.options.duration / 2, this.options.physics);
                    else $(item).data('btnMorph');
                }
            }).bind(this));
            $(item).bind('mouseleave', (function(e) {
                e.preventDefault();
                if (this.options.mmbClassName && this.options.mmbFocusedClassName) {
                    if (!$(item).data('btnMorph')) $(item).switchClass(this.options.mmbClassName, '', this.options.duration / 2, this.options.physics);
                    else $(item).data('btnMorph');
                }
            }).bind(this));
            $(item).bind('blur', (function(e) {
                e.preventDefault();
                if (this.options.mmbClassName && this.options.mmbFocusedClassName) {
                    if (!$(item).data('btnMorph')) $(item).switchClass(this.options.mmbClassName, '', this.options.duration / 2, this.options.physics);
                    else $(item).data('btnMorph');
                }
            }).bind(this));
            $(item).bind('keydown', (function(e) {
                var event = new Event(e);
                if (e.key === 'up' || e.key === 'down' || e.key === 'left' || e.key === 'right') {
                    e.stop();
                }
                if (e.key === 'left' && this.options.orientation === 'horizontal' || e.key === 'up' && this.options.orientation === 'vertical') {
                    if ($(item).parents('li').getPrevious('li')) {
                        $(item).parents('li').getPrevious('li').getFirst('a').focus();
                    } else {
                        $(item).parents('li').parent().getLast('li').getFirst('a').focus();
                    }
                } else if (e.key === 'right' && this.options.orientation === 'horizontal' || e.key === 'down' && this.options.orientation === 'vertical') {
                    if ($(item).parents('li').getNext('li')) {
                        $(item).parents('li').getNext('li').getFirst('a').focus();
                    } else {
                        $(item).parents('li').parent().getFirst('li').getFirst('a').focus();
                    }
                }
            }).bind(this));
        }).bind(this));
        this.onResizeWindow();
        Eventx.onResizestart(this.hideAllSubMenusNow.bind(this));
        Eventx.onResizend(this.onResizeWindow.bind(this));
    }
    MenuMatic.prototype.getWidth = function() {
        if (this.options.fullWidth && typeof this.options.fullWidth === "function") {
            return this.options.fullWidth();
        }
        return "auto";
    }
    MenuMatic.prototype.onResizeWindow = function() {
        var thisp = this;
        if ($(window).width() >= this.options.tabletWidth) {
            var needTablet = window.needTablet = 0;
            if (window.s5menuTablet) var needRevert = window.needRevert = 1;
            else
                var needRevert = window.needRevert = 0;
        } else if ($(window).width() < this.options.tabletWidth && !!(('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))) {
            var needRevert = window.needRevert = 0;
            if (window.s5menuTablet) var needTablet = window.needTablet = 0;
            else
                var needTablet = window.needTablet = 1;
        }
        if (needTablet || needRevert) {
            var links = jQuery('.mainMenuParentBtn,.subMenuParentBtn,.mainParentBtn,.subParentBtn');
            links.each(function(i, d) {
                if (!$(d).data('childMenu')) {
                    if (needTablet) {
                        $(d).unbind('mouseenter').bind('mouseenter', function() {
                            jQuery('.mainParentBtnFocused').removeClass('mainParentBtnFocused');
                            jQuery(this).addClass('mainParentBtnFocused');
                        });
                        $(d).unbind('mouseleave').bind('mouseleave', function() {
                            jQuery(this).removeClass('mainParentBtnFocused');
                        });
                    }
                    if (needRevert) {
                        $(d).unbind('mouseenter').bind('mouseenter', thisp.hideAllSubMenusNow.bind(thisp));
                    }
                    return;
                }
                var that = $(d).data('subMenuInstance');
                if (needTablet) {
                    window.s5menuTablet = 1;
                    var mouseEnterH = function(e) {
                        e.preventDefault();
                        jQuery(this).css({
                            background: ''
                        });
                        if (that.subMenuType == 'initial') {
                            jQuery(this).addClass('mainMenuParentBtnFocused');
                        } else {
                            jQuery(this).addClass('subMenuParentBtn').addClass('subMenuParentBtnFocused');
                        }
                        if (that.subMenuType === 'initial' && that.options.mmbClassName && that.options.mmbFocusedClassName) {
                            if ($(this).data('btnMorph')) $(this).data('btnMorph');
                            else $(this).switchClass(that.options.mmbFocusedClassName, '', that.options.duration / 2, that.options.physics);
                        }
                    };
                    var mouseLeaveH = function(e) {
                        if (!$(this).data('menuOpened')) {
                            if (that.subMenuType == 'initial') jQuery(this).removeClass('mainMenuParentBtnFocused').removeClass('mainMenuParentBtnTablet');
                            else jQuery(this).removeClass('subMenuParentBtnFocused');
                        }
                        return false;
                    }
                    var clickH = function(e) {
                        if (e.target.nodeName == 'SPAN' && e.target.hasAttribute('onclick') && e.target.getAttribute('onclick').indexOf('javascript:;') == -1) {
                            e.target.click();
                            return false;
                        }
                        if (that.subMenuType == 'initial') jQuery(this).removeClass('mainMenuParentBtnTablet');
                        else jQuery(this).find('.S5_submenu_item').removeClass('S5_submenu_itemTablet');
                        if ($(this).data('menuOpened')) {
                            that.hideSubMenu(true);
                            var tmp = $(this).data('childMenu').find('li').filter(function(i, cli) {
                                return $(cli).data('childMenu') && $(cli).data('menuOpened');
                            });
                            tmp.each(function(i, cli) {
                                $(cli).data('subMenuInstance').hideSubMenu();
                                var tmp2 = $(cli).data('childMenu').find('li').filter(function(i, cli2) {
                                    return $(cli2).data('childMenu') && $(cli2).data('menuOpened');
                                });
                                tmp2.each(function(i, cli3) {
                                    $(cli3).data('subMenuInstance').hideSubMenu();
                                });
                            });
                            $(this).data('menuOpened', false);
                            if (that.subMenuType == 'initial') {
                                jQuery(this).removeClass('mainMenuParentBtnFocused').addClass('mainMenuParentBtnTablet');
                            } else {
                                jQuery(this).find('.S5_submenu_item').addClass('S5_submenu_itemTablet');
                            }
                            return false;
                        }
                        $(this).data('menuOpened', true);
                        e.preventDefault();
                        that.cancellHideAllSubMenus();
                        that.hideOtherSubMenus();
                        setTimeout(function() {
                            that.showSubMenu();
                        }, 10);
                        if (that.subMenuType === 'initial' && that.options.mmbClassName && that.options.mmbFocusedClassName) {
                            if ($(this).data('btnMorph')) $(this).data('btnMorph');
                            else $(this).switchClass(that.options.mmbFocusedClassName, '', that.options.duration / 2, that.options.physics);
                        }
                    };
                }
                if (needRevert) {
                    window.s5menuTablet = 0;
                    var mouseEnterH = $(d).data('mouseenterH');
                    var mouseLeaveH = $(d).data('mouseleaveH');
                    var clickH = function(e) {
                        e.target.click();
                    }
                }
                $(d).unbind('mouseenter').bind('mouseenter', mouseEnterH).unbind('mouseleave').bind('mouseleave', mouseLeaveH).unbind('click').bind('click', clickH);
            });
            jQuery('li[id*=li_child_] ul').each(function(i, d) {
                var pmenu = $(d).data('parentMenu');
                if (pmenu) {
                    var that = pmenu.data('subMenuInstance');
                    if (needTablet || needRevert) {
                        if (needTablet) {
                            var mouseEnterH = function() {
                                if (that.subMenuType == 'initial') pmenu.addClass('mainMenuParentBtnFocused');
                                else pmenu.addClass('subMenuParentBtnFocused');
                            };
                        }
                        if (needRevert) {
                            var mouseEnterH = pmenu.data('mouseenterH');
                        }
                        $(d).bind('mouseenter', mouseEnterH);
                    }
                }
                $(d).children('li').each(function(i, dd) {
                    if ($(dd).data('childMenu')) {
                        var that = $(dd).data('subMenuInstance');
                        if (needTablet || needRevert) {
                            if (needTablet) {
                                var mouseLeaveH = function() {
                                    if ($(dd).data('menuOpened') == false) {
                                        if (that.subMenuType == 'initial') $(this).removeClass('mainMenuParentBtnFocused');
                                        else $(this).removeClass('subMenuParentBtnFocused');
                                    }
                                };
                                var mouseEnterH = function() {
                                    if (that.subMenuType == 'initial') $(this).addClass('mainMenuParentBtnFocused');
                                    else $(this).addClass('subMenuParentBtnFocused').find('.S5_submenu_itemTablet').removeClass('S5_submenu_itemTablet');
                                };
                            }
                            if (needRevert) {
                                var mouseLeaveH = $(dd).data('mouseleaveH');
                                var mouseEnterH = $(dd).data('mouseenterH');
                            }
                            $(dd).unbind('mouseleave').bind('mouseleave', mouseLeaveH).unbind('mouseenter').bind('mouseenter', mouseEnterH);
                        }
                    } else {
                        var mouseLeaveH = $(dd).data('mouseleaveH');
                        var mouseEnterH = $(dd).data('mouseenterH');
                        if (needRevert) {
                            $(dd).unbind('mouseleave').bind('mouseleave', mouseLeaveH).unbind('mouseenter').bind('mouseenter', mouseEnterH);
                        }
                        if (needTablet) {
                            $(dd).unbind('mouseleave').unbind('mouseenter').bind('click', mouseEnterH);
                        }
                    }
                });
            });
        }
    };
    MenuMatic.prototype.fixHasLayoutBug = function() {
        if ($.browser.msie && this.options.fixHasLayoutBug) {
            $('#' + this.options.id).parents().css('zoom', 1);
            $('#' + this.options.id).css('zoom', 1);
            $('#' + this.options.id).children().css('zoom', 1);
            $('#' + this.options.subMenusContainerId).css('zoom', 1);
            $('#' + this.options.subMenusContainerId).children().css('zoom', 1);
        }
    };
    MenuMatic.prototype.center = function() {
        if (!this.options.center) {
            return;
        }
        $('#' + this.options.id).css({
            'left': '50%',
            'marginLeft': -($('#' + this.options.id).width() / 2)
        });
    };
    MenuMatic.prototype.stretch = function() {
        if (this.options.stretchMainMenu && this.options.orientation === 'horizontal') {
            var targetWidth = parseFloat($('#' + this.options.id).width());
            var totalBtnWidth = 0;
            var mainBtns = $('#' + this.options.id + ' li');
            mainBtns.css({
                'paddingLeft': 0,
                'paddingRight': 0
            });
            mainBtns.each((function(index, item) {
                totalBtnWidth += $(item).width();
            }).bind(this));
            if (targetWidth < totalBtnWidth) {
                return;
            }
            var increment = (targetWidth - totalBtnWidth) / mainBtns.length;
            mainBtns.each((function(index, item) {
                $(item).css('width', $(item).width() + increment);
            }).bind(this));
            mainBtns.getLast().css('width', mainBtns.getLast().width() - 1);
        }
    };
    MenuMatic.prototype.killDivider = function() {
        if (this.options.killDivider && this.options.killDivider.toLowerCase() === 'first') {
            $($('#' + this.options.id + ' li')[0]).css({
                'background': 'none'
            });
        } else if (this.options.killDivider && this.options.killDivider.toLowerCase() === 'last') {
            $($('#' + this.options.id + ' li').getLast()).css({
                'background': 'none'
            });
        }
    };
    MenuMatic.prototype.hideAllSubMenusNow = function() {
        clearTimeout(this.hideAllMenusTimeout);
        $(this.allSubMenus).fireEvents('hidex');
    };
    var MenuMaticSubMenu = function() {
        this.options = {
            onSubMenuInit_begin: (function(subMenuClass) {}),
            onSubMenuInit_complete: (function(subMenuClass) {}),
            onMatchWidth_begin: (function(subMenuClass) {}),
            onMatchWidth_complete: (function(subMenuClass) {}),
            onHideSubMenu_begin: (function(subMenuClass) {}),
            onHideSubMenu_complete: (function(subMenuClass) {}),
            onHideOtherSubMenus_begin: (function(subMenuClass) {}),
            onHideOtherSubMenus_complete: (function(subMenuClass) {}),
            onHideAllSubMenus_begin: (function(subMenuClass) {}),
            onHideAllSubMenus_complete: (function(subMenuClass) {}),
            onPositionSubMenu_begin: (function(subMenuClass) {}),
            onPositionSubMenu_complete: (function(subMenuClass) {}),
            onShowSubMenu_begin: (function(subMenuClass) {}),
            onShowSubMenu_complete: (function(subMenuClass) {})
        };
        this.root = null;
        this.btn = null;;
        this.hidden = true;
        this.myEffect = null;
    }
    MenuMaticSubMenu.prototype.matchWidth = function() {
        if (this.widthMatched || !this.options.matchWidthMode || this.subMenuType === 'subsequent') {
            return;
        }
        if (this.btn.is('li') == false) var bw = this.btn.parentsUntil('li').eq(0).outerWidth();
        else
            var bw = this.btn.outerWidth();
        var parentWidth = bw;
        $('li', $(this.childMenu)).each((function(index, item) {
            var borderWidth = parseFloat($(this.childMenu).getFirst().getStyle('borderLeftWidth')) + parseFloat($(this.childMenu).getFirst().getStyle('borderRightWidth'));
            var paddingWidth = parseFloat($(item).getStyle('paddingLeft')) + parseFloat($(item).getStyle('paddingRight'));
            var offset = borderWidth + paddingWidth;
            if (parentWidth > $(item).width()) {
                $(item).css('width', parentWidth - offset);
                $(item).css('margin-right', -borderWidth);
            }
        }).bind(this));
        this.width = this.childMenu.getFirst().width();
        this.widthMatched = true;
    };
    MenuMaticSubMenu.prototype.hideSubMenu = function(keepClass) {
        if (this.childMenu.data('status') === 'closed') {
            return;
        }
        if (keepClass == undefined) {
            if (this.subMenuType == 'initial') {
                if (this.options.mmbClassName && this.options.mmbFocusedClassName) {
                    if ($(this.btn).data('btnMorph')) $(this.btn).data('btnMorph');
                    else this.btn.switchClass(this.options.mmbClassName, '', this.options.duration, this.options.physics, (function() {
                        $(this.btn).removeClass('mainMenuParentBtnFocused');
                        $(this.btn).addClass('mainMenuParentBtn');
                    }).bind(this));
                } else {
                    $(this.btn).removeClass('mainMenuParentBtnFocused');
                    $(this.btn).addClass('mainMenuParentBtn');
                }
            } else {
                $(this.btn).removeClass('subMenuParentBtnFocused');
                $(this.btn).addClass('subMenuParentBtn');
            }
        }
        if (this.options.effect && this.options.effect.toLowerCase() === 'slide') {
            if (this.subMenuType == 'initial' && this.options.orientation === 'horizontal' && this.options.direction.y === 'down') {
                $(this.childMenu).getFirst().animate({
                    'marginTop': -this.height
                }, {
                    'duration': this.options.duration,
                    'easing': this.options.physics,
                    'queue': false,
                    'complete': (function() {
                        this.childMenu.css({
                            left: 0,
                            display: 'none',
                            'zIndex': -100
                        });
                    }).bind(this)
                }).bind(this);
            } else if (this.subMenuType == 'initial' && this.options.orientation === 'horizontal' && this.options.direction.y === 'up') {
                $(this.childMenu).getFirst().animate({
                    'marginTop': this.height
                }, {
                    'duration': this.options.duration,
                    'easing': this.options.physics,
                    'queue': false,
                    'complete': (function() {
                        this.childMenu.css({
                            left: 0,
                            display: 'none',
                            'zIndex': -100
                        });
                    }).bind(this)
                }).bind(this);
            } else if (this.options.direction.x === 'right') {
                $(this.childMenu).getFirst().animate({
                    'marginLeft': -this.width
                }, {
                    'duration': this.options.duration,
                    'easing': this.options.physics,
                    'queue': false,
                    'complete': (function() {
                        this.childMenu.css({
                            left: 0,
                            display: 'none',
                            'zIndex': -100
                        });
                    }).bind(this)
                }).bind(this);
            } else if (this.options.direction.x === 'left') {
                $(this.childMenu).getFirst().animate({
                    'marginLeft': this.width
                }, {
                    'duration': this.options.duration,
                    'easing': this.options.physics,
                    'queue': false,
                    'complete': (function() {
                        this.childMenu.css({
                            left: 0,
                            display: 'none',
                            'zIndex': -100
                        });
                    }).bind(this)
                }).bind(this);
            }
        } else if (this.options.effect == 'fade') {
            $(this.childMenu).getFirst().animate({
                'opacity': 0
            }, {
                'duration': this.options.duration,
                'easing': this.options.physics,
                'queue': false,
                'complete': (function() {
                    this.childMenu.css({
                        left: 0,
                        display: 'none',
                        'zIndex': -100
                    });
                }).bind(this)
            }).bind(this);
        } else if (this.options.effect == 'slide & fade') {
            if (this.subMenuType == 'initial' && this.options.orientation === 'horizontal' && this.options.direction.y === 'down') {
                $(this.childMenu).getFirst().animate({
                    'marginTop': -this.height,
                    opacity: 0
                }, {
                    'duration': this.options.duration,
                    'easing': this.options.physics,
                    'queue': false,
                    'complete': (function() {
                        this.childMenu.css({
                            left: 0,
                            display: 'none',
                            'zIndex': -100
                        });
                    }).bind(this)
                }).bind(this);
            } else if (this.subMenuType == 'initial' && this.options.orientation === 'horizontal' && this.options.direction.y === 'up') {
                $(this.childMenu).getFirst().animate({
                    'marginTop': this.height,
                    opacity: 0
                }, {
                    'duration': this.options.duration,
                    'easing': this.options.physics,
                    'queue': false,
                    'complete': (function() {
                        this.childMenu.css({
                            left: 0,
                            display: 'none',
                            'zIndex': -100
                        });
                    }).bind(this)
                }).bind(this);
            } else if (this.options.direction.x === 'right') {
                $(this.childMenu).getFirst().animate({
                    'marginLeft': -this.width,
                    opacity: 0
                }, {
                    'duration': this.options.duration,
                    'easing': this.options.physics,
                    'queue': false,
                    'complete': (function() {
                        this.childMenu.css({
                            left: 0,
                            display: 'none',
                            'zIndex': -100
                        });
                    }).bind(this)
                }).bind(this);
            } else if (this.options.direction.x === 'left') {
                $(this.childMenu).getFirst().animate({
                    'marginLeft': this.width,
                    opacity: 0
                }, {
                    'duration': this.options.duration,
                    'easing': this.options.physics,
                    'queue': false,
                    'complete': (function() {
                        this.childMenu.css({
                            left: 0,
                            display: 'none',
                            'zIndex': -100
                        });
                    }).bind(this)
                }).bind(this);
            }
        } else {
            this.childMenu[0].style.left = "0px";
            this.childMenu[0].style.visiblity = "hidden";
            this.childMenu.css('zIndex', -100);
        }
        this.childMenu.data('status', 'closed');
    };
    MenuMaticSubMenu.prototype.hideOtherSubMenus = function() {
        if (!this.btn.data('otherSubMenus')) {
            this.btn.data('otherSubMenus', $(this.root.allSubMenus.filter((function(item) {
                return this.btn.data('parentSubMenus').index(item) == -1 && item != this.childMenu;
            }).bind(this))));
        }
        this.parentSubMenus.fireEvents('show');
        this.btn.data('otherSubMenus').fireEvents('hidex');
        this.btn.data('otherSubMenus').each(function(i, d) {
            $(d).data('parentMenu').data('menuOpened', false);
        });
    };
    MenuMaticSubMenu.prototype.hideAllSubMenus = function() {
        clearTimeout(this.root.hideAllMenusTimeout);
        this.root.hideAllMenusTimeout = setTimeout((function() {
            clearTimeout(this.root.hideAllMenusTimeout);
            $(this.root.allSubMenus).fireEvents('hidex');
        }).bind(this), this.options.hideDelay);
    };
    MenuMaticSubMenu.prototype.cancellHideAllSubMenus = function() {
        clearTimeout(this.root.hideAllMenusTimeout);
        this.options.direction.x = this.options.olddirection.x;
    };
    MenuMaticSubMenu.prototype.showSubMenu = function() {
        S5DisplayMenusTimeout = setTimeout((function() {
            this.S5showSubMenu();
        }).bind(this), this.options.displayDelay);
    };
    MenuMaticSubMenu.prototype.S5showSubMenu = function(now) {
        if (this.childMenu.data('status') === 'open') {
            return;
        }
        if (this.subMenuType == 'initial') {
            $(this.btn).removeClass('mainMenuParentBtn');
            $(this.btn).addClass('mainMenuParentBtnFocused');
        } else {
            $(this.btn).removeClass('subMenuParentBtn');
            $(this.btn).addClass('subMenuParentBtnFocused');
        }
        this.root.subMenuZindex++;
        this.childMenu.css({
            'display': 'block',
            'visibility': 'hidden',
            'zIndex': this.root.subMenuZindex
        });
        if (!this.height || !this.width) {
            this.height = this.childMenu.getFirst().outerHeight();
            this.width = this.childMenu.getFirst().outerWidth();
            if (this.options.effect === 'slide' || this.options.effect === 'slide & fade') {
                if (this.subMenuType == 'initial' && this.options.orientation === 'horizontal') {
                    this.childMenu.getFirst().css('marginTop', '0');
                    if (this.options.direction.y === 'down') {
                        $(this.childMenu).getFirst().css({
                            'marginTop': -this.height
                        });
                    } else if (this.options.direction.y === 'up') {
                        $(this.childMenu).getFirst().css({
                            'marginTop': this.height
                        });
                    }
                } else {
                    if (this.options.direction.x === 'left') {
                        $(this.childMenu).getFirst().css({
                            'marginLeft': this.width
                        });
                    } else {
                        $(this.childMenu).getFirst().css({
                            'marginLeft': -this.width
                        });
                    }
                }
            }
        }
        this.matchWidth();
        this.positionSubMenu();
        if (this.options.effect === 'slide') {
            this.childMenu.css({
                'display': 'block',
                'visibility': 'visible'
            });
            if (this.subMenuType === 'initial' && this.options.orientation === 'horizontal') {
                if ($('#' + this.options.id).offset().top != $('#' + this.options.id).position().top) $(this.childMenu).css('top.php', $(this.btn).offset().top + $(this.btn).outerHeight() - $(window).scrollTop());
                if (now) {
                    $(this.childMenu).getFirst().stop().animate({
                        'marginTop': 0
                    }, {
                        'duration': 0,
                        'easing': this.options.physics,
                        'queue': false,
                        'complete': (function() {
                            this.showSubMenuComplete();
                        }).bind(this)
                    });
                } else {
                    $(this.childMenu).getFirst().stop().animate({
                        'marginTop': 0
                    }, {
                        'duration': this.options.duration,
                        'queue': false,
                        'easing': this.options.physics,
                        'complete': (function() {
                            this.showSubMenuComplete();
                        }).bind(this)
                    });
                }
            } else {
                if (this.subMenuType === 'subsequent') {
                    if ($('#' + this.options.id).offset().top != $('#' + this.options.id).position().top && $('#' + this.options.id)[0].offsetTop != 0) $(this.childMenu).css('top.php', $(this.btn).offset().top - $(window).scrollTop());
                    else
                        $(this.childMenu).css('top.php', $(this.btn).offset().top);
                }
                if (now) {
                    $(this.childMenu).getFirst().stop().animate({
                        'marginLeft': 0
                    }, {
                        'duration': 0,
                        'easing': this.options.physics,
                        'queue': false,
                        'complete': (function() {
                            this.showSubMenuComplete();
                        }).bind(this)
                    });
                } else {
                    $(this.childMenu).getFirst().stop().animate({
                        'marginLeft': 0
                    }, {
                        'duration': this.options.duration,
                        'easing': this.options.physics,
                        'queue': false,
                        'complete': (function() {
                            this.showSubMenuComplete();
                        }).bind(this)
                    });
                }
            }
        } else if (this.options.effect === 'fade') {
            this.childMenu.css({
                'display': 'block',
                'visibility': 'visible'
            });
            if (now) {
                $(this.childMenu).getFirst().stop().animate({
                    'opacity': this.options.opacity
                }, {
                    'duration': 0,
                    'easing': this.options.physics,
                    'queue': false,
                    'complete': (function() {
                        this.showSubMenuComplete();
                    }).bind(this)
                });
            } else {
                $(this.childMenu).getFirst().stop().animate({
                    'opacity': this.options.opacity
                }, {
                    'duration': this.options.duration,
                    'easing': this.options.physics,
                    'queue': false,
                    'complete': (function() {
                        this.showSubMenuComplete();
                    }).bind(this)
                });
            }
        } else if (this.options.effect == 'slide & fade') {
            this.childMenu.css({
                'display': 'block',
                'visibility': 'visible'
            });
            this.childMenu.getFirst().css({
                'left': 0
            });
            if (this.subMenuType === 'initial' && this.options.orientation === 'horizontal') {
                if ($('#' + this.options.id).offset().top != $('#' + this.options.id).position().top) $(this.childMenu).css('top.php', $(this.btn).offset().top + $(this.btn).outerHeight() - $(window).scrollTop());
                if (now) {
                    $(this.childMenu).getFirst().stop().animate({
                        'marginTop': 0,
                        'opacity': this.options.opacity
                    }, {
                        'duration': 0,
                        'queue': false,
                        'easing': this.options.physics,
                        'complete': (function() {
                            this.showSubMenuComplete();
                        }).bind(this)
                    });
                } else {
                    $(this.childMenu).getFirst().stop().animate({
                        'marginTop': 0,
                        'opacity': this.options.opacity
                    }, {
                        'duration': this.options.duration,
                        'queue': false,
                        'easing': this.options.physics,
                        'complete': (function() {
                            this.showSubMenuComplete();
                        }).bind(this)
                    });
                }
            } else {
                if (this.subMenuType === 'subsequent') {
                    if ($('#' + this.options.id).offset().top != $('#' + this.options.id).position().top) $(this.childMenu).css('top.php', $(this.btn).offset().top - $(window).scrollTop());
                }
                if (now) {
                    if (this.options.direction.x === 'right') {
                        $(this.childMenu).getFirst().stop().animate({
                            'marginLeft': 0,
                            'opacity': this.options.opacity
                        }, {
                            'duration': 0,
                            'easing': this.options.physics,
                            'queue': false,
                            'complete': (function() {
                                this.showSubMenuComplete();
                            }).bind(this)
                        });
                    } else if (this.options.direction.x === 'left') {
                        $(this.childMenu).getFirst().stop().animate({
                            'marginLeft': 0,
                            'opacity': this.options.opacity
                        }, {
                            'duration': 0,
                            'easing': this.options.physics,
                            'queue': false,
                            'complete': (function() {
                                this.showSubMenuComplete();
                            }).bind(this)
                        });
                    }
                } else {
                    if (this.options.direction.x === 'right') {
                        $(this.childMenu).getFirst().css('marginLeft', -this.width);
                        $(this.childMenu).getFirst().stop().animate({
                            'marginLeft': 0,
                            'opacity': this.options.opacity
                        }, {
                            'duration': this.options.duration,
                            'easing': this.options.physics,
                            'queue': false,
                            'complete': (function() {
                                this.showSubMenuComplete();
                            }).bind(this)
                        });
                    } else if (this.options.direction.x === 'left') {
                        $(this.childMenu).getFirst().stop().animate({
                            'marginLeft': 0,
                            'opacity': this.options.opacity
                        }, {
                            'duration': this.options.duration,
                            'easing': this.options.physics,
                            'queue': false,
                            'complete': (function() {
                                this.showSubMenuComplete();
                            }).bind(this)
                        });
                    }
                }
            }
        } else {
            this.childMenu.stop().animate({
                'display': 'block',
                'visibility': 'visible'
            }, {
                'duration': 0,
                'easing': this.options.physics,
                'queue': false,
                'complete': (function() {
                    this.showSubMenuComplete();
                }).bind(this)
            });
        }
        this.childMenu.data('status', 'open');
    };
    MenuMaticSubMenu.prototype.showSubMenuComplete = function() {
        if (this.options.olddirection.x) this.options.direction.x = this.options.olddirection.x;
        if ((parseInt(this.childMenu[0].style.top) != this.btn.offset().top && this.btn.offset().top != $('#' + this.options.id).offset().top && parseInt(this.btn.css('marginTop')) == 0) && $('#' + this.options.id)[0].offsetTop != 0) {
            if (this.btn.data('subMenuType') == 'initial') {
                if (this.options.orientation == 'horizontal') {
                    if (this.btn.is('li') == false) var t = this.btn.parentsUntil('li').eq(0).outerHeight();
                    else
                        var t = this.btn.outerHeight();
                } else
                    var t = this.btn.offset().top + this.btn.outerHeight();
                t -= this.subtractScrollTop();
                $(this.childMenu).animate({
                    'top': t
                }, this.options.duration, this.options.physics);
            } else {
                var totop = this.btn.offset().top - this.subtractScrollTop();
                $(this.childMenu).animate({
                    'top': totop
                }, this.options.duration, this.options.physics);
            }
        }
    };
    MenuMaticSubMenu.prototype.positionSubMenu = function() {
        this.childMenu.css('width', this.width);
        this.childMenu.getFirst().css('width', this.width);
        if (this.btn.parents('div').className == 's5_sub_wrap_rtl' || this.btn.parents('div').className == 's5_sub_wrap_lower_rtl') {
            this.childMenu.className = 's5_sub_wrap_lower_rtl';
        }
        if (this.subMenuType === 'subsequent') {
            if (this.parentSubMenu && this.options.direction.x != this.parentSubMenu.options.direction.x) {
                if (this.parentSubMenu.options.direction.x === 'left' && this.options.effect && this.options.effect.contains('slide')) {
                    $(this.childMenu).getFirst().css({
                        'marginLeft': this.width
                    });
                }
            }
            this.options.direction.x = this.parentSubMenu.options.direction.x;
            this.options.direction.xInverse = this.parentSubMenu.options.direction.xInverse;
            this.options.direction.y = this.parentSubMenu.options.direction.y;
            this.options.direction.yInverse = this.parentSubMenu.options.direction.yInverse;
        }
        var top;
        var overlap
        if (this.subMenuType == 'initial') {
            if (this.options.direction.y === 'up') {
                if (this.options.orientation === 'vertical') {
                    if (this.btn.is('li') == false) var t = this.btn.parentsUntil('li').eq(0).outerHeight();
                    else
                        var t = this.btn.outerHeight();
                    top = this.btn.offset().top - this.subtractScrollTop() + t - this.height + this.options.tweakInitial.y;
                } else {
                    top = this.btn.offset().top - this.subtractScrollTop() - this.height + this.options.tweakInitial.y;
                }
                this.childMenu[0].style.top = top + 'px';
            } else if (this.options.orientation == 'horizontal') {
                if (this.btn.is('li') == false) var t = this.btn.parentsUntil('li').eq(0).outerHeight();
                else
                    var t = this.btn.outerHeight();
                this.childMenu[0].style.top = this.btn.offset().top - this.subtractScrollTop() + t + this.options.tweakInitial.y + 'px';
            } else if (this.options.orientation == 'vertical') {
                top = this.btn.offset().top - this.subtractScrollTop() + this.options.tweakInitial.y;
                top += this.btn.outerHeight();
                this.childMenu[0].style.top = top + 'px';
            }
            if (this.options.orientation == 'horizontal') {
                var child_width = this.childMenu.outerWidth();
                var mouse_poz = this.btn.offset().left;
                if (this.btn.is('li') == false) var btn_width = this.btn.parentsUntil('li').eq(0).outerWidth();
                else
                    var btn_width = this.btn.outerWidth();
                var sceen = $(window).width();
                if (this.options.direction.x == 'left') {
                    if ((mouse_poz - child_width) < 0) {
                        if (this.btn.offset().left - child_width + btn_width < 0 && this.btn.offset().left + child_width > sceen) {
                            this.childMenu[0].style.width = this.root.getWidth();
                            this.childMenu[0].style['cssFloat'] = (this.childMenu[0].style.width == 'auto') ? 'left' : 'none';
                            this.childMenu.children().each(function(ii, tt) {
                                $(tt).css({
                                    'float': 'none',
                                    'width': 'auto'
                                });
                                $(tt).children().each(function(jj, zz) {
                                    $(zz).children().each(function(kk, zzz) {
                                        $(zzz).css({
                                            'float': 'none'
                                        });
                                    });
                                });
                            });
                        } else {
                            this.childMenu[0].style.width = this.root.getWidth();
                            this.childMenu[0].style['cssFloat'] = (this.childMenu[0].style.width == 'auto') ? 'left' : 'none';
                            this.childMenu.css({
                                'clear': 'none'
                            });
                            this.childMenu.children().each(function(ii, tt) {
                                $(tt).css({
                                    'float': 'left',
                                    'width': 'auto',
                                    'clear': 'none'
                                }).children().each(function(jj, zz) {
                                    $(zz).children().each(function(kk, zzz) {
                                        $(zzz).css({
                                            'float': 'left',
                                            'clear': 'none'
                                        });
                                    });
                                });
                            });
                        }
                        child_width = $(this.childMenu).outerWidth();
                        if (this.btn.offset().left - child_width + btn_width < 20) {
                            toleft = this.btn.offset().left;
                            need = 1;
                            toleft -= 24;
                        } else {
                            toleft = this.btn.offset().left - child_width + btn_width;
                            need = 0;
                        }
                        this.childMenu[0].style.left = toleft + 'px';
                        if (need) this.childMenu.className = 's5_sub_wrap_rtl';
                        else this.childMenu.className = 's5_sub_wrap';
                    } else {
                        this.childMenu[0].style.width = this.root.getWidth();
                        this.childMenu[0].style['cssFloat'] = (this.childMenu[0].style.width == 'auto') ? 'left' : 'none';
                        this.childMenu.css({
                            'clear': 'none'
                        });
                        this.childMenu.children().each(function(ii, tt) {
                            $(tt).css({
                                'width': 'auto',
                                'float': 'left',
                                'clear': 'none'
                            }).children().each(function(jj, zz) {
                                $(zz).children().each(function(kk, zzz) {
                                    $(zzz).css({
                                        'float': 'left',
                                        'clear': 'none'
                                    });
                                });
                            });
                        });
                        this.childMenu[0].className = 's5_sub_wrap';
                        this.childMenu[0].style.marginLeft = '5px';
                        child_width = this.childMenu.outerWidth();
                        this.childMenu[0].style.left = (this.btn.offset().left - child_width + btn_width) + 'px';
                    }
                } else {
                    if ((child_width + mouse_poz) > sceen) {
                        if (this.btn.offset().left - child_width + btn_width < 0) {
                            this.childMenu[0].style.width = this.root.getWidth();
                            this.childMenu[0].style['cssFloat'] = (this.childMenu[0].style.width == 'auto') ? 'left' : 'none';
                            this.childMenu.children().each(function(ii, tt) {
                                $(tt).css({
                                    'width': 'auto',
                                    float: 'none'
                                }).children().each(function(jj, zz) {
                                    $(zz).children().each(function(kk, zzz) {
                                        $(zzz).css('float', 'none');
                                    });
                                });
                            });
                            this.childMenu.className = 's5_sub_wrap_rtl';
                        } else {
                            this.childMenu[0].style.width = this.root.getWidth();
                            this.childMenu[0].style['cssFloat'] = (this.childMenu[0].style.width == 'auto') ? 'left' : 'none';
                            this.childMenu.css({
                                'clear': 'none'
                            });
                            this.childMenu.children().each(function(ii, tt) {
                                $(tt).css({
                                    'float': 'left',
                                    'width': 'auto',
                                    'clear': 'none'
                                }).children().each(function(jj, zz) {
                                    $(zz).children().each(function(kk, zzz) {
                                        $(zzz).css({
                                            'float': 'left',
                                            'clear': 'none'
                                        });
                                    });
                                });
                            });
                        }
                        child_width = this.childMenu.width();
                        if (child_width + this.btn.offset().left < sceen - 20) toleft = this.btn.offset().left;
                        else {
                            var toleft = this.btn.offset().left - child_width + btn_width;
                            if (toleft < 0) toleft = this.btn.offset().left;
                        }
                        this.childMenu[0].style.left = toleft + 'px';
                        if (child_width + this.btn.offset().left < sceen) this.childMenu.className = 's5_sub_wrap';
                        else this.childMenu.className = 's5_sub_wrap_rtl';
                    } else {
                        this.childMenu[0].style.width = this.root.getWidth();
                        this.childMenu[0].style['cssFloat'] = (this.childMenu[0].style.width == 'auto') ? 'left' : 'none';
                        this.childMenu.children().each(function(ii, tt) {
                            $(tt).css({
                                'float': 'left',
                                'width': 'auto',
                                'clear': 'none'
                            }).children().each(function(jj, zz) {
                                $(zz).children().each(function(kk, zzz) {
                                    $(zzz).css({
                                        'float': 'left',
                                        'clear': 'none'
                                    });
                                });
                            });
                        });
                        this.childMenu.className = 's5_sub_wrap';
                        this.childMenu[0].style.left = this.btn.offset().left + this.options.tweakInitial.x + 'px';
                    }
                }
            } else if (this.options.direction.x == 'left') {
                this.childMenu[0].style.left = this.btn.offset().left - this.childMenu.width() + this.options.tweakInitial.x + 'px';
            } else if (this.options.direction.x == 'right') {
                if (this.btn.is('li') == false) var bw = this.btn.parentsUntil('li').eq(0).outerWidth();
                else
                    var bw = this.btn.outerWidth();
                this.childMenu[0].style.left = this.btn.offset().left + bw + this.options.tweakInitial.x + 'px';
            }
        } else if (this.subMenuType == 'subsequent') {
            if (this.options.direction.y === 'down') {
                if ((this.btn.offset().top + this.options.tweakSubsequent.y + this.childMenu.height()) >= $(document.body).scrollTop()) {
                    overlap = (this.btn.offset().top - this.subtractScrollTop() + this.options.tweakSubsequent.y + this.childMenu.height());
                    this.childMenu[0].style.top = (this.btn.offset().top - this.subtractScrollTop() + this.options.tweakSubsequent.y) - overlap - 20 + 'px';
                } else {
                    this.childMenu[0].style.top = this.btn.offset().top - this.subtractScrollTop() + this.options.tweakSubsequent.y + 'px';
                }
            } else if (this.options.direction.y === 'up') {
                if (this.btn.is('li') == false) var t = this.btn.parentsUntil('li').eq(0).outerHeight();
                else
                    var t = this.btn.outerHeight();
                if ((this.btn.offset().top + t - this.subtractScrollTop() - this.height + this.options.tweakSubsequent.y) < 1) {
                    this.options.direction.y = 'down';
                    this.options.direction.yInverse = 'up';
                    this.childMenu[0].style.top = this.btn.offset().top - this.subtractScrollTop() + this.options.tweakSubsequent.y + 'px';
                } else {
                    if (this.btn.is('li') == false) var t = this.btn.parentsUntil('li').eq(0).outerHeight();
                    else
                        var t = this.btn.outerHeight();
                    this.childMenu[0].style.top = this.btn.offset().top - this.subtractScrollTop() + t - this.height + this.options.tweakSubsequent.y + 'px';
                }
            }
            if (this.options.direction.x == 'left') {
                this.childMenu[0].style.left = this.btn.offset().left - this.childMenu.width() + this.options.tweakSubsequent.x + 'px';
                this.childMenu[0].style.top = this.btn.offset().top - this.subtractScrollTop() + this.options.tweakSubsequent.x + 'px';
                if (this.childMenu.offset().left < 20) {
                    this.options.olddirection.x = this.options.direction.x;
                    this.options.direction.x = 'right';
                    this.options.direction.xInverse = 'left';
                    if (this.btn.is('li') == false) var bw = this.btn.parentsUntil('li').eq(0).outerWidth();
                    else
                        var bw = this.btn.outerWidth();
                    this.childMenu[0].style.left = this.btn.offset().left + bw + this.options.tweakSubsequent.x + 'px';
                    this.childMenu.className = 's5_sub_wrap_lower_rtl';
                    if (this.options.effect === 'slide' || this.options.effect === 'slide & fade') {
                        $(this.childMenu).getFirst().css({
                            'marginLeft': -this.width,
                            'opacity': this.options.opacity
                        });
                    }
                }
            } else if (this.options.direction.x == 'right') {
                if (this.btn.is('li') == false) var bw = this.btn.parentsUntil('li').eq(0).outerWidth();
                else
                    var bw = this.btn.outerWidth();
                this.childMenu[0].style.top = this.btn.offset().top - this.subtractScrollTop() + this.options.tweakSubsequent.x + 'px';
                this.childMenu[0].style.left = this.btn.offset().left + bw + this.options.tweakSubsequent.x + 'px';
                var smRight = this.childMenu.offset().left + this.childMenu.width();
                var viewportRightEdge = $(window).width() + $(window).scrollLeft() - 20;
                if (smRight > viewportRightEdge) {
                    this.options.olddirection.x = this.options.direction.x;
                    this.options.direction.x = 'left';
                    this.options.direction.xInverse = 'right';
                    var child_width = this.childMenu.outerWidth();
                    var mouse_poz = this.btn.offset().left;
                    var sceen = $(window).width();
                    if ((child_width + mouse_poz) > sceen) {
                        this.childMenu[0].style.right = this.btn.offset().left + this.options.tweakSubsequent.x + 'px';
                    } else {
                        this.childMenu[0].style.left = this.btn.offset().left - this.childMenu.width() + this.options.tweakSubsequent.x + 'px';
                        this.childMenu.className = 's5_sub_wrap_lower_rtl';
                    }
                    if (this.options.effect === 'slide' || this.options.effect === 'slide & fade') {
                        $(this.childMenu).getFirst().css({
                            'marginLeft': this.width,
                            'opacity': this.options.opacity
                        });
                    }
                }
            }
        }
    };
    MenuMaticSubMenu.prototype.subtractScrollTop = function() {
        return $('#' + this.options.id).offset().top != $('#' + this.options.id).position().top ? $(window).scrollTop() : 0;
    }
    MenuMaticSubMenu.prototype.initialize = function(options, root2, btn2, current_index) {
        this.options = $.extend(options, this.options);
        this.root = root2;
        this.btn = btn2;
        this.childMenu = $(this.btn).data('childMenu');
        if (!this.childMenu) return;
        this.subMenuType = this.btn.data('subMenuType');
        this.parentSubMenus = $(this.btn.data('parentSubMenus'));
        this.parentLinks = this.btn.data('parentLinks');
        if (this.parentSubMenus) this.parentSubMenu = $(this.parentSubMenus[0]);
        else this.parentSubMenu = null;
        if (this.parentSubMenu) {
            this.parentSubMenu = this.parentSubMenu.data('class');
        }
        this.childMenu.data('class', this);
        this.btn.data('class', this);
        this.childMenu.data('status', 'closed');
        this.childMenu.bind('hidex', (function() {
            this.hideSubMenu();
        }).bind(this));
        this.childMenu.bind('show', (function() {
            this.showSubMenu();
        }).bind(this));
        if (this.options.effect) {}
        if (this.options.effect === 'slide' || this.options.effect === 'slide & fade') {
            if (this.subMenuType == 'initial' && this.options.orientation === 'horizontal') {
                this.childMenu.getFirst().css('marginTop', '0');
            } else {
                this.childMenu.getFirst().css('marginLeft', '0');
            }
        } else if (this.options.effect === 'fade' || this.options.effect === 'slide & fade') {
            this.childMenu.getFirst().css('opacity', 0);
        }
        if (this.options.effect != 'fade' && this.options.effect != 'slide & fade') {
            this.childMenu.getFirst().css('opacity', this.options.opacity);
        }
        this.childMenu.getFirst().css('float', 'left');
        var nonParentBtnsP = $("#li_child_" + current_index + ' ul');
        nonParentBtnsP.each((function(index, item) {
            var nonParentBtns = $('li', $(item)).filter(function(index, item) {
                return !$(item).data('childMenu');
            });
            nonParentBtns.each((function(index, item) {
                $(item).addClass('subMenuBtn');
                $(item).bind('mouseenter', (function(e) {
                    this.childMenu.trigger('show');
                    this.cancellHideAllSubMenus();
                    this.hideOtherSubMenus();
                }).bind(this));
                $(item).data('mouseenterH', (function(e) {
                    this.childMenu.trigger('show');
                    this.cancellHideAllSubMenus();
                    this.hideOtherSubMenus();
                }).bind(this));
                $(item).bind('focus', (function(e) {
                    this.childMenu.trigger('show');
                    this.cancellHideAllSubMenus();
                    this.hideOtherSubMenus();
                }).bind(this));
                $(item).bind('mouseleave', (function(e) {
                    this.cancellHideAllSubMenus();
                    this.hideAllSubMenus();
                }).bind(this));
                $(item).data('mouseleaveH', (function(e) {
                    this.cancellHideAllSubMenus();
                    this.hideAllSubMenus();
                }).bind(this));
                $(item).bind('blur', (function(e) {
                    this.cancellHideAllSubMenus();
                    this.hideAllSubMenus();
                }).bind(this));
                $(item).bind('keydown', (function(e) {
                    var event = new Event(e);
                    if (e.key === 'up' || e.key === 'down' || e.key === 'left' || e.key === 'right' || e.key === 'tab') {
                        e.stop();
                    }
                    if (e.key === 'up') {
                        if ($(item).parents('li').getPrevious('li')) {
                            $(item).parents('li').getPrevious('li').getFirst('a').focus();
                        } else if (this.options.direction.y === 'down') {
                            this.btn.focus();
                        } else if (this.options.direction.y === 'up') {
                            $(item).parents('li').parent().getLast('li').getFirst('a').focus();
                        }
                    } else if (e.key === 'down') {
                        if ($(item).parents('li').getNext('li')) {
                            $(item).parents('li').getNext('li').getFirst('a').focus();
                        } else if (this.options.direction.y === 'down') {
                            $(item).parents('li').parent().getFirst('li').getFirst('a').focus();
                        } else if (this.options.direction.y === 'up') {
                            this.btn.focus();
                        }
                    } else if (e.key === this.options.direction.xInverse) {
                        this.btn.focus();
                    }
                }).bind(this));
            }).bind(this));
        }).bind(this));
        this.btn.removeClass('subMenuBtn');
        if (this.subMenuType == 'initial') {
            this.btn.addClass('mainParentBtn');
        } else {
            this.btn.addClass('subParentBtn');
        }
        this.btn.bind('mouseenter', (function(e) {
            e.preventDefault();
            this.cancellHideAllSubMenus();
            this.hideOtherSubMenus();
            setTimeout((function() {
                this.showSubMenu();
            }).bind(this), 10);
            if (this.subMenuType === 'initial' && this.options.mmbClassName && this.options.mmbFocusedClassName) {
                if ($(this.btn).data('btnMorph')) $(this.btn).data('btnMorph');
                else this.btn.switchClass(this.options.mmbFocusedClassName, '', this.options.duration / 2, this.options.physics);
            }
        }).bind(this)).data('mouseenterH', (function(e) {
            e.preventDefault();
            this.cancellHideAllSubMenus();
            this.hideOtherSubMenus();
            setTimeout((function() {
                this.showSubMenu();
            }).bind(this), 10);
            if (this.subMenuType === 'initial' && this.options.mmbClassName && this.options.mmbFocusedClassName) {
                if ($(this.btn).data('btnMorph')) $(this.btn).data('btnMorph');
                else this.btn.switchClass(this.options.mmbFocusedClassName, '', this.options.duration / 2, this.options.physics);
            }
        }).bind(this));
        this.btn.bind('focus', (function(e) {
            e.preventDefault();
            this.cancellHideAllSubMenus();
            this.hideOtherSubMenus();
            this.showSubMenu();
            if (this.subMenuType === 'initial' && this.options.mmbClassName && this.options.mmbFocusedClassName) {
                if ($(this.btn).data('btnMorph')) $(this.btn).data('btnMorph');
                else this.btn.switchClass(this.options.mmbFocusedClassName, '', this.options.duration / 2, this.options.physics);
            }
        }).bind(this));
        this.btn.bind('mouseleave', (function(e) {
            e.preventDefault();
            this.cancellHideAllSubMenus();
            this.hideAllSubMenus();
        }).bind(this)).data('mouseleaveHander', (function(e) {
            e.preventDefault();
            this.cancellHideAllSubMenus();
            this.hideAllSubMenus();
        }).bind(this));;
        this.btn.bind('blur', (function(e) {
            e.preventDefault();
            this.cancellHideAllSubMenus();
            this.hideAllSubMenus();
        }).bind(this));
        this.btn.bind('keydown', (function(e) {
            e = new Event(e)
            if (e.key === 'up' || e.key === 'down' || e.key === 'left' || e.key === 'right') {
                e.stop();
            }
            if (!this.parentSubMenu) {
                if (this.options.orientation === 'horizontal' && e.key === this.options.direction.y || this.options.orientation === 'vertical' && e.key === this.options.direction.x) {
                    if (this.options.direction.y === 'down') {
                        this.childMenu.getFirst().getFirst('li').getFirst('a').focus();
                    } else if (this.options.direction.y === 'up') {
                        this.childMenu.getFirst().getLast('li').getFirst('a').focus();
                    }
                } else if (this.options.orientation === 'horizontal' && e.key === 'left' || this.options.orientation === 'vertical' && e.key === this.options.direction.yInverse) {
                    if (this.btn.parent().getPrevious()) {
                        this.btn.parent().getPrevious().getFirst().focus();
                    } else {
                        this.btn.parent().parent().getLast().getFirst().focus();
                    }
                } else if (this.options.orientation === 'horizontal' && e.key === 'right' || this.options.orientation === 'vertical' && e.key === this.options.direction.y) {
                    if (this.btn.parent().getNext()) {
                        this.btn.parent().getNext().getFirst().focus();
                    } else {
                        this.btn.parent().parent().getFirst().getFirst().focus();
                    }
                }
            } else {
                if (e.key === 'tab') {
                    e.stop();
                }
                if (e.key === 'up') {
                    if (this.btn.parents('li').getPrevious('li')) {
                        this.btn.parents('li').getPrevious('li').getFirst('a').focus();
                    } else if (this.options.direction.y === 'down') {
                        this.parentSubMenu.btn.focus();
                    } else if (this.options.direction.y === 'up') {
                        this.btn.parents('li').parent().getLast('li').getFirst('a').focus();
                    }
                } else if (e.key === 'down') {
                    if (this.btn.parents('li').getNext('li')) {
                        this.btn.parents('li').getNext('li').getFirst('a').focus();
                    } else if (this.options.direction.y === 'down') {
                        this.btn.parents('li').parent().getFirst('li').getFirst('a').focus();
                    } else if (this.options.direction.y === 'up') {
                        this.parentSubMenu.btn.focus();
                    }
                } else if (e.key === this.options.direction.xInverse) {
                    this.parentSubMenu.btn.focus();
                } else if (e.key === this.options.direction.x) {
                    if (this.options.direction.y === 'down') {
                        this.childMenu.getFirst().getFirst('li').getFirst('a').focus();
                    } else if (this.options.direction.y === 'up') {}
                }
            }
        }).bind(this));
    }
})(jQuery);

function s5_create_separator_class() {
    if (document.getElementById("subMenusContainer")) {
        var s5_create_separator_class = document.getElementById("subMenusContainer").getElementsByTagName("A");
        for (var s5_create_separator_class_z = 0; s5_create_separator_class_z < s5_create_separator_class.length; s5_create_separator_class_z++) {
            if (s5_create_separator_class[s5_create_separator_class_z].href == "javascript:;") {
                if (s5_create_separator_class[s5_create_separator_class_z].parentNode.className == "S5_submenu_item") {
                    s5_create_separator_class[s5_create_separator_class_z].parentNode.parentNode.className = s5_create_separator_class[s5_create_separator_class_z].parentNode.parentNode.className + " subSepBtn";
                }
            }
        }
    }
}
window.onload = s5_create_separator_class;