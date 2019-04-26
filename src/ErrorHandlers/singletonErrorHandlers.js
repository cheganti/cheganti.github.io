export class ErrorHandler {
    constructor(){
        if(!ErrorHandler.instance){
            ErrorHandler.instance = this;
            console.log("Inside IF");
        }
        console.log("Outside IF");
        return ErrorHandler.instance;
       }

    handleErrors(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        alert(errorMessage);
        // return throwError(errorMessage);
    }
}