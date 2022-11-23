import React from "react";
import classNames from "classnames";

import { usePagination } from "hooks";
import { ICharacter, ICard } from "types/interfaces";
import { Button } from "components";

import "./styles.scss";
import { PaginationOptions } from "types/enumerators";

interface PaginationProps {
  RenderComponent: React.FC<ICard>;
  getPaginatedData: ICard[];
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  getPaginatedData,
  totalCount,
  onPageChange,
  currentPage,
  RenderComponent,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
  });

  if (
    paginationRange === undefined ||
    currentPage === 0 ||
    paginationRange.length < 1
  ) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="pagination">
      <div className="pagination__component">
        {getPaginatedData.map((data) => (
          <RenderComponent
            key={data.id}
            name={data.name}
            episode={data.episode}
            status={data.status}
            location={data.location}
            species={data.species}
            id={data.id}
            image={data.image}
          />
        ))}
      </div>
      <div className="pagination__group">
        <Button
          text="«"
          onClick={onPrevious}
          style="pagination-btn"
          disabled={currentPage === 1}
        />
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === PaginationOptions.dots) {
            return (
              <li key={index} className="pagination__dots">
                &#8230;
              </li>
            );
          }
          return (
            <button
              key={index}
              onClick={() => onPageChange(pageNumber)}
              className={classNames("pagination__btn", {
                "pagination__btn--active": currentPage === pageNumber,
              })}
            >
              <span>{pageNumber}</span>
            </button>
          );
        })}
        <Button
          text="»"
          onClick={onNext}
          style="pagination-btn"
          disabled={currentPage === lastPage}
        />
      </div>
    </div>
  );
};
