export class StringUtils {
    
    public static isNullOrEmpty(val: string) : boolean {
        if (val === undefined || val === null || val.trim() === '') {
            return true;
        }
        return false;
    };

    public static somenteNumeros(numero: string) : string {
        return numero.replace(/[^0-9]/g,'');
    }

    public static removerAspasNumero(numero: number):number{
        return parseInt(numero.toString().replace(/['"]+/g, ''));
    }
}