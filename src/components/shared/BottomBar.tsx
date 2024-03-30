import { bottombarLinks } from '@/constants'
import { link } from 'fs'
import { Link, useLocation } from 'react-router-dom'

const BottomBar = () => {
  const {pathname} = useLocation()
  return (
    <section className='bottom-bar'>
            {bottombarLinks.map((link)=> {
              const isActive = pathname === link.route
               return(
                  <Link to={link.route}
                  key={link.label}
                  className={`${isActive && 'bg-primary-500'} 
                  rounded-[10px] flex flex-col gap-1 flex-center p-3 transition`}
                  >
                      <img
                        src={link.imgURL}
                        alt={link.label}
                        className='text-light-3'
                      />
                      <p className='tiny-medium text-light-2'>{link.label}</p>        
                  </Link>
               )
            })}
    </section>
  )
}

export default BottomBar
