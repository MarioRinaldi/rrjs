var init = init || {};
var main = main || {};
var util = util || {};
var rr = rr || {};

// Specific inits
init.index = function() {
    var hide = [
        '#popupMessage_0_div',
        '#popupMessage_1_div',
        '#popupMessage_2_div',
        '#popupMessage_3_div',
        '#popupMessage_4_div',
        '#popupMessage_5_div',
        '#popupMessage_6_div'
    ];
    for (var i=0, len = hide.length;i < len;i++) {
        rr.showHideElement(hide[i]);
    }
};

/** * Atalho para document.getElmentById */
var $id = function(elem) {
	return document.getElementById(elem);
};

/** * Inicialização automática (Usa jQuery, mas pode usar o main.addEvent no lugar) */
try{
	if(typeof($) != "undefined") {
		$(function(){
			main.autoInit();
		});
	}else {
		rr.addEvent(window, 'load', function(){
			main.autoInit();
		});
	}
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

// Show/hide oldnews
util.showHideNews = function(elem, container, url, callback) {
	rr.addEvent(elem, 'click', function(event){
		if(event.preventDefault) { event.preventDefault(); }
		rr.showHideElement(container);
		if (rr.getStyle(container, 'display') != 'none') { rr.ajax.replaceContent(container, url, { callback: callback } ); }
		return false;
	});
};


main.showCode = function(v){
    var div = v.id.replace(/_a/i,"_div");
    rr.showHideElement('#' + div);
    //util.showHideNews('show-index-oldnews', 'index-oldnews', 'ajax/index-oldnews.php', init.index_oldnews );
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
