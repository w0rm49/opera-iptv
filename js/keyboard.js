/**
 * Created by wm on 05.12.14.
 */
Keyboard = {

    init : function (){
        this.shimKeys();
        this.generateCodes();
        this.registerEvents();
    },

    shimKeys: function(){
        $.each(this.keys, function(vk, code) {
            if (typeof window[vk] === "undefined") {
                window[vk] = code;
            }
        });
    },

    generateCodes: function(){
        var that = this;
        $.each(that.keys, function(vk, code) {
            that.codes[code] = vk;
        });
    },

    registerEvents: function (){
        var that = this;

        var applyBinding = function(event, bindingsList){
            var key = event.which;
            var hasBinding =
                (that.codes.hasOwnProperty(key)) &&
                (typeof bindingsList[that.codes[key]] === "function");
            if (hasBinding) {
                bindingsList[that.codes[key]](event);
            }
        };

        $(document).on('keydown', function(event) {
            applyBinding(event, that.bindings['keydown']);
        });

        $(document).on('keypress', function(event) {
            applyBinding(event, that.bindings['keypress']);
        });

    },

    keys : {
        VK_ENTER: 13,
        VK_PAUSE: 19,
        VK_REWIND: 412,
        VK_STOP: 413,
        VK_PLAY: 415,
        VK_RECORD: 416,
        VK_FAST_FWD: 417,
        VK_PAGE_UP: 33,   // channel + and long press on fast forward
        VK_PAGE_DOWN: 34, // channel - and long press on fast rewind
        VK_LEFT: 37,
        VK_UP: 38,
        VK_RIGHT: 39,
        VK_DOWN: 40,
        VK_0: 48,
        VK_1: 49,
        VK_2: 50,
        VK_3: 51,
        VK_4: 52,
        VK_5: 53,
        VK_6: 54,
        VK_7: 55,
        VK_8: 56,
        VK_9: 57,
        VK_RED: 403,
        VK_GREEN: 404,
        VK_YELLOW: 405,
        VK_BLUE: 406,
        VK_BACK_SPACE: 8
    },

    codes : {},

    bindings: {
        keydown: {},
        keypress: {}
    }
};