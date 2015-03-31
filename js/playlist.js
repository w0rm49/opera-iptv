/**
 * Created by wm on 08.01.15.
 */
var Playlist = {

    url : "http://iptv.r46.ru/playlist.php?fmt=nstream",
    visible : false,
    entries: [],
    current: 0,
    cursor: 0,

    init : function (){
        this.ui.init();
        this.fetch();
        var lastChannel = parseInt(AppStorage.get("lastChannel"));
        if (lastChannel > 0) {
            this.setChannel(lastChannel);
        }

    },

    fetch : function (){

        var that = this;

        var parseChannel = function(){
            var $this = $(this);
            var idReg = /http:\/\/iptv\.r46\.ru\/tvg\.php\?pid=(\d+)/i;
            var description = $this.find('description').text();
            var channelId = parseInt(description.match(idReg)[1]);
            that.entries.push({
                "id" : channelId,
                "title" : $this.find('title').text(),
                "stream_url" : $this.find('stream_url').text().substr(7),
                "logo" : $this.find('logo_30x30').text(),
                "category" : $this.find('category_id').text(),
                "guide" : "http://iptv.r46.ru/tvg.php?pid=" + channelId
            });
        };

        $.ajax({
            dataType: "xml",
            cache: false,
            url: that.url,
            success: function(answer){
                $(answer).find('items channel').each(parseChannel);
                that.ui.drawPlaylist();
            }
        });

    },

    ui: {

        pageSize : 22,
        entryHeight: 32,

        init: function(){
            this.$channelsList = $('.channels-list').hide();
            this.$channelsListWrap = $('.channels-list-wrap');
            this.parent = Playlist;
        },

        drawPlaylist : function () {
            var html = "";
            var channelTpl = new Template("channelTpl");
            $.each(this.parent.entries, function(index, value){
                html += channelTpl.render({
                    id: index.toString(),
                    logo: value.logo,
                    title: value.title
                });
            });
            this.$channelsListWrap.html(html);
            this.drawCurrent();
            this.drawCursor();
        },

        drawCurrent : function() {
            this.$channelsList.find(".current").removeClass("current");
            this.$channelsList.find("[data-channel-id="+this.parent.current+"]").addClass("current");
        },

        drawCursor : function() {
            this.$channelsList.find(".cursor").removeClass("cursor");
            var $current = this.$channelsList.find("[data-channel-id="+this.parent.cursor+"]").addClass("cursor");
            var page = Math.floor(this.parent.cursor / this.pageSize);
            var margin = "-" + (this.entryHeight * this.pageSize * page) + "px";
            this.$channelsListWrap.css("margin-top", margin);
        }
    },

    setChannel: function(id){
        var that = this;
        $.each(this.entries, function(index, channel) {
            if (channel.id === id) {
                that.cursor = index;
                that.setCurrentUnderCursor();
                that.ui.drawCurrent();
                that.ui.drawCursor();
            }
        });
    },

    switchNext: function(){
        if ((this.current + 1) in this.entries) {
            this.current++;
        }
        this.ui.drawCurrent();
    },

    switchPrev: function(){
        if ((this.current - 1) in this.entries) {
            this.current--;
        }
        this.ui.drawCurrent();
    },

    cursorNext: function(){
        if ((this.cursor + 1) in this.entries) {
            this.cursor++;
        }
        this.ui.drawCursor();
    },

    cursorPrev: function(){
        if ((this.cursor - 1) in this.entries) {
            this.cursor--;
        }
        this.ui.drawCursor();
    },

    cursorNextPage: function(){
        for (var i = 0; i < this.ui.pageSize; i++) {
            if ((this.cursor + 1) in this.entries) {
                this.cursor++;
            }
        }
        this.ui.drawCursor();
    },

    cursorPrevPage: function(){
        for (var i = 0; i < this.ui.pageSize; i++) {
            if ((this.cursor - 1) in this.entries) {
                this.cursor--;
            }
        }
        this.ui.drawCursor();
    },

    getCurrentChannel: function(){
        return this.entries[this.current];
    },

    getUnderCursorChannel: function(){
        return this.entries[this.cursor];
    },

    setCurrentUnderCursor : function(){
        this.current = this.cursor;
        this.ui.drawCurrent();
    },

    show : function(){
        this.ui.$channelsList.show();
        this.visible = true;
    },

    hide: function(){
        this.ui.$channelsList.hide();
        this.visible = false;
    }

};