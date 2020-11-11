import Utils from './Utils';
import { CanvasRenderService } from 'chartjs-node-canvas';

class CanvasUtils extends Utils {

    constructor() {
        super();
    }

    // Publics Functions
    public renderChart:Function = async (configuration:any):Promise<any> => {
        const canvasRenderService = new CanvasRenderService(400, 400)
        return await canvasRenderService.renderToBuffer(configuration);
    }
}

export default CanvasUtils;
