import { myAxios } from "../../Server/MyAxios";
import { PageSize } from "../../Server/PageSize";

 export const taskService={

createTask:async function(taskDetails,desc,status1,reason,team,assignedDate,taskAssignedBy,taskVerifiedBy){
     let data=null
     //console.log(taskDetails,taskAssignedBy,desc,reason,team,assignedDate,taskVerifiedBy,status1)
     await myAxios.post(`daily-status-report/create-task`,{
        "taskDetails":taskDetails,
        "desc":desc,
        "status":status1,
        "reason":reason,
        "team":team,
        "assignedDate":assignedDate,
        "taskAssignedBy":taskAssignedBy,
        "taskVerifiedBy":taskVerifiedBy

    }).then((res)=>{
     
      data=res
   })
  
    return data
},

//getting all daily statius report
getAllStatusReport:async function(){

   return await myAxios.get(`daily-status-report/get-all-reports${PageSize}`).then((res)=>res.data)
},


//serching employe via empid and dates
getStatusReportByDate:async function(empId,startDate,endDate){
   //console.log(empId,startDate,endDate)

   return await myAxios.get(`/daily-status-report/get-report/${empId}/${startDate}/${endDate}${PageSize}`).then((res)=>res.data)
},

getStatusReportByDateOnly:async function(startDate,endDate){
   //console.log(empId,startDate,endDate)

   return await myAxios.get(`/daily-status-report/get-all-reports-between-given-dates/${startDate}/${endDate}${PageSize}`).then((res)=>res.data)
},




//this service for getting all status pending report
getAllStatusPendingReports:async function(){
   return await myAxios.get(`/daily-status-report/get-all-pending-status${PageSize}`).then((res)=>res.data)
},

//serching pending reports via date
serchingStatusPendingReportsViaDates:async function(startDate,endDate){
   return await myAxios.get(`/daily-status-report/get-pending-status/${startDate}/${endDate}${PageSize}`)
},





//this service for all verification pending reports
getAllVerificationPendingReports:async function(){
   return await myAxios.get(`/daily-status-report/get-all-pending-reports${PageSize}`).then((res)=>res.data)
},

//serching verification pending via date
serchingVerificationPendingReports:async function(startDate,endDate){
   return await myAxios.get(`/daily-status-report/get-pending-reports-by-date/${startDate}/${endDate}${PageSize}`).then((res)=>res.data)
},
VerificationOfDaylyReport:async function(id){

   return await myAxios.put(`/daily-status-report/update-verified-by`,{"taskDetailsId":id}).then((res)=>res.data)

}





}