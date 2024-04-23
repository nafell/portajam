import { getDetail } from '@/libs/microcms';
import Article from '@/components/Article';

export const dynamic = 'force-dynamic';

export const metadata = {
  robots: 'noindex',
};

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk: string;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const data = await getDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  return <Article data={data} />;
}
