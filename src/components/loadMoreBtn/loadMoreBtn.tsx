interface LoadMoreBtnProps {
  HandleLoadMore: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LoadMoreBtn = ({ HandleLoadMore }: LoadMoreBtnProps) => {
  return (
    <div className="conteiner-load-more-btn">
      <button onClick={HandleLoadMore} type="button" className="load-more-btn">
        Load more
      </button>
    </div>
  );
};
