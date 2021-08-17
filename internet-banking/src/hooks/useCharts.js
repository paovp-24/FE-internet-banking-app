import { useColors } from "./useColors"; 

export const useCharts = (initalData, initialLabels) => {
  const { getColors } = useColors();
  const statData = initalData;
  const filteredLabels = initialLabels;
  const counter = statData.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1,
    }),
    {}
  );

  const colors = getColors(filteredLabels);

  const getChartData = () => {
    return {
      datasets: [
        {
          data: countsValues(),
          backgroundColor: colors,
          borderColor: colors,
        },
      ],

      labels: filteredLabels,
    };
  };

  const countsValues = () => {
    const values = [];
    // eslint-disable-next-line
    for (const property in counter) {
      values.push(counter[property]);
    }
    return values;
  };

  return { getChartData };
};
