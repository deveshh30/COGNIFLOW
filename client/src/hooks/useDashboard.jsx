import { useEffect, useState } from "react";
import { fakeApiDelay } from "../utils/fakeApiDealy";

const MOCK_STATS = [
  {
    label: "Total Goals",
    value: 12,
    meta: "2 added this week",
    progress: 75,
    trend: "up",
  },
  {
    label: "Completed",
    value: 7,
    meta: "On track",
    progress: 58,
    trend: "neutral",
  },
];

export default function useDashboardData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fakeApiDelay(MOCK_STATS).then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}
