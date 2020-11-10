import Utils from './Utils';
import Event from '../../models/Event';
import Constants from '../../components/Constants';

class EventUtils extends Utils {

    constructor() {
        super();
    }

    private readonly fieldsToFilter = ['event','date'];

    public getModel: Function = (event: any): Event => {
        return new Event(event.name,undefined,event.count) ;
    }

    public getOptions: Function = (filter: any): any => {
        let options: any = {};

        if(filter.event)  this.buildCondition(options, filter.event,Constants.EQ_OPERATOR_DB,this.fieldsToFilter[0]);

        if(filter.startDate)  this.buildCondition(options, filter.startDate,Constants.GT_OPERATOR_DB,this.fieldsToFilter[1]);
        
        if(filter.endDate) this.buildCondition(options,filter.endDate,Constants.LT_OPERATOR_DB,this.fieldsToFilter[1]);

        if(filter.date) this.buildCondition(options,filter.date,Constants.REGEX_OPERATOR_DB,this.fieldsToFilter[1]);

        return options;
    }

    private buildCondition: Function = (options:any,  value: any, operator: string, fieldToFilter:any): void => {
        let aCondition:any ={};
        
        if(this.exists(options[fieldToFilter])){
            
            options[fieldToFilter][operator] = this.buildValue(value, operator);    
        }else{
            aCondition[operator]= this.buildValue(value, operator);
            options[fieldToFilter] = aCondition;
        }
    }
    
    private buildValue: Function = (  value: any , operator: string): any => {
        let aValue:any; 
        
        switch(operator) {
            case Constants.LT_OPERATOR_DB:
                aValue = value;
                break;
            case Constants.GT_OPERATOR_DB:
                aValue = value;
                break;
            case Constants.REGEX_OPERATOR_DB:
                aValue = '.*' + value + '.*';
                break;
            case Constants.EQ_OPERATOR_DB:
                aValue = value;
                break;
            default:
                break;
        }
        return aValue; 
    }

}

export default EventUtils;
