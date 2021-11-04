import Head from "next/head";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Movie({ movie }) {
  console.log(movie);
  return (
    <div>
      <Head>
        <title>Movie</title>
      </Head>

      <main>
        <h1>{movie.title}</h1>
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  console.log(slug);
  const movie = await prisma.movie.findFirst({
    where: {
      slug,
    },
  });

  return {
    props: {
      movie,
    },
  };
}
// export async function getServerSideProps(context) {
//   const { slug } = context.query;
//   console.log(slug);
//   const movie = await prisma.movie.findFirst({
//     where: {
//       slug,
//     },
//   });

//   return {
//     props: {
//       movie,
//     },
//   };
// }
