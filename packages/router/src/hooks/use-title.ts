import { useEffect, useState } from 'haunted';

/**
 * Return the page title state. The title is updated when the router pushes a new state.
 */
export const useTitle = () => {
  const [title, setTitle] = useState(document.title);
  const handleRouterUpdate = (e: unknown) => {
    setTimeout(() => {
      console.log(`router:update title: ${document.title}`);
      setTitle((e as CustomEvent<{ name: string }>).detail.name);
    });
  };

  useEffect(() => {
    window.addEventListener('router:update', handleRouterUpdate);
    return () => window.removeEventListener('update', handleRouterUpdate);
  }, []);

  return title;
};
