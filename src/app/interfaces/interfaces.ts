
export interface IAuthenticate {
  username?: string;
  password?: string;
  loginWith?: string;
  avatar?: string;
}

export interface IAuthenticateExternal extends IAuthenticate {
  authProviderToken?: string;
}


export interface ResponseUsers {
  status: number;
  message: string;
  data: Usuario[];
  errors: any;
  links: Link[];
}

export interface ResponseUser {
  status: number;
  message: string;
  data: Usuario;
  errors: any;
  links: Link[];
}



interface Link {
  rel: string;
  href: string;
}

export interface Usuario {
  id?: number;
  username?: string;
  password?: string;
}
