
import { Link, useNavigate } from 'react-router-dom'
import { faCamera, } from '@fortawesome/free-solid-svg-icons/faCamera'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthConext'
const Topbar = () => {
    const {mutate: SignOut, isSuccess} = useSignOutAccount();
    const navigate = useNavigate();

    const {user} = useUserContext()

    useEffect(()=> {
        if(isSuccess)navigate(0);
    },[isSuccess])
  return (
    <section className='topbar'>
    <div className='flex-between py-4 px-5'>
          <Link to='/' className='flex justify-center items-center'>
          <FontAwesomeIcon icon={faCamera} size='2xl' style={{color: "#f3123f",}} className="w-200" /><h1 className="ml-2 font-semibold text-[36px]"><span className="shad-form_message">i</span>Famous</h1>
          </Link>

          <div className='flex gap-4 justify-center items-center'>
                <Button variant='ghost' className='shad-button_ghost' onClick={()=> SignOut()}>
                <FontAwesomeIcon icon={faRightFromBracket} style={{color: "#d20f49",}} size='2xl' />
                </Button>

                 <Link to={`/profile/${user.id}`} className='flex items-center gap-3'>
                   <img src={user.imageUrl} alt={user.username} className='h-10 w-10 rounded-full' />
                 </Link>

          </div>
    </div>
    </section>
  )
}

export default Topbar
