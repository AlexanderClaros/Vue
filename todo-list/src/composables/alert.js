import {ref,reactive} from 'vue';
function useShowAlert(alert,message, variant="danger") {
    alert.variant = variant;
    alert.show = true;
    alert.message = message;
    return alert;
};
const useAlert = { 
    alert:{
        show: false,
        message: "",
        variant: "danger"
    }
};
export{useAlert,useShowAlert};