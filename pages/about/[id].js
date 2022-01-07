import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Detail() {
  const route = useRouter();
  console.log(route);

  return (
    <div>
      <h1>The detail of about page</h1>
      <p>
        {route.query.id}, Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Excepturi, mollitia!
      </p>
      <Link href="/">go to homepage</Link>
    </div>
  );
}
