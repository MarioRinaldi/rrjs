<?php 

$a = file_get_contents("rr.css");
$b = file_get_contents("main.css");

$c = $a . $b;
$c = trim($c);

$c = preg_replace('/\n/','',$c);
$c = preg_replace('/\r/','',$c);
$c = preg_replace('/\t/','',$c);

header("Content-Type: text/css; charset=iso-8859-1");
echo $c;
?>