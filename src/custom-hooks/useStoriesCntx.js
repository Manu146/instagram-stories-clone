import { useContext } from "react";
import { StoriesContex } from "../contexts/StoriesContext";

export default function useStoriesCntx() {
  const context = useContext(StoriesContex);
  return context;
}
