import { Flatted } from '@/core/base/entity';
import { IWork } from '@/core/domains/work';
import axios from 'axios';

export const getIssues = async () => {
  const {data} = await axios.get<Flatted<IWork>[]>('http://localhost:3001/issues', {
    headers: {
      'x-api-key': 'dsadsadsa',
    }
  })

  return [...data];
};

export const getIssueById = async (id: string) => {
  const data = await getIssues();
  const postData = data.filter((post) => post.id === id && post)[0];

  return postData;
};
