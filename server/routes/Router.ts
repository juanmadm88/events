import EventController from '../controllers/EventController';

class Router {

    private static instance: Router;
    private routes: any;
    private eventController: EventController;

    private constructor() {
        this.eventController = new EventController();
    }

    public static getInstance: Function = (): Router => {
        if (!Router.instance) {
            Router.instance = new Router();
        }
        return Router.instance;
    }

    public init: Function = (express: any): void => {
        this.routes = express.Router();

        this.routes.route('/events/:eventName/:num')
            .post(this.eventController.create);
        
        this.routes.route('/events')
            .get(this.eventController.get);
            
        this.routes.route('/events/unique')
            .get(this.eventController.getHistory);

        this.routes.route('/events/:eventName')
            .get(this.eventController.countByEventName);
        
        this.routes.route('/events/histogram/:eventName/:date')
            .get(this.eventController.buildHistogram);
    }

    public getRoutes: Function = (): any => {
        return this.routes;
    }

}

export default Router;
