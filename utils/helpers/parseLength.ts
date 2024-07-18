export const parseLength = (length: string) => {
  const [minutes, seconds] = length.split(":").map(Number);

  return { minutes, seconds };
};

export const transformSongLength = (song: any) => {
  const { length, ...rest } = song;
  const { minutes, seconds } = parseLength(length);
  return {
    ...rest,
    minutes,
    seconds,
  };
};
