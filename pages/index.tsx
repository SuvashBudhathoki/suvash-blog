import type { NextPage, GetStaticProps } from 'next'
import { IPost } from "../types/post" 
import Link from 'next/link'
import { getAllPosts } from "../utils/mdxUtils"
import dayjs from 'dayjs'

type Props = {
    posts: [IPost]
  }

  const Home: NextPage<Props> = ({ posts }: Props) => {
    return (
      <div>  
        <div className="space-y-12">
          {posts.map((post) => (
            <div key={post.slug}>
              <h2 className="text-2xl font-bold mb-4 text-blue-300">
                <Link href={`/posts/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              </h2>
              <p>{post.description}</p>
              <p className='text-xs text-gray-500 mt-1'>
                <span>{dayjs(post.date).format('YYYY MMM DD')} . </span>
                <span>{post.readingTime}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default Home
  
  // get posts from serverside at build time
  export const getStaticProps: GetStaticProps = async () => {
    const posts = getAllPosts([
      'title',
      'slug',
      'date',
      'description',
      'thumbnail',
      'readingTime'
    ]);
  
    // return the posts props
    return { props: { posts } }
  }