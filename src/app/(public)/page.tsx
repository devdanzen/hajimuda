import * as React from 'react';
import Divider from '@mui/material/Divider';
import LogoCollection from '@/components/home/LogoCollection';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import Highlights from '@/components/home/Highlights';
import Pricing from '@/components/home/Pricing';
import FAQ from '@/components/home/FAQ';
import Footer from '@/components/home/Footer';
import Hero from '@/components/home/Hero';

export default function HomePage() {
  return (
    <>
      <Hero />
      <div>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </>
  );
}
