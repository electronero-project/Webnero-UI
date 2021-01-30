//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url;
    // }).addClass('active').parent().parent().addClass('in').parent();
    var element = $('ul.nav a').filter(function() {
        return this.href == url;
    }).addClass('active').parent();

    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent();
        } else {
            break;
        }
    }
});

$(document).on("click", ".coin-selector", function(){
    if(!$(this).hasClass("btn-selected")){
        $(".coin-selector").removeClass("btn-selected");
        $(this).addClass("btn-selected")
    }
});

$(document).on("click", "blockquote", function(){
    $("blockquote").removeClass("selected");
    $(this).addClass("selected");
});
 
var ModelViewController = {
    initLevel: 0,
    coinState: 0,
    returnState: function(which){
        if(!which){
            which = 0;
        }
        return ModelViewController.coinState = which;
    },
    //coins: { coin: ['etnx','etnxp','etnxc','ltnx','gldx'] },
    coins: { coin: ['etnx','etnxp','ltnx','gldx'] },
    setCoinData: function(coin, data){
        return localStorage.setItem(coin+"Data", data);       
    },
    getCoinData: function(coin){
        if(coin){
            function whichData(coinData){
                ModelViewController.coinState++ 
                try{ return JSON.parse(localStorage.getItem(coinData)); }
                catch(e) { console.log(e); return null; }
            }
            switch (coin) {
                case 'etnx':
                    return whichData("etnxData");
                case 'etnxp':
                    return whichData("etnxpData");
                case 'etnxc':
                    return whichData("etnxcData");
                case 'ltnx':
                    return whichData("ltnxData");
                case 'gldx':
                    return whichData("gldxData");
                default:
                    break;
            }; 
        } else {
             // loop through coins.coin and get all coinData
            let coins = ModelViewController.coins.coin;
            for (var i=0;i<coins.length;i++) {
                ModelViewController.getCoinData(coins[i]);
        };
    };
    },
    formatCoinTransaction: function(coins, coinSymbol, units){
    const coinUnits = coinSymbol==="etnx" ? 10000000000000000 : coinSymbol==="etnxp" ? 10000 : coinSymbol==="etnxc" ? 1 : coinSymbol==="ltnx" ? 1 : coinSymbol==="gldx" ? 1 : units;
    var balancedCoins = coins * coinUnits; 
    return balancedCoins;
    },
    formatCoinUnits: function(coins, coinSymbol, units){
    const coinUnits = coinSymbol==="etnx" ? 100000000 : coinSymbol==="etnxp" ? 100 : coinSymbol==="etnxc" ? 100 : coinSymbol==="ltnx" ? 100000000 : coinSymbol==="gldx" ? 1000000000000 : units;
    var coinDecimalPlaces = coinUnits.toString().length - 1;
    var balancedCoins = (parseInt(coins || 0) / coinUnits).toFixed(units || coinDecimalPlaces);
    return balancedCoins;
    },
    fillData: function(){      

        var etnxData = this.getCoinData("etnx");
        if(etnxData != null){
            const etnxLockedBalance = this.formatCoinUnits(etnxData.balances.balance, "etnx")
            const etnxBalance = this.formatCoinUnits(etnxData.balances.unlocked_balance, "etnx")
            $("#etnx-wallet").html(etnxData.address);
            console.log(etnxData);
            $("#etnx-balance").html(etnxLockedBalance);
            $("#etnx-unlocked-balance").html(etnxBalance);
        }
        
        var etnxpData = this.getCoinData("etnxp");
        if(etnxpData != null){
            const etnxpLockedBalance = this.formatCoinUnits(etnxpData.balances.balance, "etnxp")
            const etnxpBalance = this.formatCoinUnits(etnxpData.balances.unlocked_balance, "etnxp")
            $("#etnxp-wallet").html(etnxpData.address);
            console.log(etnxpData);
            $("#etnxp-balance").html(etnxpLockedBalance);
            $("#etnxp-unlocked-balance").html(etnxpBalance);
        }
        
        /*
        var etnxcData = this.getCoinData("etnxc");
        if(etnxcData != null){
            const etnxcLockedBalance = this.formatCoinUnits(etnxcData.balances.balance, "etnxc")
            const etnxcBalance = this.formatCoinUnits(etnxcData.balances.unlocked_balance, "etnxc")
            $("#etnxc-wallet").html(etnxcData.address);
            console.log(etnxcData);
            $("#etnxc-balance").html(etnxcLockedBalance);
            $("#etnxc-unlocked-balance").html(etnxcBalance);
        }*/
        
        var ltnxData = this.getCoinData("ltnx");
        if(ltnxData != null){
            const ltnxLockedBalance = this.formatCoinUnits(ltnxData.balances.balance, "ltnx")
            const ltnxBalance = this.formatCoinUnits(ltnxData.balances.unlocked_balance, "ltnx")
            $("#ltnx-wallet").html(ltnxData.address);
            console.log(ltnxData);
            $("#ltnx-balance").html(ltnxLockedBalance);
            $("#ltnx-unlocked-balance").html(ltnxBalance);
        }

        var gldxData = this.getCoinData("gldx");
        if(gldxData != null){
            const gldxLockedBalance = this.formatCoinUnits(gldxData.balances.balance, "gldx")
            const gldxBalance = this.formatCoinUnits(gldxData.balances.unlocked_balance, "gldx")
            $("#gldx-wallet").html(gldxData.address);
            console.log(gldxData);
            $("#gldx-balance").html(gldxLockedBalance);
            $("#gldx-unlocked-balance").html(gldxBalance);
        }
    },

    fillHistory: function(){
        var etnxData = this.getCoinData("etnx");
        if(etnxData != null){
            if(etnxData.txs.in || etnxData.txs.out){
                this.fillHistoryRows("ETNX", "Receive", etnxData.txs.in);
                this.fillHistoryRows("ETNX", "Send", etnxData.txs.out);
            }
        }
        
        var etnxpData = this.getCoinData("etnxp");
        if(etnxpData != null){
            if(etnxpData.txs.in || etnxpData.txs.out){
                this.fillHistoryRows("ETNXP", "Receive", etnxpData.txs.in);
                this.fillHistoryRows("ETNXP", "Send", etnxpData.txs.out);
            }
        }
        
        /*
        var etnxcData = this.getCoinData("etnxc");
        if(etnxcData != null){
            if(etnxcData.txs.in || etnxcData.txs.out){
                this.fillHistoryRows("ETNXC", "Receive", etnxcData.txs.in);
                this.fillHistoryRows("ETNXC", "Send", etnxcData.txs.out);
            }
        }*/
        
        var ltnxData = this.getCoinData("ltnx");
        if(ltnxData != null){
            if(ltnxData.txs.in || ltnxData.txs.out){
                this.fillHistoryRows("LTNX", "Receive", ltnxData.txs.in);
                this.fillHistoryRows("LTNX", "Send", ltnxData.txs.out);
            }
        }

        var gldxData = this.getCoinData("gldx");
        if(gldxData != null){
            if(gldxData.txs.in || gldxData.txs.out){
                this.fillHistoryRows("GLDX", "Receive", gldxData.txs.in);
                this.fillHistoryRows("GLDX", "Send", gldxData.txs.out);
            }
        }
    },
    blockchainExplorerLink: function(block, height, txid, coin){
        const secureSocketLayer = 'https://';
        const blockchainLink = PassportPipeline.getBlockchainLink(coin);
        const txidURL = '/tx/' + txid;
        const heightURL = '/block/' + height;
        const operative = block===true ? heightURL : txidURL;
        const blockchainExplorerURL = secureSocketLayer + blockchainLink + operative;

        return blockchainExplorerURL;
    },
    fillHistoryRows: function(coin, type, items){
        var tbody = $("#transaction-history").find('tbody');
        for(var i = 0; i < items.length; i++) {
            var item = items[i];
            tbody.append( "<tr class='row_" + coin +"'>" +
                            "<td>" + coin + "</td>" + 
                            "<td>" + type + "</td>" + 
                            "<td>" + this.formatCoinUnits(item.amount, coin.toLowerCase()) + "</td>" + 
                            "<td>" + "<a href='"+this.blockchainExplorerLink(true, parseInt(item.height), item.txid, coin.toLowerCase())+"'>" + item.height + "</td>" + 
                            "<td>" + "<a href='"+this.blockchainExplorerLink(false, parseInt(item.height), item.txid, coin.toLowerCase())+"'>" + item.txid + "</a>" + "</td>" + 
                          "</tr>" );
        }
    },
    
    initCoin: function(coinSymbol){
        console.log("3");
        PassportPipeline.setMethod('getaddr');
        PassportPipeline.loadParams();
        
        console.log(PassportPipeline.passportParams);
        if(coinSymbol){
                ModelViewController.coinState++
            }
        
        PassportPipeline.remoteCall(coinSymbol).then((response) => {
            if(response){
                console.log(response); 
                let passportBalance = JSON.parse(response);
                console.log(passportBalance);
                if(passportBalance.hasOwnProperty("error")){
                    PassportPipeline.performOperation(coinSymbol, ModelViewController.initCoin);
                    return;
                }
                else if(!passportBalance.hasOwnProperty("error")) {
                    ModelViewController.setCoinData(coinSymbol, response);
                }
            }

            $.event.trigger({
                type: "init.done",
                coin: coinSymbol
            });
        });
    },
    initVerification: function(coinSymbol){
            if(coinSymbol){
                ModelViewController.coinState++
            }

            if(!PassportPipeline.hasValidSession())
            {
                location.href = "verify.html";
            }

            $.event.trigger({
                type: "init.done",
                coin: coinSymbol
            });
    },

    refreshData: function(){
        $("#spinner-modal").modal('show');
        PassportPipeline.loadCode();
        PassportPipeline.performOperation("etnx", ModelViewController.initCoin);
        PassportPipeline.performOperation("etnxp", ModelViewController.initCoin);
        PassportPipeline.performOperation("ltnx", ModelViewController.initCoin);
        PassportPipeline.performOperation("gldx", ModelViewController.initCoin);
    },
};

$(document).on("init.done", function(e){
    console.log(e.type + " - " + e.coin);
    ModelViewController.initLevel++;
    if(ModelViewController.initLevel == 4){
        $("#spinner-modal").modal('hide');
        if(location.pathname.indexOf("login") > -1)
            location.href = location.href.replace("login", "index");
        else
            ModelViewController.fillData();
    }
});

$(document).on("click", "#logout", function(){
    sessionStorage.clear();
    localStorage.clear();
    location.href = "login.html";
});

$(document).on("click", "#light-mode", function(){
    sessionStorage.setItem("light-mode", true);
    $("body").addClass("light");
});

$(document).ready(function(){
    if(sessionStorage.getItem("light-mode") != null)
        $("body").addClass("light");
});

$(document).on("click", "#dark-mode", function(){
    sessionStorage.removeItem("light-mode");
    $("body").removeClass("light");
});
