
export const TimeFormat={

    TimeFormat1:function (dStr,format) {
        var now = new Date();
        console.log(now)
        if (format == "hh:mm:ss") {
        now.setHours(dStr.substr(0,2));
        now.setMinutes(dStr.substr(3,5));
         now.setSeconds(dStr.substr(6,8));
         console.log(now)
        return now;
        }else 
        return "Invalid Format";
        },

        hourConversion:function(startHour){
            let start1=""
            if(startHour.length===1){
                start1="0"+startHour
                return start1
            }else if(startHour.length===2){
                start1=startHour
                return start1

            }
        },
        minuteConversion:function(minute1){
            let start1=""
            if(minute1.length===1){
                start1="0"+minute1
                return start1
            }else if(minute1.length===2){
                start1=minute1
                return start1

            }
        }

}
