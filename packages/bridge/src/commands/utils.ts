import { v4 as uuidv4 } from 'uuid';

export const getTimeStamp = () => new Date().valueOf().toString();

export const getUuid = () => uuidv4();
