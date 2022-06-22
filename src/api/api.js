import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3030/",
  withCredentials: false,
});

// PEIXES

export function GetAllFishes() {
  return api.get("fishes");
}

export function GetFishByPittag(pittag) {
  return api.get(`fishes/pittag/${pittag}`);
}

export function GetFishById(id) {
  return api.get(`fishes/${id}`);
}

export function GetAllFishByScientificName(scientificName) {
  return api.get(`fishes/scientificNames/${scientificName}`);
}

export function GetAllFishByDnaSample(dnaSample) {
  return api.get(`fishes/dnaSamples/${dnaSample}`);
}

export function GetAllFishByReleaseLocation(releaseLocation) {
  return api.get(`fishes/releaseLocations/${releaseLocation}`);
}

export function GetAllFishByCaptureLocation(captureLocation) {
  return api.get(`fishes/captureLocations/${captureLocation}`);
}

export function GetAllFishByPittag(pittag) {
  return api.get(`fishes/pittags/${pittag}`);
}
