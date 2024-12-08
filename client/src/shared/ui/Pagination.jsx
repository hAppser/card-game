/* eslint-disable react/prop-types */
import { Button } from "./Button";
export const Pagination = ({ page, setPage, maxPage }) => {
  return (
    <div className="pagination flex justify-center items-center mt-6 space-x-4">
      <Button
        disabled={page === 1}
        label="Prev"
        onClick={() => setPage((p) => p - 1)}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400"
      />
      <span className="text-lg font-medium">{page}</span>
      <Button
        disabled={page === maxPage}
        label="Next"
        onClick={() => setPage((p) => p + 1)}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400"
      />
    </div>
  );
};
