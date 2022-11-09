export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      DB_URL: string;
      FB_APP_ID: string;
      FB_APP_SECRET: string;
      TEST_PW: string;
    }
  }
  namespace Express {
    interface Request {
      user?: any;
      foundUser?: any;
    }
    interface User {
      role?: any;
      name?: any;
      email: any;
    }
  }
}
