import { useUserContext } from '@/context/AuthConext'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import PostStats from './PostStats';

type GridPostListProps= {
  posts: Models.Document[];
  showUser?:boolean;
  showStats?:boolean
}

const GridPostList = ({posts, showUser = true, showStats = true}:GridPostListProps) => {
  const {user} = useUserContext()
  return (
     <ul className='grid-container'>
          {posts.map((post)=> (
            <li key={post.$id} className='relative min-w-80 h-80'>
                  <Link to={`/posts/${post.$id}`} className='grid-post_link'>
                     <img 
                          src={post.imageUrl} 
                          alt="image" 
                          className='h-full w-full object-cover'
                    />
                  </Link>

                  <div className='grid-post_user'>
                       {showUser && (
                          <div className="flex itmes-center justify-start gap-2">
                               <img src={post.creator.imageUrl} alt={post.creator.username} />
                               <p className='line-clamp-1'>{post.creator.name}</p>
                          </div>
                       )}
                       {showStats && <PostStats post={post} userId={user.id}/>}
                  </div>
            </li>
          ))}
     </ul>
  )
}

export default GridPostList
