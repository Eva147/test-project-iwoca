import { useState } from "react";
import {useFetchData} from './hooks/fetchData.ts';
import Application from "./Application";
import { Button } from "./ui/Button/Button";

import styles from "./Applications.module.css";

const Applications = () => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);

  const { data, loading, error } = useFetchData({ page, limit });

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  return (
    <div className={styles.Applications}>
      {error && <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <>
          {data.map((application, index) => (
            <Application
              key={index}
              application={application}
            />
          ))}
          <div className={styles.navigation}>
            {page >=2 && (
              <Button className="btn button1"  onClick={handlePrevious}>
                Previous
              </Button>
            )}
            <div>{page}</div>
            <Button className="btn button2" onClick={handleLoadMore}>
              Load more
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Applications;
