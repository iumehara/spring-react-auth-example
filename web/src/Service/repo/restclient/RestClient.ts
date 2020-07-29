export default interface RestClient {
  fetchJson(path: string, options: any): Promise<any>
}