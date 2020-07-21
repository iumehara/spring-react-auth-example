export default interface FetchWrapper {
  fetchJson(path: string, options: {}): Promise<any>
}