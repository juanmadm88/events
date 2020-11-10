abstract class Constants {

    // Error Messages
    public static ERROR_MESSAGE_GET_EVENT: string = "An error occurred while trying to get the event";
    public static ERROR_MESSAGE_CREATE_EVENT: string = "An error occurred while trying to create the event";
    public static ERROR_MESSAGE_GET_EVENT_HISTORY: string = "An error occurred while trying to get the events history";
    public static ERROR_MESSAGE_GET_EVENT_BY_NAME: string = "An error occurred while trying to get the event by name";


    // HTTP methods
    public static GET_METHOD: string = "GET";
    public static POST_METHOD: string = "POST";
    public static PUT_METHOD: string = "PUT";
    public static DELETE_METHOD: string = "DELETE";

    // HTTP message
    public static UNAUTHORIZED_MESSAGE: string = "Unauthorized";
    public static FORBIDDEN_MESSAGE: string = "Forbidden";
    public static BAD_REQUEST_MESSAGE: string = "Bad Request";
    public static NOT_FOUND_MESSAGE: string = "Not found";
    public static INTERNAL_SERVER_ERROR_MESSAGE: string = "Internal Server Error";
    public static NOT_SUPPORTED_URL: string = "URL not supported";

    //MongoDB Operators
    public static REGEX_OPERATOR_DB: string = "$regex";
    public static LT_OPERATOR_DB: string = "$lt";
    public static GT_OPERATOR_DB: string = "$gt";
    public static EQ_OPERATOR_DB: string = "$eq";

    // Connection Status
    public static DISCONNECTED: string = "Disconnected";
    public static CONNECTED: string = "Connected";
    public static CONNECTING: string = "Connecting";
    public static DISCONNECTING: string = "Disconnecting";

    public static UNKNOW: string = "Unknow";

    //Mssg DB Connection

    public static readonly SUCCESSFUL_CONNECTION: string = "Connection has been established successfully.";
    public static readonly ERROR_CONNECTION: string = "Unable to connect to the database: ";

}

export default Constants;
