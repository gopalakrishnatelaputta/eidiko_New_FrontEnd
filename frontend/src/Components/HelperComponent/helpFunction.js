import dayjs from "dayjs"

export const helpFunction={

    endDateManipulation: function (endDate){
        let date=null
    
        if(endDate.getTime===new Date("2000-01-01").getTime){
            let k=endDate.toISOString()
            date=k.replace(k,"null")
            return date
        } else{
            
            return  date=endDate
        }
       },
       
       helperFunctionForEndDateInput:function(date){
        if(date!==null){
         return date.slice(0,10)
        }
        else {
            return ""
        }

       },

     WeakOffShowing:function(weekNumber){
        const week={
            "1,2":"Sun,Mon","1,3":"Sun,Tue","1,4":"Sun,Wed","1,5":"Sun,Thur","1,6":"Sun,Fri","1,7":"Sun,Sat",

            "2,1":"Mon,Sun","2,3":"Mon,Tue","2,4":"Mon,Wed","2,5":"Mon,Thur","2,6":"Mon,Fri","2,7":"Mon,Sat",

            "3,1":"Tue,Sun","3,2":"Tue,Mon","3,4":"Tue,Wed","3,5":"Tue,Thur","3,6":"Tue,Fri","3,7":"Tue,Sat",

            "4,1":"Wed,Sun","4,2":"Wed,Mon","4,3":"Wed,Tue","4,5":"Wed,Thur","4,6":"Wed,Fri","4,7":"Wed,Sat",

            "5,1":"Thur,Sun","5,2":"Thur,Mon","5,3":"Thur,Tue","5,4":"Thur,Wed","5,6":"Thur,Fri","5,7":"Thur,Sat",

            "6,1":"Fri,Sun","6,2":"Fri,Mon","6,3":"Fri,Tue","6,4":"Fri,Wed","6,5":"Fri,Thur","6,7":"Fri,Sat",

            "7,1":"Sat,Sun","7,2":"Sat,Mon","7,3":"Sat,Tue","7,4":"Sat,Wed","7,5":"Sat,Thur","7,6":"Sat,Fri"
        }
      
        let data=""
         Object.keys(week).forEach((pop)=>{
            
        if(pop===weekNumber){
            let data1=Object.values(week[pop])
            for(let i = 0; i < data1.length; i++){
                data=data+data1[i]
            }
        }
         })
     return data  
     },
     
     MonthShowing:function(num){
        const month={"0":"Jan","1":"Feb","2":"Mar","3":"April","4":"May","5":"June","6":"July","7":"Aug","8":"Sept","9":"Oct","10":"Nov","11":"Dec"}
        
        let data=""
        Object.keys(month).forEach((pop)=>{
           
       if(pop===num){
           let data1=Object.values(month[pop])
           for(let i = 0; i < data1.length; i++){
               data=data+data1[i]
           }
       }
        })
    return data  

     },
     MonthShowing1:function(num){
        const month={"1":"Jan","2":"Feb","3":"Mar","4":"April","5":"May","6":"June","7":"July","8":"Aug","9":"Sept","10":"Oct","11":"Nov","12":"Dec"}

        let data=""
        Object.keys(month).forEach((pop)=>{
           
       if(pop==num){
           let data1=Object.values(month[pop])
           for(let i = 0; i < data1.length; i++){
               data=data+data1[i]
           }
       }
        })
    return data  

     },
     MonthShowing2:function(num){
        const month={"0":"Jan","1":"Feb","2":"Mar","3":"April","4":"May","5":"June","6":"July","7":"Aug","8":"Sept","9":"Oct","10":"Nov","11":"Dec"}
        
        let data=""
        Object.keys(month).forEach((pop)=>{
           
       if(pop==num){
           let data1=Object.values(month[pop])
           for(let i = 0; i < data1.length; i++){
               data=data+data1[i]
           }
       }
        })
    return data  

     },



     
DateReturnForDataFetch:function(){
    let year=dayjs().format("YYYY")
    return  year+"-"+"01"+"-"+"01"
}




}


