<?php

$a = file_get_contents("rr.css");
$b = file_get_contents("main.css");

$css = $a . $b;

// Remover comentarios
$css = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css);
// Remover Tabs e NewLines
$css = preg_replace('#(\r|\n|\t)#', '', $css);
// Remover caracteres com espaços extras
$css = preg_replace('#[ ]*([,:;\{\}])[ ]*#', '$1', $css);
// Extras
$css = strtr($css, array(
    ';}' => '}'
));

$css = trim($css);

header("Content-Type: text/css; charset=iso-8859-1");
echo $css;

?>