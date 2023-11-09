//snapOffets generation
export const generateOffsets = (ContentSize: number, Constant: number) => {
  return new Array(ContentSize + 1)
    .fill('a')
    .map((_, index) => Constant * index);
};
