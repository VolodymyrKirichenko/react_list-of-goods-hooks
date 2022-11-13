import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { GoodList } from '../GoodList/GoodList';
import { SortType } from './app.typedefs';
import { goodsFromServer } from '../api/goodsFromServer';
import { getReorderedGoods } from '../../helpers/helpers';
import { Button } from '../ui/Button/Button';

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const reverseHandler = () => {
    setIsReversed((currentState) => !currentState);
  };

  const resetHandler = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const rowGoods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          className={
            cn('is-info', {
              'is-light': sortType !== SortType.ALPHABET,
            })
          }
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </Button>

        <Button
          className={
            cn('is-success', {
              'is-light': sortType !== SortType.LENGTH,
            })
          }
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </Button>

        <Button
          className={
            cn('is-warning', {
              'is-light': !isReversed,
            })
          }
          onClick={reverseHandler}
        >
          Reverse
        </Button>

        {(sortType || isReversed) && (
          <Button
            className="is-danger is-light"
            onClick={resetHandler}
          >
            Reset
          </Button>
        )}
      </div>

      <GoodList rowGoods={rowGoods} />
    </div>
  );
};
