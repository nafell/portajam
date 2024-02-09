'use client';

import { useCallback, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './index.module.css';

function Search() {
  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);
  const _onEnter: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.code === 'Enter' && !composing) {
        location.href = `/search?q=${inputRef.current?.value}`;
      }
    },
    [composing],
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get('q') || '';
  return (
    <Suspense>
      <input
        type="search"
        name="q"
        ref={inputRef}
        className={styles.search}
        placeholder="Search..."
        onKeyDown={_onEnter}
        onCompositionStart={startComposition}
        onCompositionEnd={endComposition}
        defaultValue={defaultQuery}
      />
    </Suspense>
  );
}

export default function SearchField() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
