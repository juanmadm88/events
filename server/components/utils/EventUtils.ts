import Utils from './Utils';

class EventUtils extends Utils {

    private readonly ONE_HUNDRED: number = 100;
    public readonly hours:string[]=['1','2','3','4','5','6','7','8','9','10','11','12',
                                       '13','14','15','16','17','18','19','20','21','22',
                                       '23','24'];

    constructor() {
        super();
    }

    // Publics Functions
    public getFilter: Function = (params: any): any => {
        let filter: any = {};

        if(params.start_date) filter.startDate  =  params.start_date;
        if(params.end_date) filter.endDate =  params.end_date;
        if(params.eventName) filter.event =  params.eventName;
        if(params.date) filter.date =  params.date;
        
        return filter;
    }

    public buildFrecuencies: Function = (response:any): any =>{
        let frecuencies:number[] = [];
        
        if(this.exists(response)){
            for(const hour of this.hours){
                let wasFound = false;
                let index =0;
                while ( index < response.results.length  && !wasFound) {
                    if(hour === response.results[index].hour){
                        wasFound = true;
                    }else {
                        index ++;
                    }
                }
                if(wasFound){
                    frecuencies.push(this.calculateFrecuency(response.results[index].count,response.totalCount))
                }else{
                    frecuencies.push(0);
                }
            }
        }
        return frecuencies;
    }

    public buildConfiguration: Function = (frecuencies:number[]): any =>{
        return  {
            type: 'bar',
            data: {
                labels: this.hours,
                datasets: [{
                        label: 'frecuencies',
                        data: frecuencies,
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
