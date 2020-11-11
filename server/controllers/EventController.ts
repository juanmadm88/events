import ResponseUtils from '../components/utils/ResponseUtils';
import EventUtils from '../components/utils/EventUtils';
import EventService from '../service/EventService';
import CanvasUtils from '../components/utils/CanvasUtils';

class EventController {

    private service: EventService;
    private utils: EventUtils;
    private canvasUtils: CanvasUtils;
    
    
    constructor() {
        this.service = new EventService();
        this.utils = new EventUtils();
        this.canvasUtils = new CanvasUtils();
    }

    public create: Function = async (req: any, res: any): Promise<any> => {
        try {
            const event: any = {name:req.params.eventName, count: parseInt(req.params.num)};
            await this.service.create(event);
            ResponseUtils.sendCreate(res);
        } catch(error) {
            ResponseUtils.sendInternalError(res, error.message, 500);
        }
    }

    public get: Function = async (req: any, res: any): Promise<any> => {
        let filter: any = {};

        try {
            filter = this.utils.getFilter(req.query);
        } catch(error) {
            ResponseUtils.sendInvalidReq(res, error.message, 404);
        }
        
        try {
            const response: any = await this.service.get(filter);
            const events = JSON.parse(JSON.stringify(response));
            ResponseUtils.sendQuery(res, events);
        } catch (error) {
            ResponseUtils.sendInternalError(res, error.message, 500);
        }
    }

    public countByEventName: Function = async (req: any, res: any): Promise<any> => {
        let filter:any={};
        
        try {
            filter = this.utils.getFilter(req.params);
        } catch(error) {
            ResponseUtils.sendInvalidReq(res, error.message, 404);
        }
        try {
            const response: any = await this.service.countByEventName(filter);
            const events = JSON.parse(JSON.stringify(response));
            ResponseUtils.sendQuery(res, events);
        } catch (error) {
            ResponseUtils.sendInternalError(res, error.message, 500);
        }
    }

    public getHistory: Function = async ( req:any,res: any): Promise<any> => {
        try {
            const response: any = await this.service.getHistory();
            const events = JSON.parse(JSON.stringify(response));
            ResponseUtils.sendQuery(res, events);
        } catch (error) {
            ResponseUtils.sendInternalError(res, error.message, 500);
        }
    }

    public buildHistogram: Function = async (req: any, res: any): Promise<any> => {
        let filter:any = {};
        let coordinates:any={};
        
        try {
            filter = this.utils.getFilter(req.params);
        } catch(error) {
            ResponseUtils.sendInvalidReq(res, error.message, 404);
        }
        try {
            const response: any = await this.service.getHistogram(filter);
            coordinates = this.utils.buildCoordinates(response[0]);
            const configuration = this.utils.buildConfiguration(coordinates);
            const image = await this.canvasUtils.renderChart(configuration);
            ResponseUtils.sendFile(res, image);
        } catch (error) {
            ResponseUtils.sendInternalError(res, error.message, 500);
        }
    }

    
   
    
}



export default EventController;
