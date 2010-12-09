<?php 

$a = file_get_contents("rr.css");
$b = file_get_contents("main.css");


$a = preg_replace('/\n/','',preg_replace('/\r/','',$a));
$b = preg_replace('/\n/','',preg_replace('/\r/','',$b));

header("Content-Type: text/css; charset=utf-8");
echo trim($a . $b);
?>