<?php

$a = file_get_contents("rr.css");
$b = file_get_contents("main.css");

$c = $a . $b;

$c = preg_replace('/\r\n/','',$c);
$c = preg_replace('/\s{2,}/','',$c);
$c = preg_replace('/\t/','',$c);
$c = trim($c);

header("Content-Type: text/css; charset=iso-8859-1");
echo $c;

?>