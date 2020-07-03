
export const replaceMacros = (pv, macros) => {



    if (macros) {
        let macro;
        for (macro in macros) {
            pv = pv.replace(macro.toString(), macros[macro].toString());
        }
    }
    return (pv);


}

const replaceObjectMacros = (object, macros) => {
    if (macros) {
        let keys = Object.keys(object);
        for (let key in keys) {
            if (typeof object[keys[key]] === 'string') {
                object[keys[key]] = replaceMacros(object[keys[key]], macros)

            }
            else if (typeof object[keys[key]] === 'object') {
                object[keys[key]] = replaceObjectMacros(object[keys[key]], macros)
            }



        }
        return (object)
    }
}

export const replaceSystemMacros = (system, macros) => {
    if (macros) {
        replaceObjectMacros(system,macros) 
        
    }

    return system;


}


