import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Leaf, Users } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-orange-500 to-accent text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slideInUp">
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Hungry? We've Got You Covered
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Order your favorite food from the best restaurants in town. Fast, fresh, and delicious
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link to="/menu" className="btn bg-white text-primary hover:bg-gray-100 flex items-center gap-2">
                  Order Now
                  <ArrowRight size={20} />
                </Link>
                <Link to="/menu" className="btn btn-outline border-white text-white hover:bg-white/10">
                  Explore Menu
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:block">
              <div className="w-full h-96 bg-gradient-to-br from-white/20 to-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <div className="text-6xl">🍕</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose FoodieHub?</h2>
            <p className="text-gray-600 text-lg">The best food delivery experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Get your food delivered in 30-45 minutes'
              },
              {
                icon: Leaf,
                title: 'Fresh & Healthy',
                description: 'Only the freshest ingredients from top restaurants'
              },
              {
                icon: Users,
                title: 'Best Service',
                description: 'Professional delivery partners and 24/7 support'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card p-8 text-center hover:shadow-lg transition">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Categories</h2>
            <p className="text-gray-600 text-lg">Choose from our wide variety</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Pizza', emoji: '🍕' },
              { name: 'Burgers', emoji: '🍔' },
              { name: 'Chicken', emoji: '🍗' },
              { name: 'Desserts', emoji: '🍰' },
              { name: 'Beverages', emoji: '🥤' }
            ].map((cat, idx) => (
              <Link
                key={idx}
                to={`/menu?category=${cat.name.toLowerCase()}`}
                className="card p-6 text-center hover:shadow-lg hover:scale-105 transition cursor-pointer group"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition">{cat.emoji}</div>
                <p className="font-bold text-gray-800">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Satisfy Your Hunger?</h2>
          <p className="text-lg text-white/90 mb-8">
            Download the FoodieHub app and get exclusive deals on your first order
          </p>
          <Link to="/menu" className="btn bg-white text-primary hover:bg-gray-100 inline-block">
            Start Ordering
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
