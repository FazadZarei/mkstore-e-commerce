"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { PiMagnifyingGlassThin, PiHandbagThin } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch, FiUser, FiShoppingCart, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header({ isDashboard = false }) {
  const router = useRouter();
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [openMenu, setOpenMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [user, setUser] = useState(null);
  const { cart } = useCart();

  // Load menu items from API
  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/menu-items");
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data);
        }
      } catch (error) {
        console.error("Error loading menu items:", error);
      }
    };
    loadMenuItems();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setIsScrollingDown(currentScroll > prevScroll);
      setPrevScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleNavigation = (href) => {
    // Close mobile menu if open
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
      mobileMenu.classList.add("-translate-x-full");
    }
    // Navigate to the route
    router.push(href);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <header
      className={`sticky top-8 z-50 transition-colors duration-300 
      ${!isScrollingDown ? "bg-white text-black" : "bg-transparent"}`}
      id="header"
    >
      <div className="px-4 md:px-10 py-4 flex items-center justify-between">
        <button
          className="text-2xl hover:text-gray-600"
          aria-label="Menu"
          onClick={() =>
            document
              .getElementById("mobileMenu")
              .classList.remove("-translate-x-full")
          }
        >
          <RxHamburgerMenu className="h-6 w-6" />
        </button>
        <div
          className="text-xl md:text-2xl font-bold cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          MKI MIYUKI ZOKU
        </div>

        {/* Menu */}
        <div
          className="fixed w-1/3 inset-0 top-8 bg-white/70 backdrop-blur-sm z-50 transform -translate-x-full transition-transform duration-300"
          id="mobileMenu"
        >
          <div className="py-4 px-4 md:px-10">
            <button
              className="absolute top-10 left-10 text-2xl"
              id="closeMenu"
              onClick={() =>
                document
                  .getElementById("mobileMenu")
                  .classList.add("-translate-x-full")
              }
            >
              <RxCross1 />
            </button>
            <nav
              className="flex flex-col space-y-8 font-senary font-light mt-20 text-sm 
              max-h-[70vh] overflow-y-auto scrollbar-none"
            >
              {menuItems.map(
                (item, index) =>
                  !item.isHidden && (
                    <div key={index} className="group">
                      <div
                        onClick={() =>
                          item.has_submenu === 1
                            ? setOpenMenu(
                                openMenu === item.title ? null : item.title
                              )
                            : handleNavigation("/" + item.href)
                        }
                        className="hover:text-gray-600 cursor-pointer flex items-center justify-between"
                      >
                        {item.title}
                        {item.has_submenu === 1 && (
                          <motion.div
                            animate={{
                              rotate: openMenu === item.title ? 180 : 0,
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <IoIosArrowDown className="h-4 w-4" />
                          </motion.div>
                        )}
                      </div>

                      <AnimatePresence>
                        {openMenu === item.title && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 mt-4 space-y-4">
                              {item.submenu?.map((subItem, subIndex) => (
                                <motion.div
                                  key={subIndex}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{
                                    delay: subIndex * 0.1,
                                    duration: 0.2,
                                  }}
                                  className="block hover:text-gray-600 cursor-pointer"
                                  onClick={() => handleNavigation(subItem.href)}
                                >
                                  {subItem.title}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
              )}
            </nav>
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          {!isDashboard && (
            <>
              <button className="hover:text-gray-600" aria-label="Search">
                <FiSearch className="h-5 w-5" />
              </button>
              <Link
                href="/cart"
                className="hover:text-gray-600 relative"
                aria-label="Cart"
              >
                <FiShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </>
          )}
        </div>

        {user ? (
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="text-sm md:text-base text-gray-700 hidden md:block">
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-black"
            >
              <FiLogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-gray-700 hover:text-black">
            <FiUser className="w-5 h-5" />
          </Link>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </header>
  );
}
