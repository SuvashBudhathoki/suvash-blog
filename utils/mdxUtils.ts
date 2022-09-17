import matter from "gray-matter";
import { join } from "path";
import fs from "fs";
import readingTime from "reading-time";
import { verify } from "crypto";

type Items = {
  [key: string]: string;
};

type Post = {
  frontMatter: {
    [key: string]: string;
  };
  content: string;
};

const POSTS_PATH = join(process.cwd(), "data/articles");

const getPostsFilePaths = (): string[] => {
  return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
};

export const getPost = (slug: string): Post => {
  const fullPath = join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);

  return {
    content,
    frontMatter: {
      title: data.title,
      thumbnail: data.thumbnail,
      date: data.date,
      description: data.description,
      readingTime: readingTime(fileContents).text,
      ...data,
    },
  };
};

// load the post items
export const getPostItems = (
  filePath: string,
  fields: string[] = []
): Items => {
  // create a slug from the mdx file location
  const slug = filePath.replace(/\.mdx?$/, "");
  // get the front matter data and content
  const { frontMatter: data, content } = getPost(slug);

  const items: Items = {};

  // just load and include the content needed
  fields.forEach((field) => {
    // load the slug
    if (field === "slug") {
      items[field] = slug;
    }
    // load the post content
    if (field === "content") {
      items[field] = content;
    }
    // check if the above specified field exists on data
    if (data[field]) {
      // verify the fileds has data
      items[field] = data[field];
    }
  });
  // return the post items
  return items;
};

export const getAllPosts = (fields: string[]): Items[] => {
  // add paths for getting all posts
  const filePaths = getPostsFilePaths();

  // get the posts from the filepaths with the needed fields sorted by date
  const posts = filePaths
    .map((filePath) => getPostItems(filePath, fields))
    .sort((post1, post2) => (post1.date > post2.date ? 1 : -1));
  // return the available post
  return posts;
};
