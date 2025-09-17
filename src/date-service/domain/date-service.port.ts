export abstract class DateServicePort {
  abstract getCurrentDate(format?: string): string; // DD-MM-YYYY
  abstract getCurrentTime(format?: string): string; // HH-mm-ss
  abstract getCurrentDateTime(format?: string): string; // DD-MM-YYYY HH-mm-ss (opcional)
}
