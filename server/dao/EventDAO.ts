import EventMapper from './mappers/EventMapper';
import EventUtils from './utils/EventUtils';

import Logger from '../components/Logger';


class EventDAO {

    private mapper: EventMapper;
    private utils: EventUtils;
    private logger: Logger;

    constructor() {
        this.logger = new Logger('EventDAO');

        this.utils = new EventUtils();
        this.mapper = new EventMapper();
    }

    public create: Function = async (event: any): Promise<any> => {
        const eventDB: any = this.utils.getModel(event);

        try {
            const eventModel = await this.mapper.getEntityModel();
            return await eventModel.create(eventDB);
        } catch(error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }

    public get: Function = async (filter: any): Promise<any> => {
        const options: any = this.utils.getOptions(filter,);

        try {
            const eventModel = await this.mapper.getEntityModel();
            return await eventModel
                                    .find(options)
                                    .select({ "event": 1, "_id": 0,"count":1,"date":1})
                                    .exec();
        } catch(error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }

    public countByEventName: Function = async (filter: any): Promise<any> => {
        const options: any = this.utils.getOptions(filter);

        try {
            const eventModel = await this.mapper.getEntityModel();
            return await eventModel
                                    .findOne(options)
                                    .select({ "count":1,"_id":0})
                                    .exec();
        } catch(error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }

    public getHistory: Function = async (): Promise<any> => {
        try {
            const eventModel = await this.mapper.getEntityModel();
            return await eventModel
                                    .aggregate([])
                                    .group({_id:  "$event", count: { $sum: "$count"}})
                                    .project({_id:0, event:"$_id", count:1})
                                    .exec();
        } catch(error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }

    public getHistogram: Function = async (filter:any): Promise<any> => {
        try {
            const options:any = this.utils.getOptions(filter);
            const eventModel = await this.mapper.getEntityModel();
            return await eventModel
                                    .aggregate([])
                                    .match(options)
                                    .group({ _id: {event: '$event', date:'$date'},count: { $sum: '$count'}})
                                    .project({ _id:0, 'results': { event:'$_id.event', 'count': '$count', 
                                                                    hour: { $substr: ['$_id.date', 8, -1]},
                                                                    day: { $substr: ['$_id.date', 0, 8]}
                                                                }
                                           })
                                    .group({'_id': null,totalCount: { $sum: '$results.count'}, results: {$push: '$results'}})
                                    .project({results:1, _id:0, totalCount:1})
                                    .exec();
        } catch(error) {
            this.logger.error(error);
            throw new Error(error);
        }
    }

}

export default EventDAO;
