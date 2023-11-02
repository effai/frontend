import dynamic from 'next/dynamic';

export const EmojiPickerDynamic = dynamic(() => import('emoji-picker-react').then(mod => mod.default), {
  ssr: false,
  loading: () => <p>Loading picker...</p>
});

export const EmojiDynamic = dynamic(() => import('emoji-picker-react').then(mod => mod.Emoji), {
  ssr: false,
  loading: () => <span>Loading emoji...</span>
});
