import Constants from '../components/Constants';
import Logger from '../components/Logger';
import EventDAO from '../dao/EventDAO';

class EventService {

    private dao: EventDAO;
    private logger: Logger;

    constructor() {
        this.dao = new EventDAO();
        this.logger = new Logger('EventService');
    }

    public create: Function = async (event: any): Promise<any> => {
        try {
            return await this.dao.create(event);
        } catch (reason) {
            this.logger.error(Constants.ERROR_MESSAGE_CREATE_EVENT + ' ' + reason);
            throw new Error(Constants.ERROR_MESSAGE_CREATE_EVENT);
        }
    }

    public get: Function = async (filter: any): Promise<any> => {
        try {
            return await this.dao.get(filter);
        } catch (reason) {
            this.logger.error(Constants.ERROR_MESSAGE_GET_EVENT + ' ' + reason);
            throw new Error(Constants.ERROR_MESSAGE_GET_EVENT);
        }
    }

    public countByEventName: Function = async (filter: any): Promise<any> => {

        try {
            return await this.dao.countByEventName(filter);
        } catch (reason) {
            this.logger.error(`${Constants.ERROR_MESSAGE_GET_EVENT_BY_NAME}: ${filter.eventName} - ${reason}`);
            throw new Error(Constants.ERROR_MESSAGE_GET_EVENT_BY_NAME);
        }
    }

    public getHistory: Function = async (): Promise<any> => {
        try {
            return await this.dao.getHistory();
        } catch (reason) {
            this.logger.error(Constants.ERROR_MESSAGE_GET_EVENT_HISTORY + ' ' + reason);
            throw new Error(Constants.ERROR_MESSAGE_GET_EVENT_HISTORY);
        }
    }

    public getHistogram: Function = async (filter:any): Promise<any> => {
        try {
            return await this.dao.getHistogram(filter);
        } catch (reason) {
            this.logger.error(Constants.ERROR_MESSAGE_GET_EVENT_HISTORY + ' ' + reason);
            throw new Error(Constants.ERROR_MESSAGE_GET_EVENT_HISTORY);
        }
    }

}

export default EventService;
