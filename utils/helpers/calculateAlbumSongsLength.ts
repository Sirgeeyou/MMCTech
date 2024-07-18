import { formatLength } from "./formatLength";

export const calculateLengthForAlbum = (album: any) => {
  const formattedSongs = album.songs.map((song: any) => {
    const { minutes, seconds, ...rest } = song;
    return {
      ...rest,
      length: formatLength(minutes.toString(), seconds.toString()),
    };
  });

  const updatedAlbum = {
    ...album,
    songs: formattedSongs,
  };

  return updatedAlbum;
};
