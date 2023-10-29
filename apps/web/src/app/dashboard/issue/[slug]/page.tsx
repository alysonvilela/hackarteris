import axios from 'axios';

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <div>My Post: {params.slug}</div>
    </>
  );
}
