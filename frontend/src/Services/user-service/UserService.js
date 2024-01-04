import { myAxios } from "../../Server/MyAxios"
import { setAccessLevel } from "../AccessLevel/AccessLevelService";

const userServiceModule= {

    logService: async function(employeeId,password){
       
        let data=null;

      await myAxios.post(`/auth/login`,{
            username:employeeId,
            password:password
        }).then((result)=>{
            localStorage.setItem("token",result.data.token)
            localStorage.setItem("id",employeeId)
            setAccessLevel(result.data.userRole)
            data=result
        })
        return data
    },

    // forgotpassword service starts here

     forgotPasswordService : async function(employeeId3){
        let data=null;
    
     await myAxios.post(`/auth/forgot-password?username=${employeeId3}`).then((result)=> {
        data=result
     }
       )
    return data
    },
    // forgotpassword service ends here
    
    isLogedin: function(){
        if(!localStorage.getItem("token")){
            return false
        }
        return true
    },

    shiftTimingsService:async function(weekOff,startDate,endDate,shiftStartTime,shiftEndTime){
        let data=null
       await myAxios.post("/employee/add-shift-timing",{
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

    reportingManager: async function(manager){
        let data=null
        await myAxios.post("/employee/add-reporting-manager",manager).then((res)=>{
            data=res
            //console.log(res)
        })

        return data

    },

    changePassword:async function(empPassword){
       // console.log(empPassword);
       
       return myAxios.post("/employee/change-password",empPassword).then((response) => response.data)
        

    },
    
    updateAbout:async function(about){
       return myAxios.post(`/employee/add-about?about=${about}`).then((response) => response.data)
        },
        
        shiftTimingsService:async function(weekOff,startDate,endDate,shiftStartTime,shiftEndTime){
            let data=null
           await myAxios.post("/employee/add-shift-timing",{
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
        reportingManager: async function(empId,managerId,startDate,endDate){
            // let data=null
           return await myAxios.post("/employee/add-reporting-manager",{"empId":empId,
            "managerId":managerId,
            "startDate":startDate,
            "endDate":endDate}).then((res)=> res.data
                //console.log(res)
                )
    
           
        },
        workingLocation:async function(empId,startDate,endDate,workingFrom,LOCATION){

            return await myAxios.post("/employee/add-work-location",{"empId":empId,"startDate":startDate,"endDate":endDate,"workingFrom":workingFrom,"location":LOCATION})
            .then((res)=>res.data)
     
         },
    
   //////////////////////employee update service for logged in user////////////////////////////

 UpdateShiftTimingsService:async function(shiftTimingId,empId,weekOff,startDate,endDate,shiftStartTime,shiftEndTime){
    let data=null
   await myAxios.put("/employee/update-shift-timing",{
        "shiftTimingId":shiftTimingId,
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
UpdateReportingManager: async function(reportingManagerId,empId,managerId,startDate,endDate){
    // let data=null
   return await myAxios.put("/employee/update-reporting-manager",{
    "reportingManagerId":reportingManagerId,
    "empId":empId,
    "managerId":managerId,
    "startDate":startDate,
    "endDate":endDate}).then((res)=> res.data
        //console.log(res)
        )

   
},
UpdateWorkingLocation:async function(empWorkLocationId,empId,startDate,endDate,workingFrom,LOCATION){

    return await myAxios.put("/employee/update-working-location",
    {"empWorkLocationId":empWorkLocationId,"empId":empId,"startDate":startDate,"endDate":endDate,"workingFrom":workingFrom,"location":LOCATION})
    .then((res)=>res.data)

 },
 updateContact:async function(contact,empId){
    return await myAxios.post(`/employee/update-contactno?contactNo=${contact}`).then((res)=>res.data)
}
    



}




export default userServiceModule
