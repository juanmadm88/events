const WINSTON = require('winston');
const FORMAT = WINSTON.format;

class LoggerHelper {

    private static instance: LoggerHelper;

    private constructor() {
    }

    public static getInstance: Function = (): LoggerHelper => {
        if (!LoggerHelper.instance) {
            LoggerHelper.instance = new LoggerHelper();
        }
        return LoggerHelper.instance;
    }

    public getLogger: Function = (aClass: any): any => {
        let customLabel = this.getLabel(aClass);
        let customFormat = this.getFormat();
        let customTime = this.getTime();

        let options: any = {
            format: FORMAT.combine(customLabel, customTime, customFormat),
            transports: [
                new WINSTON.transports.Console()
            ],
        }
        return WINSTON.createLogger(options);
    }

    private getLabel: Function = (aLabel: any): any => {
        return FORMAT.label({label: aLabel});
    }

    private getFormat: Function = (): any => {
        return FORMAT.printf((info: any, opts: any) => {
            return `${info.timestamp} [${info.level}] - ${info.label}: ${info.message}`;
        });
    }

    private getTime: Function = (): any => {
        let aFormatDate: any = new Date().toLocaleString('es-AR', {timeZone: 'America/Argentina/Buenos_Aires'});
        return FORMAT.timestamp({format: aFormatDate});
    }
}

export default LoggerHelper;
