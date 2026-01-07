export {}

// import { ICell } from './types';
//
// export const formatCellValue = (cell: ICell): string => {
//     const { value, format } = cell;
//     if (value === null || value === undefined) return "";
//     if (!format) return String(value);
//
//     switch (format.type) {
//         case 'currency':
//             return new Intl.NumberFormat('fr-FR', {
//                 style: 'currency',
//                 currency: 'EUR'
//             }).format(Number(value));
//         case 'number':
//             return new Intl.NumberFormat('fr-FR', {
//                 minimumFractionDigits: format.precision ?? 0,
//                 maximumFractionDigits: format.precision ?? 0
//             }).format(Number(value));
//         default:
//             return String(value);
//     }
// };
//
// export const getSortableValue = (val: any): string | number => {
//     if (typeof val === 'string') return val.toLowerCase();
//     if (val === null || val === undefined) return '';
//     return val;
// };