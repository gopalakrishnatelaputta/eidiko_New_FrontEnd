import { myAxios } from "../../Server/MyAxios"
import { PageSize } from "../../Server/PageSize"

export const EmployeeAccessLevelGivenService={
    CreateAccessLevel: async function(access){
        return myAxios.post(`/access/employee/access-level`,access).then((response)=>response.data)
    },
    DeleteAccesslevel:async function(empId,accesslevel){
        return await myAxios.delete(`/access/employee/delete-access-level/${empId}/${accesslevel}`).then((res)=>res.data)
    },

    getAllEmployeeAcessLevel:async function(accesslevel){
        return await myAxios.get(`/access/employee/byaccess/${accesslevel}?${PageSize}`).then((res)=>res.data)
    },
  

}

