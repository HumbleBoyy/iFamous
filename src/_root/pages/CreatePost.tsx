import PostForm from '@/components/formpost/PostForm'

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
          <div className='max-w 5xl flex-start gap-3 justify-start w-full'>
              <img 
                src="/assets/icons/edit.png" 
                alt="add-post" 
                height={36}
                width={36}
              />
              <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
          </div>

          <PostForm action="Create"/>
      </div>
    </div>
  )
}

export default CreatePost