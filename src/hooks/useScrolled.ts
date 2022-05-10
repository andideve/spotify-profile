import { useEffect, useState } from 'react';

export interface ScrolledOptions {
  min?: number;
}

const useScrolled = ({ min = 0 }: ScrolledOptions = {}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > min);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [min]);

  return scrolled;
};

export default useScrolled;
