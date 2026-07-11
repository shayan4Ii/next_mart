import { Mail, Phone, Globe } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
        <Header/>
        <main className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-6">
                
                <h1 className="text-5xl font-bold text-center text-gray-900 mb-4">
                Contact Me
                </h1>

                <p className="text-center text-gray-600 text-lg mb-12">
                Have a question, a project idea, or want to work together? Feel free
                to get in touch using any of the methods below.
                </p>

                <div className="grid gap-6">
                {/* Email */}
                <a
                    href="mailto:shayanalibusiness@gmail.com"
                    className="flex items-center gap-5 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                >
                    <div className="bg-blue-100 p-4 rounded-full">
                    <Mail className="w-8 h-8 text-blue-600" />
                    </div>

                    <div>
                    <h2 className="text-xl font-semibold text-gray-900">Email</h2>
                    <p className="text-gray-600">
                        shayanalibusiness@gmail.com
                    </p>
                    </div>
                </a>

                {/* Phone */}
                <a
                    href="tel:+923432384573"
                    className="flex items-center gap-5 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                >
                    <div className="bg-green-100 p-4 rounded-full">
                    <Phone className="w-8 h-8 text-green-600" />
                    </div>

                    <div>
                    <h2 className="text-xl font-semibold text-gray-900">Phone</h2>
                    <p className="text-gray-600">+92 343 2384573</p>
                    </div>
                </a>

                {/* Instagram */}
                <a
                    href="https://www.instagram.com/shayan4li/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-5 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                >
                    <div className="bg-pink-100 p-4 rounded-full">
                    <Globe className="w-8 h-8 text-pink-600" />
                    </div>

                    <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Instagram
                    </h2>
                    <p className="text-gray-600">@shayan4li</p>
                    </div>
                </a>
                </div>
            </div>
        </main>
     <Footer/>
    </div>
  );
}