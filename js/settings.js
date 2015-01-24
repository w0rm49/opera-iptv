/**
 * Created by wm on 24.01.15.
 */

Settings = {
    $container: null,
    $address: null,
    $save: null,
    udpxyAddress: "",
    visible: false,

    init: function(){
        this.$container = $('.settings');
        this.$address = this.$container.find(".address");
        this.$save = this.$container.find(".save-settings");
        this.bindEvents();

        if(AppStorage.isSet("udpxyAddress")){
            this.udpxyAddress = AppStorage.get('udpxyAddress');
            this.$address.val(this.udpxyAddress);
        } else {
            this.show();
        }
    },

    bindEvents: function(){
        var that = this;
        var keydownHandler = function(e){
            if (e.which === Keyboard.keys.VK_ENTER) {
                that.hide();
            }
            e.stopPropagation();
        };

        this.$address.bind({
            "keydown" : keydownHandler,
            "change": function(){
                that.udpxyAddress = that.$address.val();
                AppStorage.set("udpxyAddress", that.udpxyAddress);
            }
        });
        this.$save.bind({
            "keydown" : keydownHandler
        })
    },

    show: function(){
        this.$container.show();
        this.$address.focus();
        this.visible = true;
    },

    hide: function(){
        this.$container.hide();
        this.$container.find("*").blur();
        this.visible = false;
    },

    toggle: function(){
        this.$container.toggle(!this.visible);
    }

};