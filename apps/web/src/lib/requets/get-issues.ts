import { Flatted } from 'core/base/entity';
import { IWork, Work, WorkType, WorkStatus } from 'core/domains/work';
import axios from 'axios';
import { IReflector } from 'core/domains/reflector';
import { IReflectorMeasurements } from 'core/domains/object-values.ts/reflectometer-measurements';

export interface GetIssuesResponse {
  id: string;
  sign_id: string;
  author: string;
  device_coord: [x: string, y: string];
  pictures: string[];
  status: WorkStatus;
  work_type: WorkType;
  created_at: string;
  reflector: Reflector;
}

interface Reflector {
  props: IReflector;
  _id: string;
}


interface Measurement {
  props: IReflectorMeasurements;
}

export const getIssues = async () => {
  const {data} = await axios.get<GetIssuesResponse[]>('http://localhost:3001/issues', {
    headers: {
      'x-api-key': 'dsadsadsa',
    }
  })

  return [...data];
};

export const getIssueById = async (id: string) => {
  const data = await getIssues();
  const postData = data.filter((post) => post.id === id && post)[0]
  return postData;
};
