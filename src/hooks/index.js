import {useMutation} from "react-query";
import apiReq from "./request.js";

export const useLoginMutation = () => {
    return useMutation((data) => {
        return apiReq.post('/api/v1/auth/login', data)
            .then(res => res.data);
    });
}

export const useCheckTemplateMutation = () => {
   return useMutation((data) => {
       return apiReq.post('/api/v1/templates/check', data)
   });
}

export const useUploadTemplatesMutation = () => {
    return useMutation((formData) => {
        return apiReq.post('/api/v1/templates/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    });
}