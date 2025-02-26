
import React from 'react'
import Link from 'next/link';

export const navItemsData = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Courses",
    url: "/courses",
  },{
    title: "About",
    url: "/about",
  },{
    title: "Policy",
    url: "/policy",
  } ,
  {
    title: "FAQ",
    url: "faq",
  }
  ]
interface Props {
  activeItem: number;
  isMobile: boolean;
}

const NavItems:React.FC<Props> = ({activeItem,isMobile}) => {
  return (
    <>
    <div className="hidden 800px:flex">
    {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {i.title}
              </span>
            </Link>
          ))}
          
    </div>
    {isMobile && (
        <div className="800px:hidden mt-5">
             <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >ELearning</span>
            </Link>
          </div>
            {navItemsData &&
              navItemsData.map((i, index) => (
                <Link href="/" passHref key={index}>
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-[#37a39a] text-[crimson]"
                        : "dark:text-white text-black"
                    } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                  >
                    {i.title}
                  </span>
                </Link>
              ))}
          </div>
      )}
      
    </>
  )
}

export default NavItems
