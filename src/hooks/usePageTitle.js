import { useEffect } from 'react';

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | The Athlete's Blender` : "The Athlete's Blender";
  }, [title]);
}
