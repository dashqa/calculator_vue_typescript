import { State, Mutation, Action } from 'vuex-simple';
import { Result, Buffer, Fetching} from "@/types";

export default class Store {
  @State()
  public buffer: Buffer = '';
  @State()
  public result: Result = '0';
  @State()
  public fetching: Fetching = false;

  @Mutation()
  appendBuffer(value: string): void {
    this.buffer = this.buffer += value;
  }

  @Mutation()
  setResult(): void {
    this.result = eval(this.buffer);
  }

  @Mutation()
  setBuffer(value: string): void {
    this.buffer = value;
  }

  @Mutation()
  setFetching(value: boolean): void {
    this.fetching = value;
  }

  @Mutation()
  clear(): void {
    this.result = '0';
    this.buffer = '';
  }

  @Action()
  public getResultFromServer(value: string) {
    const timeOut = new Promise((r) => {
      setTimeout(() => {
        r(value);
      }, 1000);
    });

    this.setFetching(true);
    timeOut
      .then((response: any) => {
      this.setBuffer(response);
      this.setFetching(false);
    });
  }
}

