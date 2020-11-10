import Constants from '../Constants';

abstract class ResponseUtils {

    public static sendCreate:Function = (res: any): void => {
        res.status(201);
        res.send();
    }

    public static sendEmpty:Function = (res: any): void => {
        res.status(204);
        res.send();
    }

    public static sendQuery:Function = (res: any, data: any): void => {
        let response: any = {};
        response.data = data;

        res.status(200);
        res.send(response);
    }

    public static sendGenericSuccess: Function = (res: any, data: any): void => {
        res.status(200);
        res.send(data);
    }

    public static sendInvalidToken: Function = (res: any, message: string, code: number): void => {
        let response:any = {};
        response.type = Constants.UNAUTHORIZED_MESSAGE;
        response.message = message;
        response.code = code;

        res.status(401);
        res.send(response);
    }

    public static sendPermissionDenied: Function = (res: any , message: string , code: number): void => {
        let response:any = {};
        response.type = Constants.UNAUTHORIZED_MESSAGE;
        response.message = message;
        response.code = code;

        res.status(401);
        res.send(response);
    }

    public static sendForbiddenReq: Function = (res: any, message: string, code: number): void => {
        let response:any = {};
        response.type = Constants.FORBIDDEN_MESSAGE;
        response.message = message;
        response.code = code;

        res.status(403);
        res.send(response);
    }

    public static sendInvalidReq: Function = (res: any, message: string, code: number): void => {
        let response:any = {};
        response.type = Constants.BAD_REQUEST_MESSAGE;
        response.message = message;
        response.code = code;

        res.status(400);
        res.send(response);
    }

    public static sendNotFoundReq :Function = (res: any, message: string, code: number): void => {
        let response:any = {};
        response.type = Constants.NOT_FOUND_MESSAGE;
        response.message = message;
        response.code = code;

        res.status(404);
        res.send(response);
    }

    public static sendInternalError:Function = (res: any, message: string, code: number): void => {
        let response:any = {};
        response.type = Constants.INTERNAL_SERVER_ERROR_MESSAGE;
        response.message = message;
        response.code = code;

        res.status(500);
        res.send(response);
    }

}

export default ResponseUtils;
