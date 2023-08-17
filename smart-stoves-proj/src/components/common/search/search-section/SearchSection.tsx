import React from "react";
import styles from "./styles.module.scss";
import { CommunityData, ItemData } from "../../../../interfaces";

type SearchResultSectionProps = {
  title: string;
  value: keyof ItemData;
  searchResult: CommunityData[];
  handleItemClick: (item: CommunityData) => void;
};

const SearchSection: React.FC<SearchResultSectionProps> = ({
  title,
  value,
  searchResult,
  handleItemClick,
}) => {
  return (
    <div>
      <p className={styles.heading}>
        {title} <span className={styles.red}>({searchResult?.length})</span>
      </p>
      {searchResult?.map((item) => (
        <p
          key={item.id}
          className={styles.text}
          onClick={() => {
            handleItemClick(item);
          }}>
          <span className={styles.icon}></span>
          {item[value]}
        </p>
      ))}
    </div>
  );
};

export default SearchSection;
