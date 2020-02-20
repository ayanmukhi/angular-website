export interface getallResponse {
    status:number;
    result: 
    [
        {
            'sic':number,
            "stu_name": string,
            "gender": string,
            "father_name": string,
            "mother_name": string,
            "dob": string,
            "matric_board": string,
            "matric_roll": string,
            "matric_perc": string,
            "state": string,
            "district": string,
            "street_address": string,
            "phone": number,
            "email": number,
            "password": string,
            "status": string,
            "hobby": []
        }
    ]
}