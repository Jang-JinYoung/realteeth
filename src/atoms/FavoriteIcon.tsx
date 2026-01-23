interface IProps {
    favorite: boolean;
}

const FavoriteIcon = ({ favorite }: IProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={favorite ? "#facc15" : "none"}
            stroke={favorite ? "#facc15" : "#94a3b8"}
            strokeWidth={2}
            className="w-6 h-6 transition-colors"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.5a.53.53 0 01.94 0l2.26 4.58
                           5.05.73a.53.53 0 01.29.9l-3.65 3.56
                           .86 5.04a.53.53 0 01-.77.56L12 16.9
                           l-4.52 2.38a.53.53 0 01-.77-.56l.86-5.04
                           -3.65-3.56a.53.53 0 01.29-.9l5.05-.73
                           2.26-4.58z"
            />
        </svg>
    );
};

export default FavoriteIcon;