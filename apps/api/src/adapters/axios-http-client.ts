import axios, { AxiosStatic } from "axios";
import { HttpClient } from "./http-client";
export class AxiosHttpClient {
  public request: AxiosStatic = axios;
  private static instance: AxiosHttpClient;

  private constructor() {}
  
  static getInstance(): HttpClient {
    if (!AxiosHttpClient.instance) {
      AxiosHttpClient.instance = new AxiosHttpClient();
    }

    return AxiosHttpClient.instance;
  }
}

export const axiosHttpClient = AxiosHttpClient.getInstance()