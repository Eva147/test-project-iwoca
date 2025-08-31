import { useState, useEffect } from 'react';
import { AppType } from '../types/application.type.ts';
import {getApp} from '../api/api.ts';

type fetchDataProps = {
  page: number;
  limit: number;
}

export const useFetchData = (props: fetchDataProps) => {
  const {page, limit} = props;

  const [data, setData] = useState<AppType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getApp(page, limit);
        setData(res);
      } catch (error) {
        setError('Failed to fetch data');
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [page, limit]);

  return {
    data,
    loading,
    error,
  };
};
