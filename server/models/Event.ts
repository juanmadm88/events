

import DateHelper from '../components/helpers/DateHelper';

class Event {

    private count: Number;
    private date: String;
    private event: String;

    constructor(anEvent?:String,aDate?:String,aCount?:Number) {
        (anEvent) ?    this.event = anEvent : this.event = "unknown";
        (aDate)   ?    this.date = aDate : this.date = DateHelper.getCurrentDate(); 
        (aCount)  ?    this.count = aCount : this.count = 0;
    }

    public getCount: Function = (): Number => {
        return this.count;
    }

    public setCount: Function = (aCount: Number): void => {
        this.count = aCount;
    }

    public getDate: Function = (): String => {
        return this.date;
    }

    public setDate: Function = (aDate: String): void => {
        this.date = aDate;
    }

    public getEvent: Function = (): String => {
        return this.event;
    }

    public setEvent: Function = (anEvent: String): void => {
        this.event = anEvent;
    }
}

export default Event;
