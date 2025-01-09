import {useMutation} from "react-query";
import apiReq from "./request.js";

export const useCheckTemplateMutation = () => {
   return useMutation((data) => {
       return apiReq.post('/templates/api/v1/templates/check', data)
                .then(res => res.data);
   });
}