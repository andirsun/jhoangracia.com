/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { IPost } from "../interfaces/blogPost.interface";
import MainService from "../services/main.service";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,Mousewheel
} from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([
  Navigation,
  Mousewheel,
]);
const Home: NextPage = () => {
  const [posts, setPosts] = useState<any[]>();

  useEffect(() => {
		const fetchPosts = async () => {
      const postsData = await MainService.fetchPosts();
      console.log (postsData);
      setPosts(postsData.items);
    }
		fetchPosts();
	}, [])

	const postCard = (post: IPost) => {
    console.log (post)
    const goToPost = () => {
      window.location.href = post.link;
    }; 
    return (
      <SwiperSlide className="flex rounded-2xl cursor-pointer bg-center bg-cover" key={post.link}
        onClick={goToPost} style={{backgroundImage: `url(${post.thumbnail})`}}
      > 
        <div className="overflow-hidden self-end w-full h-1/3 p-3 m-3 bg-white rounded-xl">
          <p className="text-xs lg:text-lg text-gray-600">{post.categories[0].toUpperCase()}</p>
          <h1 className="leading-none tracking-tighter lg:leading-none lg:tracking-tighter lg:text-2xl font-semibold text-gray-700">
            {post.title}
          </h1>
        </div>      
      </SwiperSlide>
  
    )
  }
  return (
    <div>
      <Head>
        <title>Soy Jhoan Gracia</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen bg-fixed opacity-90 bg-back" >
        <div className="lg:flex m-auto w-full">
          
          <div className="self-center w-full lg:w-1/2 lg:space-y-10">
            <img className="rounded-full w-1/5 lg:w-6/12 mx-auto"
              src="/deivid7.png"
              alt="Jhoan Gracia"
            />

            <iframe className="mx-auto px-4 w-full lg:w-8/12"
              src="https://open.spotify.com/embed/show/1yVqBBUrbz9mAoucDo1MHe?utm_source=generator&theme=0"
              height={200}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>

          {/* <div className="flex self-center w-full lg:w-1/2">
          </div> */}

          <div className="w-full lg:w-1/2 ">	
            <div className="px-4 flex flex-wrap">
              <div className="lg:w-8/12">
                <h1 className="text-gray-800 font-extrabold text-3xl lg:text-6xl leading-none tracking-tighter">
                  Hola, soy Jhoan 🇨🇴🇺🇸
                </h1>
              </div>
              <div className="lg:w-8/12">
                <p className="mt-2 text-gray-800 text-2xl leading-none tracking-tighter">
                  Con las letras y los viajes, las personas y los lugares,
                  las aventuras y las experiencias, y contando historias
                  desde cualquier parte del planeta, bienvenidos a un
                  Mundo con Gracia.
                </p>
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-800 text-xl lg:text-3xl font-bold ">Mi Blog</h2>
              <Swiper
                className="h-60 lg:h-72 mt-2"
                navigation={true}
                mousewheel={true}
                spaceBetween={20}
                slidesPerView={1.4}
              >
                {posts && posts.map(post => postCard(post))}
              </Swiper>
            </div>
                      
          </div>
        </div>
		  </div>
    </div>
  )
}

export default Home
