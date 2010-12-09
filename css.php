<?php

$a = file_get_contents("rr.css");
$b = file_get_contents("main.css");

$c = $a . $b;

$c = str_replace(array("\r\n", "\r", "\n", "\t", "\s{2,}"), '', $c);
$c = trim($c);

header("Content-Type: text/css; charset=iso-8859-1");
echo $c;

?>