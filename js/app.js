/**
 * Created by wm on 23.01.15.
 */
$(document).ready(function(){

    //window.localStorage.clear();

    Playlist.init();
    Keyboard.init();
    Settings.init();

    var $guideWrap = $(".guide");
    var $guide = $guideWrap.find('iframe');
    var $video = $('.mediaplayer video');
    var video = $video[0];
    var $osd = $('.osd');

    var showOsd = function(){
        clearTimeout(window.osdTimer);
        $osd.show();
        window.osdTimer = setTimeout(function(){
            $osd.hide();
        }, 2000);
    };

    var setAspectRatio = function() {
        var channelId = Playlist.getCurrentChannel().id;
        var videoClass = (AppStorage.isSet("ar_" + channelId))
            ? AppStorage.get("ar_" + channelId)
            : "cover";
        $video
            .removeClass("cover")
            .removeClass("contain")
            .addClass(videoClass);
    };

    var loadToVideo = function() {
        showOsd();
        video.pause();
        video.src = "/m3u8.php?url=http://" + Settings.udpxyAddress + "/udp/" + Playlist.getCurrentChannel().stream_url;
        $guide.attr("src", Playlist.getCurrentChannel().guide);
        setAspectRatio();
        AppStorage.set("lastChannel", Playlist.getCurrentChannel().id);
        video.load();
        video.play();

    };

    showOsd();

    Keyboard.bindings = {
        keydown: {
            VK_PLAY: function () {
                video.play();
            },
            VK_PAUSE: function () {
                video.pause();
            },
            VK_STOP: function () {
                video.pause();
            },
            VK_PAGE_UP: function () {
                Playlist.switchNext();
                loadToVideo();
            },
            VK_PAGE_DOWN: function () {
                Playlist.switchPrev();
                loadToVideo();
            },
            VK_ENTER: function () {
                if (Playlist.visible) {
                    Playlist.setCurrentUnderCursor();
                    Playlist.hide();
                    loadToVideo();
                } else {
                    Playlist.show();
                }
            },
            VK_UP: function () {
                if (Playlist.visible) {
                    $guide.attr("src", Playlist.getUnderCursorChannel().guide);
                    Playlist.cursorPrev();
                }
            },
            VK_DOWN: function () {
                if (Playlist.visible) {
                    $guide.attr("src", Playlist.getUnderCursorChannel().guide);
                    Playlist.cursorNext();
                }
            },
            VK_LEFT: function () {
                if (Playlist.visible) {
                    Playlist.cursorPrevPage();
                }
            },
            VK_RIGHT: function () {
                if (Playlist.visible) {
                    Playlist.cursorNextPage();
                }
            },
            VK_RED: function () {
                if (!$guideWrap.is(":visible")) {
                    $guide.attr('src', $guide.attr('src')); //refresh
                }
                $guideWrap.toggle();
            },
            VK_BLUE: function () {
                Settings.toggle();
            },
            VK_YELLOW: function () {
                var channelId = Playlist.getCurrentChannel().id;
                var currentAr = AppStorage.get("ar_" + channelId);
                var newAr = (currentAr === "cover") ? "contain" : "cover";
                AppStorage.set("ar_" + channelId, newAr);
                loadToVideo();
            }
        },
        keypress: {
            VK_BACK_SPACE : function (e) {
                if (Playlist.visible) {
                    e.preventDefault();
                    Playlist.hide();
                }
            }
        }
    };

    //hacks

    $video.on("ended", function(e) {
        video.load();
        video.play();
    });

    $guide.on("focus", function(){
        $(document).focus();
    });

});