import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { LocalStorageData } from "../utils/localstorage";
import { ApiResponse } from "./api-response/base.response";
import { environment } from "../../environments/environment";



export abstract class BaseService {

    protected urlService: string = environment.apiUrl;
    public localStorage = new LocalStorageData();

    protected getHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected getAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.localStorage.getUserToken()}`
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected extractApiResponse(response: ApiResponse) {
        return response || {};
    }
    
    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        let customResponse: { error: { errors: string[] }} = { error: { errors: [] }}

        if (response instanceof HttpErrorResponse) {

            if (response.statusText === "Unknown Error") {
                customError.push("An unknown error occoured.");
                response.error.errors = customError;
            }
        }
        if (response.status === 500) {
            customError.push("An error occurred while processing, please try again later or contact our support.");
              
            customResponse.error.errors = customError;
            return throwError(() => customResponse);
        }

        console.error(response);
        return throwError(() => response);
    }
}