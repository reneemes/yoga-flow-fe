interface User {
  email: string;
  password: string
}

interface SessionResponse {
  token: string;
  user: {
    data: {
      id: number;
      type: string;
      attributes: {
        name: string;
        email: string
      }
    }
  }
}