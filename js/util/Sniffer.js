var Sniffer = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    isMobile: function() {
        return (Sniffer.Android() || Sniffer.BlackBerry() || Sniffer.iOS() || Sniffer.Opera() || Sniffer.Windows());
    },
    Firefox:function(){
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }  
};