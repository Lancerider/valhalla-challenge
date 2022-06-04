export const getDuration = (productions) => {
  const totalDuration = productions.reduce((minutes, production) => {
      const { runtimeMins, type } = production;

      if (!runtimeMins) return minutes;

      if (type === 'TVEpisode') {
        const extractedMinutes = runtimeMins.match(/\d/g).join('');

        return minutes + parseInt(extractedMinutes);
      }

      return minutes + parseInt(runtimeMins);
    }, 0);

  const hours = totalDuration ? `${Math.floor(totalDuration/60)} h` : '';
  const minutes = totalDuration%60 ? `${Math.floor(totalDuration%60)} min` : '';

  return `${hours} ${minutes}`;
}
