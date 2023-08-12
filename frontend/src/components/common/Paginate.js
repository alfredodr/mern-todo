import React, { useState, useEffect } from "react";
import Link from "next/link";

const Paginate = ({ pages, page, keyword = "", slug = "" }) => {
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(10);
  const itemsPerPage = 10;

  useEffect(() => {
    const currentPageIndex = page - 1;
    const newStartPage =
      Math.floor(currentPageIndex / itemsPerPage) * itemsPerPage + 1;
    const newEndPage = Math.min(newStartPage + itemsPerPage - 1, pages);
    setStartPage(newStartPage);
    setEndPage(newEndPage);
  }, [pages, page]);

  const handlePrevious = () => {
    const newStartPage = startPage - itemsPerPage;
    const newEndPage = startPage - 1;
    if (newStartPage >= 1) {
      setStartPage(newStartPage);
      setEndPage(newEndPage);
    } else {
      setStartPage(1);
      setEndPage(itemsPerPage);
    }
  };

  const handleNext = () => {
    const newEndPage = endPage + itemsPerPage;
    if (newEndPage <= pages) {
      setStartPage(startPage + itemsPerPage);
      setEndPage(newEndPage);
    } else {
      setStartPage(startPage + itemsPerPage);
      setEndPage(pages);
    }
  };

  const showPreviousButton = startPage > 1;
  const showNextButton = endPage < pages;

  return (
    <>
      <nav className="flex flex-wrap items-center  rounded-lg my-10 ml-5">
        {/* Previous button */}
        {showPreviousButton && (
          <button
            onClick={handlePrevious}
            aria-label="previous page"
            className="h-12 border-2 border-lightGray bg-white 
               px-4 rounded-l-lg hover:bg-gray-200 hover:text-white"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        )}
        {/* Pages */}
        {[...Array(pages).keys()]
          .slice(startPage - 1, endPage)
          .map((x, index) => (
            <Link
              key={index}
              href={
                keyword
                  ? `${slug}/search?s=${keyword}&page=${x + 1}`
                  : `${slug}?page=${x + 1}`
              }
              className={`h-12 border-2 border-lightGray w-12 flex items-center justify-center  ${
                x + 1 == page ? "bg-gray-200 text-black" : "bg-white"
              } hover:bg-gray-200 hover:text-black`}
            >
              {x + 1}
            </Link>
          ))}
        {/* Next button */}
        {showNextButton && (
          <button
            onClick={handleNext}
            aria-label="next page"
            className="h-12 border-2 border-lightGray bg-white 
            px-4 hover:bg-gray-200 hover:text-white"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        )}
      </nav>
    </>
  );
};

export default Paginate;
