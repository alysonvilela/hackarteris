import { getIssues } from '@/lib/requets/get-issues';
import { DashboardHome } from '@/screens/Dashboard/DashboardHome';
import axios from 'axios';
import { Suspense } from 'react';

export default async function Dashboard() {
  const data = await getIssues();

  console.log(data);

  return <>{!data ? <div>sem issues</div> : <DashboardHome issues={data} />}</>;
}
