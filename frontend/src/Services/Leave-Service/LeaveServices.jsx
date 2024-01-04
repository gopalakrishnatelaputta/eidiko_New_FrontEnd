import { myAxios } from "../../Server/MyAxios"
import dayjs from "dayjs"
import moment from "moment"
import { PageSize } from "../../Server/PageSize"

export const LeaveServices={


    getAllEmployeeLeavesStatus:async function(){

        let year=moment(dayjs()).format("YYYY")
        return await myAxios.get(`/leaves/get-employee-leave-status-report/${year}?${PageSize}`).then((res)=>res.data)
    },

    EmployeeLeavesSpent:async function(empId){

        let year=moment(dayjs()).format("YYYY")
        return await myAxios.get(`/leaves/get-spent-leave-count/${empId}/${year}?${PageSize}`).then((res)=>res.data)
    },
    Employeeleaveserch:async function(year,month){

        return await myAxios.get(`/leaves/get-employee-leave-status-report-monthly/${year}/${month}?${PageSize}`).then((res)=>res.data)
    },
    EmpLeaveCreation:async function(leave){
        
        return await myAxios.post(`leaves/add-leave`,leave).then((res)=>res.data)
    },
    EmpLeaveUpdation:async function(update,leaveStatusId){
        return await myAxios.put(`leaves/update-leave/${leaveStatusId}`,update).then((res)=>res.data)
    },
    EmpLeaveDeletion:async function(leaveDelete){
        return await myAxios.delete(`leaves/delete-leave/${leaveDelete}`).then((res)=>res.data)
    },


}