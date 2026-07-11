'use client';

import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { home_api } from "../lib/api";


const CATEGORIES = [
  { name: "Electronics", icon: "💻", desc: "Phones, laptops & gadgets" },
  { name: "Fashion", icon: "👕", desc: "Trending styles for everyone" },
  { name: "Home", icon: "🛋️", desc: "Furniture & home decor" },
  { name: "Accessories", icon: "⌚", desc: "Bags, watches & more" },
];


const FEATURES = [
  {
    title: "Fast Delivery",
    text: "Get your orders delivered to your doorstep within 24-48 hours.",
    icon: "🚚",
  },
  {
    title: "Secure Payment",
    text: "100% safe checkout with encrypted payment gateways.",
    icon: "🔒",
  },
  {
    title: "24/7 Support",
    text: "Our support team is available around the clock.",
    icon: "💬",
  },
];

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    async function checkAuth() {
        try {
            const response = await home_api();

            if (response.status === 401 || response.status === 403) {
                router.push("/login");
                return;
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
            router.push("/login");
        }
    }

    checkAuth();
}, [router]);
  return (

    <div className="min-h-screen bg-gray-50 text-gray-900">

      <Header />


      <main>


        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">

          <div>

            <p className="text-indigo-600 font-semibold mb-4">
              Welcome Customer 👋
            </p>


            <h2 className="text-4xl md:text-5xl font-bold">
              Discover Quality Products at the Best Prices
            </h2>


            <p className="mt-6 text-gray-600 text-lg">
              Shop premium products with fast delivery,
              secure payments, and a smooth experience.
            </p>


            <div className="mt-8 flex gap-4">

              <a
                href="/products"
                className="bg-indigo-600 text-white px-7 py-3 rounded-lg"
              >
                Shop Now
              </a>


              <a
                href="#categories"
                className="border px-7 py-3 rounded-lg"
              >
                View Categories
              </a>

            </div>


          </div>



          <div className="relative h-[300px] rounded-2xl overflow-hidden">

            <Image
              src="/shopping.jpg"
              alt="Shopping"
              fill
              className="object-cover"
            />

          </div>


        </section>




        {/* Categories */}

        <section id="categories" className="bg-white py-16">

          <div className="max-w-7xl mx-auto px-6">


            <h3 className="text-3xl font-bold mb-10">
              Shop By Category
            </h3>


            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

              {CATEGORIES.map((category)=>(

                <article
                  key={category.name}
                  className="bg-gray-50 p-8 rounded-xl"
                >

                  <span className="text-3xl">
                    {category.icon}
                  </span>


                  <h4 className="mt-4 text-xl font-semibold">
                    {category.name}
                  </h4>


                  <p className="text-gray-500">
                    {category.desc}
                  </p>


                </article>

              ))}


            </div>


          </div>

        </section>





        {/* Features */}

        <section className="max-w-7xl mx-auto px-6 py-16">


          <div className="grid md:grid-cols-3 gap-8">


            {FEATURES.map((feature)=>(

              <article
                key={feature.title}
                className="bg-white p-8 rounded-xl shadow"
              >

                <span className="text-3xl">
                  {feature.icon}
                </span>


                <h3 className="text-xl font-bold mt-4">
                  {feature.title}
                </h3>


                <p className="mt-3 text-gray-600">
                  {feature.text}
                </p>


              </article>

            ))}


          </div>


        </section>



      </main>



      <Footer />

    </div>

  );
}