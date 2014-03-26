<?php
if(isset($_GET['urls'])) {
	// $filename = url("http://cbk0.google.com/cbk?output=tile&panoid=IDJH8B7UECRz1vFyD8n2Sg&zoom=2&x=0&y=0");
	$filename = urldecode(urlencode($_GET['urls']));
	header('Content-Type: image/jpeg');  
	readfile($filename);
}
?>
