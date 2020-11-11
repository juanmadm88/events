import Router from './routes/Router';

let express = require('express');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');

// Create and Configure Express.js
class App {

    private router: Router;
    public express: any;

    constructor() {
        this.express = express();
        this.router = Router.getInstance();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware: Function = (): void => {
        this.express.use(bodyParser.json({limit: "50mb"}));
        this.express.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
        this.express.use(bodyParser.json({ type: 'application/vnd.api+json' }));
        this.express.use(methodOverride('X-HTTP-Method-Override'));
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Initialize router.
    private routes: Function = (): void => {
        this.router.init(express);
        this.express.use('/api', this.router.getRoutes());
    }
}

export default new App().express;
