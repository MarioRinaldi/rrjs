updating website with GIT...<br/>
<?php 


function compressCSS(){
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
    file_put_contents("arquivo.css",$css);
}

echo "iciando atualização do GIT...";
try {
    exec('git pull');
    echo "ok";
} catch (Exception $e) {
    echo "FAIL";
}

echo "\n\n";
echo "iciando compressão do css...";

try {
    compressCSS();
    echo "Ok";
} catch (Exception $e) {
    echo "FAIL";
}
echo "\n\n";

?>
