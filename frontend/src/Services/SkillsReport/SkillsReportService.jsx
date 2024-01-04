import { myAxios } from "../../Server/MyAxios"
import axios from "axios"

//emp skills 
export  const getEmpSkillReport=(empId)=>{
    return myAxios.get(`emp-skills-tracking/get-skills-by-empid/${empId}`).then((res)=>res.data)
}

//skill report create
export const createSkillsReport=(employee)=>{
    return myAxios.post(`emp-skills-tracking/insert-skill-data`,employee).then((res)=>res.data)
}

//All emp Skill report
export const getAllEmpSkillReport=(java,training)=>{
    return myAxios.get(`emp-skills-tracking/get-by-skill-and-working?skill=${java}&working=${training}`).then((res)=>res.data)
}    

export const getAllEmpSkillReportWithoutParameter=()=>{
    return myAxios.get(`emp-skills-tracking/get-all-present-skills`).then((res)=>res.data)
}    


export const UpdateEmployeeSkillReport=(skillId,employee)=>{
    return myAxios.put(`emp-skills-tracking/update-by-skillid/${skillId}`,employee).then((res)=>res.data)
}


///skill deletion
export const deleteSkill=(id)=>{
     
    return myAxios.delete(`emp-skills-tracking/delete-skill/${id}`).then((res)=>res.data)
}



