const live = false //this variable to know if in mode develepment or mode production 
if(live){
    module.exports = require('./prod')
}else{
    module.exports = require('./dev');
}