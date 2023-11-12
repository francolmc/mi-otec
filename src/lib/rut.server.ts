export default class RUTUtils {
// Función para calcular el dígito verificador
public static calcularVerificador = (numero: string): string => {
    // Inicializar la suma y el factor de chequeo
    let suma = 0;
    let factor = 2;
    // Recorrer el número base de derecha a izquierda
    for (let i = numero.length - 1; i >= 0; i--) {
      // Obtener el dígito en la posición i
      const digito = parseInt(numero.charAt(i));
      // Multiplicar el dígito por el factor y sumarlo a la suma
      suma += digito * factor;
      // Incrementar el factor, si llega a 8 volver a 2
      factor++;
      if (factor === 8) {
        factor = 2;
      }
    }
    // Calcular el módulo 11 de la suma
    const modulo = suma % 11;
    // Restar 11 al módulo
    const resta = 11 - modulo;
    // Si la resta es menor que 10, devolverla como cadena
    if (resta < 10) {
      return resta.toString();
    }
    // Si la resta es 11, devolver 0 como cadena
    if (resta === 11) {
      return "0";
    }
    // Si la resta es 10, devolver K como cadena
    if (resta === 10) {
      return "K";
    }
    // En cualquier otro caso, devolver un valor inválido
    return "?";
  }
  
}