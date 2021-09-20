import { useAuthState } from "helpers/Auth";
import { useHistory } from "react-router";
export default function useLocalStorageChange() {
    const userDetails = useAuthState();
    const history = useHistory();
    window.addEventListener("storage", () => {
        
        if (JSON.parse(localStorage.getItem("currentUser")) !== null) {
            userDetails.token !== JSON.parse(localStorage.getItem("currentUser")).token ? history.push("/signin") : console.log("token is valid")
        }
    });
}