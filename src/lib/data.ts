import type { ProjectCard, ServiceItem, TeamMember, Testimonial, StatItem, NavLink } from '@/types';

export const navLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
];

export const services: ServiceItem[] = [
    {
        number: '01',
        title: 'Social Media Management',
        description: 'Complete social media strategy and execution—from content planning to community management, turning your social channels into growth engines.',
        tags: ['Content Creation', 'Community Management', 'Social Strategy', 'Analytics'],
        icon: '📱',
    },
    {
        number: '02',
        title: 'Brand Growth & Positioning',
        description: 'Strategic brand development that creates lasting impact. We position your brand for recognition, relevance, and sustainable growth in your market.',
        tags: ['Brand Strategy', 'Market Positioning', 'Competitive Analysis', 'Growth Planning'],
        icon: '📈',
    },
    {
        number: '03',
        title: 'Content Strategy',
        description: 'Data-driven content that connects and converts. Every piece of content is crafted with purpose to build your audience and drive engagement.',
        tags: ['Content Planning', 'Copywriting', 'Visual Content', 'Content Calendar'],
        icon: '✨',
    },
    {
        number: '04',
        title: 'Digital Marketing',
        description: 'Comprehensive digital campaigns that deliver results. From paid social to influencer partnerships, we amplify your brand across all channels.',
        tags: ['Paid Advertising', 'Influencer Marketing', 'Email Marketing', 'Campaign Management'],
        icon: '🎯',
    },
    {
        number: '05',
        title: 'Web Design & Development',
        description: 'Modern, responsive websites that convert visitors into customers. Beautiful design meets seamless functionality for optimal user experience.',
        tags: ['Web Design', 'Development', 'E-commerce', 'Mobile Optimization'],
        icon: '🌐',
    },
];

export const projects: ProjectCard[] = [
    {
        id: 1,
        title: 'Brand Growth Campaign',
        year: '2024',
        services: ['Social Media', 'Content Strategy'],
        client: 'Coming Soon',
        image: '/projects/p1.jpg',
        category: 'Social Media',
        color: '#6366F1',
    },
    {
        id: 2,
        title: 'Digital Marketing Success',
        year: '2024',
        services: ['Paid Ads', 'Brand Positioning'],
        client: 'Coming Soon',
        image: '/projects/p2.jpg',
        category: 'Digital Marketing',
        color: '#EC4899',
    },
    {
        id: 3,
        title: 'E-Commerce Platform',
        year: '2024',
        services: ['Web Design', 'Development'],
        client: 'Coming Soon',
        image: '/projects/p3.jpg',
        category: 'Web Design',
        color: '#10B981',
    },
    {
        id: 4,
        title: 'Content Strategy Overhaul',
        year: '2024',
        services: ['Content Planning', 'Social Media'],
        client: 'Coming Soon',
        image: '/projects/p4.jpg',
        category: 'Content Strategy',
        color: '#F59E0B',
    },
];

export const stats: StatItem[] = [
    { value: 150, suffix: '+', label: 'Brands Grown' },
    { value: 95, suffix: '%', label: 'Client Retention' },
    { value: 350, suffix: '%', label: 'Avg Growth Rate' },
    { value: 8, suffix: '+', label: 'Years of Expertise' },
];

export const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: 'PIXELL transformed how we present ourselves online. Their strategic approach to brand positioning resulted in 250% growth in 6 months.',
        author: 'Priya Kapoor',
        company: 'Digital Ventures',
        logo: 'DV',
        avatar: 'PK',
        rating: 5,
    },
    {
        id: 2,
        quote: 'Not just social media management—they delivered complete brand growth. Our ROI exceeded expectations and the team was incredibly collaborative.',
        author: 'Arjun Singh',
        company: 'E-Commerce Solutions',
        logo: 'ES',
        avatar: 'AS',
        rating: 5,
    },
    {
        id: 3,
        quote: 'PIXELL made our brand matter. Their content strategy and digital expertise positioned us as industry leaders. Highly recommend.',
        author: 'Neha Sharma',
        company: 'Tech Innovations',
        logo: 'TI',
        avatar: 'NS',
        rating: 5,
    },
];

export const team: TeamMember[] = [
    {
        id: 1,
        name: 'Aditya Sharma',
        role: 'Founder & Creative Lead',
        image: '/team/t1.jpg',
        socials: { twitter: '#', linkedin: '#', dribbble: '#' },
    },
    {
        id: 2,
        name: 'Megha Patel',
        role: 'Strategy & Brand Director',
        image: '/team/t2.jpg',
        socials: { linkedin: '#', dribbble: '#' },
    },
    {
        id: 3,
        name: 'Rohit Desai',
        role: 'Digital Marketing Lead',
        image: '/team/t3.jpg',
        socials: { twitter: '#', linkedin: '#' },
    },
    {
        id: 4,
        name: 'Isha Verma',
        role: 'Content & Social Manager',
        image: '/team/t4.jpg',
        socials: { dribbble: '#', linkedin: '#' },
    },
];
