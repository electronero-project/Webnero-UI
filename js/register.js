$(document).on("click", "#register", function(){
    $(".alert").css("display", "none");
    if(validateField()){
        cleanPinCode();
        $("#pin-code-container").css("display", "block");
        $("#register-container").css("display", "none");
    }
});

$(document).on("click", "#pin-code", function(){
    
    $(".alert").css("display", "none");
    if(pin_code.length < 5){
        $(".alert-danger").html("Please provide 5 digits");
        $(".alert-danger").css("display", "block");
    }
    else
    {
        $("#spinner-modal").modal('show');

        PassportPipeline.setMethod('register');
        PassportPipeline.setCode(PassportPipeline.myCipher(pin_code));
        PassportPipeline.setCredentials(PassportPipeline.myCipher($("#email").val()), PassportPipeline.myCipher($("#password").val()), true);
            
            // loop through coins.coin and register all coins simultaneously
            let coins = ModelViewController.coins.coin;
            ModelViewController.returnState();
            for (var j=0;j<coins.length;j++) {
                const allCoins = coins[j];
                PassportPipeline.registerOperation(allCoins, ModelViewController.initVerification);
            };

    }
});

function registerFail(message){
    $(".alert-danger").html("Registration error: " + message);
    $(".alert-danger").css("display", "block");
    $("#spinner-modal").modal('hide');
}

function validateField(){
    if(!Utils.isValidEmail($("#email").val()))
        registerFail("invalid email");
    else if(!Utils.isValidPassword($("#password").val()))
        registerFail("invalid password (min. 8 chars, one digit, one uppercase )");
    else if($("#password").val() != $("#re-password").val())
        registerFail("password mismatch");

    return $(".alert-danger").css("display") == "none";
}