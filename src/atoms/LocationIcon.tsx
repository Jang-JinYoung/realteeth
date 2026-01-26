const LocationIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.5 8c0 7-7.5 11-7.5 11S4.5 15 4.5 8a7.5 7.5 0 1115 0z"
            />
        </svg>
    );
};

export default LocationIcon;
