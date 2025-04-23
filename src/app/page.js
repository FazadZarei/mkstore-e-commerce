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
import Header from "../components/Header";

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
      <Header />
      <TopSlider />
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
