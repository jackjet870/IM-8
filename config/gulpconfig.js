var src = './src';     
var dist = './dist';  

module.exports = {
    rev : {
        css : './config/rev/css/',
        js : './config/rev/js/'
    },
    css : {
        src : src + '/assets/css/',
        dist : dist + '/assets/css/',
    },
    images : {
        src : src + "/assets/images/",      
        dist : dist + "/assets/images/"
    },
    js : {
        src: src + "/assets/js/",
        dist: dist + "/assets/js/"
    },
    clean : {
        src : dist + '/',
    }
}