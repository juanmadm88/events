import LoggerHelper from './helpers/LoggerHelper';

class Logger {

    private logger: any;

    public constructor(aClass: any) {
        this.logger = LoggerHelper.getInstance().getLogger(aClass);
    }

    public silly: Function = (aMessage: any): void => {
        this.logger.silly(aMessage);
    }

    public debug: Function = (aMessage: any): void => {
        this.logger.debug(aMessage);
    }

    public verbose: Function = (aMessage: any): void => {
        this.logger.verbose(aMessage);
    }

    public info: Function = (aMessage: any): void => {
        this.logger.info(aMessage);
    }

    public warn: Function = (aMessage: any): void => {
        this.logger.warn(aMessage);
    }

    public error: Function = (aMessage: any): void => {
        this.logger.error(aMessage);
    }

}

export default Logger;
