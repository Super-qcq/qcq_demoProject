(function (window, dataServices) { 
    let msg = 'alerter'
    function showMsg() { 
        console.log(msg, dataServices.getName())
    }
    window.alerter = {showMsg}
})(window, dataServices)