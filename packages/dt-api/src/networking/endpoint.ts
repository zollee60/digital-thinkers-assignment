export const allEndpointMethods = ['GET', 'POST', 'PUT', 'DELETE'] as const;
export type EndpointMethod = typeof allEndpointMethods[number];

export const allHttpStatusCodes = [200, 400, 401, 403, 404, 500] as const;
export type HttpStatusCode = typeof allHttpStatusCodes[number];

export type EndpointError = {
  statusCode: HttpStatusCode;
  body: {
    message: string;
  };
};

export interface Endpoint<T extends EndpointInput, U extends EndpointOutput> {
  method: EndpointMethod;
  path: string;
  handler: (input: T) => Promise<U | EndpointError>;
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
