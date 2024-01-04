

export default function  validation(employeeId){
    let error={}
    if(!employeeId){
        error.name="employee Id is mandatory"
    }
    // else if(employeeId.length){
    //     error.name="employee Id must be 4 digit"
    // }

    return error

}