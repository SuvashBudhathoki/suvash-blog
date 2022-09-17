import Link from 'next/link'
import Image from 'next/image'

type Props = {
    // Thumbnail title
    title: string
    // Thumbnail image src
    src: string
    // Thumbnail slug link
    slug?:string
    height?: number
    width?: number
}

const Thumbnail: React.FC<Props> = ({ 
    title,
    src,
    slug,
    height = 720,
    width = 1280
}: Props) => {
  // Add the Thumbnail cover image
    const image = (
        <Image
        height={height}
        width={width}
        src={src}
        alt={`Thumbnail cover image ${title}`}
        />
    )

    // return the Thumbnail cover image slug
    return (
        <>
            {slug ? (
                <Link href={`/blogs/${slug}`}>
                <a aria-label={title}>{image}</a>
                </Link>
            ) : (
                image
            )}
        </>
    )
}

// export Thumbnail module
export default Thumbnail