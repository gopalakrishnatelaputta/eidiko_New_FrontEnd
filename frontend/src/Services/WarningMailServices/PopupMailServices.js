import { myAxios } from "../../Server/MyAxios"



export const PopupMailServices={


    getUnreadWarningMailsByEmpId:async function(empid){
       
        return await myAxios.get(`/alertMail/get-mails-by-empId-unread/${empid}`).then((res)=>res.data)
    },

    markAsRead:async function(warningMailIds){
       
        return await myAxios.put(`/alertMail/mark-as-read`,{
            "warningMailId":warningMailIds
        }).then((res)=>res.data)
    },

    markAlertMailsAsReadAsUpdate:async function(warningMailIds){
       
        return await myAxios.put(`/alertMail/mark-as-update`,{
            "warningMailId":warningMailIds
        }).then((res)=>res.data)
    },
}