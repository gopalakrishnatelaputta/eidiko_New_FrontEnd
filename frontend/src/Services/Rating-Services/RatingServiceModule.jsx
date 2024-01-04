

import { myAxios } from "../../Server/MyAxios"
import { PageSize } from "../../Server/PageSize"

//review rating

export const RatingServiceModule={
    postReviewRating: async function(rating){
        return myAxios.post(`/rating/insertRating`,rating).then((response)=>response.data)
    },
    getEmpReviewRating:async function(empId,year){
        return await myAxios.get(`/rating/get-ratings-by/${empId}/${year}?${PageSize}`).then((res)=>res.data)
    },

    getAllEmpRatingYearly:async function(year){
        return await myAxios.get(`/rating/get-ratings-by-year/${year}?${PageSize}`).then((res)=>res.data)
    },
    getAllEmpRatingMonthly:async function(month,year){
        return await myAxios.get(`/rating/get-ratings-by-month-year/${month}/${year}?${PageSize}`).then((res)=>res.data)
    },

    updateRating:async function(rating,id){
     
        return myAxios.put(`/rating/update-rating/${id}`,rating).then((response)=>response.data)
    },
    deleterating:async function(id){
     
        return myAxios.delete(`/rating/delete-rating/${id}`).then((response)=>response.data)
    },





    

}