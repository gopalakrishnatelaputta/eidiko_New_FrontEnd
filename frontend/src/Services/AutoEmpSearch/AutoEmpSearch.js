import { myAxios } from "../../Server/MyAxios";

export default async function AutoEmpSearch(event){
    let data=null
    await myAxios.get(`/employee/search-employee/${event}`)
     .then((res)=> {
      
        data=res
     })
return data
 }

