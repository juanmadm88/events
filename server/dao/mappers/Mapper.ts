import ConnectionManager from '../../config/ConnectionManager';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

abstract class Mapper {

    protected connectionManager: ConnectionManager;
    private schema: any;

    constructor() {
        this.connectionManager = ConnectionManager.getInstance();
    }

    protected getSchema: Function = (): any => {
        return this.schema;
    }

    protected createSchema: Function = (model: any, options: any): any => {
        this.schema = new Schema(model, options);
        this.schema.index({ _id: 1 }, { sparse: true });
        return this.schema;
    }

    protected getMixedType: Function = (): any => {
        return Schema.Types.Mixed;
    }

    protected objectId: Function = (id: any): any => {
        return new mongoose.Types.ObjectId(id);
    }

    protected getModel: Function = async (entity: string): Promise<any> => {
        let connection = await this.connectionManager.getConnection();
        return connection.model(entity, this.getSchema());
    }

}

export default Mapper;
