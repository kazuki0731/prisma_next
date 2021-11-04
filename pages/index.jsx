import Head from "next/head";
import styles from "../styles/Home.module.css";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import Link from "next/link";

const prisma = new PrismaClient();

export default function Home({ data }) {
  const [formData, setFormData] = useState({});
  const saveMovie = async (e) => {
    e.preventDefault();
    await fetch("/api/movies", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie List</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <span>
                <strong>{item.title}</strong>
              </span>
              <br />
              <span>{item.year}</span>
              <br />
              <span>{item.description}</span>
              <br />
              <Link href={`/movies/${item.slug}`}>
                <a>More!</a>
              </Link>
            </li>
          ))}
        </ul>

        <form className={styles.movieform} onSubmit={saveMovie}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={(e) =>
              setFormData({ ...formData, year: +e.target.value })
            }
          />
          <textarea
            name="description"
            id=""
            cols="30"
            rows="10"
            placeholder="Description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Slug"
            name="slug"
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
          <button type="submit">Add movie</button>
        </form>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const movies = await prisma.movie.findMany();

  const data = [
    { id: 1, title: "title" },
    { id: 2, title: "another title" },
  ];
  return {
    props: {
      data: movies,
    },
  };
}
