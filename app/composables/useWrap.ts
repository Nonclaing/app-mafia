/**
 * Преобразование числа внутри ограничения
 * @param number {number} - число
 * @param min {number} - минимальный порог
 * @param max {number} - максимальный порог
 */
export default function useWrap(number: number, min: number, max: number): number {
  return (Math.max(number % max, min)) % max;
}
