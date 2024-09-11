/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects:()=>{
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/general',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
