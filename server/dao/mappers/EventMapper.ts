import Mapper from './Mapper';

class EventMapper extends Mapper {

    constructor() {
        super();
        let model: any = {
            event: {
                type: String,
                unique: false,
                required: true
            },
            date: {
                type: String,
                unique: false,
                required: true
            },
            count: {
                type: Number,
                unique: false,
                required: true
            }
        };
        this.createSchema(model, {autoIndex: false, timestamps: false, versionKey: false});
    }

    public getObjectId: Function = (id: any): any => {
        return this.objectId(id);
    }

    public getEntitySchema: Function = (): any => {
        return this.getSchema();
    }

    public getEntityModel: Function = (): Promise<any> => {
        return this.getModel('Event');
    }

}

export default EventMapper;
