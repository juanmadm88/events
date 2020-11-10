
abstract class Utils {

    // Publics Functions
    public exists: Function = (anObject: any): boolean => {
        return anObject && Object.keys(anObject).length > 0;
    }

    public isEmpty: Function = (anArray: any[]): boolean => {
        return !anArray || anArray.length === 0;
    }
}

export default Utils;
