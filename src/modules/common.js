export function setNumberSeparator(number){
    var n = String(number),
        len = n.length;
    var m = n.split("");

    for(var i=0;i<len;++i){
        // var y = -40 * parseInt(n.charAt(i), 10);
        if(i>0 && i < len - 1 && (len - i - 1) % 3 == 0){
            m.splice(i,1,",");
        }
           
    }
    return m.join("");
};
