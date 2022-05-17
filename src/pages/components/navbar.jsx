import React from 'react'
import { Link } from 'react-router-dom'

const NavbarItem = ({ title, props, link }) => {
  return (
    <li className='mr-4 cursor-pointer my-2 text-lg'>
      <Link to={link}>{title}</Link>
    </li>
  )
}

const Navbar = () => {
  return (
    <nav className='w-full flex justify-between items-center p-2 '>
      <div className='flex-initial justify-center items-center text-lg font-bold'>Electron Ecosystem</div>
      <ul className='list-none flex flex-row justify-between items-center flex-initial'>
          {['Register','Login'].map((item,index)=>(
              <NavbarItem key={index} title={item} link={`/${item.toLowerCase()}`} />
          ))}
      </ul>
    </nav>
  )
}

export default Navbar
