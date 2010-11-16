/*
###############################################################
#
#    RR.JS - Biblioteca de funções comuns em Javascript
#
#    versão 0.0043 (unreleased beta)
#
#    (c) 2006 - 2096
#    www.rrJS.net
#    www.renatorodrigues.com
#
###############################################################
*/

var rr = {

    //Define default messages
    str: { ajxError: 'Error obtaining AJAX content', ajxLoading: 'Loading...', 
           cancelButton: 'Cancel', okButton: 'OK', yesButton: 'Yes', noButton: 'No',
           addBookmark: 'Press CTRL+D to bookmark this page!',
           mozOnly: 'This function works only on Mozilla based browsers' },
        
    initVariables: function() {
        
        // Verify the language based on navigator type
        var lang = (navigator.language)?(navigator.language):(navigator.userLanguage);
        
        // Map the locales
        switch (lang.toLowerCase()) {
            case 'pt-pt':   // Portuguese (Example)
            case 'pt-br':
                lang = 'pt-br'; break;

            default: // For others, remove country code
                if ( lang.indexOf("-") > 0 ) { lang = lang.substring(0,lang.indexOf("-")).toLowerCase(); }
        }
                
        // Define Localized messages
        var str = {
            'pt-br': { ajxError: 'Erro obtendo o conteudo AJAX', ajxLoading: 'Carregando...', 
                       cancelButton: 'Cancelar', okButton: 'OK', yesButton: 'Sim', noButton: 'Não',
                       addBookmark: 'Pressione CTRL+D para adicionar essa página aos favoritos',
                       mozOnly: 'Este recurso funciona apenas em navegadores baseados no Mozilla' }
        };
        
        // Override default messages with localized ones, if exists.
        for(var i in rr.str){
            rr.str[i] = (str[lang] && str[lang][i] !== undefined)?(str[lang][i]):(rr.str[i]);
        } 

    },
    
    getVars: function(v, d) {
        // Set function's initial variables
        var vars = v || {};
        var dft = d || {}; 
        for (var i in dft) { vars[i] = vars[i] || dft[i]; }
        return vars;
    },
    
    popupOkCancel: function(msg, v) {   
        var vars = rr.getVars(v);
        vars.buttons = 'okCancel';
        return rr.popupMessage(msg,vars);
    },
    
    popupYesNo: function(msg, v) {
        var vars = rr.getVars(v);
        vars.buttons = 'yesNo';
        return rr.popupMessage(msg,vars);
    },
    
    popupMessage: function(msg, v) {
        var vars = rr.getVars(v, {className: 'rrPopupMessage'});
        
        var popupMessage_hide = function () { document.body.removeChild(rr.getElement('rrPopupMessage')); };
        
        // Define variaveis condicionais
        vars.msg          = (vars.title)     ? ("<h1>" + vars.title + "</h1>" + msg):(msg);
        vars.className    = (vars.auxClass)  ? (vars.className + " " + vars.auxClass):(vars.className);
        vars.cancelButton = (vars.buttons  && (vars.buttons == 'yesNo' || vars.buttons == 'okCancel'));
        
        if (vars.buttons) {
            rr.str['button1'] = (vars.buttons == 'yesNo')?(rr.str['noButton']):(rr.str['cancelButton']);
            rr.str['button2'] = (vars.buttons == 'yesNo')?(rr.str['yesButton']):(rr.str['okButton']);
        } else {
            rr.str['button1'] = rr.str['cancelButton'];
            rr.str['button2'] = rr.str['okButton'];
        }
        
        if (vars.width) vars.marginLeft = (((vars.width  / 2) * - 1) + "px");
        if (vars.height) vars.marginTop = (((vars.height / 2) * - 1) + "px");
        
        if (rr.getElement('rrPopupMessage')) { popupMessage_hide.call(); }

        // Cria elementos
        var mainDiv = document.createElement("DIV");
        mainDiv.id="rrPopupMessage";
        mainDiv.className = vars.className;
        mainDiv.style.textAlign ="center";
        
        var textDiv = document.createElement("DIV");
        textDiv.style.height = "80%";
        textDiv.className = "text";
        textDiv.innerHTML = vars.msg;
        
        var buttonDiv = document.createElement("DIV");
        buttonDiv.className = "buttonDiv";
        
        var okButton = document.createElement("INPUT");
        okButton.type = "button";
        okButton.value = rr.str['button2'];
        okButton.className = "button ok";
        rr.addEvent(okButton, "click", popupMessage_hide);
        rr.addEvent(okButton, "click", vars.okFunction || function() { return true; } );
        
        if (vars.cancelButton) {
            var cancelButton = document.createElement("INPUT");
            cancelButton.type = "button";
            cancelButton.value = rr.str['button1'];
            cancelButton.className = "button cancel";
            rr.addEvent(cancelButton, "click", popupMessage_hide);
            rr.addEvent(cancelButton, "click", vars.cancelFunction || function() { return true; } );
        }
        
        // Define estilos condicionais
        if (vars.width && vars.marginLeft) {
             mainDiv.style.width = (vars.width + "px");
             mainDiv.style.marginLeft = vars.marginLeft; }
        
        if (vars.height && vars.marginTop) {
             mainDiv.style.height = (vars.height + "px");
             mainDiv.style.marginTop = vars.marginTop; }

        // Anexa elementos ao documento
        mainDiv.appendChild(textDiv);
        mainDiv.appendChild(buttonDiv);
        if (vars.cancelButton) buttonDiv.appendChild(cancelButton);
        buttonDiv.appendChild(okButton);
        document.body.appendChild(mainDiv);
        
        if (vars.overlay) rr.createOverlay(okButton, vars.overlay);
        okButton.focus();
        return false;
    },
    
    popupFrame: function (src, v) {
        var vars = rr.getVars(v, {type: 'div', className: 'rrPopupFrame', closeButton: 'yes' } );     
        
        // Define variaveis condicionais
        vars.className  = (vars.auxClass)  ? (vars.className + " " + vars.auxClass):(vars.className);
        if (vars.width) vars.marginLeft = (((vars.width  / 2) * - 1) + "px");
        if (vars.height) vars.marginTop = (((vars.height / 2) * - 1) + "px");
        
        if (rr.getElement('rrPopupFrame')) { rr.popupFrame_hide.call(); }
        
        var mainDiv = document.createElement("div");
        mainDiv.id = "rrPopupFrame";
        mainDiv.className = vars.className;
        
        if (vars.closeButton == 'yes') {
            var xDiv     = document.createElement("div");
            xDiv.id = "xDiv";
            xDiv.className = "x";
            xDiv.innerHTML = "<img src=\"img/close.gif\" border=\"0\" id='xImg'>";
            mainDiv.appendChild(xDiv);
        }

        var contentDiv = document.createElement(vars.type);
        contentDiv.id = "rrPopupFrame_Content";
        contentDiv.className = "frameContent";
        mainDiv.appendChild(contentDiv);
        
        if (vars.type == "iframe") {    
            contentDiv.allowTransparency = "true";
            contentDiv.scrolling = "auto";
            contentDiv.frameBorder = "0";
            contentDiv.src = src;
        } else if (vars.type == "div") {
			if (vars.content) {
				var place = document.createElement('div');
				contentDiv.appendChild(place);
				contentDiv.replaceChild(vars.content, place);



			} else {
            rr.ajax.replaceContent (contentDiv, src);
        	}
        }
        // Define estilos condicionais
        if (vars.width && vars.marginLeft) {
             mainDiv.style.width = (vars.width + "px");
             mainDiv.style.marginLeft = vars.marginLeft; }
        
        if (vars.height && vars.marginTop) {
             mainDiv.style.height = (vars.height + "px");
             mainDiv.style.marginTop = vars.marginTop; }

        document.body.appendChild(mainDiv);
        if (vars.closeButton == 'yes') rr.addEvent("xImg","click",rr.popupFrame_hide);
        if (vars.overlay) rr.createOverlay(rr.getElement('xImg'), vars.overlay);
		if (vars.callback) vars.callback.call();
        return false;
    },
    
    popupFrame_hide: function() {
		rr.removeElement(rr.getElement('rrPopupFrame'));
		rr.removeElement(rr.getElement('rrOverlay'));


		rr.removeElement(rr.getElement('rrIframe'));
		return true;
    },
    
    createOverlay: function (elem, v) {
        var vars = rr.getVars(v, {className: 'rrOverlay', modal: 'yes'} );
        // Define variaveis condicionais
        vars.className  = (vars.auxClass)  ? (vars.className + " " + vars.auxClass):(vars.className);
        
        var overlay = document.createElement("div");
        overlay.id = "rrOverlay";
        overlay.className = vars.className;
        
        // Define estilos condicionais
        if (vars.opacity) {
             overlay.style.filter = "alpha(opacity=" + vars.opacity + ")";
             overlay.style.opacity = (vars.opacity / 100); }
             
        if (vars.color) overlay.style.backgroundColor = vars.color;
        
        document.body.appendChild(overlay);
		//IE 6 Only - Hacks & Bug fixes
		if ( window.ActiveXObject && typeof document.body.style.maxHeight == "undefined" ) {
			var ifrm = document.createElement("iframe");
			ifrm.id = "rrIframe"
			ifrm.src = "javascript:'<html></html>';";
	        ifrm.scrolling = "auto";
			ifrm.frameBorder = "0";
			document.body.appendChild(ifrm);
			var htmlHeight, bodyHeight, contentHeight, windowHeight, overlayHeight;
			bodyHeight = document.body.offsetHeight;
			windowHeight = document.documentElement.clientHeight;
			htmlHeight = document.getElementsByTagName("html")[0].offsetHeight;
			contentHeight = (htmlHeight < bodyHeight) ? bodyHeight : htmlHeight;
			overlayHeight = (contentHeight < windowHeight) ? windowHeight : contentHeight;
			overlay.style.height = overlayHeight + "px";
		}
        if (!elem && vars.modal != "yes") elem = overlay;
        rr.addEvent(elem, "click", rr.overlay_hide);
        return false;
    },
	overlay_hide: function() {
		rr.removeElement(rr.getElement('rrOverlay'));
		return true;
    },
	onlyNumbers: function (evt, v) {
        var vars = rr.getVars(v);
		
		var k = evt.keyCode
		if (!(k == 46 ||k == 8 ||k == 9 || k >= 48 && k <= 57 || k >= 96 && k <= 105 || k >= 35 && k <= 39)) {
			return false;
		}
	},
	
	formatField: function (elem, fieldType, v) {
        var vars = rr.getVars(v);
        elem = rr.getElement(elem);
        
		var elemValue = elem.value.replace(/\D/g,"");
		
        if (elemValue.length > 0) {
			switch (fieldType) {
				case 'ie':
					elem.value = elemValue.replace(/(\d\d\d)(\d\d\d)(\d\d\d)(\d\d\d)/, "$1.$2.$3.$4" ); break; 
				case 'cpf':
					elem.value = elemValue.replace(/(\d\d\d)(\d\d\d)(\d\d\d)(\d\d)/, "$1.$2.$3-$4" ); break;
				case 'cnpj':
					elem.value = elemValue.replace(/(\d\d)(\d\d\d)(\d\d\d)(\d\d\d\d)(\d\d)/, "$1.$2.$3/$4-$5" ); break;
				case 'cep':
					elem.value = elemValue.replace(/(\d\d\d\d\d)(\d\d\d)/, "$1-$2" ); break;
                case 'tel':
                    if (elemValue.length >= 11) {
                        elem.value = elemValue.replace(/(\d\d)(\d\d)(\d?\d\d\d)(\d\d\d\d)/, "+$1 ($2) $3-$4" );
                    } else if (elemValue.length >= 9) {
                        elem.value = elemValue.replace(/(\d\d)(\d?\d\d\d)(\d\d\d\d)/, "($1) $2-$3" );
                    } else if (elemValue.length < 9) {
                        elem.value = elemValue.replace(/(\d?\d\d\d)(\d\d\d\d)/, "$1-$2" ); }
                    break;
			}
		}
	},
    
    getStyle: function (elem, attr) {
        elem = rr.getElement(elem);
        if (elem.currentStyle) { /* IE */
            var tmp = attr.match(/-(.)/);
            if (tmp && tmp[1]) { attr = attr.replace(/-(.)/, tmp[1].toUpperCase()); }
            return elem.currentStyle[attr];
        } else if (window.getComputedStyle){ /* Mozilla */
            return document.defaultView.getComputedStyle(elem, null).getPropertyValue(attr);
        } else { return null; }
    },
    
    addEvent: function (elem, evt, func, v) {
        var vars = rr.getVars(v, { useCapture: false } );
        elem = rr.getElement(elem);
        if(typeof(elem) == 'object') {
            if (elem.addEventListener) { elem.addEventListener (evt, func, vars.useCapture); }
            else if (elem.attachEvent) { elem.attachEvent ("on" + evt, func); }
        }
    },
    
    getElement: function (elem) {
        if (typeof elem == 'object') { return elem;  }
        else { return document.getElementById(elem); }
    },
    
    /* futura função que substituirá a getElement */
    getElement_NEW: function (sel) {
        if (sel.match(/^#/)){
            return document.getElementById(sel.replace('#',''));
        } else if (sel.match(/^./)){
            sel = sel.replace('.','');
            if (document.getElementsByClassName) {
                console.log('firefox');
                return document.getElementsByClassName(sel);
            } else {
                var saida = [];
                var elements = document.getElementsByTagName("*");
                for ( var i = 0, len =  elements.length; i < len ; i++) {
                    if (elements[i].className.match(sel)) {
                         saida.push(elements[i]);
                    }
                }
                saida = saida || [];
                return saida;
            }
        } else {
            return document.getElementsByTagName(sel);        
        }
    },
    
    removeElement: function (elem) {
        elem = rr.getElement(elem);
		if(elem && elem.parentNode) {
        	elem.parentNode.removeChild(elem);
		}
    },
    
    addClass: function(elem, clsName) {
        var tmpClass = elem.className.split(' ');
        tmpClass.push(clsName);
        elem.className = tmpClass.join(' ');
        return elem;
    },

    removeClass: function(elem, clsName) {
        elem.className = elem.className.replace(clsName, '');
        return elem;
    },
    
    showHideElement: function (elem, v) {
        var vars = rr.getVars(v, { display: 'block' } );
        elem = rr.getElement(elem);
        elem.style.display = elem.style.display == ('none') ? (vars.display) : ('none');
        return false;
    },
    
    parseArray: function(str, v) { 
        var vars = rr.getVars(v, { delimiter: ';', separator: '=', mode:'array' } );
        
        if (vars.mode == 'array') {
            var responseArray = str.split(vars.delimiter);
        } else if (vars.mode == 'assoc') {
            var responseArray = {};
            var tmpArray = str.split(vars.delimiter);
            for (var i = 0; i < tmpArray.length; i++) {
                arrItem = tmpArray[i].split(vars.separator);
                responseArray[arrItem[0]] = arrItem[1];
            }
        }
        
        return responseArray;
    },
    
    addBookmark: function(v) {
        var vars = rr.getVars(v, { location: location.href, title: document.title } );
        
        if (window.sidebar) { window.sidebar.addPanel(vars.title, vars.location,''); }
        else if (window.external) { window.external.AddFavorite(vars.location, vars.title); }
        else { alert(rr.str['addBookmark']); }
    },
    
    //Funçoes AJAX
    ajax: {
        getResponse: function (url, v) {
        
            var defaultErrorHandler = function() {
                window.alert(rr.str['ajxError']); return false;
            };
            
            var vars = rr.getVars(v, { errorHandler: defaultErrorHandler, method: 'get', async: 'false' } );
            
            var makeAjaxObject = function() {
                if      (window.XMLHttpRequest) return new XMLHttpRequest();
                else if (window.ActiveXObject)  return new ActiveXObject("Microsoft.XMLHTTP");
                else    { vars.errorHandler.call(this); return false; }
            };
            
            var parseAjaxResponse = function () {
                if(ajaxObject.readyState == 1 && vars.loadingHandler) { vars.loadingHandler.call(this, ajaxObject); }
                if(ajaxObject.readyState == 4){ vars.responseHandler.call(this, ajaxObject); }
            };
            
            var ajaxObject = makeAjaxObject();
            try {
                ajaxObject.open(vars.method, url, vars.async);
                ajaxObject.onreadystatechange = parseAjaxResponse; 
                ajaxObject.send(null);
            } catch(e) { vars.errorHandler.call(); }
        },
        
        replaceContent: function (elem, url, v) {
            var defaultLoadingText = "<div class=\"rrLoadingText\">" + rr.str['ajxLoading'] + "</div>";
            var vars = rr.getVars(v, { loadingText: defaultLoadingText } );
            
            var loadingHandler  = function (ajaxObject) { rr.getElement(elem).innerHTML = vars.loadingText; };
            var responseHandler = function (ajaxObject) { rr.getElement(elem).innerHTML = ajaxObject.responseText; };
            
            rr.ajax.getResponse(url, { loadingHandler: loadingHandler, responseHandler: responseHandler });            
        },
        
        fetchArray: function (url, v) {
            var vars = rr.getVars(v);
            
            var loadingHandler = function () {
				if (vars.loadingHandler) vars.loadingHandler.call();	
			};
            
            var parseResponse = function (ajaxObject) {
                var responseArray = rr.parseArray(ajaxObject.responseText, vars);
                
                if (vars.responseHandler) { vars.responseHandler.call(this, responseArray) }
                else { return responseArray }
            };
            
            rr.ajax.getResponse(url, { responseHandler: parseResponse, loadingHandler: loadingHandler }); 
        },
        
        fetchAssoc: function (url, v) {
            var vars = rr.getVars(v, { mode: 'assoc' } );
            return rr.ajax.fetchArray(url, v); 
        },
        
        restoreFromUrl: function (url, v) {
            var vars = rr.getVars(v, { mode: 'assoc', separator: '&' } );
            var args = rr.ajax.fetchArray(url, v);
            for(var i = 0; i < args[elems].length; i++ ){
                rr.ajax.replaceContent (args[elems][i], args[urls][i]);
            }
        }
    },
    
    extras: {
        installExtension: function(evt, description, icon) {
            if (InstallTrigger) {
                var vars = new Array();
                vars[description] = {
                    URL      : evt.target.href,
                    IconURL  : icon,
                    toString : function () { return this.URL; }
                };
                InstallTrigger.install(vars);
            } else {
                alert(rr.str['MozOnly']);
            }
            return false;
        }
    }
};

rr.addEvent(window, 'load', rr.initVariables);

/*
## To.do ##

-retornar conteudo original no caso de erro no ajax
-conteudo alternativo?
-terceiro parametro do bookmark
testar installextension
testar showhide
implementar search
verficiar cultura
inserir css via  js
detectar browser
*/
