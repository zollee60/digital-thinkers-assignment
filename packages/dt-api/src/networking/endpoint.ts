export const allEndpointMethods = ['GET', 'POST', 'PUT', 'DELETE'] as const;
export type EndpointMethod = typeof allEndpointMethods[number];

export interface Endpoint<T extends EndpointInput, U extends EndpointOutput> {
  method: EndpointMethod;
  path: string;
  handler: (input: T) => Promise<U>;
}

export interface EndpointInput {
  body?: any;
  query?: any;
  params?: any;
}

export interface EndpointOutput {
  statusCode: number;
  body: any;
}
