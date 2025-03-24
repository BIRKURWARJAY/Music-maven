import { useState } from "react";
import HomeSongsList from "./HomeSongsLists";


export default function TrendingSongsList() {

  return <HomeSongsList displayName={"Trending Songs"} songQuery={"Arijit Singh"} arrName={"trendingSongs"} />
  
}
