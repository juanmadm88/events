
abstract class Utils {

    public exists: Function = (anObject: any): boolean => {
        return anObject && Object.keys(anObject).length > 0;
    }
}

export default Utils;
