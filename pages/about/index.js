import { useRouter } from 'next/router';
import Link from 'next/link';

export default function About() {
  const route = useRouter();
  console.log(route);

  return (
    <div>
      <h1>About Page</h1>
      <p>
        This is an about page, Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Excepturi, mollitia!
      </p>
      <Link href="/">go to homepage</Link>
      <br />
      <Link href="/about/123">go to detail page</Link>
    </div>
  );
}
