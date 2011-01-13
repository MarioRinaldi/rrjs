var init = init || {};
var main = main || {};
var util = util || {};
var rr = rr || {};

// Specific inits
init.index = function() {
    var code = rr.getElement('.code');
    for (var i=0, len = code.length;i < len;i++) {
        rr.showHideElement(code[i]);
    }
};

/** * Inicialização automática */
try{
    rr.addEvent(window, 'load', function(){
        main.autoInit();
    });
} catch(e) { };

/** * Inicializador automático (Não usa jQuery) */
main.autoInit = function() {
	try {
        var page = document.getElementsByTagName('body')[0];
        if (typeof(page) != "undefined" && page.id && typeof(init) != "undefined" && typeof(init[page.id]) != "undefined") {
            init[page.id].call();
        } else if(typeof(console) != "undefined") {
            console.info('Inicialização da página ' + page.id + ' não encontrada');
        }
	} catch (e) {
        if(typeof(console) != "undefined") {
            console.warn("Erro na inicialização");
            console.info(e.message);
        }
	}
};

main.showCode = function(v){
    var div = v.id.replace(/_a/i,"_div");
    rr.showHideElement('#' + div);
};

var demo = {
    okFunction: function() {
        alert('OK clicado!');
    },
    
    cancelFunction: function() {
        alert('CANCELAR clicado!');
    },

    noFunction: function() {
        alert('NÃO clicado!');
    },

    yesFunction: function() {
        alert('SIM clicado!');
    },

    displayArray: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            alert(arr[i]);
        }
    },
    
    displayAssoc: function (arr) {
        for (var i in arr) {
           alert(i + ' = ' + arr[i]);
        }
    }
    
};
