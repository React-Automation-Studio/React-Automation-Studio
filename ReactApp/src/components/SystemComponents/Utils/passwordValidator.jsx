import { useEffect,useState } from "react";


export const usePasswordValidator=(password)=>{
    const [test]=useState(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$/)
    const [passwordHelperText]=useState("Minimum length 12 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character")
    const [passwordError,setPasswordError]=useState(true);
    useEffect(()=>{
        if(password.toString().match(test)){
            setPasswordError(false)
        }
        else{
            setPasswordError(true)
        }
    },[password,test])

    return(
            {passwordError:passwordError,passwordHelperText:passwordHelperText}
    )
}

