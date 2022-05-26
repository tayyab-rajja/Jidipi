export const insertInsideArray = (arr: any[], index: number, newItem: any) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index),
];
