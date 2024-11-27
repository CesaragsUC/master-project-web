export class CurrencyUtils {

    public static StringToDecimal(input:any): any {
        if (input === null) return 0;

        input = input.replace(/\./g, '');
        input = input.replace(/,/g, '.');
        return parseFloat(input);
    }

    public static DecimalToString(input:any): any {
        var ret = (input) ? input.toString().replace(".", ",") : null;
        if (ret) {
            var decArr = ret.split(",");
            if (decArr.length > 1) {
                var dec = decArr[1].length;
                if (dec === 1) { ret += "0"; }
            }
        }
        return ret;
    }

    public static StringToInteger(input:any): any {
        if (input === null || input === undefined) {
            return 0;
        }
    
        if (typeof input !== 'string') {
            input = input.toString();
        }
    
        return parseInt(input.replace(/\./g, ''), 10);
    }

    public static IntegerToString(input:any): any {
        return input.toString().replace(".", ",");
    }

    public static IntegerToDecimal(input:any): any {
        if (input === null || input === undefined) {
            return 0; 
        }

        if (typeof input !== 'string') {
            input = input.toString(); 
        }

        return parseFloat(input.replace(/\./g, '').replace(',', '.'));
    }
}