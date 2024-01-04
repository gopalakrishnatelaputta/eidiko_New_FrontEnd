import { myAxios } from "../../Server/MyAxios";
import { PageSize } from "../../Server/PageSize";


export const DropDownServices={

    getClientLocation:async function(){
        return await myAxios.get(`drop-down-list/client-locations?${PageSize}`).then((res)=>res.data)
    },
    getSkilssDrop:async function(){
        return await myAxios.get(`drop-down-list/get-skills?${PageSize}`).then((res)=>res.data)
    },
    getTeamDrop:async function(){
        return await myAxios.get(`drop-down-list/get-teams?${PageSize}`).then((res)=>res.data)
    },
    getAccessLevelDrop:async function(){
        return await myAxios.get(`drop-down-list/get-access-levels?${PageSize}`).then((res)=>res.data)
    },
    getdesignations:async function(){
        return await myAxios.get(`drop-down-list/get-all-designations?${PageSize}`).then((res)=>res.data)
    },

}