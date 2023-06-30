import { ErrorId } from '../..';

interface Error {
  message: string;
  code: number;
  id: ErrorId;
}

export default Error;
