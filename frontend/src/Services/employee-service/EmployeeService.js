import dayjs from "dayjs"
import { myAxios } from "../../Server/MyAxios"

export const createEmployee = (employee) => {
    //console.log(employee)
    return myAxios.post(`employee/create`,employee).then((response) => response.data)
}

export const  updateEmployeeService = (employee) => {
    //console.log(employee)
    return myAxios.put(`access/employee/update-employee`,employee).then((response) => response.data)
}

export const  deleteEmployeeService = (empId) => {
    //console.log(employee)
    return myAxios.delete(`access/employee/delete-employee/${empId}`).then((response) => response.data)
}


export const getAllEmployees = () => {   
    return myAxios.get(`employee/get-all-employee?sortBy=empId&pageSize=1000&pageNo=0`).then((response) => response.data)
}

export const getShiftTimingsTable=()=>{
    return myAxios.get(`/employee/get-shift-timings`).then((res)=>res.data)

}

export const getEmployeeWorkLocationTable=()=>{
    return myAxios.get(`/employee/get-work-location`).then((res)=>res.data)

}
export const getReportingManagerTable=()=>{
    return myAxios.get(`/employee/get-reporting-manager`).then((res)=>res.data)
}
//getting emp details as per work location
export const getEmpDataByLoc=(CLIENT_LOCATION)=>{
    return myAxios.get(`/access/get-employees-by-worklocation/${CLIENT_LOCATION}`).then((res)=>res.data)
}



//reporting manager services 

export const getReportedEmployees=(empId,startDate,endDate)=>{
    return myAxios.get(`/reporting-manager/get-reporting-employees/${empId}/${startDate}/${endDate}`).then((res)=>res.data)
}
export const getDetailedEmployeeInformation=(empId,managerId)=>{
    let year=dayjs().format("YYYY")
    return myAxios.get(`reporting-manager/get-reporting-employee/detailed-information/${empId}/${managerId}/${year}`).then((res)=>res.data)
}

export const ResignedEmployee={

    ResignationCreation:async function(resign){
      
        return await myAxios.post(`employee/insert-resigned-emp`,resign).then((res)=>res.data)
    },
    ResigedEmployeeData:async function(){
      
        return await myAxios.get(`employee/get-all-resigned-employees`).then((res)=>res.data)
    },
    updateResignedEmployee : (employee) => {
   
        return myAxios.put(`/employee/update-resigned-emp`,employee).then((response) => response.data)
    }
}