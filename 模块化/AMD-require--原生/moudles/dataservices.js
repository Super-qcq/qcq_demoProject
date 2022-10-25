(function (window) { 
    let name = 'dataServices'
    function getName() { 
        return name
    }
    window.dataServices = {getName:getName}
})(window)