import Utils from './Utils';
import { CanvasRenderService } from 'chartjs-node-canvas';

class CanvasUtils extends Utils {
    
    private readonly WIDTH:number = 700;
    private readonly HEIGHT:number = 700;

    constructor() {
        super();
    }

    // Publics Functions
    public renderChart:Function = async (configuration:any):Promise<any> => {
        const canvasRenderService = new CanvasRenderService(this.WIDTH, this.HEIGHT);
        return await canvasRenderService.renderToBuffer(configuration);
    }
}

export default CanvasUtils;
