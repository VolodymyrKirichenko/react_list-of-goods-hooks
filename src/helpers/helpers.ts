import { ReorderOptions, SortType } from '../components/App/app.typedefs';

export const getReorderedGoods = (
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) => {
  const visibleGoods = [...goods];

  visibleGoods.sort((a1, a2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return a1.localeCompare(a2);
      case SortType.LENGTH:
        return a1.length - a2.length;
      default:
        return 0;
    }
  });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
};
