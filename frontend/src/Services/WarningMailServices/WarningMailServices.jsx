import { myAxios } from "../../Server/MyAxios"
import { PageSize } from "../../Server/PageSize"


export const WarningMailServices={

    CreateWarningMail:async function(warningmail){
        let empid=localStorage.getItem("id")

        return await myAxios.post(`/warningmail/send-mail/${empid}`,warningmail).then((res)=>res.data)
     },

     getwarninmailsviaempid:async function(empid){
       
        return await myAxios.get(`/warningmail/get-caution-mail-data-by-empId/${empid}?${PageSize}`).then((res)=>res.data)
    },
    getwarninmailsviayearandmonth:async function(year,month){
       
        return await myAxios.get(`/warningmail/get-caution-mail-data-by-month-year/${year}/${month}?${PageSize}`).then((res)=>res.data)
    },
    getwarninmailsviayear:async function(year){
       
        return await myAxios.get(`/warningmail/get-all-caution-mail-data-by-year/${year}?${PageSize}`).then((res)=>res.data)
    },
    getCautionMailReportForparticularemployee:async function(empId,fromDate,todate){
       
        return await myAxios.get(`/warningmail/get-caution-mail-report/${empId}/${fromDate}/${todate}?${PageSize}`).then((res)=>res.data)
    },
    getAllCautionMailReportForemployees:async function(fromDate,todate){
       
        return await myAxios.get(`/warningmail/get-all-caution-mail-report/${fromDate}/${todate}?${PageSize}`).then((res)=>res.data)
    },
}




