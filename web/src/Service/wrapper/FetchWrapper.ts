export default interface fetchWrapper {
  callFetch(url: string, option: any): Promise<Response>
}