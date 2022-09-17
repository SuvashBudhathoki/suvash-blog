import { serialize } from 'next-mdx-remote/serialize'
import { GetStaticProps, GetStaticPaths } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Thumbnail from '../../components/Thumbnail'
import { IPost } from '../../types/post'
import { getPost, getAllPosts } from '../../utils/mdxUtils'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSanitize from 'rehype-sanitize'
import toc from '@jsdevtools/rehype-toc'


// props type
type Props = {
    source: MDXRemoteSerializeResult,
    frontMatter: Omit<IPost, 'slug'>
}

const PostPage: React.FC<Props> = ({ source, frontMatter }: Props) => {
    return (
        <div>
            <article className="prose ">
                <div className="mb-4">
                    <Thumbnail title={frontMatter.title} src={frontMatter.thumbnail} />
                </div>

                <h2>Table of Contents</h2>

                <MDXRemote {...source} />
            </article>
        </div>
    )
}

export default PostPage

interface IParams extends ParsedUrlQuery {
    slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as IParams
    // get the slug
    const { content, frontMatter } = getPost(slug)
    // serialize the data on the server side
    const mdxSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [
                rehypeSanitize,
                rehypeSlug,
                [ 
                    toc, {
                        headings: ['h2','h3'],
                        cssClasses: {
                            list: 'list-none',
                        }
                    }
                ],
                [
                    rehypeAutolinkHeadings, {
                        behavior: 'wrap',
                        properties: {
                            className: ['anchor', 'no-underline'],
                        }
                    }
                ]
            ]
        },
        scope: frontMatter
    })
    return {
        props: {
            source: mdxSource,
            frontMatter
        }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    //only get the slug from posts 
    const posts = getAllPosts(['slug'])

    // map through to return post paths
    const paths = posts.map((post) => ({
        params: {
            slug: post.slug
        }
    }))

    return {
        paths,
        fallback: false
    }
}