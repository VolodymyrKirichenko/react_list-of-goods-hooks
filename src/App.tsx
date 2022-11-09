import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { GoodList } from './GoodList';
import { SortType } from './app.typedefs';
import { goodsFromServer } from './goodsFromServer';
import { getReorderedGoods } from './helpers/helpers';

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
      isReversed
    });

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={
              cn('button is-info',
                { 'is-light': sortType !== SortType.ALPHABET })
            }
            onClick={() => setSortType(SortType.ALPHABET)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn('button is-success',
              { 'is-light': sortType !== SortType.LENGTH })}
            onClick={() => setSortType(SortType.LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn('button is-warning',
              { 'is-light': !isReversed })}
            onClick={reverseHandler}
          >
            Reverse
          </button>

          {(sortType || isReversed) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetHandler}
            >
              Reset
            </button>
          )}
        </div>

        <GoodList rowGoods={rowGoods} />
      </div>
    );
}
