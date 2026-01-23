import { useEffect, useState } from "react";

interface GeoPosition {
    lat: number;
    lon: number;
}

interface GeoError {
    message: string;
}

const useGeolocation = () => {
    const [position, setPosition] = useState<GeoPosition | null>(null);
    const [error, setError] = useState<GeoError | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // navigator.permissions.query({ name: "geolocation" }).then((result) => {
        //     console.log(result.state); // 'granted' | 'denied' | 'prompt'
        // });
        if (!navigator.geolocation) {
            setError({
                message: "Geolocation을 지원하지 않는 브라우저입니다.",
            });
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                });
                setLoading(false);
            },
            (err) => {
                setError({ message: err.message });
                setLoading(false);
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
            },
        );
    }, []);

    return { position, setPosition, loading, error };
};

export default useGeolocation;
