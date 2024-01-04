import axios from "axios"
import { baseUrl } from "../../Server/baseUrl"
import { myAxios } from "../../Server/MyAxios"
import dayjs from "dayjs"
import { PageSize } from "../../Server/PageSize"
import moment from "moment"

export const BiometricServiceModule={

    biometricDataUpload: async function(file){
        let data=null
        await myAxios.post(`biometric/add-file`,{"file":file}).then((res)=>{data=res})

           return data
    },
    getAllBiometricReportNonLate:async function(startDate,endDate){
       
        return await myAxios.get(`/biometric/get-all-biometric-report/calculated-report/${startDate}/${endDate}?${PageSize}`).then((res)=>res.data)
    },
    getAllBiometricDataViaEmpIdStartDateEndDate:async function(empId,startDate,endDate){

        return await myAxios.get(`/biometric/get-biometric-report-empid-fromdate-todate/${empId}/${startDate}/${endDate}?${PageSize}`).then((res)=>res.data)
    },

    getAllBiometricReportIsLate:async function(startDate,endDate){
       
        return await myAxios.get(`/biometric/get-all-biometric-report/calculated-report/${startDate}/${endDate}?${PageSize}`).then((res)=>res.data)
    },
    getAllBiometricReportAfterClickingView:async function(empId,startDate,endDate){
       
        return await myAxios.get(`/biometric/get-biometric-data-by-id-date/${empId}/${startDate}/${endDate}?${PageSize}`).then((res)=>res.data)
    },
    
    updateIsLateReport:async function(month,year){
        
        return await myAxios.put(`/biometric/update-islate-report/${month}/${year}`).then((res)=>res.data)
    },
    getBiometricReportViaYear:async function(empId,year){
        return await myAxios.get(`/biometric/get-biometric-reports-view/${empId}/${year}`).then((res)=>res.data)

    },
    updateBiometricMissingReport:async function(month,year){


        let empId= localStorage.getItem("id")
        
        return await myAxios.put(`/biometric/update-employee-missing-report/${empId}/${month}/${year}`).then((res)=>res.data)
    },

    getBiometricMissingReportYearly:async function(year){
        return await myAxios.get(`/biometric/get-missing-report-employees-yearly/${year}`).then((res)=>res.data)

    },
    getBiometricMissingReportMonthly:async function(year,month){
        return await myAxios.get(`/biometric/get-missing-report-employees-monthly/${year}/${month}`).then((res)=>res.data)

    },
    getBiometricMissingReportForParicularEmployee:async function(year,empId){
        return await myAxios.get(`/biometric/get-missing-report-employee/${year}/${empId}`).then((res)=>res.data)

    },


}