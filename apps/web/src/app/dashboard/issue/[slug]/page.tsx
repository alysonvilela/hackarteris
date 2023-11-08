import { getIssueById } from '@/lib/requets/get-issues';
import { DashboardIssue } from '@/screens/Dashboard/DashboardIssue';
import { Work } from 'core/domains/work';

export default async function Page({ params }: { params: { slug: string } }) {
  const issue = await getIssueById(params.slug);
  
  return (
    <>
      <DashboardIssue issue={issue} />
    </>
  );
}
