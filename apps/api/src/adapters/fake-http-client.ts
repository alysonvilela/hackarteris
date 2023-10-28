import axios, { AxiosStatic } from "axios";
import { HttpClient } from "./http-client";

export class FakeHttpClient implements HttpClient {
  public request: AxiosStatic = axios;
  private static instance: FakeHttpClient;

  private constructor() {}

  static getInstance(): HttpClient {
    if (!FakeHttpClient.instance) {
      FakeHttpClient.instance = new FakeHttpClient();
    }

    return FakeHttpClient.instance;
  }
}

export const fakeHttpClient = FakeHttpClient.getInstance()