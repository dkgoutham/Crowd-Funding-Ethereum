import Link from 'next/link'
import React from 'react'
import { Menu } from 'semantic-ui-react'

const Header = () => {
  return (
    <Menu style = {{ marginTop: "10px"}}>

        <Link href="/">
          <a className='item'>GenuineFund</a>
        </Link>
        <Menu.Menu position='right'>
          <Link href="/">
            <a className='item'>Campaigns</a>
          </Link>
          <Link href="/campaigns/new">
            <a className='item'>+</a>
          </Link>
        </Menu.Menu>
    </Menu>
  )
}

export default Header