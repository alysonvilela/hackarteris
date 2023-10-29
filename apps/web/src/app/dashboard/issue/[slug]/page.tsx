import { Flatted } from '@/core/base/entity';
import { IWork } from '@/core/domains/work';
import { getIssueById } from '@/lib/requets/get-issues';
import { DashboardIssue } from '@/screens/Dashboard/DashboardIssue';

export default async function Page({ params }: { params: { slug: string } }) {
  const postData = await getIssueById(params.slug);

  console.log(postData);

  return (
    <>
      <DashboardIssue issue={postData} />
    </>
  );
}
