export class StringUtils {
    
    public static isNullOrEmpty(val: string) : boolean {
        if (val === undefined || val === null || val.trim() === '') {
            return true;
        }
        return false;
    };

    public static OnlyNumbers(numero: string) : string {
        return numero.replace(/[^0-9]/g,'');
    }


    public static StringToBoolean(input: string): boolean {

        if (input === 'true') {
            return true;
        } else {
            return false;
        }
    }
}
