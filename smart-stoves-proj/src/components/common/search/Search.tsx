import { useEffect, useRef, useState } from "react";
import { useGetCommunitiesQuery } from "../../../store/communities/api";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { CommunityData } from "../../../interfaces";
import SimpleBar from "simplebar-react";
import SearchSection from "./search-section/SearchSection";

type Properties = {
  handleResult: (data: CommunityData[]) => void;
};

const Search: React.FC<Properties> = ({ handleResult }) => {
  const { data } = useGetCommunitiesQuery();

  const [search, showSearch] = useState(false);
  const [showResultList, setShowResultList] = useState(false);
  const [darkColor, setDarkColor] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState(data);
  const [showData, setShowData] = useState<CommunityData[]>([]);

  useEffect(() => {
    if (data) {
      setSearchResult(data);
      setShowData(data);
    }
  }, [data]);

  useEffect(() => {
    if (inputValue === "" && data) {
      setShowData(data);
    }
  }, [inputValue, data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;
    setDarkColor(false);
    setShowResultList(true);
    setInputValue(newInputValue);
    setSearchResult(
      data?.filter((item) =>
        item.name.toLocaleLowerCase().includes(newInputValue.toLocaleLowerCase())
      )
    );
  };

  const handleItemClick = (item: CommunityData) => {
    setDarkColor(true);
    setShowData([item]);
    setInputValue(item.name);
    setShowResultList(false);
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchResult) {
        setDarkColor(true);
        setShowData(searchResult);
      }
      if (inputRef.current) {
        inputRef.current.blur();
      }
      setShowResultList(false);
    }
  };

  useEffect(() => {
    handleResult(showData);
  }, [showData, handleResult]);

  useEffect(() => {
    if (search && inputRef.current) {
      inputRef.current.focus();
    }
  }, [search]);

  const handleClick = () => {
    showSearch(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      showSearch(false);
      setShowResultList(false);
      setDarkColor(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        className={clsx(styles.searchButton, {
          [styles.searchActive]: search,
          [styles.dark]: darkColor,
        })}
        onClick={handleClick}>
        <span className={styles.searchIcon}></span>
        <div
          className={clsx(styles.hiddenSearch, {
            [styles.show]: search,
          })}>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleEnterKey}
            placeholder=" Search"
          />
          <span
            className={clsx(styles.closeIcon, {
              [styles.closeIconShow]: inputValue,
            })}
            onClick={(event) => {
              event.stopPropagation();
              setInputValue("");
              setDarkColor(false);
            }}></span>
        </div>
      </button>
      <div
        className={clsx(styles.searchResult, {
          [styles.showSearchResult]: showResultList,
        })}>
        <SimpleBar className={styles.scrollBar} autoHide={false} style={{ maxHeight: 300 }}>
          {searchResult?.length === 0 ? (
            <div>
              <span className={styles.noResultsIcon}></span>
              <p className={styles.textNoResults}>No Results Found</p>
            </div>
          ) : (
            <>
              <SearchSection
                title="Communities"
                value="name"
                searchResult={searchResult || []}
                handleItemClick={handleItemClick}
              />

              <SearchSection
                title="Supervisor"
                value="supervisor"
                searchResult={searchResult || []}
                handleItemClick={handleItemClick}
              />

              <SearchSection
                title="State"
                value="state"
                searchResult={searchResult || []}
                handleItemClick={handleItemClick}
              />
            </>
          )}
        </SimpleBar>
      </div>
    </div>
  );
};

export default Search;
