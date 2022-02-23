const fun = function(e) {
        if (e.ctrlKey && 
            (e.keyCode === 67 || 
             e.keyCode === 86 || 
             e.keyCode === 85 || 
             e.keyCode === 117)) {
                 alert("some")
            return false;
        } else {
            return true;
        }
    }
 export default fun;