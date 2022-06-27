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

export function GetAllFishesBy(filteredBy, field) {
  return api.get(`fishes/${filteredBy}/${field}`);
}

export function NewFish(fish) {
  return api.post("fishes", fish);
}

export function deleteFish(id){
  return api.delete(`fishes/${id}`)
}

export function updateFish(id, fish){
  return api.put(`fishes/${id}`, fish);
}

//ANTENA
export function GetAntennaByid(id) {
  return api.get(`antennas/id/${id}`);
}

export function NewAntenna(antenna) {
  return api.post("antennas", antenna);
}

export function GetAllAntennas() {
  return api.get("antennas");
}

//PASSAGENS

export function GetAllPasses() {
  return api.get("passes");
}

export function GetPassesByid(id) {
  return api.get(`passes/id/${id}`);
}

export function NewPass(pass) {
  return api.post("passes", pass);
}

//STATUS ANTENNA

export function GetAllStatus() {
  return api.get("status");
}

export function GetStatusByid(id) {
  return api.get(`status/id/${id}`);
}

export function NewStatus(status) {
  return api.post("status", status);
}