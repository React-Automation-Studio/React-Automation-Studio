
export const replaceMacros = (pv, macros) => {



    if (macros&&pv) {
        let macro;
        for (macro in macros) {
            pv = pv.replace(macro.toString(), macros[macro].toString());
        }
    }
    return (pv);


}

export const replaceArrayMacros = (array, macros) => {



    if (macros&&array) {
        let macro;
        for (macro in macros) {
            for(let item in array){ 
                array[item] = array[item].replace(macro.toString(), macros[macro].toString());
            }
        }
    }
    return (array);


}

const replaceObjectMacros = (object, macros) => {
    if (macros&&object) {
        let keys = Object.keys(object);
        for (let key in keys) {
            if (typeof object[keys[key]] === 'string') {
                object[keys[key]] = replaceMacros(object[keys[key]], macros)

            }
            else if (Array.isArray(object[keys[key]])) {
                object[keys[key]] = replaceArrayMacros(object[keys[key]], macros)

            }
            else if (typeof object[keys[key]] === 'object') {
                object[keys[key]] = replaceObjectMacros(object[keys[key]], macros)
            }



        }
        return (object)
    }
}

export const replaceSystemMacros = (system, macros) => {
    if (macros&&system) {
        system=replaceObjectMacros(system,macros) 
        
    }

    return system;


}


