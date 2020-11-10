import Utils from './Utils';

class EventUtils extends Utils {

    constructor() {
        super();
    }

    // Publics Functions
    public getFilter: Function = (params: any): any => {
        let filter: any = {};

        if(params.startDate) filter.startDate  =  params.startDate;
        if(params.endDate) filter.endDate =  params.endDate;
        if(params.eventName) filter.event =  params.eventName;
        if(params.date) filter.date =  params.date;
        
        return filter;
    }

}

export default EventUtils;
