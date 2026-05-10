'use client';

import { useEffect, useRef, useState } from 'react';
import ShareModal from './ShareModal';

interface ShareButtonProps {
  path: string;
  title: string;
  className?: string;
}

export default function ShareButton({ path, title, className }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [fullUrl, setFullUrl] = useState(path);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setFullUrl(`${window.location.origin}${path}`);
  }, [path]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen(true)}
        aria-label={`Share ${title}`}
        className={
          className ??
          'flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100'
        }
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>
      {open && (
        <ShareModal
          url={fullUrl}
          title={title}
          onClose={() => setOpen(false)}
          triggerRef={buttonRef}
        />
      )}
    </>
  );
}
