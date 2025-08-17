'use client'

import * as React from 'react';

import Divider from '@mui/material/Divider';

import Facilities from '@/components/home/Facilities';
import FAQ from '@/components/home/FAQ';
import Hero from '@/components/home/Hero';
import LogoCollection from '@/components/home/LogoCollection';
import Packages from '@/components/home/Packages';
import Testimonials from '@/components/home/Testimonials';

export default function HomeScreen() {
  return (
    <>
      <Hero />
      <div>
        <LogoCollection />
        <Divider />
        <Packages />
        <Divider />
        <Facilities />
        <Divider />
        <Testimonials />
        <Divider />
        <FAQ />
        <Divider />
      </div>
    </>
  );
}
