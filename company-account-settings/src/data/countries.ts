export const COUNTRY_REGIONS = [
    {
        name: 'North America',
        countries: [
            { id: 'usa', name: 'United States' },
            { id: 'canada', name: 'Canada' },
            { id: 'mexico', name: 'Mexico' }
        ]
    },
    {
        name: 'Europe',
        countries: [
            { id: 'uk', name: 'United Kingdom' },
            { id: 'france', name: 'France' },
            { id: 'germany', name: 'Germany' },
            { id: 'spain', name: 'Spain' },
            { id: 'italy', name: 'Italy' }
        ]
    },
    {
        name: 'Asia',
        countries: [
            { id: 'japan', name: 'Japan' },
            { id: 'china', name: 'China' },
            { id: 'india', name: 'India' },
            { id: 'south-korea', name: 'South Korea' }
        ]
    }
] as const;
