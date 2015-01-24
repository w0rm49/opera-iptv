<?php
header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Content-type: application/vnd.apple.mpegurl; charset=utf-8;");
?>
<?php if(isset($_GET['url'])): ?>
#EXTM3U
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:142178140
#EXTINF:10,
<?= $_GET['url']; ?>/videofile.mpg
#EXTINF:10,
<?= $_GET['url']; ?>/videofile.mpg
<?php endif; ?>