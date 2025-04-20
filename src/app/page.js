"use client";

import { motion, useScroll, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { CiUser } from "react-icons/ci";
import {
  HiMenu,
  HiSearch,
  HiUser,
  HiShoppingBag,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import {
  PiBagSimpleThin,
  PiHandbagThin,
  PiMagnifyingGlassLight,
  PiMagnifyingGlassThin,
} from "react-icons/pi";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import TopSlider from "../components/TopSlider";
import SaleSection from "../components/SaleSection";
import ProductCard from "../components/ProductCard";
import { fetchProducts, fetchMenuItems } from "../services/api";
import { IoIosArrowDown } from "react-icons/io";

export default function Home() {
  const scroll = useScroll();
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [openMenu, setOpenMenu] = useState(null);
  const [products, setProducts] = useState({
    LE_products: [],
    SALE_products: [],
  });
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await fetchProducts();
        const menuItemsData = await fetchMenuItems();
        setProducts(productsData);
        setMenuItems(menuItemsData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
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

  console.log(products);
  console.log(menuItems);

  return (
    <main className="min-h-screen">
      <TopSlider />
      {/* Header */}
      <header
        className={`sticky top-8 z-50 transition-colors duration-300 
        ${!isScrollingDown ? "bg-white text-black" : "bg-transparent"}`}
        id="header"
      >
        <div className="px-10 py-4 flex items-center justify-between">
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
          <div className="text-2xl font-bold">MKI MIYUKI ZOKU</div>
          {/* Menu */}
          <div
            className="fixed w-1/3 inset-0 top-8 bg-white/70 backdrop-blur-sm z-50 transform -translate-x-full transition-transform duration-300"
            id="mobileMenu"
          >
            <div className="py-4 px-10">
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
                            item.hasSubmenu &&
                            setOpenMenu(
                              openMenu === item.title ? null : item.title
                            )
                          }
                          className="hover:text-gray-600 cursor-pointer flex items-center justify-between"
                        >
                          {item.title}
                          {item.hasSubmenu && (
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
                                  <motion.a
                                    key={subIndex}
                                    href={subItem.href}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{
                                      delay: subIndex * 0.1,
                                      duration: 0.2,
                                    }}
                                    className="block hover:text-gray-600"
                                  >
                                    {subItem.title}
                                  </motion.a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                )}
              </nav>

              <style jsx global>{`
                .scrollbar-none {
                  -ms-overflow-style: none; /* IE and Edge */
                  scrollbar-width: none; /* Firefox */
                }

                .scrollbar-none::-webkit-scrollbar {
                  display: none; /* Chrome, Safari and Opera */
                }
              `}</style>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="hover:text-gray-600" aria-label="Search">
              <PiMagnifyingGlassThin className="h-5 w-5" />
            </button>
            <button className="hover:text-gray-600" aria-label="Profile">
              <CiUser className="h-5 w-5" />
            </button>
            <button
              className="hover:text-gray-600 flex flex-col items-center relative"
              aria-label="Cart"
            >
              <span className="text-xs absolute top-2 ">0</span>
              <PiHandbagThin className="h-7 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* First Section */}
      <SaleSection
        images={["/assets/hero-image.webp"]}
        title="END OF SEASON SALE"
        className=""
      />

      {/* Limited Edition Section */}
      <SaleSection
        images={[
          "https://images.unsplash.com/photo-1613013593383-aa057532b036?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1681253173359-e96fb3838ed7?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ]}
        title="NEW ARRIVALS"
      />

      {/* Featured Collection */}
      <section className="py-16 px-10 relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true}
          slidesPerView={1}
          spaceBetween={12}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="relative px-10"
        >
          {[...Array(2)].map((_, arrayIndex) =>
            products.LE_products.map((product) => (
              <SwiperSlide key={`${product.id}-${arrayIndex}`}>
                <ProductCard
                  image1={product.image1}
                  image2={product.image2}
                  title={product.title}
                  price={product.price}
                  colors={product.colors}
                  tag={product.tag}
                  options={product.options}
                />
              </SwiperSlide>
            ))
          )}

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>

        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: black;
            width: 30px !important;
            height: 30px !important;
          }

          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 15px !important;
          }

          .swiper-button-prev {
            left: 10px;
          }

          .swiper-button-next {
            right: 10px;
          }
        `}</style>
      </section>

      {/* Abstract Collection Section */}
      <SaleSection
        images={[
          "https://i.postimg.cc/jqQ4RB4x/image-3.jpg",
          "https://i.postimg.cc/28rTvCSL/image-5.jpg",
        ]}
        title="ABSTRACT COLLECTION"
      />

      {/* Sale Products Section */}
      <section className="py-16 px-10 relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true}
          slidesPerView={1}
          spaceBetween={12}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="relative px-10"
        >
          {[...Array(2)].map((_, arrayIndex) =>
            products.SALE_products.map((product) => (
              <SwiperSlide key={`${product.id}-${arrayIndex}`}>
                <ProductCard
                  image1={product.image1}
                  image2={product.image2}
                  title={product.title}
                  price={product.price}
                  colors={product.colors}
                  tag={product.tag}
                  options={product.options}
                />
              </SwiperSlide>
            ))
          )}

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </section>

      {/* Insulated Loft Collection Section */}
      <SaleSection
        images={[
          "https://i.postimg.cc/d3vR89wc/image-6.jpg",
          "https://i.postimg.cc/0QSZGQSD/image-4.jpg",
        ]}
        title="INSULATED LOFT COLLECTION"
      />

      {/* Newsletter Section */}
      <section className="relative mx-10">
        <div className="relative h-[400px]">
          <Image
            src="https://i.postimg.cc/3RBNcsPN/young-beautiful-girl-black-hat-posing-white-wall.jpg"
            alt="Sign up background"
            fill
            className="object-cover w-full"
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0">
            <div className="relative pl-20 py-32">
              <h2 className="text-xl font-bold mb-4 text-left">SIGN UP</h2>
              <div className="max-w-md flex text-sm">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 placeholder:uppercase placeholder:text-black placeholder:text-sm py-2 border-b border-black bg-transparent"
                />
                <button className="bg-transparent text-black py-2 transition-colors">
                  GO
                </button>
              </div>
              <p className="my-4 text-left text-xs">
                REGISTER TO RECEIVE 10% OFF YOUR FIRST PURCHASE.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
