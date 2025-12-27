import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapboxToken } from '@/hooks/useMapboxToken';
import { Loader2 } from 'lucide-react';

interface AdminLocationMapProps {
  location: { lat: number; lng: number };
}

export const AdminLocationMap = ({ location }: AdminLocationMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const { token, isLoading, error } = useMapboxToken();

  useEffect(() => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [location.lng, location.lat],
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    marker.current = new mapboxgl.Marker({ color: '#2dd4bf' })
      .setLngLat([location.lng, location.lat])
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, [token, location]);

  // Update marker when location changes
  useEffect(() => {
    if (marker.current && map.current) {
      marker.current.setLngLat([location.lng, location.lat]);
      map.current.flyTo({ center: [location.lng, location.lat], zoom: 12 });
    }
  }, [location]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-muted">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-muted text-muted-foreground text-sm">
        Map unavailable
      </div>
    );
  }

  return <div ref={mapContainer} className="h-full w-full" />;
};
