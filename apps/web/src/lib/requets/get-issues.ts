import { Flatted } from '@/core/base/entity';
import { IWork } from '@/core/domains/work';

export const getIssues = async () => {
  const response = await fetch('http://localhost:3001/issues', {
    next: {
      revalidate: 30,
    },
    headers: {
      'x-api-key': 'dsadsadsa',
    },
  });

  const data: Array<Flatted<IWork>> = await response.json();

  console.log(data);

  if (data.length < 1) throw 'there are no issue';

  return data;
};

export const getIssueById = async (id: string) => {
  const data = await getIssues();

  // if (!data) throw 'there are no issue';

  const postData = data.filter((post) => post.id === id && post)[0];

  return postData;
};
