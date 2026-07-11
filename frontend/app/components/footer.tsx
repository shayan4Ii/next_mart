export default function Footer(){

  return (

    <footer id="contact" className="bg-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8">


        <div>
          <h4 className="text-xl font-bold text-white mb-3">
            NextMart
          </h4>

          <p className="text-sm text-gray-400">
            Quality products, fast delivery, and a shopping experience you can trust.
          </p>
        </div>



        <div>

          <h5 className="font-semibold text-white mb-3">
            Shop
          </h5>

          <ul className="space-y-2 text-sm">

            <li>
              <a href="#" className="hover:text-white">
                All Products
              </a>
            </li>

            <li>
              <a href="#categories" className="hover:text-white">
                Categories
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                Deals
              </a>
            </li>

          </ul>

        </div>




        <div>

          <h5 className="font-semibold text-white mb-3">
            Company
          </h5>

          <ul className="space-y-2 text-sm">

            <li>
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                Careers
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>

          </ul>

        </div>



        <div>

          <h5 className="font-semibold text-white mb-3">
            Support
          </h5>

          <ul className="space-y-2 text-sm">

            <li>
              <a href="#" className="hover:text-white">
                Help Center
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                Returns
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>

          </ul>

        </div>


      </div>


      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">

        © {new Date().getFullYear()} NextMart. All rights reserved.

      </div>


    </footer>

  );

}