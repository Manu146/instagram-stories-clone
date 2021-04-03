import { useContext } from "react";
import { StoriesContext } from "../contexts/StoriesContext";

export default function useStoriesCntx() {
  return useContext(StoriesContext);
}
