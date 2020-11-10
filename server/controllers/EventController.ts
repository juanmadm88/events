import ResponseUtils from '../components/utils/ResponseUtils';
import EventUtils from '../components/utils/EventUtils';
import EventService from '../service/EventService';

class EventController {

    private service: EventService;
    private utils: EventUtils;
    private readonly ONE_HUNDRED: number = 100;

    constructor() {
        this.service = new EventService();
        this.utils = new EventUtils();
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
        let coordinates:any[]=[];
        
        try {
            filter = this.utils.getFilter(req.params);
        } catch(error) {
            ResponseUtils.sendInvalidReq(res, error.message, 404);
        }
        try {
            const response: any = await this.service.getHistogram(filter);
            coordinates = this.buildCoordinates(response[0]);
            ResponseUtils.sendQuery(res, coordinates);
        } catch (error) {
            ResponseUtils.sendInternalError(res, error.message, 500);
        }
    }

    private buildCoordinates: Function = (response:any): any[] =>{
        let coordinates:any[] = [];
        let totalCount:number;
        
        if(this.utils.exists(response)){
            (response.totalCount) ? totalCount = response.totalCount : totalCount =1;
            for(const result of response.results){
                let coordinate:any = {}; 
                coordinate = {hour:parseInt(result.hour),frecuency: this.calculateFrecuency(result.count,totalCount)};
                coordinates.push(coordinate);
            }
        }
        return coordinates;
    }
    
    private calculateFrecuency: Function = (count:number, totalCount:number): number =>{
        return(Math.round((count/totalCount) * this.ONE_HUNDRED));
    }
}



export default EventController;
