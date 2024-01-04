import { myAxios } from "../../Server/MyAxios"
import { PageSize } from "../../Server/PageSize"

export const HolidayService={
    deleteHoliday:async function(id){
        return await myAxios.delete(`/holiday/delete-holiday/${id}`).then((res)=>res.data)
    },
    createHoliday:async function(holidaylist){
        return await myAxios.post(`/holiday/add-holiday`,holidaylist).then((res)=>res.data)
    },  
    updateHoliday:async function(holidayId,holidayDto){
        return await myAxios.put(`/holiday/update-holiday?holidayId=${holidayId}`,holidayDto).then((res)=>res.data)
    },
    getHolidayListByYear:async function(year){
        return await myAxios.get(`/holiday/get-holiday-list-by-year?year=${year}`).then((res)=>res.data)
    }
}