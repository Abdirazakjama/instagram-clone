import { useEffect } from "react"
import { useLogoutMutation } from "../src/Features/api/authApiSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../backend/usercontrollers/usercontroller"

const useCheckAuth = () =>{
    const navigate = useNavigate();
    const [logout] = useLogoutMutation(); //server logout
    const dispatch = useDispatch();  //frontend logout
    useEffect(() => {
        
        const checkSessionAvailability = () =>{
            const expirationTime = localStorage.getItem('expirationTime')

            const isSessionValid = expirationTime && new Date().getTime() < parseInt(expirationTime, 10)

            if(!isSessionValid){
                logout()
                dispatch(logoutUser);
                navigate('/login')


            }
        }

    })

    
}

export default useCheckAuth;