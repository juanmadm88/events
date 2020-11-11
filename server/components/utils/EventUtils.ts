import Utils from './Utils';

class EventUtils extends Utils {

    private readonly ONE_HUNDRED: number = 100;

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

    public buildCoordinates: Function = (response:any): any =>{
        let coordinates:any = {hours:[],frecuencies:[]};
        let totalCount:number;
        
        if(this.exists(response)){
            (response.totalCount) ? totalCount = response.totalCount : totalCount =1;
            for(const result of response.results){
                coordinates.hours.push(parseInt(result.hour));
                coordinates.frecuencies.push(this.calculateFrecuency(result.count,totalCount))
            }
        }
        return coordinates;
    }

    public buildConfiguration: Function = (coordinates:any): any =>{
        return  {
            type: 'bar',
            data: {
                labels: coordinates.hours,
                datasets: [{
                        label: 'frecuencies',
                        data: coordinates.frecuencies,
                        borderWidth: 1
            }]},
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                        precision:0,
                        beginAtZero: true
                        }
                    }]
                }
            }
        }
    }
    
    private calculateFrecuency: Function = (count:number, totalCount:number): number =>{
        return(Math.round((count/totalCount) * this.ONE_HUNDRED));
    }
}

export default EventUtils;
