import React from 'react'

const About = () => {
  return (
    <div className="container mx-auto my-16">
    <div className="grid grid-cols-1 md:grid-cols-1 gap-12 items-center">
      <div className="text-center md:text-left ">
        <h2 className="text-5xl font-bold mb-4 text-blue-500">Welcome to Cullina Share</h2>
        <p className="text-2xl text-gray-700 mb-6">
          Discover the art of cooking and share your culinary creations with the world. Cullina Share is a
          community-driven platform where food enthusiasts come together to explore, learn, and inspire.
        </p>
        <p className="text-xl text-gray-700 mb-6">
          Our mission is to create a space for food lovers to connect, share recipes, and celebrate the joy
<<<<<<< HEAD
          of cooking. Whether you`re a seasoned chef or a home cook, youll find something delightful here.
=======
          of cooking. Whether youre a seasoned chef or a home cook, youll find something delightful here.
>>>>>>> 077959b0a2d901e2eba48ca6c584cf6340cf2bd4
        </p>
      </div>
    </div>

    {/* Team Section */}
     <div className="mt-12">
      <h2 className="text-3xl font-bold mb-8 text-blue-500">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Team Member 1 */}
        <div className="text-center md:text-right">
        <h2 className="text-3xl font-bold mb-4 text-blue-500">Meet the Developer</h2>
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Varun Sharma</h3>
          <p className="text-gray-600">Full Stack Developer</p>
        </div>
      </div>

        {/* Team Member 2 */}
        <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-500">Incharge</h2>
          <h3 className="text-xl font-bold mb-2">Amita Rawat</h3>
          <p className="text-gray-600">Head of Recipes</p>
        </div>

        {/* Team Member 3 */}
        <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-500">Bussiness Manager</h2>
          <h3 className="text-xl font-bold mb-2">Ashutosh Chikkara</h3>
          <p className="text-gray-600">Community Manager</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default About
