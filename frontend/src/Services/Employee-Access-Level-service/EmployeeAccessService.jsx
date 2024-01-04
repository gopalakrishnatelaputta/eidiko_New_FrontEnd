import { myAxios } from "../../Server/MyAxios";

export const EmployeeAccessLevelService={
/////////// employee  data in table services///////////////////////////////////////
WorkingLocationFromProfile:async function(empId){
    return myAxios.get(`access/employee/get-work-location/${empId}`).then((res)=>res.data)
},

ShiftTimingsFromProfile:async function(empId){
    return myAxios.get(`access/employee/get-shift-timings/${empId}`).then((res)=>res.data)
},

ReportingManagerFromProfile:async function(empId){
    return myAxios.get(`access/employee/get-reporting-manager/${empId}`).then((res)=>res.data)
},



////////////////////////////////access level create service /////////////////////////////////////////////////////////////


    createWorkingLocationfromProfile:async function(empId,startDate,endDate,workingFrom,LOCATION){

        return await myAxios.post("access/employee/add-work-location",{"empId":empId,"startDate":startDate,"endDate":endDate,"workingFrom":workingFrom,"location":LOCATION})
        .then((res)=>res.data)
 
     },
     CreateReportingManagerFromProfile: async function(empId,managerId,startDate,endDate){
        // let data=null
       return await myAxios.post("access/employee/add-reporting-manager",{"empId":empId,
        "managerId":managerId,
        "startDate":startDate,
        "endDate":endDate}).then((res)=> res.data
            //console.log(res)
            )

       
    },
    createShiftTimingsFromProfile:async function(empId,weekOff,startDate,endDate,shiftStartTime,shiftEndTime){
        let data=null
       await myAxios.post("/access/employee/add-shift-timing",{
            "empId":empId,    
            "weekOff":weekOff,
            "startDate":startDate,
            "endDate":endDate,
            "shiftStartTime":shiftStartTime,
            "shiftEndTime":shiftEndTime

        }).then((result)=>{

            data=result}
       
        )
        return data

    },


//access level update service/////////////////////////////////////////////





    updateWorkingLocation:async function(empWorkLocationId,empId,startDate,endDate,workingFrom,LOCATION){

        return await myAxios.put("access/employee/update-working-location",{"empWorkLocationId":empWorkLocationId,"empId":empId,"startDate":startDate,"endDate":endDate,"workingFrom":workingFrom,"location":LOCATION})
        .then((res)=>res.data)
 
     },
     updateReportingManager: async function(empId,managerId,startDate,endDate,reportingManagerId){
        // let data=null
       return await myAxios.put("access/employee/update-reporting-manager",{"empId":empId,
        "managerId":managerId,
        "startDate":startDate,
        "endDate":endDate,
        "reportingManagerId":reportingManagerId
    }).then((res)=> res.data
            //console.log(res)
            )

       
    },
    updateShiftTimingsService:async function(empId,weekOff,startDate,endDate,shiftStartTime,shiftEndTime,shiftTimingId){
        let data=null
       await myAxios.put("/access/employee/update-shift-timing",{
            "empId":empId,    
            "weekOff":weekOff,
            "startDate":startDate,
            "endDate":endDate,
            "shiftStartTime":shiftStartTime,
            "shiftEndTime":shiftEndTime,
            "shiftTimingId":shiftTimingId

        }).then((result)=>{

            data=result}
       
        )
        return data

    },
    updateContact:async function(contact,empId){
        return await myAxios.post(`/access/employee/update-contactno/${empId}?contactNo=${contact}`).then((res)=>res.data)
    },
    AccessUpdateAbout:async function(about){
        return myAxios.post(`access/employee/add-about?about=${about}`).then((response) => response.data)
         },


}