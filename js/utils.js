// global copyToClipboard
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}


$("body").keydown(function() {
    var evtType = event.type;
    var eWhich = event.which;
    var echarCode = event.charCode;
    var ekeyCode = event.keyCode;
    var doOp = eWhich===48 ? '0' : eWhich===49 ? '1' : eWhich===50 ? '2' : eWhich===51 ? '3' : eWhich===52 ? '4' : eWhich===53 ? '5' : eWhich===54 ? '6' : eWhich===55 ? '7' : eWhich===56 ? '8' : eWhich===57 ? '9' : eWhich===13 ? 'enter' : eWhich===8 ? 'delete' :'not a key we process';
	
	function enterCase(){
        if($("#login-container").css("display") === 'block')
            document.getElementById("login").click();
        else if($("#pin-code-container").css("display") === 'block')
            document.getElementById("pin-code").click();
        else if($("#register-container").css("display") === 'block')
            document.getElementById("register").click();
        else if($("#send-code-modal").css("display") === 'block')
            document.getElementById("send").click();
    };
    
	function backCase(){
        if(document.getElementById("del")){
            document.getElementById("del").click();
        }
    };
    
    switch (doOp) {
        case '0':
            document.getElementById("0").click();
            break;
        case '1':
            document.getElementById("1").click();
            break;
        case '2':
            document.getElementById("2").click();
            break;
        case '3':
            document.getElementById("3").click();
            break;
        case '4':
            document.getElementById("4").click();
            break;
        case '5':
            document.getElementById("5").click();
            break;
        case '6':
            document.getElementById("6").click();
            break;
        case '7':
            document.getElementById("7").click();
            break;
        case '8':
            document.getElementById("8").click();
            break;
        case '9':
            document.getElementById("9").click();
            break;
        case 'enter':
	    return enterCase();
	    break;
        case 'delete':
	    return backCase();
	    break;
        default:
            break;
    }
});

var Utils = {
    isValidEmail: function(email){
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    },

    isValidPassword: function(password){
        var regex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return regex.test(password);
    },

    isValidCode: function(code){
        var regex = /^(?=.*\d)(?=.*[0-9])[0-9]{5}$/;
        return regex.test(code);
    }
}