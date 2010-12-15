<?php 
header("Content-Type: text/plain; charset=utf-8");

function compressFile($files, $name){
    if (preg_match('/\.css$/',$name)){
        $type = 'css';
    }
    else if (preg_match('/\.js$/',$name)){
        $type = 'js' ;
    }

    $arq = "";
    foreach ($files as $file) {
        $arq .= file_get_contents($file);
    }
    
    // Remover comentarios
    $arq = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $arq);
    if (isset($type) && $type == "js"){
        $arq = preg_replace('#\/\/.+\n?#','', $arq);
    }
    // Remover Tabs e NewLines
    $arq = preg_replace('#(\r|\n|\t)#', '', $arq);
    // Remover caracteres com espaços extras
    $arq = preg_replace('#[ ]*([,:;\{\}])[ ]*#', '$1', $arq);
    // Remover ';' desnecessario
    if (isset($type) && $type == "css"){
        $arq = strtr($arq, array(
            ';}' => '}'
        ));
    }
    
    $arq = trim($arq);

    file_put_contents($name,$arq);
}

echo "iciando atualização do GIT...";
try {
    exec('git pull');
    echo "ok";
} catch (Exception $e) {
    echo "FAIL";
}
echo "\n\n";

echo "iciando compressão do CSS...";

try {
    //css
    compressFile(array('rr.css','main.css'), 'arquivo.css');
    compressFile(array('rr.css'), 'rr_compress.css');
    echo "Ok";
} catch (Exception $e) {
    echo "FAIL";
}
echo "\n\n";


echo "iciando compressão do JS...";

try {
    //css
    compressFile(array('rr.js','main.js'), 'arquivo.js');
    compressFile(array('rr.js'), 'rr_compress.js');
    echo "Ok";
} catch (Exception $e) {
    echo "FAIL";
}
echo "\n\n";

?>
