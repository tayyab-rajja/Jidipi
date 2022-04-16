import { FC } from "react";
import { useCompanyPosts } from "src/api/useCompanyPosts";
import Masonry from "react-masonry-css";
import Card from "src/components/Card";

interface CardsTabProps {
  pageFolderId: string;
  folder: string;
}

export const CardsTab: FC<CardsTabProps> = ({ pageFolderId, folder }) => {
  const { data, isValidating } = useCompanyPosts(pageFolderId);

  if (isValidating) {
    return <h1>Loading...</h1>;
  }

  return (
    <Masonry
      breakpointCols={{
        default: 5,
        1980: 4,
        1268: 3,
        960: 2,
        500: 1,
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {data.map(({ title, categories, image, id, slug }) => (
        <div key={id}>
          <Card
            id={id}
            folder={folder}
            slug={slug}
            title={title}
            categories={categories}
            image={image}
          />
        </div>
      ))}
    </Masonry>
  );
};
